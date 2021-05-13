//Export the App component so that it can be used in index.js
import React, { Component, useState } from "react";
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';
import backendConfig from "../../backendConfig";
import NavBar from "../NavBar";
import '../../App'
import './Station.css';

export class Station extends Component {

    state = {
      stations: [],
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false
    }

    componentDidMount() {
      axios.get(`${backendConfig}/stations/getStations`)
        .then(res => {
          const stations = res.data;
          this.setState({ stations });
        })
    }  

    onMarkerClick = (props, marker) =>
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });

    onInfoWindowClose = () =>
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });

    onMapClicked = () => {
      if (this.state.showingInfoWindow)
        this.setState({
          activeMarker: null,
          showingInfoWindow: false
        });
    };

    render() {     

      return (
        <div className='parent'>
          <NavBar />

          <Map google={this.props.google} zoom={11}  initialCenter={{  lat: 37.578494, lng: -122.035478}}>
                  {
                    this.state.stations.map((station) => {
                      return (
                        <Marker
                        title={station.dock_count} Member Activities
                        name={station.name}
                        onClick={this.onMarkerClick}
                        onClose={this.onInfoWindowClose}
                        position={{lat: station.lat, lng: station.long}} />
                      )
                    })
                  }     

              <InfoWindow
                marker={this.state.activeMarker}
                onClose={this.onInfoWindowClose}
                visible={this.state.showingInfoWindow}>
                <div>
                  <h5>{this.state.selectedPlace.name}</h5>
                  <p>{this.state.selectedPlace.title} Member Activities</p>
                </div>
              </InfoWindow>

          </Map>

        </div>
      );
    }   
}
       

export default GoogleApiWrapper({
  apiKey: "AIzaSyCObfl9Xoa65fgVVSJaJXwMm7oWvBsDvGI"
})(Station);
