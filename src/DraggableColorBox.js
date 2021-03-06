import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';

import { withStyles } from "@material-ui/core";
const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0, 0, 0, 0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  },
  delete: {
    transition: "all 0.3s ease-in-out",
  }
};
function DraggableColorBox({ handleClick, color, classes, name }) {
  return (
    <div className={classes.root} style={{ backgroundColor: color }}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <span><DeleteIcon onClick={handleClick} className={classes.delete} /></span>
      </div>

    </div>
  );
}
export default withStyles(styles)(DraggableColorBox);
