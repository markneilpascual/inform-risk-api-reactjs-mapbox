import { combineReducers } from "redux";
import countriesReducer from "./countriesReducer";
import countryDataReducer from "./countryDataReducer";
import countryReducer from "./countryReducer";
import informListReducer from "./informListReducer";

const reducers = combineReducers({
    country: countryReducer,
    countries: countriesReducer,
    informList: informListReducer,
    countryData: countryDataReducer
});

export default reducers;
