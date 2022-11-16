// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {AccessControlEnumerable} from "@openzeppelin/contracts/access/AccessControlEnumerable.sol";

contract RewardCreator is AccessControlEnumerable {
    bytes32 public constant PIXEED_TEAM = keccak256("PIXEED_TEAM");

    using SafeERC20 for ERC20;

    ERC20 public immutable usdc;

    mapping (address => uint) public claimExpiryTimestampPerAddress;

    event RewardedCreator (address creatorAddress, uint amountToCreator);
    event ContractRewarded (address pixeedContractAddress, uint amountToPixeed);

    event FundingForPixeedWithdrawed(uint roleMemberCount, uint withdrawAmount);

    constructor (
        address usdcAddress
    ) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PIXEED_TEAM, msg.sender);
        usdc = ERC20(usdcAddress);
    }

    // modifier expiryTimestamp(address _pixeedWithdrawer) {
    //     require(claimExpiryTimestampPerAddress[_pixeedWithdrawer] > block.timestamp, 
    //     "Expiry date not over"
    //     );       
    //     _;
    // }

    function rewardCreator(uint valueToCreator, uint valueToPixeed, address creatorAddress) external {
        // safe transfer from msg.sender to creator with amount valueToCreator
        usdc.safeTransfer(creatorAddress, valueToCreator);
        emit RewardedCreator(creatorAddress, valueToCreator);
        // safe transfer from msg.snder to contractMatapixel with amount percentageToPixeed
        usdc.transferFrom(msg.sender, address(this), valueToPixeed);
        emit ContractRewarded (address(this), valueToPixeed);
    }

    // token to withdraw IERC20?
    function withdrawFundingPixeed() external {
        require(hasRole(PIXEED_TEAM, msg.sender));
        // calculate withdraw amount based on the number of pixeed members
         // Transfer USDC tokens to the users wallet
        uint roleMemberCount = getRoleMemberCount(PIXEED_TEAM);
        //setClaimTimerForWalletAddress(msg.sender);
        uint withdrawAmount = address(this).balance / roleMemberCount;
        // send amount to all addresses of PIXEED_TEAM
        for (uint i = 0; i < roleMemberCount; i++) {
             usdc.transfer(getRoleMember(PIXEED_TEAM, i), withdrawAmount);
        }
        // transfer amount to all team members
        emit FundingForPixeedWithdrawed(getRoleMemberCount(PIXEED_TEAM), withdrawAmount);
    }
    // number of team member has to be set

    // set limit during a month to claim for each address
    // function setClaimTimerForWalletAddress(address pixeedWithdrawer) internal expiryTimestamp(pixeedWithdrawer) {
    //     claimExpiryTimestampPerAddress[pixeedWithdrawer] = block.timestamp + 30 days;
    // } 


    // function to show balance in this contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}