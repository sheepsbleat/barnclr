import React, { Component } from "react";
import Pallete from "./Pallete";
import seedColors from "./seedColors";
import { generatePallette } from "./colorHelpers";
import { Switch, Route } from "react-router-dom";

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
          <Route path="/" exact render={() => <h1>Pallete Home</h1>} />
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
        </Switch>

        {/* <Pallete pallette={generatePallette(seedColors[4])} /> */}
      </div>
    );
  }
}

export default App;
