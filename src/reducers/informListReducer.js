const informListReducer = (state = [], { type, payload }) => {
    switch (type) {
      case "SET_INFORM_LIST":
        return payload;
        break;
      default:
        return state;
        break;
    }
  };
  
  export default informListReducer;
  