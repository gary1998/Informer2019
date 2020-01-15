import React, { Component } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Channel from "./pages/Channel";
import Profile from "./pages/Profile";
import {Navbar, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faReceipt, faNewspaper, faUser } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import store from './Store';

class App extends Component {

    constructor(props){
        super(props);
        this.state = {
            store: {
                lat: 0,
                lon: 0,
                hosps: [],
                pol: [],
                fs: []
            }
        }
    }

    render() {

        store.subscribe(() => {
            this.setState({store: store.getState()})
        })

        return (
            <HashRouter>
                <div>
                    <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand href="#">
                            <img alt="logo" src="icon.svg" height={30} width={30}></img>&nbsp;<strong>INFORMER 2019</strong>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Navbar.Text>
                            Developed by : <a href="http://gary1998.github.io/HealthBot2019/" target="_blank" rel="noopener noreferrer">Team EDGE</a>&nbsp;<img alt="logo" src="logo.gif" height={30} width={35}></img>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="content">
                        <Route exact path="/" render={() => <Home lat={this.state.store.lat} lon={this.state.store.lon} hosps={this.state.store.hosps} pol={this.state.store.pol} fs={this.state.store.fs}/>}/>
                        <Route path="/report" render={() => <Report lat={this.state.store.lat} lon={this.state.store.lon} hosps={this.state.store.hosps} pol={this.state.store.pol} fs={this.state.store.fs}/>}/>
                        <Route path="/channel" render={() => <Channel lat={this.state.store.lat} lon={this.state.store.lon} hosps={this.state.store.hosps} pol={this.state.store.pol} fs={this.state.store.fs}/>}/>
                        <Route path="/profile" render={() => <Profile lat={this.state.store.lat} lon={this.state.store.lon} hosps={this.state.store.hosps} pol={this.state.store.pol} fs={this.state.store.fs}/>}/>
                    </div>
                    <Navbar bg="dark" fixed="bottom">
                        <div className="btnDiv">
                            <NavLink exact to="/"><Button className='pageBtn' variant="outline-light"><FontAwesomeIcon icon={faHome} /></Button></NavLink>
                            <NavLink to="/report"><Button className='pageBtn' variant="outline-light"><FontAwesomeIcon icon={faReceipt} /></Button></NavLink>
                            <NavLink to="/channel"><Button className='pageBtn' variant="outline-light"><FontAwesomeIcon icon={faNewspaper} /></Button></NavLink>
                            <NavLink to="/profile"><Button className='pageBtn' variant="outline-light"><FontAwesomeIcon icon={faUser} /></Button></NavLink>
                        </div>
                    </Navbar>
                </div>
        </HashRouter>
        );
    }
}



export default App;