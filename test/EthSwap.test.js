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
      let result = await ethSwap.buyTokens({
        from: investor,
        value: web3.utils.toWei("1", "ether")
      });
      let balance = await nrdToken.balanceOf(investor);
      assert.equal(balance.toString(), "100000000000000000000");
    });
  });
});
