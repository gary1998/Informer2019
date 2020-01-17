import React, { Component } from 'react';
import {Form, Button, InputGroup, FormControl} from 'react-bootstrap';

class DetailedReportForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            datetime: '',
            type: "Animal Trafficking",
            nearestHosp: this.props.hosp ? this.props.hosp.name : '',
            nearestPol: this.props.pol ? this.props.pol.name : '',
            nearestFs: this.props.fs ? this.props.fs.name : '',
            file: '',
            busy: false
        }
    }

    componentDidMount(){
        this.setDateTime();
    }

    setDateTime = () => {
        var obj = new Date();
        var iso = obj.toISOString();
        var date = iso.substring(0, 11);
        var hours = obj.getHours();
        var minutes = obj.getMinutes();
        this.setState({datetime: date+hours+":"+minutes});
    }

    sendReport = () => {
        if(!this.props.email){
            alert("You need to login first to report.");
        }
        else{
            this.setState({busy: true});
            fetch("http://localhost:8000/addReport", {
                headers: {"Content-Type": "application/json"},
                method: "POST",
                body: JSON.stringify({
                    "Reporter": {
                        "Name": this.props.name,
                        "E-Mail": this.props.email,
                        "Phone": this.props.phone
                    },
                    "IncidentType": this.state.preview,
                    "DateTime": this.state.datetime,
                    "Report Time": new Date().getTime(),
                    "Latitude": this.state.lat,
                    "Longitude": this.state.lon,
                    "Nearest Hospital": this.state.nearestHosp,
                    "Nearest Police Station": this.state.nearestPol,
                    "Nearest Fire Station": this.state.nearestFs,
                    "Attachments": this.state.file,
                    "Comments": this.state.comments
                })
            }).then(body => {
                return body.json()
            }).then(data => {
                if(data.ok){
                    alert(`Reported successfully. Kindly note ${data.insertedId} for tracking the status.`);
                    this.setState({file: '', busy: false, comments: ''});
                }
            });
        }
    }

    handleChangeFileInput = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (evt) => {
            this.setState({file: evt.target.result});
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

    handleChangeType = e => {
        this.setState({type: e.target.value});
    }

    render() {
        return (
            <Form className='reportPage'>
                <Form.Group>
                    <Form.Label><strong>Fill up the necessary details</strong></Form.Label>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Type of incident</Form.Label>
                        <Form.Control as="select" value={this.state.type} onChange={e => this.handleChangeType(e)}>
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
                    <Form.Label>Attachments</Form.Label>
                    <div>
                        <input type="file" accept="image/*" multiple onChange={(e) => this.handleChangeFileInput(e)}></input>
                    </div>
                </Form.Group>
                <br/>
                <Form.Group>
                    <Button variant="primary" type="submit" disabled={this.state.busy} onClick={()=>{this.sendReport()}}>
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

export default DetailedReportForm;