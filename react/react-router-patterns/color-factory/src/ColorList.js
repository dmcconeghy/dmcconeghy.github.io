import React from "react";
import { Link } from "react-router-dom"

function ColorList({colors}) {
    const colorLinks = Object.keys(colors).map(colorName => (
        <li key={colorName}>
            <Link to={`/colors/${colorName}`}>{colorName}</Link>
        </li>
    ))

    return (
        <div className="ColorList">
            <h1> My Color Factory</h1>
            <h3>
                <Link to="/colors/new">Add a color</Link>
            </h3>
            <div>
                <p> Select a color. </p>
                <ul>{colorLinks}</ul>
            </div>
        </div>
    )
}

export default ColorList