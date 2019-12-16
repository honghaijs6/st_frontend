
/* HOOKS */
import { detectForm } from '../../../../hook/before' ; 
import doUpdateModelInfo from '../../../../hook/ultil/doUpdateModelInfo' ; 

import React, { Component } from 'react';
import {  Row, Col, Label, Button, FormGroup, ButtonGroup } from 'reactstrap';



import SelectListModel from '../../../../components/SelectListModel';
import SelectListModelCode from '../../../../components/SelectListModelCode';

import InputNumeral  from '../../../../components/InputNumeral'
 


export default class CusPointRulePage extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',
      status:'',

      tab:'CusPointRulePage' , 

      
    }

    this.data = {
      min_total:0,
      max_total:0,
      level_id:'',
      payment_code:'',
      value:0
    }
    
    this._onSubmit = this._onSubmit.bind(this); 

  }
 
  async _onSubmit(){
    //alert(JSON.stringify(this.data));

    const fields = ['min_total','max_total','formula'] ;

    if(detectForm(fields,this.data)===''){
      
       //  CHECK VALUE FORMULA ; 
       const res =  await doUpdateModelInfo('companies',{
         id:window.USERINFO.company_id, 
         point_formula:this.data
       }) ; 
       

    }

  }

  _onChange(name,value){
    this.data[name] = value ; 
    this._whereStateChange({
      onAction:'onChange'
    });
    

  }

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }

  componentDidMount(){
    const formulaData = window.USERINFO.point_formula !== null ? JSON.parse(window.USERINFO.point_formula)  : {};
    
    if(JSON.stringify(formulaData)!=='{}'){
      this.data = formulaData ;
      this.setState({
        onAction:'get_formula'
      });

    }


  }


  render(){

    
    return(
      <div hidden={  this.props.onTab === this.state.tab ? false : true }  >
        <div style={{padding:30}}>
           <h5 className="font-12 text-uppercase txt-green"> Thông tin chung </h5>
           <Row style={{marginTop:20}}>
              <Col md={3}>
                <FormGroup>
                  <Label for="code"> Giá trị đơn hàng (tối thiểu) <span className="text-danger">*</span></Label>
                  <InputNumeral id="min_total" defaultValue={this.data.min_total} onChange={(value)=>{ this._onChange('min_total',value) }}  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                <Label for="code"> Giá trị đơn hàng (tối đa) <span className="text-danger">*</span></Label>
                  <InputNumeral id="max_total" defaultValue={this.data.max_total} onChange={(value)=>{ this._onChange('max_total',value) }} />

                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label> Áp dụng cho khách hàng </Label>
                  <SelectListModel defaultValue={this.data.level_id} onChange={(e)=>{  this._onChange('level_id',e.target.value) }} strModel="levels" name="Tất cả"  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label> Áp dụng cho hạn mức thanh toán </Label>
                  <SelectListModelCode defaultValue={this.data.payment_code} onChange={(e)=>{ this._onChange('payment_code',e.target.value) }} strModel="payments" name="Tất cả" />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label> Công thức </Label> <br></br>
                  <ButtonGroup>
                    <Button disabled className="btn btn-success" > total_order_value /  </Button>
                    <InputNumeral defaultValue={this.data.value} style={{borderRadius:0}} id="formular" type="text" onChange={(value)=>{ this._onChange('value',value) }} />
                    <Button disabled className="btn btn-success" > = 1 điểm  </Button>
                  </ButtonGroup>
                  
                </FormGroup>
              </Col>
            </Row>

            <Row style={{marginTop:20}}>
              <Col md={3}>
                <Button onClick={this._onSubmit} style={{width:120}} className="btn btn-ubuntu"> Cập nhật </Button>
              </Col>
              
            </Row>
            
            <div style={{position:'relative',bottom:-20,marginTop:30}}  className="form-err text-muted" id="form-err"></div>

            

        </div>  
      </div>
    )
  }
}
