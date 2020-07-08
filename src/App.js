import React from "react";
import Pallete from "./Pallete";
import seedColors from "./seedColors";
import { generatePallette } from "./colorHelpers";

function App() {
  return (
    <div className="App">
      <Pallete pallette={generatePallette(seedColors[4])} />
    </div>
  );
}

export default App;
