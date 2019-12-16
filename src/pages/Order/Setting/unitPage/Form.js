'use strict'

import React, { Component } from 'react';
import {  Row, Col, Label, FormGroup, Input } from 'reactstrap';

import BenModal from '../../../../components/BenModal';


export default class MyForm extends Component {

   render(){

    const modal = this.props.modal || {};
    const data = modal.data || {};


     return(
       <BenModal name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
           <Row>
             <Col md={6}>
               <FormGroup>
                 <Label for="code"> Tên gọi đơn vị tính <span className="text-danger">*</span></Label>
                 <Input  onChange={(e)=>{ modal.onChange('name',e) }} defaultValue={data.name} type="text" id="name" />
               </FormGroup>
             </Col>

           </Row>

       </BenModal>
     )
   }
 }
