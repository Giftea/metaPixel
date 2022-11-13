const { expect } = require("chai");
const { ethers } = require("hardhat");
var assert = require('assert');

// for string converting to use as byte32
const utils = ethers.utils

describe("RewardCreator", function(){
    let RewardCreator;
    let rewardCreator;
    let admin;
    let pixeedMember;
    let rewarder;
    let addresses;
    let usdcAddress = "0x2058A9D7613eEE744279e3856Ef0eAda5FCbaA7e";

    beforeEach(async function(){
        [admin, pixeedMember, rewarder, ...addresses] = await ethers.getSigners();

        // Create instance of contract
        rewardCreator = await ethers.getContractFactory("RewardCreator");

        // deploy
        hardhatRewardCreator = await RewardCreator.deploy(usdcAddress)
    });
    describe("Deployment", function(){
        it("Should should deploy sucessfully", async function(){
            const address = hardhatRewardCreator.address;
            assert.notEqual(address, '' || null || 0x0 || undefined);
            console.log("RewardCreator contract deployed");
        });
    });

    describe("Should check that the roles are set", function(){

    });


    describe("Should rewardCreator and optional pixeed", function(){

    });

    describe("Should withdraw amount to a pixeed member", function(){

    });
    // Error Tests
    // User without Pixeed Role cant withdrwa
    // Just Admin can give Pixeed Role
    // 
})