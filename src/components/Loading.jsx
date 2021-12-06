import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import spinner from "../media/loading-spinner.gif";

import Typography from '@material-ui/core/Typography';

import '../stylesheets/Loading/xs.css'
import '../stylesheets/Loading/small.css'
import '../stylesheets/Loading/med.css'
import '../stylesheets/Loading/large.css'
import '../stylesheets/Loading/xl.css'

export default class Loading extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="Loading">
                <div className="animation-container">
                    <div>Your data visualizations are loading, I promise.</div>
                    <img alt="Your map is loading." src={spinner} />
                </div>
            </div>
        )
    }
}