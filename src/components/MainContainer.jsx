import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Home from './Home';
import About from './About';
import Support from './Support';
import Feedback from './Feedback';

import '../stylesheets/MainContainer/xs.css'
import '../stylesheets/MainContainer/small.css'
import '../stylesheets/MainContainer/med.css'
import '../stylesheets/MainContainer/large.css'
import '../stylesheets/MainContainer/xl.css'

export default class MainContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="MainContainer">
                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/support">
                        <Support />
                    </Route>
                    <Route path="/feedback">
                        <Feedback />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        )
    }
}