import React, { Component } from "react";
import ColorBox from "./ColorBox";
import "./Pallette.css";
import Navbar from "./Navbar";
import PalletteFooter from "./PalletteFooter";
import { withStyles } from "@material-ui/styles";
const styles = {
  pallette: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  palletteColors: {
    height: "90%",
  },
};
class Pallete extends Component {
  state = {
    level: 500,
    format: "hex",
  };
  changeLevel = (level) => {
    this.setState({ level });
  };
  changeFormat = (v) => {
    this.setState({ format: v });
  };
  render() {
    const { colors, paletteName: palletteName, id } = this.props.pallette;
    const { classes } = this.props;
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
      <div className={classes.pallette}>
        <Navbar
          handleChange={this.changeFormat}
          level={this.state.level}
          changeLevel={this.changeLevel}
        />

        <div className={classes.palletteColors}>{colorBoxes}</div>

        <PalletteFooter
          palletteName={palletteName}
          emoji={this.props.pallette.emoji}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Pallete);
