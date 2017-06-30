var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "guide account decorate ghost royal walk morning coyote once whale basket odor";
var provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/8PN5WjIQeobwk2IYDdVp");

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/8PN5WjIQeobwk2IYDdVp"),
      network_id: "3",
      gas: 4500000,
      gasPrice: 25000000000,
    }
  }
};
