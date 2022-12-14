import { ABIEncodedValue } from "@worldcoin/id";
import { defaultAbiCoder as abi, solidityPack } from "ethers/lib/utils";

export const shortAddr = (hash) => `${hash.slice(0, 5)}...${hash.slice(-4)}`;

export const routeIPFSToGateway = (
  url,
  gateway = "https://lens.infura-ipfs.io/ipfs/"
) => {
  if (!url || url.startsWith("http")) return url;

  return `${gateway}${url.slice(7)}`;
};

export const encodeProfileId = (profileId) => {
  if (!profileId) return;

  return solidityPack(["uint256"], [profileId]);
};

export const decodeProof = (proof) => {
  if (!proof) return;

  return abi.decode(["uint256[8]"], proof)[0];
};
