import React from "react";
import { Link } from "react-router-dom"
const slurmpic = require('./400px-Slurm.png')


const Slurm = () => {
  return (
    <div>
        <img src={slurmpic} alt="slurm-pic"></img>
        <br />
        <Link to="/">
            Highly Addictive
        </Link>
    </div>
  );
}

export default Slurm;
