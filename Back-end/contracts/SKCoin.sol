import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// SPDX-License-Identifier:MIT
pragma solidity ^0.8.9;
contract SKCoin_stable_coin is ERC20 {
    //拥有者
    address owner;
    constructor() ERC20("SKCoin_stable_coin", "M57") {
        owner=msg.sender;
        _mint(msg.sender, 100000);
    }
}

contract SKCoin_Unstable_Asset is ERC20 {
    //拥有者
    address owner;
    constructor() ERC20("SKCoin_Unstable_Asset", "M57") {
        owner=msg.sender;
        _mint(msg.sender, 100000);
    }
}