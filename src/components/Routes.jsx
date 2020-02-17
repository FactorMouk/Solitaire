import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./home/Home";
import SelectionScreen from "../pages/SelectionScreen/SelectionScreen";

export default props => (
    <Router>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/selection" component={SelectionScreen} />
        </Switch>
    </Router>
)
