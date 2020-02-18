import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import GameScreen from "./pages/GameScreen/GameScreen";
import SelectionScreen from "./pages/SelectionScreen/SelectionScreen";


export default props => (
    <Router>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/game" component={GameScreen} />
            <Route path="/selection" component={SelectionScreen} />
            <Route path="*" component={Home} />
        </Switch>
    </Router>
)
