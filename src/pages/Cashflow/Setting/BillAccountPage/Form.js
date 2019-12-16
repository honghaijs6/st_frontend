
import { BILL_ACC_TYPES } from '../../../../config/app.config';
// HOOKS
import detectForm from '../../../../hook/before/detectform'; 
import React, { Component } from 'react';

import { Row, Col, FormGroup, Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,

} from 'reactstrap'; 

import SelectList from '../../../../components/SelectList';


import ViewModal from '../../../../components/ViewModal';

export default class MyForm extends Component{

  constructor(props){
    super(props);

    this.state = {

      isSelectCk:false
    }

    this._onSubmit = this._onSubmit.bind(this);
    this._onChangeType = this._onChangeType.bind(this);

  }

  _resetForm(){
    return {
      type:'tm',
      name:'',
      bank_no:'',
      bank_name:'',
      note:''

    }
  }

  _onChangeType(e){
    this.setState({
      type:e.target.value,
      isSelectCk:  e.target.value === 'ck' ? true : false 
    })
  }
  _onSubmit(){
    
    const fields = ['type','name'];
    if(detectForm(fields,this.state)===''){
      
      this.props.model.axios(this.props.typeAction,this.state,(res)=>{
        if(res.name==='success' || res.name==='ok'){
          this.props.onSubmitForm(res);
        }
      })
    }

  }
  
  componentWillReceiveProps(newProps){
    
    let state = newProps.typeAction === 'post' ? this._resetForm() : newProps.data; 
    state.isSelectCk = state.type === 'ck' ? true : false;
    
    this.setState(state);

  }
  
  render(){
    return(
      <ViewModal isFooter={true} onSubmit={ this._onSubmit } {...this.props} onToggle={(isOPen)=>{ this.props.onToggle(isOPen) }} >
        <div className="view-modal-body">

          <FormGroup>
            <Row>
              <Col md={4}>
                <label> Loại <span className="text-red">*</span></label>
                <SelectList onChange={ this._onChangeType } id="type" defaultValue={ this.state.type } name="Vui lòng chọn" rows={ BILL_ACC_TYPES } />

              </Col>
              <Col md={8}>
                <label> Tên <span className="text-red">*</span> </label>
                <Input id="name" defaultValue={ this.state.name } onChange={(e)=>{ this.setState({name:e.target.value}) }}  />

              </Col>
            </Row>
          </FormGroup>
          
          <FormGroup style={{display: !this.state.isSelectCk  ? 'none':'block' }} >
            <Row>
              <Col md={4}>
                <label> Số tài khoản <span className="text-red">*</span> </label>
                <Input id="bank_no" onChange={(e)=>{ this.setState({bank_no:e.target.value}) }} defaultValue={ this.state.bank_no } />
              </Col>
              <Col md={8}  >
                <label> Ngân hàng <span className="text-red">*</span> </label>
                <Input id="bank_name" onChange={(e)=>{ this.setState({bank_name:e.target.value}) }} defaultValue={ this.state.bank_name } />
              </Col>
            </Row>
          </FormGroup>

          <FormGroup>
            <Row>
              <Col md={12}>
                <label> Ghi chú </label>
                <Input defaultValue={ this.state.note } onChange={(e)=>{ this.setState({note:e.target.value}) }} style={{ height:100}} type="textarea" />
              </Col>
            </Row>
          </FormGroup>

        </div>
      </ViewModal>
    )
  }
}


MyForm.defaultProps = {
  onToggle:()=>{},
  onSubmitForm:()=>{},
  typeAction:'post' 
}
