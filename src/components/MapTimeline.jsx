import React from "react"
import { Range, getTrackBackground } from 'react-range';

import '../stylesheets/MapTimeline/xs.css'
import '../stylesheets/MapTimeline/small.css'
import '../stylesheets/MapTimeline/med.css'
import '../stylesheets/MapTimeline/large.css'
import '../stylesheets/MapTimeline/xl.css'

export default class MapTimeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            values: [0],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
    }

    handleChange(values) {
        this.setState({
            values: values,
        });
        this.props.handleChange(values[0]);
    }

    render() {
        if (!this.props.dates || this.props.dates.length == 0)
            return null;
        return (
            <div className="MapTimeline">
                <Range
                    step={1}
                    min={-1 * (this.props.dates.length - 1)}
                    max={0}
                    values={this.state.values}
                    onChange={values => this.handleChange(values)}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '6px',
                                marginLeft: '10%',
                                width: '80%',
                                backgroundColor: '#ccc'
                            }}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => (
                        <div
                            {...props}
                            style={{
                                ...props.style,
                                height: '42px',
                                width: '42px',
                                backgroundColor: '#999'
                            }}
                        />
                    )}
                />
            </div>
        )
    }
}