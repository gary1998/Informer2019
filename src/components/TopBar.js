import React, {Component} from 'react';
import {Navbar, Nav, Button} from 'react-bootstrap';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";

export default class TopBar extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    <img src="icon.svg" height={30} width={30}></img>&nbsp;{this.props.title}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/channel">Incidents Channel</Nav.Link>
                        <Nav.Link href="/profile">Profile</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button variant="outline-light">Light</Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}