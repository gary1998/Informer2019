import React, { Component } from 'react';
import Map from 'pigeon-maps';

export default class MapDiv extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: 0,
      lng: 0
    };
    this.getLocation();
  }

  getLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported by your browser');
    } else {
      console.log('Getting Geolocation...');
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log('Geolocation attained successfully', pos);
        this.setState({lat: pos.coords.latitude});
        this.setState({lng: pos.coords.longitude});
      }, function(){
        console.error("Error while locating user");
      }, { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 } );
    }  
  }

  render() {
    return (
        <Map center={[this.state.lat, this.state.lng]} zoom={15} height={this.props.height} width={this.props.width}></Map>
    );
  }
}