'use strict'

import React, { Component } from 'react';
import {  Row, Col, Label, FormGroup, Input } from 'reactstrap';


import BenModal from '../../../../components/BenModal';


export default class MyForm extends Component {

   render(){

    const modal = this.props.modal || {};
    const data = modal.data || {};


     return(
       <BenModal  {...this.props} >
           <Row>

             <Col md={4}>
               <FormGroup>
                 <Label > Mã <span className="text-danger">*</span></Label>
                 <Input  type="text" onChange={(e)=>{ modal.onChange('code',e.target.value) }} defaultValue={data.code} id="code" />
               </FormGroup>
             </Col>
             
             <Col md={4}>
               <FormGroup>
                 <Label > Loại <span className="text-danger">*</span></Label>
                 <Input type="select" onChange={(e)=>{ modal.onChange('type',e.target.value) }} defaultValue={data.type}  id="type">
                    <option value="tm"> Tiền Mặt </option>
                    <option value="ck"> Chuyển Khoản </option>
                 </Input>
               </FormGroup>
             </Col>

             <Col md={4}>
               <FormGroup>
                 <Label > Hạn mức nợ <span className="text-danger">*</span></Label>
                 <Input onChange={(e)=>{ modal.onChange('debt_num',e.target.value) }} defaultValue={data.debt_num} min={1} max={365} type="number" id="debt_num" />
               </FormGroup>
             </Col>
             
           </Row>
           <Row>
              <Col md={8}>
                <FormGroup>
                  <Label > Tên hạn mức <span className="text-danger">*</span></Label>
                  <Input onChange={(e)=>{ modal.onChange('name',e.target.value) }} defaultValue={data.name} type="text" id="name" />
                </FormGroup>
              </Col>
           </Row>
           <Row>
              <Col md={8}>
                  <Label > Chi tiết <span className="text-danger">*</span></Label>
                  <Input type="textarea" style={{height:100}} onChange={(e)=>{ modal.onChange('detail',e.target.value) }} defaultValue={data.detail} id="detail" />
              </Col>
           </Row>
       </BenModal>
     )
   }
 }
