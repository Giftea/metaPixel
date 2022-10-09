// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract RewardCreator is Ownable {
    using SafeERC20 for ERC20;

    ERC20 public immutable usdc;

    event RewardedCreator (address creatorAddress, uint amountToCreator);
    event ContractRewarded (address metapixelContractAddress, uint amountToMetapixel);

    event FundingForMetapixelWithdrawed(address withdrawAddress, uint withdrawAmount);

    constructor (
        address usdcAddress
    ) Ownable() {
        usdc = ERC20(usdcAddress);
    }

    function rewardCreator(uint valueToCreator, uint percentageToMetapixel, address creatorAddress) external {
        // safe transfer from msg.sender to creator with amount valueToCreator
        usdc.safeTransfer(creatorAddress, valueToCreator);
        emit RewardedCreator(creatorAddress, valueToCreator);
        // safe transfer from msg.snder to contractMatapixel with amount percentageToMetaPixel
        usdc.transferFrom(msg.sender, address(this), percentageToMetapixel);
        emit ContractRewarded (address(this), percentageToMetapixel);
    }

    // token to withdraw IERC20?
    function withdrawFundingMetapixel() external onlyOwner{
        // Transfer USDC tokens to the users wallet
        uint withdrawAmount = address(this).balance;
        usdc.transfer(msg.sender, withdrawAmount);
        emit FundingForMetapixelWithdrawed(msg.sender, withdrawAmount);
    }
}