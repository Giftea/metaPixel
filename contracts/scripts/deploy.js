const hre = require("hardhat");

const main = async () => {
  const ContractFactory = await hre.ethers.getContractFactory("UploadImage");
  const Contract = await ContractFactory.deploy();
  await Contract.deployed();
  console.log("Contract deployed to:", Contract.address);
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
