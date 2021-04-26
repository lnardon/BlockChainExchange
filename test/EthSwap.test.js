const { assert } = require("chai");
const EthSwap = artifacts.require("EthSwap");
const NRDToken = artifacts.require("NRDToken");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("EthSwap", ([deployer, investor]) => {
  let nrdToken, ethSwap;

  before(async () => {
    nrdToken = await NRDToken.new();
    ethSwap = await EthSwap.new(nrdToken.address);
    await nrdToken.transfer(ethSwap.address, "1000000000000000000000000");
  });

  describe("NRDToken Deployment", async () => {
    it("should display the contract name", async () => {
      const name = await nrdToken.name();
      assert.equal(name, "NRD Token");
    });
  });

  describe("EthSwap Deployment", async () => {
    it("should display the contract name", async () => {
      const name = await ethSwap.name();
      assert.equal(name, "NRD BlockChain Exchange");
    });

    it("should display the contract's total token amount", async () => {
      const balance = await nrdToken.balanceOf(ethSwap.address);
      assert.equal(balance.toString(), "1000000000000000000000000");
    });
  });

  describe("buyTokens()", async () => {
    it("should allow the user to purchase tokens and receive tokens", async () => {
      await ethSwap.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether")
      });

      // Check investor balance
      let investorBalance = await nrdToken.balanceOf(investor);
      assert.equal(investorBalance.toString(), "100000000000000000000");

      // Check EthSwap NRDToken balance
      let ethSwapBalance = await nrdToken.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), "999900000000000000000000");
      // Check EthSwap Ethereum balance
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei("1", "ether"));
    });
  });

  describe("sellTokens()", async () => {
    before(async () => {
      await nrdToken.approve(ethSwap.address, "100000000000000000000", {
        from: investor
      });
      await ethSwap.sellTokens("100000000000000000000", {
        from: investor
      });
    });

    it("should allow the user to sell tokens to the exchange", async () => {
      // Check investor balance after tokens sold
      let investorBalance = await nrdToken.balanceOf(investor);
      assert.equal(investorBalance.toString(), "0");

      // Check EthSwap NRDToken balance after tokens purchase
      let ethSwapBalance = await nrdToken.balanceOf(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), "1000000000000000000000000");

      // Check EthSwap Ethereum balance after tokens purchase
      ethSwapBalance = await web3.eth.getBalance(ethSwap.address);
      assert.equal(ethSwapBalance.toString(), web3.utils.toWei("0", "ether"));
    });
  });
});
