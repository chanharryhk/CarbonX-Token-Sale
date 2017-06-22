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

  function test() returns(uint _number) {
    _number = 1234;
    return _number;
  }
  function releasedTokens(uint _currentPrice) returns(uint _saleTokens){
    _saleTokens = ((totalSupply / carriedInterest) * (_currentPrice - initialPrice) * (1 - VCContribution)) / _currentPrice;
    return _saleTokens;
  }
}
