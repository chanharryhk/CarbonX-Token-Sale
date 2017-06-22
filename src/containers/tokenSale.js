import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {checkAddress, sendTokens} from '../actions/index';

//import any contracts
import CarriedInterestContract from '../../build/contracts/CarriedInterest.json';
import StandardTokenContract from '../../build/contracts/StandardToken.json';

import Web3 from 'web3'
const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const contract = require('truffle-contract')
const carriedInterest = contract(CarriedInterestContract);
const standardToken = contract(StandardTokenContract);
carriedInterest.setProvider(provider);
standardToken.setProvider(provider);
//import Web3 from 'web3';

// Get Web3 so we can get our accounts.
const web3RPC = new Web3(provider)
var carriedInterestInstance
var standardTokenInstance

const backgroundStyle = {
  zIndex: 4,
  position: "relative",
  backgroundColor: "#004033",
  width: '100%',
  height: '800px',
  padding: "100px",
  color: "#ffffff",
  fontFamily: "Helvetica Neue, Arial ,sansSerif",
}

const tableTitleStyle = {
  width: "100%",
  textAlign: "center",
  fontSize: "20px",
//  height: "100%"
}

const tableContentStyle = {
  textAlign: "center",
  fontSize: "40px",
  fontWeight: 500,
}

const inputStyle = {
  borderRadius: "3px",
  width: "40%",
  height: "35px",
  border: "none",
  padding: "12px 15px",
  color: "#000000",
//margin seperates
}

const buttonStyle = {
  borderRadius: "3px",
  width: "10%",
  height: "35px",
  border: "none",
  color: "primary",
}

class tokenSale extends Component {
  constructor(props) {
    super(props)
    const self = this;
    self.state = {
      value:'',
      web3: null,
    };
    self.handleChange = self.handleChange.bind(self);//Why?
    self.carriedInterest = null;
    self.standardTokenInstance = null;
  }
  componentWillMount(){
    const self = this;

    web3RPC.eth.getAccounts(function(error, accounts) {
      console.log(accounts);
      self.setState({ accounts });



      carriedInterest.deployed()
      .then((instance) => {
        console.log(instance);
        self.carriedInterestInstance = instance;
        return self.carriedInterestInstance.releasedTokens.call(100, {from: accounts[0]})
      }).then((result) => {
        console.log(result);
      })

      standardToken.deployed().then((instance) => {
      })
    })
  }

  handleChange(event){
    this.setState({[event.target.id]: event.target.value});
    console.log(event.target.id);
    console.log(event.target.value);
  }
  updateValue(){
    //const { dispatch } = this.props
    //console.log(dispatch);
    // store.dispatch({ type: "TOGGLE_CHECK", value: this.state.ownerAddress })
    this.props.checkAddress(this.state.ownerAddress)
    console.log("Props: ");
    console.log(this.props.userAddress);

    if(web3RPC.isAddress(this.props.userAddress.balanceAddress)){
      let test = this.props.userAddress.balanceAddress
      let balance = web3RPC.eth.getBalance(test);
      balance = web3RPC.fromWei(balance, 'ether');
      console.log("Balance: " + balance);
      this.setState({ accountBalance: balance.toString(10) });//setting the state of the Account Balance without the use of redux
    }else{
      console.log(self.balanceInstance);
    }
  }
  claimTokens(){
    const self = this;
    console.log("STATE: ");
    //console.log(this.state.receivingAddress);
    console.log(this.state.price);
    console.log(this.state.receivingAddress);

    this.props.sendTokens(this.state.price, this.state.receivingAddress)
    console.log("PROPS: ");
    console.log(this.props.receiveTokens);
    let price = parseInt(this.props.receiveTokens.price)
    console.log(price);
    self.carriedInterestInstance.releasedTokens.call(price, {from: self.state.accounts[0]})
    .then((tokenVolume) => {
      console.log(tokenVolume.c[0]);
      this.setState({ tokenVolume: tokenVolume.c[0]});
    })
  }
  render(){
    let { receiveTokens: {price} } = this.props
    let { receiveTokens: {receivingAddress} } = this.props
    // is the same as ...
    // let address = this.props.userAddress.address
    let { userAddress: {balanceAddress} } = this.props


    // console.log("User Input Address", address)
    return(
      <div style={backgroundStyle}>
        <table style={tableTitleStyle}>
          <tbody>
            <tr>
              <th  style={tableContentStyle}> Locked Tokens</th>
            </tr>
            <tr>
              <td>10000 <b>CBX</b></td>
            </tr>
          </tbody>
        </table>
        <br/>
        <div>
          <h3>Price</h3>
          <input style={inputStyle} type="number" id="price" onChange={this.handleChange} placeholder="$"/>
          <h3>Receiving Address</h3>
          <input style={inputStyle} type="text" id="receivingAddress" onChange={this.handleChange} placeholder="0x Your Address"/>
          <br/><br/>
          <button onClick={this.claimTokens.bind(this)}style={buttonStyle} value="submit">Send!</button>
        </div>
        <br/>
        Price: {price}
        <br/>
        User Address: {receivingAddress}
        <br/>
        Tokens Released: {this.state.tokenVolume}
        <hr/>
        <div>
          <h3>Token Balance Check</h3>
          <input style={inputStyle} type="text" id="ownerAddress" onChange={this.handleChange} placeholder="0x Your Address"/>
          <br/><br/>
          <button onClick={this.updateValue.bind(this)} style={buttonStyle} value="submit">Check!</button>
        </div>
        <br/>
        User Address: {balanceAddress}
        <br/>
        Balance: {this.state.accountBalance} (needs the <i><b>promise</b></i> or else it will not display Balance on its first click)
      </div>

    );
  }
}
function mapStateToProps(state){
  return{
    userAddress: state.addressCheck,
    receiveTokens: state.sendTokens
  }
}
function matchDispatchToProps(dispatch){
  return bindActionCreators({checkAddress: checkAddress, sendTokens: sendTokens}, dispatch)
}
export default connect(mapStateToProps, matchDispatchToProps)(tokenSale);;
