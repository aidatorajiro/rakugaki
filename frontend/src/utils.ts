import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider'
import RakugakiLayers from './artifacts/RakugakiLayers'

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
    return new web3.eth.Contract([
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "data",
                    "type": "string"
                }
            ],
            "name": "addImage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "getLayer",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "image",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "timestamp",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct RakugakiLayer",
                    "name": "",
                    "type": "tuple"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ], "0x5bB5a69A8b0e80C45B5C0C003A8253623c0B5D46");
}