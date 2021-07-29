import React, { useState } from "react";
import { useEffect } from "react";

import ReactMapboxGl, { Layer, Source } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";

import mapboxgl from "mapbox-gl";
import { getBounds } from "./functions";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const Map = new ReactMapboxGl({
    accessToken: MAPBOX_TOKEN,
});

function MapBox() {
    const [selectedCountry, setSelectedCountry] = useState({});
    const [viewport, setViewport] = useState({
        style: "mapbox://styles/mapbox/dark-v10",
        containerStyle: {
            height: "100vh",
            width: "100vw",
        },
        zoom: [1],
        fitBoundsOptions: {
            offset: [0, 0],
        },
    });
    const country = useSelector((state) => state.country);

    useEffect(() => {
        if (selectedCountry !== country) {
            setSelectedCountry(country);
            setViewport({
                ...viewport,
                fitBounds: country.geometry
                    ? getBounds(country.geometry.coordinates)
                    : null,
            });
        }
    }, [country]);

    return (
        <div>
            <Map {...viewport}>
                <Source
                    id="geojson-layer"
                    type="geojson"
                    geoJsonSource={{ type: "geojson", data: country }}
                />
                <Layer
                    id="geojson-lines"
                    type="line"
                    paint={{
                        "line-color": "#fff",
                        "line-width": 3,
                    }}
                    sourceId="geojson-layer"
                />
            </Map>
        </div>
    );
}

export default MapBox;
