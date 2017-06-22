export default function (state={}, action){
  switch (action.type) {
    case "ADDRESS_SELECTED":
    console.log(action.payload);
      return action.payload;
      break;
    default:
      break;
  }
  return state;
}
