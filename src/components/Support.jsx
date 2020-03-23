import React from "react"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Typography from '@material-ui/core/Typography';

import '../stylesheets/Support/xs.css'
import '../stylesheets/Support/small.css'
import '../stylesheets/Support/med.css'
import '../stylesheets/Support/large.css'
import '../stylesheets/Support/xl.css'

export default class Support extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="Support">
                <div id="what" className="support-card">
                    <Typography className="support-card-title" variant="button" display="block" gutterBottom>Help us Keep on</Typography>
                    <Typography className="support-card-body" variant="body1" display="block" gutterBottom>
                        coding on.<br />
                        <a href='https://ko-fi.com/G2G41J24S' target='_blank'>
                            <img height='36' style={{ border: "0px", height: "36px" }} src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' />
                        </a>
                    </Typography>
                </div>
            </div>
        )
    }
}