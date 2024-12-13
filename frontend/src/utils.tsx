import detectEthereumProvider from "@metamask/detect-provider";
import { Buffer } from "buffer";
import { BrowserProvider, keccak256 } from "ethers";
import * as paris from "./contracts/paris";

import { ADDRESSES, NetworkConfig } from "./Addresses";

export async function getProvider(): Promise<
  [[string], BrowserProvider] | null
> {
  const provider = await detectEthereumProvider({ silent: true });
  if (provider && window.ethereum) {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts) {
      return [accounts as [string], new BrowserProvider(window.ethereum)];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export async function getChainId(provider: BrowserProvider) {
    return parseInt((await provider.getNetwork()).chainId.toString(10));
}

export async function getRakugakiConfig(provider: BrowserProvider): Promise<NetworkConfig | undefined> {
    const chainId = await getChainId(provider)
    return ADDRESSES[chainId]
}

export async function getLayerDatabaseAddress(provider: BrowserProvider) {
    const c = await getRakugakiConfig(provider)
    if (c !== undefined) { return c.layerDatabase }
}

export async function getNFTAddress(provider: BrowserProvider) {
    const c = await getRakugakiConfig(provider)
    if (c !== undefined) { return c.nft }
}

export async function getRakugakiLayers(provider: BrowserProvider) {
  const addr = await getLayerDatabaseAddress(provider);
  if (!addr) { return }
  return paris.factories.RakugakiLayers__factory.connect(
    addr,
    await provider.getSigner(),
  );
}

export async function getRakugakiNFT(provider: BrowserProvider) {
  const addr = await getNFTAddress(provider)
  if (!addr) { return }
  return paris.factories.RakugakiNFT__factory.connect(
    addr,
    await provider.getSigner(),
  );
}

/*
export async function runCall(
  provider: Provider,
  contract: Contract,
  transaction: NonPayableMethodObject | PayableMethodObject,
  from: string,
  value?: string,
) {
  return await web3.eth.sendTransaction({
    from: from,
    to: contract.options.address,
    data: transaction.encodeABI(),
    gas: await transaction.estimateGas({ from }),
    nonce: await web3.eth.getTransactionCount(from),
    maxFeePerGas: "1000000000",
    maxPriorityFeePerGas: "1000000000",
    value,
  });
}*/

export function bnToBuf(bn: BigInt) {
  var hex = bn.toString(16);
  if (hex.length % 2) {
    hex = "0" + hex;
  }

  var len = hex.length / 2;
  var u8 = new Uint8Array(len);

  var i = 0;
  var j = 0;
  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j + 2), 16);
    i += 1;
    j += 2;
  }

  return u8;
}

export function calculateUint256ID(imageID: string) {
  let imageIDBuf = Buffer.from(new TextEncoder().encode(imageID));
  let imageIDProcessed;
  if (imageID.match(/^[0-9]+$/)) {
    let arr = bnToBuf(BigInt(imageID));
    if (arr.length > 32) {
      imageIDProcessed = BigInt(keccak256(arr));
    } else {
      imageIDProcessed = imageID;
    }
  } else if (imageIDBuf.length === 0 || imageIDBuf.length > 32) {
    imageIDProcessed = BigInt(keccak256(imageIDBuf));
  } else {
    imageIDProcessed = BigInt("0x" + imageIDBuf.toString("hex"));
  }
  console.log(imageIDProcessed);
  return imageIDProcessed;
}
