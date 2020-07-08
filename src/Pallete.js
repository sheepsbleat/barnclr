import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Pallette.css";
import Navbar from "./Navbar";

export default class Pallete extends Component {
  state = {
    level: 500,
  };
  changeLevel = (level) => {
    this.setState({ level });
    console.log(level);
  };
  render() {
    const { colors } = this.props.pallette;
    const colorBoxes = colors[this.state.level].map((color) => (
      <ColorBox background={color.hex} name={color.name} key={Math.random()} />
    ));
    return (
      <div className="Pallete">
        <Navbar level={this.state.level} changeLevel={this.changeLevel} />

        <div className="Pallette-colors">{colorBoxes}</div>
        {/* footer */}
      </div>
    );
  }
}
