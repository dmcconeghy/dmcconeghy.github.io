
import React from 'react'

import { BrowserRouter, Route, Switch } from "react-router-dom"

import SoylentGreen from "./SoylentGreen"
import Slurm from "./Slurm"
import PanGalactic from "./PanGalactic"
import VendingMachine from "./VendingMachine"
import NavBar from "./NavBar"
import "./app.css"

function App() {
  return (
    <div>
    
      <BrowserRouter>
      <NavBar />
        <Switch>
          <Route path="/" component={VendingMachine} exact />
          <Route path="/soylentgreen" component={SoylentGreen} exact />
          <Route path="/slurm" component={Slurm} exact />
          <Route path="/pangalactic" component={PanGalactic} exact />
           
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
