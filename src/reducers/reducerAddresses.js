//Piece of data that is stored in the 'STORE' object-
{/*
import Web3 from 'web3';

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')
const web3RPC = new Web3(provider)

web3RPC.eth.getAccounts(function(error, accounts) {
  console.log(accounts);
}
*/}
export default function(){
  return [
    {
      id: 1,
      firstName: "Harry",
      rank: "Last",
    },
    {
      id: 2,
      firstName: "Henry",
      rank: "first",
    },
    {
      id: 3,
      firstName: "Michelle",
      rank: "middle",
    }
  ]
}
