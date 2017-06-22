import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {selectAddress} from '../actions/index'

class addressList extends Component {
  createAddressList(){
    //console.log(this.props.addresses);
    return this.props.addresses.map((address) =>{
      return(
        <li key={address.id}
          onClick={()=> this.props.selectAddress(address)}
          >{address.firstName}</li>
      );
    });
  }
  render(){
    return(
      <ul>
        {this.createAddressList()}
      </ul>
    );
  }
}

function mapStateToProps(state){
  return{
    addresses: state.addresses
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({selectAddress: selectAddress}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(addressList);
