import { CardContent,IconButton, Card, Fab, makeStyles} from "@material-ui/core";
import { ChevronRight, Info } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataChart from "./DataChart";

const useStyles = makeStyles((theme) => {
    return {
        root: {
            position: "absolute",
            top: 20,
            right: 65,
            borderRadius: 10,
            zIndex: 1,
            maxHeight:700,
            [theme.breakpoints.up("md")]: {
                width: 700,
            },
            [theme.breakpoints.down("md")]: {
                width: "98vw",
                top: 5,
                right: 5,
            },
        },
    };
});

function CountryData() {
    const classes = useStyles();
    const [showCountryData, setShowCountryData] = useState(false);
    const countryData = useSelector((state) => state.countryData);
    const country = useSelector((state) => state.country);

    const countryDataBtn =
        country && countryData.length ? (
            <Fab
                style={{
                    position: "fixed",
                    top: 20,
                    right: 20,
                    transition: "300ms",
                    zIndex: 1,
                }}
                onClick={() => {
                    toggleCountryData();
                }}
                variant="extended"
                size="small"
            >
                <Info />
            </Fab>
        ) : (
            ""
        );

    const toggleCountryData = () => {
        setShowCountryData(!showCountryData);
    };

    useEffect(() => {
        if (countryData.length) {
            setShowCountryData(true);
        }

    }, [country, countryData]);

    return (
        <>
            {countryDataBtn}
            <Card
                classes={classes}
                style={{ display: showCountryData ? "block" : "none" }}
            >
                <IconButton onClick={toggleCountryData}>
                    <ChevronRight />
                </IconButton>
                <CardContent
                    style={{
                        height: "90vh",
                        overflowY: "scroll",
                        overflowX: "hidden",
                        position: "relative",
                    }}
                >
                    <DataChart />
                </CardContent>
            </Card>
        </>
    );
}

export default CountryData;
