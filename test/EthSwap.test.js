const { assert } = require("chai");

const EthSwap = artifacts.require("EthSwap");
const NRDToken = artifacts.require("NRDToken");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("EthSwap", accounts => {
  let nrdToken, ethSwap;

  before(async () => {
    ethSwap = await EthSwap.new();
    nrdToken = await NRDToken.new();
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
});
