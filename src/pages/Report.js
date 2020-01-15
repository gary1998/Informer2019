import React, { Component } from 'react';
import {Tabs, Tab, Container} from 'react-bootstrap';
import AutoReportForm from '../components/AutoReportForm';
import ManualReportForm from '../components/ManualReportForm';

class Report extends Component {
  
  render() {
    return (
      <div className='reportFormContainer'>
        <Tabs defaultActiveKey="auto" id="uncontrolled-tab-example">
          <Tab eventKey="auto" title="Automatic Report">
              <Container>
                <AutoReportForm/>
              </Container>
          </Tab>
          <Tab eventKey="manual" title="Manual Report">
              <Container>
                <ManualReportForm lat={this.props.lat} lon={this.props.lon} hosp={this.props.hosps[0]} pol={this.props.pol[0]} fs={this.props.fs[0]}/>
              </Container>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default Report;