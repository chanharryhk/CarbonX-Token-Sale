export default function (state={}, action){
  switch (action.type) {
    case "TOGGLE_SEND_TOKENS":
    console.log("Reducer: " + action.payload.price + ", " + action.payload.address);
      return {
        price: action.payload.price,
        receivingAddress: action.payload.address
      }
      break;
    default:
      break;
  }
  return state;
}
