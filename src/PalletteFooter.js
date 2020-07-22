import React from "react";
import {withStyles} from "@material-ui/styles";
const styles = {
    footer :{
  background: "white",
  height: "5vh",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  fontWeight: "bold",
},

emoji: {
  fontSize: "1.5rem",
  margin: "0 1rem",
}

}

function PalletteFooter({ palletteName, emoji, classes }) {
  return (
    <footer className={classes.footer}>
      {palletteName}
      <span className={classes.emoji}>{emoji}</span>
    </footer>
  );
}

export default withStyles(styles)(PalletteFooter);
