import React, { Component } from "react";
import Pallete from "./Pallete";
import seedColors from "./seedColors";
import { generatePallette } from "./colorHelpers";
import { Switch, Route } from "react-router-dom";
import PalletteList from "./PalletteList";
import SingleColorPallette from "./SingleColorPallette";
import NewPalletteForm from "./NewPalletteForm";

class App extends Component {
  state = {
    pallettes: seedColors
  }
  findPallette = (id) => {
    return this.state.pallettes.find((pallette) => {
      return pallette.id === id;
    });
  };
  savePallette = (newPallette) => {
    this.setState({pallettes: [...this.state.pallettes, newPallette]})
  }
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/palette/new" render={(rp) => <NewPalletteForm {...rp} savePallette={this.savePallette}/>} />
          <Route
            path="/"
            exact
            render={(rp) => <PalletteList {...rp} pallettes={this.state.pallettes} />}
          />
          <Route
            path="/palette/:id"
            exact
            render={(rProps) => (
              <Pallete
                pallette={generatePallette(
                  this.findPallette(rProps.match.params.id)
                )}
              />
            )}
          />
          <Route
            path="/palette/:palletteId/:colorId"
            render={(rProps) => (
              <SingleColorPallette
                colorId={rProps.match.params.colorId}
                pallette={generatePallette(
                  this.findPallette(rProps.match.params.palletteId)
                )}
              />
            )}
            exact
          />
        </Switch>

        {/* <Pallete pallette={generatePallette(this.state.pallettes[4])} /> */}
      </div>
    );
  }
}

export default App;
