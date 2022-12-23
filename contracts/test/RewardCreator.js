const { expect } = require("chai");
const { ethers } = require("hardhat");
var assert = require("assert");

describe("RewardCreator", function () {
  let RewardCreator;
  let rewardCreator;
  let admin;
  let pixeedMember;
  let pixeedMember2;
  let creatorAddress;
  let addresses;

  beforeEach(async function () {
    [admin, pixeedMember, pixeedMember2, creatorAddress, ...addresses] =
      await ethers.getSigners();

    mockERC20 = await ethers.getContractFactory("ERC20Mock");
    hardhatMockERC20 = await mockERC20.deploy();
    await hardhatMockERC20.deployed();

    // Create instance of contract
    rewardCreator = await ethers.getContractFactory("RewardCreator");
    // deploy
    hardhatRewardCreator = await rewardCreator.deploy();
    await hardhatRewardCreator.deployed();
    await hardhatRewardCreator.initialize(hardhatMockERC20.address);
  });

  describe("Deployment", function () {
    it("Should should deploy sucessfully", async function () {
      const address = hardhatRewardCreator.address;
      assert.notEqual(address, "" || null || 0x0 || undefined);
    });
    it("Should check that that deployer address is set to Admin and pixeed team", async function () {
      const pixeedMemberRole = await hardhatRewardCreator.PIXEED_TEAM();
      expect(
        await hardhatRewardCreator.hasRole(pixeedMemberRole, admin.address)
      ).to.eql(true);

      const adminMemberRole = await hardhatRewardCreator.DEFAULT_ADMIN_ROLE();
      expect(
        await hardhatRewardCreator.hasRole(adminMemberRole, admin.address)
      ).to.eql(true);
    });
  });

  describe("Should rewardCreator and optional pixeed", function () {
    it("Should check creator and pixeed will rewarded", async function () {
      const someAmount = ethers.utils.parseEther("3");
      await hardhatMockERC20.mint(admin.address, someAmount);

      const approveTokensTx = await hardhatMockERC20.approve(
        hardhatRewardCreator.address,
        ethers.constants.MaxUint256
      );

      const rewardCreatorTx = await hardhatRewardCreator
        .connect(admin)
        .rewardCreator(
          ethers.utils.parseEther("2"),
          ethers.utils.parseEther("1"),
          creatorAddress.address
        );

      await rewardCreatorTx.wait();

      const balanceCreatorAddress = await hardhatMockERC20.balanceOf(
        creatorAddress.address
      );
      const balanceHardhatRewardCreator = await hardhatMockERC20.balanceOf(
        hardhatRewardCreator.address
      );
      expect(
        await hardhatMockERC20.balanceOf(creatorAddress.address)
      ).to.be.eql(ethers.utils.parseEther("2"));
      expect(
        await hardhatMockERC20.balanceOf(hardhatRewardCreator.address)
      ).to.be.eql(ethers.utils.parseEther("1"));
    });

    it("Should withdraw amount to pixeed members", async function () {
      const someAmount = ethers.utils.parseEther("3");
      await hardhatMockERC20.mint(admin.address, someAmount);

      const approveTokensTx = await hardhatMockERC20.approve(
        hardhatRewardCreator.address,
        ethers.constants.MaxUint256
      );

      const rewardCreatorTx = await hardhatRewardCreator
        .connect(admin)
        .rewardCreator(
          ethers.utils.parseEther("2"),
          ethers.utils.parseEther("1"),
          creatorAddress.address
        );

      // grant role to additional accounts
      const role = await hardhatRewardCreator.PIXEED_TEAM();
      await hardhatRewardCreator.grantRole(role, pixeedMember.address);
      expect(
        await hardhatRewardCreator.hasRole(role, pixeedMember.address)
      ).to.eql(true);
      await hardhatRewardCreator.grantRole(role, pixeedMember2.address);
      expect(
        await hardhatRewardCreator.hasRole(role, pixeedMember2.address)
      ).to.eql(true);
      // withdraw amount from a new granted role
      await hardhatRewardCreator.connect(pixeedMember).withdrawFundingPixeed();

      // check that all of the granted roles have received same amount
      expect(await hardhatMockERC20.balanceOf(pixeedMember.address)).to.be.eq(
        await hardhatMockERC20.balanceOf(pixeedMember2.address)
      );

      expect(await hardhatMockERC20.balanceOf(admin.address)).to.be.eq(
        await hardhatMockERC20.balanceOf(pixeedMember2.address)
      );
    });
  });

  describe("Should not withdraw amount if called from member without PIXEED_TEAM role", function () {});
  // Error Tests
  it("should revert if not called from PIXEE_TEAM address", async function () {
    const someAmount = ethers.utils.parseEther("3");
    await hardhatMockERC20.mint(admin.address, someAmount);

    const approveTokensTx = await hardhatMockERC20.approve(
      hardhatRewardCreator.address,
      ethers.constants.MaxUint256
    );

    const rewardCreatorTx = await hardhatRewardCreator
      .connect(admin)
      .rewardCreator(
        ethers.utils.parseEther("2"),
        ethers.utils.parseEther("1"),
        creatorAddress.address
      );

    expect(hardhatRewardCreator.connect(creatorAddress).withdrawFundingPixeed())
      .to.be.reverted;
  });
});
