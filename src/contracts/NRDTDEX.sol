// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "./NRDToken.sol";

contract NRDTDEX {
    string public name = "NRDT Decentralized Exchange";
    NRDToken public token;
    uint public rate = 10000000000000000; // 0.01 Ether - 1 NRDT 

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

    constructor(NRDToken _token) payable {
        token = _token;
    }

    function buyTokens(uint _amount) public payable {
        uint tokenAmount = _amount;

        // Make sure the contract has the amount of tokens to sell.
        require(token.balanceOf(address(this)) >= tokenAmount, "Sorry, not enough tokens to sell.");
        
        // Make sure the user sent enough eth to buy the tokens
        require((tokenAmount * rate) <= msg.value, "Not enough ether to buy tokens.");

        token.transfer(msg.sender, tokenAmount);

        // Emit tokens purchased event
        emit TokensPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public payable {
        // Make sure that the user can't sell more tokens than he has.
        require(token.balanceOf(msg.sender) >= _amount, "Not enough tokens to sell.");

        // Make sure the contract has the amount ether to buy the tokens.
        require(address(this).balance >= _amount * rate, "The contract curretly has not enough ether to buy back the tokens.");

        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(_amount * rate);

        // Emit tokens sold event
        emit TokensSold(msg.sender, address(token), _amount, rate);
    }


    function getBalance() public view returns (uint256 balance) {
        return address(this).balance;
    }
}