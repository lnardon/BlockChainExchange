// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;

import "./NRDToken.sol";

contract EthSwap {
    string public name = "NRD BlockChain Exchange";
    NRDToken public token;
    uint public rate = 100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

    event TokensSold(
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

        // Make sure the contract has the amount of tokens to sell.
        require(token.balanceOf(address(this)) >= tokenAmount);

        token.transfer(msg.sender, tokenAmount);

        // Emit tokens purchased event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public {
        // Make sure that the user can't sell more tokens than he has.
        require(token.balanceOf(msg.sender) >= _amount);

        // Make sure the contract has the amount ether to buy the tokens.
        require(address(this).balance >= _amount / rate);

        token.transferFrom(msg.sender, address(this), _amount);
        msg.sender.transfer(_amount / rate);

        // Emit tokens sold event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }
}