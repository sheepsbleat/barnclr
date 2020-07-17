import React, { Component } from "react";
import chroma from "chroma-js";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import styles from "./styles/ColorBoxStyles";
class ColorBox extends Component {
  state = {
    copied: false,
  };
  static defaultProps = {
    showingFullPallette: true,
  };
  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  };

  render() {
    const {
      props: { classes, name, background, showingFullPallette },
      state: { copied },
    } = this;
    return (
      <CopyToClipboard text={background} onCopy={this.changeCopyState}>
        <div style={{ background }} className={classes.ColorBox}>
          <div
            className={`${classes.copyOverlay} ${copied && classes.show}`}
            style={{ background }}
          ></div>
          <div
            className={`${classes.copyMessage} ${copied && classes.showMsg}`}
          >
            <h1
              style={{
                color: chroma(background).luminance() >= 0.7 ? "#332" : "white",
              }}
            >
              copied
            </h1>
            <p className={classes.copyText}>{this.props.background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showingFullPallette && (
            <Link
              to={`/palette/${this.props.palletteId}/${this.props.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span
                className={`${classes.seeMore}`}
                style={{
                  color:
                    chroma(background).luminance() >= 0.7
                      ? "rgba(0, 0, 0, 0.6)"
                      : "white",
                }}
              >
                MORE
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
