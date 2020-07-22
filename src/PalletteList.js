import React, { Component } from "react";
import MiniPallette from "./MiniPallette";
import { withStyles } from "@material-ui/styles";
import styles from "./styles/ListStyles";
import { Link } from "react-router-dom";
class PalletteList extends Component {
  goToPalette = (id) => {
    this.props.history.push(`/palette/${id}`);
  };
  render() {
    const {
      props: { pallettes, classes },
    } = this;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Barn Colors</h1>
            <Link to="/palette/new">Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {pallettes.map((pallette) => (
              <MiniPallette
                {...pallette}
                handleClick={() => this.goToPalette(pallette.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PalletteList);
