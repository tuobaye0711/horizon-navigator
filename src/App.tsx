import * as React from "react";
import "./App.css";

import Layout from "./layout/Layout";
const Websites = require("./constant/websites.json");

class App extends React.Component {
  public state = {
    bgUrl: window.localStorage.bgUrl || ""
  };

  public onEvent = (type, value) => {
    console.log("​App -> onEvent -> type,value", type, value);
    switch (type) {
      case "change-bg":
        this.setState({
          bgUrl: value
        });
        break;
    }
  };

  public componentDidMount() {
    if (window.localStorage.bgUrl) {
      this.onEvent("change-bg", window.localStorage.bgUrl);
    }
  }

  public render() {
    const { bgUrl } = this.state;
    console.log("​App -> publicrender -> bgUrl", bgUrl);
    const style = bgUrl ? { background: `url(${this.state.bgUrl})` } : {};
    console.log("​App -> publicrender -> style", style);
    return (
      <div className="App" style={style}>
        <Layout websites={Websites} onEvent={this.onEvent} />
      </div>
    );
  }
}

export default App;
