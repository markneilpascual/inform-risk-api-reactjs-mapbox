const countryReducer = (state = {}, { type, payload }) => {
    switch (type) {
      case "SET_COUNTRY":
        return payload;
        break;
      default:
        return state;
        break;
    }
  };
  
  export default countryReducer;
  