
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'

import MyHeader from './Header';

import RealtimeBox from './RealtimeBox';
import TimeLine from './TimeLine';

class Dashboard extends Component{

  render(){
    return (
      <div className="animated fadeIn">

        <div className="div-main">
        <i>đang cập nhật Timeline...</i>
        {/*<MyHeader />

        <Row>
          <Col md={9}>
             <TimeLine />
          </Col>
          <Col md={3}>
            <RealtimeBox />
          </Col>
        </Row>*/}

        </div>

      </div>
    )
  }
}

export default Dashboard;
