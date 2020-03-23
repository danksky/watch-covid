import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { isMobile } from "react-device-detect";

import AppBar from './components/AppBar';
import MainContainer from './components/MainContainer';

import './App.css';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isMobile: isMobile
    }
    this.toggleDevice = this.toggleDevice.bind(this);
  }

  toggleDevice() {
    this.setState((prevState) => {
      // console.log(prevState.isMobile);
      return ({
        isMobile: !prevState.isMobile
      })
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <AppBar toggleDeviceHandler={this.toggleDevice} />
          <MainContainer isMobile={this.state.isMobile} />
        </Router>
      </div>
    );
  }

}
