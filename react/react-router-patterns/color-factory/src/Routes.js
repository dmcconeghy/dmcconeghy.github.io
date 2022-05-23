import React, {useEffect, useState} from "react";
import {Switch, Route, Redirect, BrowserRouter} from "react-router-dom"

import ColorList from "./ColorList"
import NewColorForm from "./NewColorForm"
import Color from "./Color"

function Routes() {

    const startColors = JSON.parse(localStorage.getItem("colors"))  || {
        red: "#FF0000",
        green: "#00FF00",
        blue: "#0000FF"
    }

    const [colors, updateColors] = useState(startColors);

    useEffect(
        () => localStorage.setItem("colors", JSON.stringify(colors)),
        [colors]
    );

    function handleColor(newColorObj) {
        updateColors(prevColors => ({...prevColors, ...newColorObj}))
    }

    function showCurrentColor(props){
        const { color } = props.match.params;
        const hex = colors[color];
        return <Color {...props} hex={hex} color={color} />
    }

    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/colors">
                <ColorList colors={colors} />
            </Route>
            <Route exact path="/colors/new">
                <NewColorForm addColor={handleColor} />
            </Route>
            <Route path="/colors/:color" render={showCurrentColor} />
            <Redirect to="/colors" />
        </Switch>
        </BrowserRouter>
    )
}

export default Routes