import React from "react";
import { Link } from "react-router-dom"
const soylentpic = require('./soylentggproccro.jpg')

function SoylentGreen() {
  return (
    <div>
      <h1>SoylentGreen</h1>
      <img src={soylentpic} alt="soylent-pic"></img>
      <br />
      <Link to="/">
            is people
        </Link>
    </div>
  );
}

export default SoylentGreen;
