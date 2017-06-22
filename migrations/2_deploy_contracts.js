var SimpleStorage = artifacts.require("../contracts/SimpleStorage.sol");
var CarriedInterest = artifacts.require("../contracts/CarriedInterest.sol");
var StandardToken = artifacts.require("../contracts/StandardToken.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(CarriedInterest);
  deployer.deploy(StandardToken);
};
