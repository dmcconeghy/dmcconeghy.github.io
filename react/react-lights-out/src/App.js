import React from "react";
import Board from "./Board";
import "./App.css";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <h1>Lights Out</h1>
      <h6>Put out all the lights to win!</h6>
      <Board />
    </div>
  );
}

export default App;
