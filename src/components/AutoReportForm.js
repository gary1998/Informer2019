import React, { Component } from 'react';
import {Form, Button} from 'react-bootstrap';

class AutoReportForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgBase64: '',
            busy: false
        }
    }

    changePreview = (e) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (evt) => {
            this.setState({imgBase64: evt.target.result});
        };
    }

    analyzeImage = () => {
        this.setState({busy: true});
        fetch("http://localhost:8000/analyzeImage", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    image: this.state.imgBase64
                })
        }).then(results => {
            return results.json()
        }).then(data => {
            console.log(data);
            this.setState({busy: false});
        });
    }

    render() {
        return (
            <Form className='autoReportPage'>
                <Form.Group>
                    <Form.Label><strong>Capture and upload incident's picture</strong></Form.Label>
                    <Form.Group>
                        <input type="file" accept="image/*" capture="environment" onChange={(e)=>{this.changePreview(e)}}></input>
                        <Form.Text className="text-muted">
                            The picture will be analyzed for details.
                        </Form.Text>
                    </Form.Group>
                </Form.Group>
                <Form.Group className='canvasContainer'>
                    <div className='imgCanvas'>
                        <img className='imgCanvas' alt='' src={this.state.imgBase64}></img>
                    </div>
                </Form.Group>
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

export default AutoReportForm;