import abiJSON from "./abi";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = "0x56d99C5003dc1f94135cDE0327B9cf1B3bC6713D";
  const contractABI = abiJSON;
  let uploadContract;
  try {
    if (typeof window != "undefined") {
      const { ethereum } = window;

      if (ethereum) {
        //checking for eth object in the window
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        uploadContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        ); // instantiating new connection to the contract
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  return uploadContract;
}

export default connectContract;