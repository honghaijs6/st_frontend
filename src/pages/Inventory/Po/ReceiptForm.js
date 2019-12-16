import { WAREHOUSE_TRACKS, WAREHOUSE_RECEIPT } from '../../../config/app.config';

// HOOKS
import { isExisted, detectForm } from '../../../hook/before'; 


import React, { Component } from 'react';
import {  Row, Col, FormGroup,Label, Input, Table  } from 'reactstrap';

import ViewModal from '../../../components/ViewModal'; 

import SelectListModelCode from '../../../components/SelectListModelCode';
import SelectList from '../../../components/SelectList'; 


function Info(props){  

  
  
  return( 
    <div style={{padding:10,paddingTop:30,paddingRight:10}}>
        
        
        <FormGroup>
          <Label> Loại  <span className="text-red">*</span></Label>
          <SelectList id="track_code"  defaultValue={ props.track_code } onChange={(e)=>{ props.onChange('track_code',e.target.value)  }} rows={ WAREHOUSE_TRACKS[props.type] } name="-- Chọn --" />

        </FormGroup>

        <FormGroup>
          <Label> Kho </Label>
          <SelectListModelCode id="warehouse_code" defaultValue={ props.warehouse_code } onChange={(e)=>{  props.onChange('warehouse_code',e.target.value) }} name="-- Chọn --" strModel="warehouses" />

        </FormGroup>
        
        <FormGroup>
          <Label> Trạng thái </Label>
          <SelectList 
              disabled 
              defaultValue={props.status} 
              rows={WAREHOUSE_RECEIPT} 
              onChange={(e)=>{ props.onChange('status',e.target.value) }} name="-- Chọn -- " />

        </FormGroup>
        <FormGroup>
          <Label> Ghi chú  </Label>
          <Input defaultValue={props.note} type="textarea" onChange={(e)=>{props.onChange('note',e.target.value)  }}  style={{height:100}} id="note" />
        </FormGroup>


    </div>

  )

}

function TableInfo(props){
    
  const grid = props.grid ; 
  
  

  
  return(

    <div style={{padding:'30px 10px'}}>

      <FormGroup>
        
        
        <Row className="mt-20">
          <Col md={12}>

            <Table className="product-board table vk-table">
              <thead>
                <tr>
                  { 
                    grid.colums.map((item,index)=>{
                      return(
                        <th key={index} style={{width:item.width}}>{ item.headerName } </th> 
                      )
                    })
                  }
                </tr>
              </thead>

              <tbody style={{height:420}}>

                {
                  props.cart.map((item)=>{
                    
                    const amount = parseInt(item.amount) ; 
                    const price = item.price;
                    const total = parseInt(price) * amount ;  
                    

                    return(
                      <tr key={item.id}>

                        <td style={{ width: grid['colums'][0]['width'] }}> { item.code } </td>
                        <td style={{width:grid['colums'][1]['width']}}> {item.name} </td>
                        
                        

                        <td style={{width:grid['colums'][2]['width']}}> { item.unit } </td>

                        <td style={{width:grid['colums'][3]['width']}}>
                            <Input disabled type="number" 
                              onChange={(e)=>{ props.onCardChange({row_id:item.id,field:'amount',value:e.target.value}) }} 
                              min={1} max={1000000} 
                              defaultValue={ amount } 
                            />
                        </td>

                        <td style={{width:grid['colums'][4]['width']}}></td>
                      </tr>
                    )
                  })
                }
               
              </tbody>
              <thead>
                <tr>
                    <td style={{ width: grid['colums'][0]['width'] }}> </td>
                    <td style={{ width: grid['colums'][1]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][2]['width'] }}> Tổng cộng  </td>
                    <td style={{ width: grid['colums'][3]['width'] }} className="text-red"> <span style={{fontWeight:'500'}}> { props.total } </span> </td>
                    <td style={{ width: grid['colums'][4]['width'] }} >  </td>

                 </tr>
              </thead>
              
            </Table>
          </Col>
        </Row>
      </FormGroup>
    </div>
  )
}

export default class ReceiptForm extends Component {


  constructor(props){

          super(props);
          
          this.state = {}

          this.grid = {
              colums:[
                {headerName: "Mã",width:140},
                {headerName: "Sản phẩm", width:410},
                {headerName: "ĐVT", width:120},
                {headerName: "SL", width:90},
                {headerName: "", width:90}
              ]
          }

          
          this._onChangeReceiInfo = this._onChangeReceiInfo.bind(this);
          
          this._onChange = this._onChange.bind(this); 
          this._onSubmit = this._onSubmit.bind(this);


  }

