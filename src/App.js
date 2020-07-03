import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Single from "./pages/Single";
import Room from "./pages/Room";
import ErrorComp from "./pages/ErrorComp";
import NavbarComp from "./Components/NavbarComp";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <NavbarComp />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/rooms/" component={Room} />
          <Route exact path="/rooms/:slug" component={Single} />
          <Route component={ErrorComp} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
