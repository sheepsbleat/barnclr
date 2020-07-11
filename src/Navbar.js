import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Navbar.css";
import Select from "@material-ui/core/Select";
import { MenuItem, Snackbar } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  state = {
    format: "hex",
    open: false,
  };

  handleChange = (e) => {
    this.setState({ format: e.target.value, open: true });
    this.props.handleChange(e.target.value);
  };
  closeSnackBar = () => {
    this.setState({ open: false });
  };
  render() {
    return (
      <nav className="Navbar">
        <div className="logo">
          <Link to="/">barncolor</Link>
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
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.closeSnackBar}
          message={
            <span className="message-id">
              Format changed to {this.state.format.toUpperCase()}!
            </span>
          }
          action={[
            <IconButton
              onClick={this.closeSnackBar}
              color="inherit"
              key="close"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </nav>
    );
  }
}
