import Web3, { Contract, Numbers } from 'web3';
import detectEthereumProvider from '@metamask/detect-provider'
import RakugakiLayers from './artifacts/RakugakiLayers'
import { NonPayableMethodObject, PayableMethodObject } from 'web3-eth-contract';

export async function getWeb3(): Promise<[[string], Web3] | null> {
    const provider = await detectEthereumProvider({ silent: true })
    if (provider && window.ethereum) {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      if (accounts) {
        return [accounts as [string], new Web3(window.ethereum)]
      } else {
        return null
      }
    } else {
      return null
    }
  }

export function getRakugakiLayers(web3: Web3) {
    return new web3.eth.Contract(RakugakiLayers.abi, "0x5bB5a69A8b0e80C45B5C0C003A8253623c0B5D46");
}

export async function runCall(web3: Web3, contract: Contract<any>, transaction: NonPayableMethodObject | PayableMethodObject, from: string, value?: string) {
    return await web3.eth.sendTransaction({
        from: from,
        to: contract.options.address,
        data: transaction.encodeABI(),
        gas: await transaction.estimateGas(),
        nonce: await web3.eth.getTransactionCount(from),
        maxFeePerGas: '1000000000',
        maxPriorityFeePerGas: '1000000000',
        value
    })
}