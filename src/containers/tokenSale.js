import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {checkAddress, sendTokens} from '../actions/index';

//import any contracts
import CarriedInterestContract from '../../build/contracts/CarriedInterest.json';
import StandardTokenContract from '../../build/contracts/StandardToken.json';

import getWeb3 from '../utils/getWeb3'
//import Web3 from 'web3';

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
    }
    self.handleChange = self.handleChange.bind(self);//Why?
    self.balanceInstance = null;
  }
  componentWillMount(){
    const self = this;

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })

//     web3RPC.eth.getAccounts(function(error, accounts){
//       console.log(accounts);
//
//       carriedInterest.deployed()
//       .then(function(instance){
//         self.carriedInterestInstance = instance;
//         console.log('truffle', self.carriedInterestInstance);
//       })
//       .catch(console.log);
//
//       standardToken.deployed()
//       .then(function(instance){
//         self.standardTokenInstance = instance;
//         console.log('truffle', self.standardTokenInstance);
//       })
//       .catch(console.log);
//     })
  }

  //Get the RPC provider
// const provider = new Web3.providers.HttpProvider('http://localhost:8545');//Connect directly to INFURA


  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */
    const self = this;
    const contract = require('truffle-contract')
    const carriedInterest = contract(CarriedInterestContract);
    const standardToken = contract(StandardTokenContract);
    carriedInterest.setProvider(this.state.web3.currentProvider);
    standardToken.setProvider(this.state.web3.currentProvider);

    // simpleStorage.setProvider(this.state.web3.currentProvider);


    // Declaring this for later so we can chain functions on SimpleStorage.
    var carriedInterestInstance
    var standardTokenInstance

    // var simpleStorageInstance


    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      console.log(accounts);
      carriedInterest.deployed().then((instance) => {
        console.log(instance);
        carriedInterestInstance = instance
        //.call doesnt require gas
        // return carriedInterestInstance.test.call({from: accounts[0]})
        // return carriedInterestInstance.test({from: accounts[0]})
        return carriedInterestInstance.releasedTokens.call(100, {from: accounts[0]})
        // console.log(tokenAmount);
        // return tokenAmount;
      }).then((result) => {

        console.log(result);
        this.setState({releasedTokens: result});
        console.log(self.state.releasedTokens);
      })

      standardToken.deployed().then((instance) => {
      })

      // simpleStorage.deployed().then((instance) => {
      //   console.log("simpleStorage" + instance);
      //   simpleStorageInstance = instance
      //
      //   // Stores a given value, 5 by default.
      //   return simpleStorageInstance.set(5, {from: accounts[0]})
      // }).then((result) => {
      //   // Get the value from the contract to prove it worked.
      //   return simpleStorageInstance.get.call(accounts[0])
      // }).then((result) => {
      //   // Update state with the result.
      //   return this.setState({ storageValue: result.c[0] })
      // })
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

    if(this.state.web3.isAddress(this.props.userAddress.balanceAddress)){
      let test = this.props.userAddress.balanceAddress
      let balance = this.state.web3.eth.getBalance(test);
      balance = this.state.web3.fromWei(balance, 'ether');
      console.log("Balance: " + balance);
      this.setState({ accountBalance: balance.toString(10) });//setting the state of the Account Balance without the use of redux
    }else{
      console.log(self.balanceInstance);
    }
  }
  claimTokens(){
    console.log("STATE: ");
    //console.log(this.state.receivingAddress);
    console.log(this.state.price);
    console.log(this.state.receivingAddress);

    this.props.sendTokens(this.state.price, this.state.receivingAddress)
    console.log("PROPS: ");
    console.log(this.props.receiveTokens);
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
        Tokens Released:
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
