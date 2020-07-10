import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Pallette.css";
import Navbar from "./Navbar";
export default class Pallete extends Component {
  state = {
    level: 500,
    format: "hex",
  };
  changeLevel = (level) => {
    this.setState({ level });
    console.log(level);
  };
  changeFormat = (v) => {
    this.setState({ format: v });
  };
  render() {
    const { colors, paletteName: palletteName } = this.props.pallette;

    const { format } = this.state;
    const colorBoxes = colors[this.state.level].map((color) => (
      <ColorBox background={color[format]} name={color.name} key={color.id} />
    ));
    return (
      <div className="Pallete">
        <Navbar
          handleChange={this.changeFormat}
          level={this.state.level}
          changeLevel={this.changeLevel}
        />

        <div className="Pallette-colors">{colorBoxes}</div>
        <footer className="Pallette-footer">
          {palletteName}
          <span className="emoji">{this.props.pallette.emoji}</span>
        </footer>
      </div>
    );
  }
}
