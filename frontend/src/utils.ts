import detectEthereumProvider from "@metamask/detect-provider";
import { Buffer } from "buffer";
import { BrowserProvider, keccak256 } from "ethers";
import { RakugakiLayers__factory, RakugakiNFT__factory } from "./contracts";

export async function getProvider(): Promise<[[string], BrowserProvider] | null> {
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

export const rakugakiLayersAddress =
  "0x5bB5a69A8b0e80C45B5C0C003A8253623c0B5D46";

export async function getRakugakiLayers(provider: BrowserProvider) {
  return RakugakiLayers__factory.connect(rakugakiLayersAddress, await provider.getSigner());
}

export const rakugakiNFTAddress = "0xeb9779c9b66e16a95e16d28f6ed8241ba09ddd18";

export async function getRakugakiNFT(provider: BrowserProvider) {
  return RakugakiNFT__factory.connect(rakugakiNFTAddress, await provider.getSigner())
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
  if (hex.length % 2) { hex = '0' + hex; }

  var len = hex.length / 2;
  var u8 = new Uint8Array(len);

  var i = 0;
  var j = 0;
  while (i < len) {
    u8[i] = parseInt(hex.slice(j, j+2), 16);
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
    imageIDProcessed = BigInt(keccak256(imageID));
  } else {
    imageIDProcessed = BigInt("0x" + imageIDBuf.toString("hex"));
  }
  return imageIDProcessed;
}
