import React from "react"
import Typography from '@material-ui/core/Typography';
import { geoMercator, geoPath } from "d3-geo"
import * as d3 from 'd3';

import MapTimeline from './MapTimeline';

import '../stylesheets/Map/xs.css'
import '../stylesheets/Map/small.css'
import '../stylesheets/Map/med.css'
import '../stylesheets/Map/large.css'
import '../stylesheets/Map/xl.css'

const subcategoryColors = {
    "confirmed": "120,120,56",
    "deaths": "120,56,56",
    "recovered": "56,120,56",
}

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.dates ? this.props.dates[this.props.dates.length - 1] : null,
            daysAgo: 0,
        }
        this.selectDate = this.selectDate.bind(this);
    }

    selectDate(daysFromNow) {
        // console.log(daysFromNow);
        var date = this.props.dates ? this.props.dates[this.props.dates.length - (1 - daysFromNow)] : null;
        // console.log(date);
        this.setState({
            daysAgo: -1 * daysFromNow,
            date: date,
        })
    }

    render() {
        if (!(this.props.countryDailyEntries && this.props.geographies && this.props.subcategory))
            return null;

        // console.log(this.state)
        // console.log(this.props.countryDailyEntries)
        const projection = geoMercator()
            .scale(100)
            .translate([570 / 2, 580 / 2])

        const handleCountryClick = countryIndex => {
            // console.log("Clicked on country: ", this.props.geographies[countryIndex])
        }

        // correct America
        var categoricalData = this.props.countryDailyEntries;
        categoricalData["United States of America"] = categoricalData["US"];
        var matchingCountries = {};
        this.props.geographies.forEach((geography, index) => {
            if (geography && geography.properties && geography.properties.name && this.props.countryDailyEntries[geography.properties.name])
                matchingCountries[geography.properties.name] = true;
        });

        const countriesComponent = this.props.geographies ? this.props.geographies.map((geography, i) => {
            var log = 0;
            if (this.props.countryDailyEntries && geography.properties.name && this.state.date && this.props.subcategory
                && this.props.countryDailyEntries[geography.properties.name]
                && this.props.countryDailyEntries[geography.properties.name][this.state.date]
                && this.props.countryDailyEntries[geography.properties.name][this.state.date][this.props.subcategory])
                log = Math.log10(this.props.countryDailyEntries[geography.properties.name][this.state.date][this.props.subcategory]);

            return (
                <path
                    key={`path-${i}`}
                    d={geoPath().projection(projection)(geography)}
                    className="country"
                    fill={log == 0 ? "rgba(0,0,0,0.05)" : `rgba(${subcategoryColors[this.props.subcategory]},${log / 7})`}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    onClick={() => handleCountryClick(i)}
                />
            )
        }) : null;

        return (
            <div className="Map">
                <div className="map-header">
                    <div className="map-header-section">
                        <Typography className="map-header-section-text" variant="button" display="block" gutterBottom>
                            Region: World
                        </Typography>
                    </div>
                    <div className="map-header-section">
                        <Typography className="map-header-section-text" variant="button" display="block" gutterBottom>
                            Date: {this.state.date}
                        </Typography>
                    </div>
                    <div className="map-header-section">
                        <Typography className="map-header-section-text" variant="button" display="block" gutterBottom>
                            Count: {this.props.chartData[this.props.dates.length - 1 - (this.state.daysAgo < this.props.dates.length ? this.state.daysAgo : this.state.daysAgo - 1)].total}
                        </Typography>
                    </div>
                </div>
                <div className="map-container">
                    <svg className="map-graphic" viewBox="0 0 600 430">
                        <g className="countries">
                            {countriesComponent}
                        </g>
                    </svg>
                </div>
                <MapTimeline dates={this.props.dates} handleChange={this.selectDate} />
            </div>
        )
    }
}