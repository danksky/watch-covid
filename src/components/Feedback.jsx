
import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Typography from '@material-ui/core/Typography';

import '../stylesheets/Feedback/xs.css';
import '../stylesheets/Feedback/small.css';
import '../stylesheets/Feedback/med.css';
import '../stylesheets/Feedback/large.css';
import '../stylesheets/Feedback/xl.css';

export default class Feedback extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="Feedback">
                <div className="feedback-card">
                    <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSf7QNAhMn46_dQm1iEE0OoiISyC9lLb1FJGbtOgKscxTds-rQ/viewform?embedded=true" width={window.innerWidth} height={window.innerHeight} frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                </div>
            </div>
        )
    }
}
