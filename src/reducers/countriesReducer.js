const countriesReducer = (state = [], { type, payload }) => {
    switch (type) {
      case "FETCH_COUNTRIES":
        return state;
        break;
      case "SET_COUNTRIES":
        return payload;
        break;
      case "LOAD_COUNTRIES":
        return state;
        break;
  
      default:
        return state;
        break;
    }
  };
  
  export default countriesReducer;
  