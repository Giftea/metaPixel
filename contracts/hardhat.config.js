require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  defaultNetwork: "hardhat",

  // networks: {
  //   hardhat: {},
  //   mumbai: {
  //     url: process.env.STAGING_INFURA_URL,
  //     accounts: [`0x${process.env.STAGING_PRIVATE_KEY}`],
  //     gas: 2100000,
  //     gasPrice: 8000000000,
  //   },
  // },
};
