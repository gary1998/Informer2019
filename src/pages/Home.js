import React, { Component } from 'react';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker/react';
import Overlay from 'pigeon-overlay';
import { Toast } from 'react-bootstrap';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
          toastShow: false,
          message: '',
          distance: 0.0
        };
    }

    onHospitalClick = (key) => {
        this.setState({message: this.props.hosps[key].name, toastShow: true, distance: this.props.hosps[key].dist+" KM"});
    }

    onPoliceClick = (key) => {
        this.setState({message: this.props.pol[key].name, toastShow: true, distance: this.props.pol[key].dist+" KM"});
    }

    onFireClick = (key) => {
        this.setState({message: this.props.fs[key].name, toastShow: true, distance: this.props.fs[key].dist+" KM"});
    }

    onLocationClick = () => {
        this.setState({message: "Your device geo-location!", toastShow: true, distance: ''})
    }

    render() {

        const providers = {
            osm: (x, y, z) => {
              const s = String.fromCharCode(97 + (x + y + z) % 3)
              return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
            },
            wikimedia: (x, y, z, dpr) => {
              return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png`
            },
            stamen: (x, y, z, dpr) => {
              return `https://stamen-tiles.a.ssl.fastly.net/terrain/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.jpg`
            }
        }    

        return (
            <div>
                <Map center={[this.props.lat, this.props.lon]} zoom={13} width={window.innerWidth} height={window.innerHeight} provider={providers['stamen']}>
                    <Marker anchor={[this.props.lat, this.props.lon]} onClick={()=>{this.onLocationClick()}}></Marker>
                    {
                        this.props.pol.map((value, key) => (
                            <Overlay key={"p"+key} anchor={[parseFloat(value.lat), parseFloat(value.lon)]}>
                                <img onClick={()=>{this.onPoliceClick(key)}} className='marker' src="https://uxwing.com/wp-content/themes/uxwing/download/12-people-gesture/police.png" alt="Police" height="20" width="20"></img>
                            </Overlay>
                        ))
                    }
                    {
                        this.props.hosps.map((value, key) => (
                            <Overlay key={"h"+key} anchor={[parseFloat(value.lat), parseFloat(value.lon)]} onClick={(event, anchor, payload) => {this.onHospitalClick(anchor)}}>
                                <img onClick={()=>{this.onHospitalClick(key)}} className='marker' src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/BSicon_HOSPITAL.svg/500px-BSicon_HOSPITAL.svg.png" alt="Police" height="20" width="20"></img>
                            </Overlay>
                        ))
                    }
                    {
                        this.props.fs.map((value, key) => (
                            <Overlay key={"f"+key} anchor={[parseFloat(value.lat), parseFloat(value.lon)]} onClick={(event, anchor, payload) => {this.onHospitalClick(anchor)}}>
                                <img onClick={()=>{this.onFireClick(key)}} className='marker' src="https://cdn.iconscout.com/icon/premium/png-256-thumb/fire-station-3-564101.png" alt="Police" height="20" width="20"></img>
                            </Overlay>
                        ))
                    }
                </Map>
                <Toast className='alertToast' onClose={() => this.setState({toastShow: false})} show={this.state.toastShow} delay={3000} autohide>
                    <Toast.Body>{this.state.message} - <b>{this.state.distance}</b></Toast.Body>
                </Toast>
            </div>
        );
    }
}

export default Home;