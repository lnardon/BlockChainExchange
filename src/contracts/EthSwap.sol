// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

import './NRDToken.sol';

contract EthSwap {
    string public name = "NRD BlockChain Exchange";
    NRDToken public token;
    uint public rate = 100;

    constructor(NRDToken _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        uint tokenAmount = msg.value * rate;
        token.transfer(msg.sender, tokenAmount);
    }
}