import React from 'react';
import Button from '@material-ui/core/Button';
import MaterialTooltip from '@material-ui/core/Tooltip';

import '../stylesheets/ControlPanel/xs.css'
import '../stylesheets/ControlPanel/small.css'
import '../stylesheets/ControlPanel/med.css'
import '../stylesheets/ControlPanel/large.css'
import '../stylesheets/ControlPanel/xl.css'

export default class ControlPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            categories: {
                cases: ["Confirmed", "Deaths", "Recovery"],
                tooltips: ["Confirmed cases of coronavirus", "Fatal cases of coronavirus", "Recoveries from coronavirus"]
            },
            levelOneSelectedIndex: 0,
            levelTwoSelectedIndex: 0,
        };
        this.handleLevelOneSelect = this.handleLevelOneSelect.bind(this);
        this.handleLevelTwoSelect = this.handleLevelTwoSelect.bind(this);
    }

    handleLevelOneSelect(tabIndex) {
        this.setState({
            levelOneSelectedIndex: tabIndex,
        });
        this.props.handleSelect(tabIndex, this.state.levelTwoSelectedIndex);
    }

    handleLevelTwoSelect(tabIndex) {
        this.setState({
            levelTwoSelectedIndex: tabIndex,
        });
        this.props.handleSelect(this.state.levelOneSelectedIndex, tabIndex);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="ControlPanel">
                <VerticalTabs
                    id={"one"}
                    selectedIndex={this.state.levelOneSelectedIndex}
                    categories={["Cases"]}
                    tooltips={["Registered cases of coronavirus"]}
                    handleSelect={this.handleLevelOneSelect} />
                <VerticalTabs
                    id={"two"}
                    selectedIndex={this.state.levelTwoSelectedIndex}
                    categories={this.state.categories["cases"]}
                    tooltips={this.state.categories["tooltips"]}
                    handleSelect={this.handleLevelTwoSelect} />
            </div>
        )
    }
}

class VerticalTab extends React.Component {
    render() {
        return (
            <div className={`VerticalTab${this.props.isSelected ? " selected" : ""}`} >
                <MaterialTooltip title={this.props.tooltip} aria-label="add">
                    <Button className="vertical-tab-button" onClick={() => this.props.onClickHandler(this.props.id)}>
                        {this.props.label}
                    </Button>
                </MaterialTooltip>
            </div>
        )
    }
}

class VerticalTabs extends React.Component {
    render() {
        const tabComponents = this.props.categories.map((category, index) =>
            <VerticalTab
                id={index}
                className="tab-item"
                isSelected={this.props.selectedIndex == index}
                label={category}
                tooltip={this.props.tooltips[index]}
                onClickHandler={this.props.handleSelect}
                key={`vertical-tab-${index}`} />
        )
        return (
            <div id={this.props.id} className="VerticalTabs">
                {tabComponents}
            </div>
        );
    }
}