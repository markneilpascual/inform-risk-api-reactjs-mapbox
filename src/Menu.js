import { Card, CardContent, Fab, makeStyles, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import CountrySelection from "./components/CountrySelection";
import { ChevronLeft, Menu as MenuIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => {
    return {
        root: {
            position: "absolute",
            top: 20,
            left: 20,
            borderRadius: 10,
            zIndex: 1,
            [theme.breakpoints.up("md")]: {
                width: 500,
            },
            [theme.breakpoints.down("md")]: {
                width: "98vw",
                top: 5,
                left: 5,
            },
        },
        countryText: {
            [theme.breakpoints.up("md")]: {
                display: "none",
            },
            [theme.breakpoints.down("md")]: {
                display: "block",
            },
        },
    };
});

function Menu() {
    const classes = useStyles();
    const [showMenu, setShowMenu] = useState(true);

    const toggleMenu = (e) => {
        setShowMenu(!showMenu);
    };

    return (
        <div>
            <Fab
                style={{ zIndex: 1, position: "absolute", top: 20, left: 20 }}
                onClick={toggleMenu}
                size="small"
            >
                <MenuIcon></MenuIcon>
            </Fab>
            <Card
                classes={classes}
                style={{ display: showMenu ? "block" : "none" }}
            >
                <IconButton onClick={toggleMenu}>
                    <ChevronLeft />
                </IconButton>
                <CardContent>
                    <CountrySelection />
                </CardContent>
            </Card>
        </div>
    );
}

export default Menu;
