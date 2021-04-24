const EthSwap = artifacts.require("EthSwap");
const NRDToken = artifacts.require("NRDToken");

module.exports = async deployer => {
  // Deploys Exchange Swap Smart Contract
  await deployer.deploy(NRDToken);
  const nrdToken = await NRDToken.deployed();

  // Deploys Exchange Swap Smart Contract
  await deployer.deploy(EthSwap, nrdToken.address);
  const ethSwap = await EthSwap.deployed();

  // Transfer all tokens to Smart Contract
  await nrdToken.transfer(ethSwap.address, "1000000000000000000000000");
};
