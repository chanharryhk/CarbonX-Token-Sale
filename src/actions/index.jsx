export const selectAddress = (address) => {
  console.log("You clicked on " + address.rank);
  return {type: "ADDRESS_SELECTED", payload: address}
  //returns an object called an action
};
//function that is an action creator
export const checkAddress = (address) => {
  console.log("Action: " + address);
  return {type: "TOGGLE_CHECK", payload: address}
};

export const sendTokens = (price, address) => {
  console.log("Receving Price Action: " + price + ", "+ address);
  return {
    type: "TOGGLE_SEND_TOKENS",
    payload: {price: price, address: address}
  }
}
