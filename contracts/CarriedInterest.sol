pragma solidity ^0.4.2;

import "./StandardToken.sol";
//Constructor for a smart contract only runs once so you can use that as a security advantage because youre the only one in controls
//The constructor for this contract is the has the same name as Carried interest
contract CarriedInterest{
//if it IS (i.e. is StandardToken) something else then it has to be changed
  string public name = 'CarbonXToken';
  string public symbol = 'CRNX';
  uint8 public decimals = 18;
  uint256 public totalSupply = 7000000;//7 million CarbonX Tokens are generated

  //1 CarbonXToken = 1 Ether
  uint public constant initialPrice = 1;

  //Move up 2 decimal places to account for the decimal percentage
  uint constant minTokens = 500000;
  uint constant maxTokens = 3000000;
  uint constant carriedInterest = 20; //5%
  uint constant VCContribution = 0;

  /*uint tokensAvailable = totalSupply * carriedInterest * (initialPrice - initialPrice) * (1 - VCContribution) / initialPrice;*/
  address public owner;
  mapping(address => uint256) balances; //hashtable how does getting the address get the balance as well???

  function CarriedInterest() {
    owner = msg.sender;
    balances[owner] = 7000000;
  }

  function transfer(address _to, uint256 _value) returns (bool success) {
    if (balances[msg.sender] >= _value && _value > 0) {
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        Transfer(msg.sender, _to, _value);
        return true;
    } else {
      return false;
    }
  }

  function balanceOf(address _owner) constant returns (uint256 _balance){
    return balances[_owner];
  }

  function getTotalSupply() returns(uint _allTokens) {
    _allTokens = totalSupply;
  }

  /*function releasedTokens(uint _currentPrice) returns(uint _saleTokens){
    _saleTokens = ((totalSupply / carriedInterest) * (_currentPrice - initialPrice) * (1 - VCContribution)) / _currentPrice;
    return _saleTokens;
  }*/
  event Transfer(address indexed _from, address indexed _to, uint256 _value);
}
