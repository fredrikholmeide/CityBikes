import React, {Component} from 'react';
import StatusBox from './components/StatusBox/StatusBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class App extends Component {

  //State used to manage the registered stations and the status of each station
  state = {
    stations: 0,
    status: 0,
  }

  //Updates the status of each station when called
  updateStatus() {
    axios.get("https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json")
      .then(res => {
        const status = res.data.data.stations;
        this.setState({status: status})
      })
  }

  //Initializes the stations the first time called.
  //Calls updatedStatus() with a regular interval
  componentDidMount() {
    if (this.state.stations === 0) {
      axios.get("https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json")
      .then(res => {
        const stations = res.data.data.stations;
        this.setState({stations: stations});
      })
    }
    setInterval(() => {
      console.log("setting state");
      this.updateStatus()
    }, 1000);
  }

  //Only rendering if the status of the stations has changed
  //Don't know if this method works correctly
  //Does not affect the code, except performance
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.status !== nextState.status 
  }
  

  //Rendering the StationBox components
  render() {
    console.log("rendering")
    let i = 0;
    let boxes = 0;
    //Creating the StatusBox component based on the stations and status
    if (this.state.stations !== 0 && this.state.status !== 0)   {
      boxes = this.state.stations.map(station => {
        let numAval = this.state.status[i].num_bikes_available;
        let numDocks = this.state.status[i].num_docks_available;
        i++
        return <StatusBox name={station.address} spots={numDocks} bikes={numAval}/> 
      })
    }
    console.log(boxes)
    const mystyle = {
      textAlign: "center",
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial"
    };

    //Returns the header and StationBoxes as a list
    return (
      <div style={{backgroundColor: "#c2e9fb"}}>
        <h1 style={mystyle}>City Bikes</h1>
        {boxes}
      </div>
    );
  }
  
}

export default App;
