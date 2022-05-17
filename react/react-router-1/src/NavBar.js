import React from "react";

import { Link } from "react-router-dom"



function NavBar() {
  return (
      
    <nav>
        <Link to="/"className="VendingMachine">
            Home
        </Link>
        <Link to="/soylentgreen" className="VendingMachine">
            Soylent Green
        </Link>
        <Link to="/slurm" className="VendingMachine">
            Slurm
        </Link>
        <Link to="/pangalactic" className="VendingMachine">
            Pan-Galactic GargleBlaster
        </Link>
    </nav>
 
    
  );
}

export default NavBar;
