// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// ERC20 MOck for unit testing

contract ERC20Mock is ERC20 {
    
    constructor() ERC20("ERC20Mock", "M")
    {}

    function mint(address _owner, uint256 _amount) public {
        _mint(_owner, _amount);
    }
}