  _resetForm(){
    return {
      purchase_code:'',
      warehouse_code:'',
      type: 'in', 
      track_code:'muahang',
      status:0, // TRANG THAI ĐANG XƯ LÝ
      cart:[],
      total:0,
      note:'',
      onSuccess:false
    }
  }

  _onSubmit(){

          
        const fields = [
          'track_code','warehouse_code'
        ];
        
        if(detectForm(fields,this.state)===''){

          delete this.state.code; 

          
          if(this.state.cart.length>0){
              /// ok submit post data ;

              const data = this.state ; 
              this.model.axios(this.props.typeAction,data,(res)=>{ 
                this._whereStateChange(res);               
              });

            
          }else{
              let el = document.querySelector("#form-err");
              el.innerHTML = '<span class="text-danger"><i class="fa fa-exclamation-triangle"></i>  Vui lòng chọn sản phẩm </span>';

          }
        }


        

  }

    
  _calculateSUM(cart){

        let ret = {
            total:0,
        };
        
        cart.map((item)=>{
          // calculate
          const amount = parseInt(item.amount) ; 
          ret.total += amount;

          // end calculate
        
        }) ;
        
        return ret;

  }

  _updateCard(json){ // row_id - field - value

        let cart = this.state.cart; 
        
        cart.map((item)=>{
          if(parseInt(json.row_id) === parseInt(item.id)){
            item[json.field] = json.value; 
          }
        });
        
        const retSUM = this._calculateSUM(cart);
        
        this.setState({
          cart:cart,
          ...retSUM
        });
        

  }

  _removeCard(id){

        let cart = this.state.cart ; 
        const newCart2 = cart.filter(item=>item.id !== id) ;

        const retSUM = this._calculateSUM(newCart2);

        this.setState({
          cart:newCart2,
          ...retSUM
        });
        

  }

  _addCard(json){


        if(!isExisted(this.state.cart,json.id)){

          let cart = this.state.cart;
            
          cart.push({
            id:json.id,
            code:json.code,
            name:json.name,
            unit:json.unit_name,
            is_serial:json.is_serial,
            images:json.images,
            type:json.type,
            amount:1,
            price:json.price_1
          }); 

          const retSUM = this._calculateSUM(cart);

          this.setState({
            cart:cart,
            ...retSUM
          });

                  
        }
        
        
  }

  _onChangeReceiInfo(field,value){

        let info = this.state.receiver_info;
        Object.assign(info,{
          [field]:value
        });
        
        this.setState({
            receiver_info:info
        });
        

  }

  _onChange(name,value){
        this.setState({ 
          [name]:value
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
      
    const data = newProps.data;
    
    
    if(JSON.stringify(data)!=='{}'){
        
        
        let state = this._resetForm();
        const cart = JSON.parse(newProps.data.cart);
        
        const ret = this._calculateSUM(cart) ; 
        Object.assign(state,{
            cart:cart,
            purchase_code:data.code,
            supplier_code:data.supplier_code,
            supplier_info:data.supplier_info,
            total:ret.total
        });

        this.setState(state);
        
    }  

  }

  
  _getTitle(){
    const arrs = {
      in:'Phiếu nhập từ đơn hàng ',
      out:'Phiếu xuất'
    }

    return (
       <div>
          <span> {  arrs[this.state.type]  } </span>
          <span className="text-uppercase"> { this.state.purchase_code } </span>
       </div>
    );
  }
  render() {

    
    
    
    let FORM_NAME = this._getTitle();
    

    return (
      <ViewModal name={ FORM_NAME } isFooter={true} onSubmit={ this._onSubmit } {...this.props}  onToggle={(isOpen)=>{this.props.onToggle(isOpen)  }} >
          <Row>
              <Col md={9} >
                  <TableInfo 
                      {...this.state} 
                      grid={this.grid}
                      onCardChange={ (json)=>this._updateCard(json) } 
                      onRemoveCard={(id)=>{ this._removeCard(id) }}  
                      onSelectedProduct={(json)=>{  this._addCard(json)  }} 
                  />
              </Col>
              <Col md={3} style={{background:'#f0f0f0',borderLeft:'1px solid #ddd'}}>

                  <Info {...this.state} 
                      onChange={this._onChange}  
                  />
                  
              </Col>
          </Row>
      </ViewModal>
    );
  }
}

ReceiptForm.defaultProps = {
  receiptType:'in',
  typeAction:'post',
  onToggle:()=>{},
  onSubmitForm:()=>{}
}

