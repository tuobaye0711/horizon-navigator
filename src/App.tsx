import * as React from "react";
import "./App.css";

import Layout from "./layout/Layout";
const Websites = require("./constant/websites.json");

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Layout websites={Websites} />
      </div>
    );
  }
}

export default App;
