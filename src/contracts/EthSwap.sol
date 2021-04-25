// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./NRDToken.sol";

contract EthSwap {
    string public name = "NRD BlockChain Exchange";
    NRDToken public token;
    uint public rate = 100;

    event TokenPurchase(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(NRDToken _token) public {
        token = _token;
    }

    function buyTokens() public payable {
        uint tokenAmount = msg.value * rate;
        token.transfer(msg.sender, tokenAmount);

        // Emit token purchase event
        emit TokenPurchase(msg.sender, address(token), tokenAmount, rate);
    }
}