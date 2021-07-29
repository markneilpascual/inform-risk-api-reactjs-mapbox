import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import MapBox from "./MapBox";
import "./index.css";
import Menu from "./Menu";
import CountryData from "./components/CountryData";

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <Menu></Menu>
            <CountryData/>
            <MapBox></MapBox>
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);
