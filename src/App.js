import React, { Component } from "react";
import Pallete from "./Pallete";
import seedColors from "./seedColors";
import { generatePallette } from "./colorHelpers";
import { Switch, Route } from "react-router-dom";
import PalletteList from "./PalletteList";
import SingleColorPallette from "./SingleColorPallette";
import NewPalletteForm from "./NewPalletteForm";

class App extends Component {
  findPallette = (id) => {
    return seedColors.find((pallette) => {
      return pallette.id === id;
    });
  };
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/palette/new" render={() => <NewPalletteForm />} />
          <Route
            path="/"
            exact
            render={(rp) => <PalletteList {...rp} pallettes={seedColors} />}
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

        {/* <Pallete pallette={generatePallette(seedColors[4])} /> */}
      </div>
    );
  }
}

export default App;
