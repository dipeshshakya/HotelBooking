import React from "react";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Error from "./pages/Error";
import Room from "./pages/Room";
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="App">
      <>
        <Home />
        <Single />
        <Error />
        <Room />
      </>
    </div>
  );
}

export default App;
