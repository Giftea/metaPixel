const hre = require("hardhat");

const main = async () => {
  const ContractFactory = await hre.ethers.getContractFactory("UploadImage");
  const Contract = await ContractFactory.deploy();
  await Contract.deployed();
  console.log("Contract deployed to:", Contract.address);

  const [deployer, address1, address2] = await hre.ethers.getSigners();

  let timestamp = 1718926200;
  let imageDataCID =
    "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";

  let txn = await Contract.createNewImage(timestamp, imageDataCID);
  let wait = await txn.wait();
  console.log("NEW IMAGE CREATED:", wait.events[0].event, wait.events[0].args);

  let imageID = wait.events[0].args.imageID;
  console.log("image ID:", imageID);

  txn = await Contract.likeImage(imageID);
  wait = await txn.wait();
  console.log("NEW LIKE:", wait.events[0].event, wait.events[0].args);

  txn = await Contract.connect(address1).likeImage(imageID);
  wait = await txn.wait();
  console.log("NEW LIKE:", wait.events[0].event, wait.events[0].args);

  txn = await Contract.connect(address1).likeImage(imageID);
  wait = await txn.wait();
  console.log("NEW LIKE:", wait.events[0].event, wait.events[0].args);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
