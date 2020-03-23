import React from "react"
import * as d3 from 'd3';
import { feature } from "topojson-client"

import Map from './Map';
import ControlPanel from './ControlPanel';
import MetricPanel from './MetricPanel';

import '../stylesheets/Home/xs.css'
import '../stylesheets/Home/small.css'
import '../stylesheets/Home/med.css'
import '../stylesheets/Home/large.css'
import '../stylesheets/Home/xl.css'

const dataEndpoints = {
    cases: {
        confirmed: "https://cdn.jsdelivr.net/gh/CSSEGISandData/COVID-19@latest/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv?" + Math.random(),
        deaths: "https://cdn.jsdelivr.net/gh/CSSEGISandData/COVID-19@latest/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Deaths.csv?" + Math.random(),
        recovered: "https://cdn.jsdelivr.net/gh/CSSEGISandData/COVID-19@latest/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Recovered.csv?" + Math.random(),
    }
}

async function retrieveData(categoryKey) {
    var endpoint = dataEndpoints["cases"][categoryKey];
    var countryDailyEntries = null;
    var dates = null;
    var geographies = null;
    await d3.csv(endpoint)
        .then(csvdata => {
            // First 4 elements are: "Province/State", "Country/Region", "Lat", "Long"
            // All elements after are the dates
            dates = Object.keys(csvdata[0]).slice(4)
            csvdata.forEach((countryItem, countryItemIndex) => {
                var countryName = countryItem["Country/Region"]
                if (!countryDailyEntries)
                    countryDailyEntries = {};
                if (!countryDailyEntries[countryName])
                    countryDailyEntries[countryName] = {};
                Object.entries(countryItem).slice(4).forEach((countryItemDateEntryPairing, countryItemDateEntryPairingIndex) => {
                    var date = countryItemDateEntryPairing[0]
                    var cases = parseInt(countryItemDateEntryPairing[1]);
                    if (cases === NaN)
                        throw Error(`unable to parse integer for ${countryName} at date ${date}`);
                    if (!countryDailyEntries[countryName][date]) {
                        countryDailyEntries[countryName][date] = {
                            confirmed: 0,
                            deaths: 0,
                            recovered: 0,
                        };
                        countryDailyEntries[countryName][date][categoryKey] = cases;
                    } else
                        countryDailyEntries[countryName][date][categoryKey] += cases;
                });
            });
        });
    await d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
        .then(worlddata => {
            // console.log(worlddata);
            geographies = feature(worlddata, worlddata.objects.countries).features;
        });
    if (!geographies)
        console.error("geographies is null")
    if (!dates || dates.length == 0)
        console.error("dates is null")
    if (!countryDailyEntries || Object.keys(countryDailyEntries).length == 0)
        console.error("countryDailyEntries is empty")
    return [dates, countryDailyEntries, geographies];
}

// world doubling rate
function reformatForCharts(dates, countryDailyEntries, key) {
    var dailyWorldEntries = [];
    dates.forEach((date, dateIndex) => {
        dailyWorldEntries.push(
            {
                name: date,
                total: 0,
                today: 0,
            }
        );
        let countryDailyEntryPairs = Object.entries(countryDailyEntries);
        countryDailyEntryPairs.forEach((countryDailyEntryPair, countryIndex) => {
            var countryDateMap = countryDailyEntryPair[1];
            dailyWorldEntries[dateIndex].total += countryDateMap[date][key];
            // modify today value
            if (dateIndex == 0)
                dailyWorldEntries[dateIndex].today += countryDateMap[date][key];
            else
                dailyWorldEntries[dateIndex].today += countryDateMap[date][key] - countryDateMap[dates[dateIndex - 1]][key];
        });

        // modify doubling rate value
        for (var i = dateIndex - 1; i >= 0; i--) {
            if (dailyWorldEntries[dateIndex].total >= 2 * dailyWorldEntries[i].total) {
                dailyWorldEntries[dateIndex].doublingRate = dateIndex - i; // simple version, for now
                break;
            }
        }

        // daily percentage increase
        if (dateIndex > 0)
            dailyWorldEntries[dateIndex].dailyPercentage = (((dailyWorldEntries[dateIndex].total - dailyWorldEntries[dateIndex - 1].total) / dailyWorldEntries[dateIndex - 1].total) * 100).toFixed(2);
    });

    if (!dailyWorldEntries || dailyWorldEntries.length == 0) {
        console.error("dailyWorldEntries is empty")
        return null;
    }
    return dailyWorldEntries;
}

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            category: null,
            subcategory: null,
        };
        this.handleControlPanelSelection = this.handleControlPanelSelection.bind(this);
    }

    componentDidMount() {
        this.handleControlPanelSelection(0, 0);
    }

    async handleControlPanelSelection(levelOne, levelTwo) {
        var category;
        var subcategory;
        switch (levelOne) {
            case 0:
                category = "cases";
                switch (levelTwo) {
                    case 0:
                        subcategory = "confirmed";
                        break;
                    case 1:
                        subcategory = "deaths";
                        break;
                    case 2:
                        subcategory = "recovered";
                        break;
                    default:
                        console.error("unexpected control panel level 2 selection index");
                        break;
                }
                // at the moment, this only retrieves case data
                var data = await retrieveData(subcategory);
                var chartData = reformatForCharts(data[0], data[1], subcategory);
                this.setState({
                    dates: data[0],
                    countryDailyEntries: data[1],
                    geographies: data[2],
                    chartData: chartData
                });
                break;
            default:
                console.error("unexpected control panel level 1 selection index");
                break;
        }
        this.setState({
            category: category,
            subcategory: subcategory,
        });
    }

    render() {
        return (
            <div className="Home">
                <ControlPanel handleSelect={this.handleControlPanelSelection} />
                {this.state.dates ? <Map width={window.width} height={window.height}
                    dates={this.state.dates}
                    countryDailyEntries={this.state.countryDailyEntries}
                    count={this.state.chartData}
                    geographies={this.state.geographies}
                    category={this.state.category}
                    subcategory={this.state.subcategory}
                    chartData={this.state.chartData} /> : null}
                <MetricPanel data={this.state.chartData} />
                <a className="kofi-box" href='https://ko-fi.com/G2G41J24S' target='_blank'>
                    <img height='36' style={{ border: "0px", height: "36px" }} src='https://az743702.vo.msecnd.net/cdn/kofi3.png?v=2' border='0' alt='Buy Me a Coffee at ko-fi.com' />
                </a>
            </div>
        )
    }
}