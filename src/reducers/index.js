import {combineReducers} from 'redux'
import AddressReducer from './reducerAddresses';
import ActiveAddress from './activeAddress';
import AddressCheck from './checkAddress';
import SendTokens from './sendTokens';

const allReducers = combineReducers({
  addresses: AddressReducer, //addresses object is equal to all the data that is stored in the reducerAddresses
  activeAddress: ActiveAddress,
  addressCheck: AddressCheck,
  sendTokens: SendTokens,
});

export default allReducers;
