import React, { Component } from 'react';
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap';

class ManualReportForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datetime: new Date().toISOString().substring(0, 16),
            nearestHosp: this.props.hosp ? this.props.hosp.name : '',
            nearestPol: this.props.pol ? this.props.pol.name : '',
            nearestFs: this.props.fs ? this.props.fs.name : ''
        }
    }

    handleDateTimeChange = (e) => {
        this.setState({datetime: e.target.value});
    }

    handleChangeLatitude = (e) => {
        this.setState({lat: e.target.value});
    }

    handleChangeLongitude = (e) => {
        this.setState({lon: e.target.value});
    }

    handleChangeHosp = (e) => {
        this.setState({nearestHosp: e.target.value});
    }

    handleChangePol = (e) => {
        this.setState({nearestPol: e.target.value});
    }

    handleChangeFs = (e) => {
        this.setState({nearestFs: e.target.value});
    }

    render() {
        return (
            <Form className='manualReportPage'>
                <Form.Group>
                    <Form.Label><strong>Fill up the necessary details</strong></Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Type of incident</Form.Label>
                        <Form.Control as="select">
                            <option>Animal Trafficking</option>
                            <option>Arms Trafficking</option>
                            <option>Burglary</option>
                            <option>Cheating</option>
                            <option>Corruption / Misconduct</option>
                            <option>Cyber Crime</option>
                            <option>Domestic Violence</option>
                            <option>Dowry</option>
                            <option>Human Trafficking</option>
                            <option>Illegal Drug Trade</option>
                            <option>Kidnapping</option>
                            <option>Animal Poaching</option>
                            <option>Mob / Public Violence</option>
                            <option>Murder</option>
                            <option>Pickpocketting</option>
                            <option>Rape</option>
                            <option>Robbery</option>
                            <option>Other</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Date of incident</Form.Label>
                    <Form.Control type="datetime-local" value={this.state.datetime} onChange={e => {this.handleDateTimeChange(e)}}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location of incident</Form.Label>
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Latitude and Longitude</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value={this.props.lat} onChange={e => {this.handleChangeLatitude(e)}}/>
                    <FormControl value={this.props.lon} onChange={e => {this.handleChangeLongitude(e)}}/>
                    </InputGroup>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nearest Hospital</Form.Label>
                    <Form.Control type="text" ref="nearestHosp" onChange={e => this.handleChangeHosp(e)} value={this.state.nearestHosp}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nearest Police Station</Form.Label>
                    <Form.Control type="text" ref="nearestPol" onChange={e => this.handleChangePol(e)} value={this.state.nearestPol}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Nearest Fire Station</Form.Label>
                    <Form.Control type="text" ref="nearestFs" onChange={e => this.handleChangeFs(e)} value={this.state.nearestFs}/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Comments</Form.Label>
                    <Form.Control as="textarea"/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Severity</Form.Label>
                    <div>
                        <Form.Check inline name="severity" label="Low" type="radio"></Form.Check>
                        <Form.Check inline name="severity" label="Medium" type="radio"></Form.Check>
                        <Form.Check inline name="severity" label="High" type="radio"></Form.Check>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Attachments</Form.Label>
                    <div>
                        <input type="file" accept="image/*" multiple></input>
                    </div>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Button variant="primary" type="submit" disabled={this.state.busy} onClick={()=>{this.analyzeImage()}}>
                        {this.state.busy ? 'Sending' : 'Report'}
                    </Button>
                    <Form.Text className="text-danger">
                        <b>Warning: </b>Fake reporters are subjects to be punished.
                    </Form.Text>
                </Form.Group>
            </Form>
        );
    } 
}

export default ManualReportForm;