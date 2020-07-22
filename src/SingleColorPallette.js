import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PalletteFooter from "./PalletteFooter";
import { withRouter } from "react-router-dom";
import styles from "./styles/colorPalletteStyles";
class SingleColorPallette extends Component {
  state = {};
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.pallette, this.props.colorId);
  }
  gatherShades = (pallette, colorFilter) => {
    let shades = [];
    let allColors = pallette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorFilter)
      );
    }
    return shades.slice(1);
  };
  state = {
    format: "hex",
  };
  changeFormat = (v) => {
    this.setState({ format: v });
  };
  render() {
    const {
      classes: { palletteColors, goBack },
    } = this.props;
    const colorBoxes = this._shades.map((color) => (
      <ColorBox
        showingFullPallette={false}
        key={color.name}
        name={color.name}
        background={color[this.state.format]}
      />
    ));

    return (
      <div className={this.props.classes.Pallettes}>
        <Navbar showSlider={false} handleChange={this.changeFormat} />

        <div className={palletteColors}>
          {colorBoxes}
          <div
            onClick={this.props.history.goBack}
            className={`${goBack} ColorBox`}
            style={{
              width: "20%",
              height: "50%",
              margin: "0 auto",
              display: "inline-block",
              position: "relative",
              cursor: "pointer",
              marginBottom: "-3.5px",
            }}
          >
            <button>Go Back</button>
          </div>
        </div>
        <PalletteFooter
          palletteName={this.props.pallette.paletteName}
          emoji={this.props.pallette.emoji}
        />
      </div>
    );
  }
}
export default withRouter(withStyles(styles)(SingleColorPallette));
