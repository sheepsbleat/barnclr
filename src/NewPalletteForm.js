import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import DraggableColorBox from "./DraggableColorBox";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import name from "./helpers/userName";

const drawerWidth = 400;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    height: "calc(100vh - 64px)",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPalletteForm extends React.Component {
  state = {
    open: true,
    currentColor: "teal",
    colors: [],
    newColorName: "",
    newPalletteName: name()
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      return this.state.colors.every(({ name }) => {
        return name.toLowerCase() !== value.toLowerCase();
      });
    });
    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      return this.state.colors.every(({ color }) => {
        return color !== this.state.currentColor;
      });
    });
    ValidatorForm.addValidationRule("isPalletteNameUnique", (value) => {
      return this.props.pallettes.every(({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase())
    });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };
  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };
  addColor = () => {
    const newColor = {
      color: this.state.currentColor,
      name: this.state.newColorName,
    };
    this.setState({ colors: [...this.state.colors, newColor], newName: "" });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  savePallette = () => {
    let newName = this.state.newPalletteName;
    const newPallette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors,

    }
    this.props.savePallette(newPallette);
    this.props.history.push("/")
  }
  removeColor = (colorName) => {
    this.setState({ colors: this.state.colors.filter(color => color.name !== colorName) })
  }
  render() {
    const { classes } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="default"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create a palette
            </Typography>
            <ValidatorForm onSubmit={this.savePallette}>
              <TextValidator label="Palette Name"
                validators={["required", "isPalletteNameUnique"]}
                errorMessages={["Enter palette Name", "Palette Name taken"]}
                name="newPalletteName" value={this.state.newPalletteName} onChange={this.handleChange} />
              <Button type="submit" variant="contained" color="primary">
                Save Palette
            </Button>
            </ValidatorForm>

          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design your palette</Typography>
          <div>
            <Button variant="contained" color="secondary">
              Clear Palette
            </Button>
            <Button variant="contained" color="primary">
              Random color
            </Button>
          </div>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={this.updateCurrentColor}
          />
          <ValidatorForm onSubmit={this.addColor}>
            <TextValidator
              value={this.state.newColorName}
              name="newColorName"
              onChange={this.handleChange}
              validators={["required", "isColorUnique", "isColorNameUnique"]}
              errorMessages={[
                "Enter a color name",
                "That color is already in this palette",
                "Color name must be unique",
              ]}
            />
            <Button
              variant="contained"
              color="primary"
              style={{
                backgroundColor: this.state.currentColor,
              }}
              type="submit"
            >
              Add Color
            </Button>
          </ValidatorForm>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {this.state.colors.map((color) => (
            <DraggableColorBox key={color.name} handleClick={() => this.removeColor(color.name)} color={color.color} name={color.name} />
          ))}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPalletteForm);
