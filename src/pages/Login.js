import React, { Component } from "react";
import {Card, Button, Form, Container, Toast, Tabs, Tab, Col} from "react-bootstrap";
import store from '../Store';
import {setUser} from '../Actions';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            phone: '',
            message: '',
            showMsg: true,
            busy: false,
            verified: false
        }
    }

    handleLogin = () => {
        this.setState({busy: true});
        fetch(`http://localhost:8000/login?email=${this.state.email}&password=${this.state.password}`).then(body => {
            return body.json();
        }).then(data => {
            if(!data.email){
                this.setState({showMsg: true, message: "Invalid user credentials, please check again.", email: "", password: ""});
                this.setState({busy: false});
            }
            else{
                store.dispatch(setUser(data));
                this.setState({busy: false});
            }
        })
    }

    handleNameChange = e => {
        this.setState({name: e.target.value});
    }

    handlePhoneChange = e => {
        this.setState({phone: e.target.value});
    }

    handleEmailChange = e => {
        this.setState({email: e.target.value});
    }

    handlePasswordChange = e => {
        this.setState({password: e.target.value});
    }

    handleVerfication = () => {
        this.setState({verified: true});
    }

    handleRegister = () => {
        this.setState({busy: true});
        fetch("http://localhost:8000/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password
            })
        }).then(body => {
            return body.json();
        }).then(data => {
            if(data.ok){
                this.setState({message: "Successfully registered!", showMsg: true, busy: false, name: "", phone: "", password: "", email: ""});
            }
        });
    }

    render(){
        return (
            <Container className="loginContainer">
                <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                    <Tab eventKey="login" title="Login">
                        <Card bg="dark" text="white" className="text-center">
                            <Card.Header><strong>LOGIN</strong></Card.Header>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                    <img src="icon.svg" height="32" width="32" alt="informer"></img>&nbsp;<strong>Informer 2019</strong>&nbsp;<img src="logo.gif" height="32" width="32" alt="teamEDGE"></img>&nbsp;<strong>Team EDGE</strong>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>E-Mail ID</Form.Label>
                                        <Form.Control type="email" placeholder="abc@xyz.com" value={this.state.email} onChange={e => this.handleEmailChange(e)} required/>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="password" value={this.state.password} onChange={e => this.handlePasswordChange(e)} required/>
                                    </Form.Group>
                                </Form>
                                <Button variant="primary" onClick={() => this.handleLogin()} disabled={this.state.busy}>Submit</Button>
                            </Card.Body>
                        </Card>
                    </Tab>
                <Tab eventKey="register" title="Register">
                    <Card bg="dark" text="white" className="text-center">
                        <Card.Header><strong>REGISTER</strong></Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                <img src="icon.svg" height="32" width="32" alt="informer"></img>&nbsp;<strong>Informer 2019</strong>&nbsp;<img src="logo.gif" height="32" width="32" alt="teamEDGE"></img>&nbsp;<strong>Team EDGE</strong>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" placeholder="John Red" value={this.state.name} onChange={e => this.handleNameChange(e)} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>E-Mail ID</Form.Label>
                                    <Form.Control type="email" placeholder="abc@xyz.com" value={this.state.email} onChange={e => this.handleEmailChange(e)} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="password" value={this.state.password} onChange={e => this.handlePasswordChange(e)} required/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Row>
                                        <Col>
                                            <Form.Control type="tel" placeholder="0000000000" value={this.state.phone} onChange={e => this.handlePhoneChange(e)} required/>
                                        </Col>
                                        <Col>
                                            <Button variant="success" className="verifyBtn" onClick={() => this.handleVerfication()}>Verify</Button>
                                        </Col>
                                    </Form.Row>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>OTP</Form.Label>
                                    <Form.Control type="text" disabled={!this.state.verified} placeholder="1234"></Form.Control>
                                </Form.Group>
                            </Form>
                            <Button variant="primary" onClick={() => this.handleRegister()} disabled={!this.state.verified}>Register</Button>
                        </Card.Body>
                    </Card>
                </Tab>
                </Tabs>
                <br/>
                <div className="loginToastContainer">
                    { this.state.message ? (
                        <Toast onClose={() => {this.setState({showMsg: false})}} show={this.state.showMsg} autohide>
                            <Toast.Body>
                                <strong>{this.state.message}</strong>
                            </Toast.Body>
                        </Toast>
                    ) : "" }
                </div>
            </Container>
        );
    }
}

export default Login;