import React, { Component } from 'react';
import {Tabs, Tab, Container} from 'react-bootstrap';
import FastReportForm from '../components/FastReportForm';
import DetailedReportForm from '../components/DetailedReportForm';

class Report extends Component {
  
  render() {
    return (
      <div className='reportFormContainer'>
        <Tabs defaultActiveKey="auto" id="uncontrolled-tab-example">
          <Tab eventKey="auto" title="Fast Report">
              <Container>
                <FastReportForm name={this.props.name} email={this.props.email} phone={this.props.phone}/>
              </Container>
          </Tab>
          <Tab eventKey="manual" title="Detailed Report">
              <Container>
                <DetailedReportForm lat={this.props.lat} lon={this.props.lon} hosp={this.props.hosps[0]} pol={this.props.pol[0]} fs={this.props.fs[0]}/>
              </Container>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Report;