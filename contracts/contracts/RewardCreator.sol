// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract RewardCreator is AccessControl {
    bytes32 public constant PIXEED_TEAM = keccak256("PIXEED_TEAM");

    using SafeERC20 for ERC20;

    ERC20 public immutable usdc;

    event RewardedCreator (address creatorAddress, uint amountToCreator);
    event ContractRewarded (address pixeedContractAddress, uint amountToPixeed);

    event FundingForPixeedWithdrawed(address withdrawAddress, uint withdrawAmount);

    constructor (
        address usdcAddress
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PIXEED_TEAM, msg.sender);
        usdc = ERC20(usdcAddress);
    }

    function rewardCreator(uint valueToCreator, uint percentageToPixeed, address creatorAddress) external {
        // safe transfer from msg.sender to creator with amount valueToCreator
        usdc.safeTransfer(creatorAddress, valueToCreator);
        emit RewardedCreator(creatorAddress, valueToCreator);
        // safe transfer from msg.snder to contractMatapixel with amount percentageToPixeed
        usdc.transferFrom(msg.sender, address(this), percentageToPixeed);
        emit ContractRewarded (address(this), percentageToPixeed);
    }

    // token to withdraw IERC20?
    function withdrawFundingPixeed() external {
        require(hasRole(PIXEED_TEAM, msg.sender));
        // Transfer USDC tokens to the users wallet
        uint withdrawAmount = address(this).balance;
        usdc.transfer(msg.sender, withdrawAmount);
        emit FundingForPixeedWithdrawed(msg.sender, withdrawAmount);
    }

    // function to show balance in this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}