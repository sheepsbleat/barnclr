import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Pallette.css";
import Navbar from "./Navbar";
import PalletteFooter from "./PalletteFooter";
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
    const { colors, paletteName: palletteName, id } = this.props.pallette;

    const { format } = this.state;
    const colorBoxes = colors[this.state.level].map((color) => (
      <ColorBox
        id={color.id}
        palletteId={id}
        background={color[format]}
        name={color.name}
        key={color.id}
      />
    ));
    return (
      <div className="Pallete">
        <Navbar
          handleChange={this.changeFormat}
          level={this.state.level}
          changeLevel={this.changeLevel}
        />

        <div className="Pallette-colors">{colorBoxes}</div>

        <PalletteFooter
          palletteName={palletteName}
          emoji={this.props.pallette.emoji}
        />
      </div>
    );
  }
}
