import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";
import Loader from "./Loader";

class App extends React.Component {
  state = { lat: null, errorMessage: "" };

  componentDidMount() {
    //call geolocation api
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      //handle error
      err =>
        this.setState({
          errorMessage: err.message
        })
    );
  }

  render() {
    //conditional renderings
    if (this.state.lat && !this.state.errorMessage) {
      return <SeasonDisplay lat={this.state.lat} />;
    }

    if (!this.state.lat && this.state.errorMessage) {
      return <div>Error: {this.state.errorMessage}</div>;
    }

    return <Loader message="Please accept location request" />;
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
