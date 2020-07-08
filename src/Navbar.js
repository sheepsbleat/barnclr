import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

export default class Navbar extends Component {
  state = {
    format: "hex",
  };

  handleChange = (e) => {
    this.setState({ format: e.target.value });
    this.props.handleChange(e.target.value);
  };

  render() {
    return (
      <nav className="Navbar">
        <div className="logo">
          <a href="/">barncolor</a>
        </div>
        <div className="slider-container">
          <span>Level: {this.props.level}</span>
          <div className="slider">
            <Slider
              defaultValue={this.props.level}
              min={100}
              max={900}
              step={100}
              onAfterChange={this.props.changeLevel}
            />
          </div>
        </div>
        <div className="select-container">
          <Select value={this.state.format} onChange={this.handleChange}>
            <MenuItem value="hex">hex</MenuItem>
            <MenuItem value="rgb">rgb</MenuItem>
            <MenuItem value="rgba">rgba</MenuItem>
          </Select>
        </div>
      </nav>
    );
  }
}
