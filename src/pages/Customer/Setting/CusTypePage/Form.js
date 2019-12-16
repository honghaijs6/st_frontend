'use strict'

import { REF_PRICES } from '../../../../config/price.conf';  

import React, { Component } from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input } from 'reactstrap';

import BenColor from '../../../../components/BenColor';
import BenModal from '../../../../components/BenModal';



class CusTypeForm extends Component {

   render(){

    const modal = this.props.modal || {};
    const data = modal.data || {};

    
    let COLOR = {
      r: '241',
      g: '112',
      b: '19',
      a: '1'
    }; 

    if(data.color_code !==undefined){
      if(data.color_code.indexOf('rgba')>-1){
        let colors = data.color_code.split('(');
        colors = colors[1].split(')');
        colors = colors[0].split(',');

        COLOR = {
          r:colors[0],
          g:colors[1],
          b:colors[2],
          a:colors[3]
        }
        

      }
    }
    
     return(
       <BenModal {...this.props}  >
           <Row>
             <Col md={3}>
               <FormGroup>
                 <Label> Mã <span className="text-danger">*</span></Label>
                 <Input type="text" onChange={(e)=>{ modal.onChange('code',e.target.value) }}  defaultValue={data.code}  id="code"/>
               </FormGroup>
             </Col>
             <Col md={4}>
                <FormGroup>
                  <Label> Tên <span className="text-danger">*</span></Label>
                  <Input type="text" id="name" onChange={(e)=>{ modal.onChange('name',e.target.value) }}  defaultValue={ data.name } />
                </FormGroup>
             </Col>
             <Col md={3}>
                <FormGroup>
                    <Label> Giá tham chiếu </Label>
                    <Input type="select" id="ref_price" defaultValue={ data.ref_price } onChange={(e)=>{  modal.onChange('ref_price',e.target.value) }}>
                      {
                        REF_PRICES.map((item,index)=>{
                          return(
                            <option value={index} key={index}> { item } </option>
                          )
                        })
                      }
                      
                    </Input>
                </FormGroup>
             </Col>
             <Col md={2}>
                <BenColor color={COLOR} onChange={(data)=>{   modal.onChange('color_code', `rgba(${data.r},${data.g},${data.b},${data.a})` )  }} />
             </Col>
           </Row>

           <Row>
              <Col md={12}>
              <FormGroup>
                <Label for="code"> Ghi chú </Label>
                <Input type="textarea" id="decription" defaultValue={ data.decription } onChange={(e)=>{ modal.onChange('decription',e.target.value) }}  />
              </FormGroup>
              </Col>
           </Row>

       </BenModal>
     )
   }
 }

 export default CusTypeForm;
