import React, { Component } from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input, Table, Button, ButtonGroup  } from 'reactstrap';

import BenModal from '../../../components/BenModal';
import BenButtonSelect from '../../../components/BenButtonSelect';




class CustomerForm extends Component {

   render(){

     return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
          <div className="container">
              <Row>
                <Col md="12">
                   <div className="row-form">
                       <h5 className="txt-organge"> Import tập tin Excel </h5>
                       <span className="font-14"> Upload file excel với định dạng sau </span>
                       <span className="pull-right txt-red font-12"> <i className="fa fa-cloud-download mr-5"></i> Download file mẫu </span>

                       <hr/>
                   </div>
                   <FormGroup className="riw">
                      <Label> File Excel  </Label>
                      <Input type="file" />
                   </FormGroup>

                </Col>
              </Row>
          </div>
       </BenModal>
     )
   }
 }

 export default CustomerForm;
