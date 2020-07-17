import React, { Component } from "react";
import chroma from "chroma-js";
import "./ColorBox.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
const styles = {
  ColorBox: {
    width: "20%",
    height: (props) => (props.showingFullPallette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: 1,
    },
  },
  copyText: {
    color: (props) =>
      chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.6)" : "white",
  },
  colorName: {
    color: (props) =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "black",
  },
  seeMore: {
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: 0,
    bottom: 0,
    color: (props) =>
      chroma(props.background).luminance() >= 0.7
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copyButton: {
    opacity: 0,
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "20px",
    color: (props) =>
      chroma(props.background).luminance() >= 0.7
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  copyOverlay: {
    opacity: 0,
    zIndex: 0,
    height: "100%",
    width: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)",
  },
  show: {
    opacity: 1,
    transform: "scale(50)",
    zIndex: 10,
    position: "absolute",
  },
  copyMessage: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: 0,
    color: "white",
    flexDirection: "column",
  },
  showMsg: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "25",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase",
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
    },
  },
};
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
