// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AccessControlEnumerable} from "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract RewardCreator is AccessControlEnumerable {
    // contant for AccessControl of PIXEED_TEAM members
    bytes32 public constant PIXEED_TEAM = keccak256("PIXEED_TEAM");
    
    IERC20 public immutable ierc20;

    event RewardedCreator (address creatorAddress, uint256 amountToCreator);
    event ContractRewarded (address pixeedContractAddress, uint256 amountToPixeed);

    event FundingForPixeedWithdrawed(uint roleMemberCount, uint withdrawAmount);

    constructor (
        address erc20Address
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PIXEED_TEAM, msg.sender);
        ierc20 = IERC20(erc20Address);
    }


    function rewardCreator(uint256 valueToCreator, uint256 valueToPixeed, address creatorAddress) external  {
        // require enough amount to send 
        require(msg.sender.balance >= valueToCreator + valueToPixeed );
        // safe transfer from msg.sender to creator with amount valueToCreator
        ierc20.transferFrom(msg.sender, creatorAddress, valueToCreator);
        emit RewardedCreator(creatorAddress, valueToCreator);
        // safe transfer from msg.sender to contractMatapixel with amount percentageToPixeed
        ierc20.transferFrom(msg.sender, address(this), valueToPixeed);
        emit ContractRewarded (address(this), valueToPixeed);
    }

    // token to withdraw IERC20?
    function withdrawFundingPixeed() external {
        require(hasRole(PIXEED_TEAM, msg.sender));
        // calculate withdraw amount based on the number of pixeed members
        uint roleMemberCount = getRoleMemberCount(PIXEED_TEAM);
        uint withdrawAmount = getBalance() / roleMemberCount;
        // send amount to all addresses of PIXEED_TEAM
        for (uint i = 0; i < roleMemberCount; i++) {
             ierc20.transfer(getRoleMember(PIXEED_TEAM, i), withdrawAmount);
        }
        // Emit Event that funnding to PIXEED_TEAM is performed
        emit FundingForPixeedWithdrawed(getRoleMemberCount(PIXEED_TEAM), withdrawAmount);
    }


    // function to show balance in this contract
    function getBalance() public view returns (uint256) {
        return ierc20.balanceOf(address(this));
    }
}