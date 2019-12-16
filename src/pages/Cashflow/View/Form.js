
// HOOKS 
import detectForm from '../../../hook/before/detectform';

import React, { Component } from 'react';
import {  Row, Col, FormGroup, Input  } from 'reactstrap';


import ViewModal from '../../../components/ViewModal'; 

import InputNumeral from '../../../components/InputNumeral';


import SelectList from '../../../components/SelectList';
import SelectListModel from '../../../components/SelectListModel';

const FROM_OBJECTS = [
    {code:'inv_code',name:'Đơn hàng bán số INV'},
    {code:'po_code',name:'Đơn hàng mua Số PO'},
    {code:'user_code',name:'Nhân viên'},
    {code:'other_code',name:'Khác'},
]


export default class MyForm extends Component {
    

    constructor(props){
        super(props);

        this.state = {}

        this._onChange = this._onChange.bind(this) ; 
        this._onSubmit = this._onSubmit.bind(this);

    }


    _resetForm(){


        return {
          from_type:'inv_code',
          ref_code:'',
          refcode_name:'Đơn hàng bán số INV',
          person_name:'',
          person_address:'',
          total:0,
          total_before:0,
          bill_account_id:0,
          bank_ref:'',
          reason:'',
          type:this.props.receiptType, 
          note:''

        }
    }
      
    _onSubmit(){
        const fields = [
            'from_type','ref_code','person_name','person_address','total','bill_account_id','reason'
        ];
          
        if(detectForm(fields,this.state)===''){
            
            const data = this.state ; 
            this.model.axios(this.props.typeAction,data,(res)=>{ 
                this._whereStateChange(res);               
            });

        }

    }
    
    _onChange(name,value){
        this.setState({ 
          [name]:value
        });
        
    }

    _onObjectChange(code){
        
        const refcode_name = FROM_OBJECTS.map((item)=>{  if(item.code===code){ return item.name } })
        
        this.setState({
            refcode_name:refcode_name,
            from_type:code
        });



    }
    async componentDidMount(){
        // INIT ORDERS MODEL
        this.model =  this.props.model;  
        
        
    }

    _whereStateChange(res){

        if(res.name==='success' || res.name ==='ok'){
          this.props.onSubmitForm(res);
        }
        
    }
    componentWillReceiveProps(newProps){
      
        if(newProps.typeAction==='put'){
  
          const data = newProps.data; 
            
          const state = {
            
            id:data.id,
            code:data.code,
            from_type:data.from_type,
            ref_code:data.ref_code,
            person_name:data.person_name,
            person_address:data.person_address,
            total:data.total,
            total_before:data.total_before,
            bill_account_id:data.bill_account_id,
            bank_ref:data.bank_ref,
            reason:data.reason,
            type:data.type, 
            note:data.note
            
          }
          
          this.setState(state);
  
        }else{
  
  
          let state = this._resetForm();
          state.type = newProps.receiptType;
          state.code = '';
          this.setState(state); 

          
        
        }
  
        
  
    }

    _getTitle(){

        const arrTitle = {
            pt:'Phiếu thu',
            pc:'Phiếu chi'
        }
        
        return arrTitle[this.props.receiptType] +' '+ this.state.code ;
    }
    render() {

        const title = this._getTitle();

        return ( 
            <ViewModal name={title}  isFooter={true} {...this.props} onSubmit={this._onSubmit}  onToggle={(isOpen)=>{ this.props.onToggle(isOpen) }}>
                <div className="view-modal-body">
                    <FormGroup>
                        <Row>
                            
                            <Col md={4}>    
                                <label> Đối tượng </label>
                                <SelectList 
                                    disabled={ this.props.typeAction === 'post' ? false : true }
                                    onChange={(e)=>{ this._onObjectChange(e.target.value) }} 
                                    defaultValue={ this.state.from_type } id="from_type" name="Vui lòng chọn"
                                    rows={ FROM_OBJECTS } 
                                />
                            </Col>

                            <Col md={4}>
                                <label> { this.state.refcode_name } </label>
                                <Input onChange={(e)=>{  this._onChange('ref_code',e.target.value) }} defaultValue={this.state.ref_code} type="text" id="ref_code" />
                            </Col>
                            
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={4}>
                                <label> Tên đơn vị </label>
                                <Input defaultValue={this.state.person_name} onChange={(e)=>{  this._onChange('person_name',e.target.value) }} id="person_name" type="text" />
                            </Col>
                            <Col md={8}>
                                <label> Địa chỉ </label>
                                <Input 
                                    defaultValue={this.state.person_address} 
                                    onChange={(e)=>{  this._onChange('person_address',e.target.value) }} id="person_address" type="text" 
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={4}>
                                <label className="text-red"> Số tiền </label>
                                <InputNumeral defaultValue={this.state.total} onChange={(value)=>{  this._onChange('total',value) }} id="total"  style={{color:'#DD4B59'}} />
                            </Col>
                            <Col md={4}>
                                <label> Loại tài khoản </label>
                                <SelectListModel id="bill_account_id" 
                                    onChange={(e)=>{  this._onChange('bill_account_id',e.target.value) }} name="Vui lòng chọn" strModel="bill_accounts" 
                                    defaultValue={this.state.bill_account_id}
                                />
                            </Col>
                            <Col md={4}> 
                                <label> Kèm theo </label>
                                <Input defaultValue={this.state.bank_ref} onChange={(e)=>{  this._onChange('bank_ref',e.target.value) }} id="bank_ref" type="text" />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={8}>
                                <label> Lý do  </label>
                                <Input defaultValue={this.state.reason} onChange={(e)=>{  this._onChange('reason',e.target.value) }} id="reason" type="text" />
                            </Col>
                        </Row>
                        <Row style={{marginTop:20}}>
                            <Col md={8}>
                                <label>Ghi chú</label>
                                <Input defaultValue={this.state.note} id="note" onChange={(e)=>{  this._onChange('note',e.target.value) }} style={{height:100}} type="textarea" />
                            </Col>
                        </Row>
                    </FormGroup>


                </div>
            </ViewModal>
        );
    }
}

MyForm.defaultProps = {
  receiptType:'pt',
  typeAction:'post',
  onToggle:()=>{},
  onSubmitForm:()=>{}

}