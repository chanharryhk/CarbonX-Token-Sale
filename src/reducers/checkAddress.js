export default function (state={}, action){
  switch (action.type) {
    case "TOGGLE_CHECK":
    console.log("Reducer: " + action.payload);
      return { balanceAddress: action.payload}
      break;
    default:
      break;
  }
  return state;
}
