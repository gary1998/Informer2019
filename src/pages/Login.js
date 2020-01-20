import React, { Component } from "react";
import {Card, Button, Form, Container, Toast} from "react-bootstrap";
import store from '../Store';
import {setUser} from '../Actions';

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            message: '',
            showMsg: true
        }
    }

    handleLogin = () => {
        fetch(`http://localhost:8000/login?email=${this.state.email}&password=${this.state.password}`).then( body => {
            return body.json();
        }).then(data => {
            if(!data.email){
                this.setState({showMsg: true, message: "Invalid user credentials, please check again."});
            }
            else{
                store.dispatch(setUser(data));
            }
        })
    }

    handleEmailChange = e => {
        this.setState({email: e.target.value});
    }

    handlePasswordChange = e => {
        this.setState({password: e.target.value});
    }

    render(){
        return (
            <Container>
                <Card bg="dark" text="white" className="text-center loginContainer">
                    <Card.Header><strong>LOGIN</strong></Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                            <img src="icon.svg" height="32" width="32" alt="informer"></img>&nbsp;<strong>Informer 2019</strong>&nbsp;<img src="logo.gif" height="32" width="32" alt="teamEDGE"></img>&nbsp;<strong>Team EDGE</strong>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>E-Mail ID</Form.Label>
                                <Form.Control type="email" value={this.state.email} onChange={e => this.handleEmailChange(e)} required/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" value={this.state.password} onChange={e => this.handlePasswordChange(e)} required/>
                            </Form.Group>
                        </Form>
                        <Button variant="primary" onClick={() => this.handleLogin()}>Submit</Button>
                    </Card.Body>
                    <Card.Footer>
                        Haven't registered yet? <a href="#">Register Now</a>
                    </Card.Footer>
                </Card>
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