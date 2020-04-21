import React from "react"
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import Typography from '@material-ui/core/Typography';
import MaterialTooltip from '@material-ui/core/Tooltip';

import '../stylesheets/MetricPanel/xs.css'
import '../stylesheets/MetricPanel/small.css'
import '../stylesheets/MetricPanel/med.css'
import '../stylesheets/MetricPanel/large.css'
import '../stylesheets/MetricPanel/xl.css'

export default class MetricPanel extends React.Component {

    componentDidMount() {
    }

    render() {

        if (!this.props.data)
            return null;
        // console.log(this.props.data)

        return (
            <div className="MetricPanel">
                <div className="metric-panel-chart">
                    <div className="metric-panel-chart-title">
                        <MaterialTooltip title="Number of days it takes for a population to double in size." aria-label="add">
                            <Typography variant="overline" display="block" gutterBottom>
                                Doubling Period
                            </Typography>
                        </MaterialTooltip>
                    </div>
                    <div className="metric-panel-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={this.props.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis unit="days" />
                                <Tooltip />
                                <Line type="monotone" dataKey="doublingRate" stroke="#ff7300" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="metric-panel-chart">
                    <div className="metric-panel-chart-title">
                        <MaterialTooltip title="How many new cases have been classified." aria-label="add" disableTouchListener>
                            <Typography variant="overline" display="block" gutterBottom>
                                Registered Today
                            </Typography>
                        </MaterialTooltip>
                    </div>
                    <div className="metric-panel-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={this.props.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis unit="" />
                                <Tooltip />
                                <Line type="monotone" dataKey="today" stroke="#82ca9d" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="metric-panel-chart">
                    <div className="metric-panel-chart-title">
                        <MaterialTooltip title="Percentage increase from the previous day." aria-label="add">
                            <Typography variant="overline" display="block" gutterBottom>
                                Daily Percentage Increase
                            </Typography>
                        </MaterialTooltip>
                    </div>
                    <div className="metric-panel-chart-container">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={this.props.data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis unit="%" domain={[0, 100]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="dailyPercentage" stroke="#8884d8" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        )
    }
}
