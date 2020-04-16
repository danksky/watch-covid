import React from "react"
import { Link } from "react-router-dom";

import Typography from '@material-ui/core/Typography';

import '../stylesheets/About/xs.css'
import '../stylesheets/About/small.css'
import '../stylesheets/About/med.css'
import '../stylesheets/About/large.css'
import '../stylesheets/About/xl.css'

export default class About extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="About">
                <div className="about-card">
                    <div className="toc-header">
                        <Typography className="about-card-title" variant="button" display="block" gutterBottom>Table of Contents</Typography>
                    </div>
                    <div className="toc-content">
                        <div className="toc-item"><a className="toc-item-link" href="#what" >What is WatchCovid.org?</a></div>
                        <div className="toc-item"><a className="toc-item-link" href="#data" >Whose data is behind WaC.org?</a></div>
                        <div className="toc-item"><a className="toc-item-link" href="#coming" >What's to come with WatchCovid.org?</a></div>
                        <div className="toc-item"><a className="toc-item-link" href="#curve" >What's the curve everyone's talking about?</a></div>
                        <div className="toc-item"><a className="toc-item-link" href="#help" >How can I help?</a></div>
                        <div className="toc-item"><a className="toc-item-link" href="#support" >How can I support WatchCovid.org?</a></div>
                    </div>
                </div>
                <div id="what" className="about-card">
                    <Typography className="about-card-title" variant="button" display="block" gutterBottom>What is WatchCovid.org?</Typography>
                    <Typography className="about-card-body" variant="body1" display="block" gutterBottom>
                        It's me, Dan. I'm an engineer and designer. There's a <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/global-research-on-novel-coronavirus-2019-ncov">lot of information</a> out
                        there about what we're dealing with. I aim to to refine it, simplify it, and convey it to you digestibly.
                    </Typography>
                </div>
                <div id="data" className="about-card">
                    <Typography className="about-card-title" variant="button" display="block" gutterBottom>Whose data is behind WatchCovid.org?</Typography>
                    <Typography className="about-card-body" variant="body1" display="block" gutterBottom>
                        The dataset used by WatchCovid.org is provided by Johns Hopkins University. Explore <a href="https://coronavirus.jhu.edu/">their page</a> dedicated
                        to understanding and facilitating safety from the recent outbreak.
                    </Typography>
                </div>
                <div id="coming" className="about-card">
                    <Typography className="about-card-title" variant="button" display="block" gutterBottom>What's to come with WatchCovid.org?</Typography>
                    <Typography className="about-card-body" variant="body1" display="block" gutterBottom>
                        Currently, the <Link to="/">dashboard</Link> only provides information on verified case-counts. I aim to improve it with geo-located TEST information, too.
                        Later versions of this website will improve the granularity of analysis (by geographical study).
                    </Typography>
                </div>
                <div id="curve" className="about-card">
                    <Typography className="about-card-title" variant="button" display="block" gutterBottom>What's the curve everyone's talking about?</Typography>
                    <Typography className="about-card-body" variant="body1" display="block" gutterBottom>
                        It was reported on that on March 13, 2020 the U.S. Centers for Disease Control and Prevention had released estimates that the United States will be afflicted
                        with <a href="https://www.nytimes.com/2020/03/13/us/coronavirus-deaths-estimate.html">210 million cases over the span of a year</a>, which amounts to (at the
                        time of writing), roughly 64% of the American population. Countries with less availability to and capacity for healthcare and denser populations can expect
                        a more significant portion of their populations to contract the disease. We can <a href="https://www.cdc.gov/coronavirus/2019-ncov/prepare/prevention.html">lower
                        the magnitude of the spread</a> and strain on our healthcare systems if we <a href="https://www.youtube.com/watch?v=BtN-goy9VOY">modify how we socially convene
                        and interact</a> with each other.
                    </Typography>
                </div>
                <div id="help" className="about-card">
                    <Typography className="about-card-title" variant="button" display="block" gutterBottom>How can I help?</Typography>
                    <Typography className="about-card-body" variant="body1" display="block" gutterBottom>
                        You can directly contribute your time, funds, and even bodily fluids to U.S. organizations such
                        as <a href="https://www.redcrossblood.org/give.html/find-drive">Red Cross Blood</a>
                        , the <a href="https://give.cdcfoundation.org/give/269833/#!/donation/checkout">CDC Foundation</a>
                        , <a href="https://www.feedingamerica.org/">Feeding America</a>
                        , <a href="https://www.directrelief.org/">Direct Relief</a>, and more. Try a Google search, there's lots of a ways to help.
                    </Typography>
                </div>
                <div id="support" className="about-card">
                    <Typography className="about-card-title" variant="button" display="block" gutterBottom>How can I support WatchCovid.org?</Typography>
                    <Typography className="about-card-body" variant="body1" display="block" gutterBottom>
                        You can <Link to="/support">keep me caffeinated!</Link> I'll end up donating your donation, though, because Starbucks ain't happening.
                    </Typography>
                </div>
            </div>
        )
    }
}