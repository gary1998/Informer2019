import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';

class FastReportForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            preview: '',
            comments: '',
            busy: false
        }
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
                    "reported_by": {
                        "name": this.props.name,
                        "email": this.props.email,
                        "phone": this.props.phone
                    },
                    "incident_type": "Unknown",
                    "incident_date_time": "Unknown",
                    "report_time": new Date().getTime(),
                    "latitude": this.props.lat,
                    "longitude": this.props.lon,
                    "nearest_hospital": this.props.hosp ? this.props.hosp.name : '',
                    "nearest_police_station": this.props.pol ? this.props.pol.name : '',
                    "nearest_fire_station": this.props.fs ? this.props.fs.name : '',
                    "attachments": this.state.preview,
                    "comments": this.state.comments
                })
            }).then(body => {
                return body.json()
            }).then(data => {
                if(data.ok){
                    alert(`Reported successfully. Kindly note ${data.insertedId} for tracking the status.`);
                    this.setState({preview: '', busy: false, comments: ''});
                }
            });
        }
    }

    handleChangeFileInput = (e) => {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (evt) => {
            this.setState({preview: evt.target.result});
        }
    }

    handleCommentsChange = (e) => {
        this.setState({comments: e.target.value});
    }

    render() {
        return (
            <Form className='reportPage'>
                <Form.Group>
                    <Form.Label><strong>Capture and upload incident's picture</strong></Form.Label>
                    <Form.Group>
                        <input type="file" accept="image/*" capture="environment" onChange={(e)=>{this.handleChangeFileInput(e)}}></input>
                        <Form.Text className="text-muted">
                            The picture will be analyzed for details.
                        </Form.Text>
                    </Form.Group>
                </Form.Group>
                <Form.Group className='canvasContainer'>
                    <div className='imgCanvas'>
                        <img className='imgCanvas' alt='' src={this.state.preview}></img>
                    </div>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Comments</Form.Label>
                    <Form.Control as="textarea" value={this.state.comments} onChange={e => this.handleCommentsChange(e)}/>
                </Form.Group>
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

export default FastReportForm;