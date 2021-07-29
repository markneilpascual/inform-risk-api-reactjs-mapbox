const countryDataReducer = (state = [], { type, payload }) => {
    switch (type) {
      case "SET_COUNTRY_DATA":
        return payload;
        break;
      default:
        return state;
        break;
    }
  };
  
  export default countryDataReducer;
  