import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home/Home";

export default props => (
    <Router>
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="*" component={Home} />
        </Switch>
    </Router>
)