'use strict'

import React, { Component } from 'react';
import {  Row, Col, Label, FormGroup, Input } from 'reactstrap';


import BenModal from '../../../components/BenModal';


export default class MyForm extends Component {

   render(){

    const modal = this.props.modal || {};
    const data = modal.data || {};


     return(
       <BenModal name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
           <Row>
             <Col md={12}>
               <FormGroup>
                 <Label for="code"> Tên <span className="text-danger">*</span></Label>
                 <Input  onChange={(e)=>{ modal.onChange('name',e) }} defaultValue={data.name} type="text" id="name" />
               </FormGroup>
             </Col>
           </Row>
           <Row>
             <Col md={12}>
                <FormGroup>
                    <Label> Ghi Chú </Label>
                    <Input defaultValue={ data.description } onChange={(e)=>{  modal.onChange('description',e) }} type="textarea" style={{height:100}} />    
                </FormGroup>    
             </Col>
           </Row>
       </BenModal>
     )
   }
 }
