import React from "react";
import { Link } from "react-router-dom"
const panG = require('./flat,750x,075,f-pad,750x1000,f8f8f8.u2.jpg')

function PanGalactic() {
  return (
    <div className="PanGalactic">
        <h1> Pan-Galactic Gargleblaster </h1>
        <img src={panG} alt="panG"></img>
        <br />
        <Link to="/">Like having your brains smashed out by a slice of lemon wrapped round a large gold brick</Link>
    </div>
  );
}

export default PanGalactic;
