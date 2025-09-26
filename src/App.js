import React from "react";
import TerminalWindow from "./components/TerminalWindow";
import MatrixBackground from "./components/MatrixBackground";
import "./App.css";

function App() {
  return (
    <>
      <MatrixBackground />
      <TerminalWindow />
    </>
  );
}

export default App;
