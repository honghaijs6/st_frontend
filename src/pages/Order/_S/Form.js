'use strict'

import { isExisted, detectForm } from '../../../hook/before'; 
import React, { Component } from 'react';


import {  Row, Col, FormGroup,Label, Input, Table, Button, ButtonGroup  } from 'reactstrap';


import numeral from 'numeral';

import InputNumeral from '../../../components/InputNumeral'; 
import InputSuggestProduct from '../../../components/InputSuggestProduct' ; 

import SelectListModelCode from '../../../components/SelectListModelCode';
import ButtonExpand from '../../../components/ButtonExpand'; 


import FormAddOn from './FormAddOn'; 
import ViewModal from '../../../components/ViewModal';




const MODE = 'orders';
function CustomerInfo(props){

  const cusInfo = props.customer_info ; 
  
  return( 
    <div style={{padding:'30px 6px',paddingBottom:0}}>
        <h5 className="text-uppercase font-14 text-green">

          <Label >
           <i className="fa fa-user mr-5"></i> 
            KHÁCH HÀNG 
          </Label>
          <span className="float-right"> { cusInfo.type_name } </span>
                      
        </h5>

        <FormGroup>
          <Label> Mã KH </Label>
          <Input type="text" disabled style={{background:'#fff'}} defaultValue={cusInfo.code} />
          
        </FormGroup>

        <FormGroup>
          <Label> Công ty </Label>
          <Input  type="text" defaultValue={cusInfo.name}    />
        </FormGroup>

        <FormGroup>
          <Row>
            <Col md="6">
              <Label> MST </Label>
              <Input  defaultValue={cusInfo.tax_no} type="text"   />
            </Col>
            <Col>
              <Label> Thuế VAT </Label>
              <Input  type="number" min={0} max={50} defaultValue={ props.vat } onChange={(e)=>{ props.onChange('vat',e.target.value) }} id="vat"  />
            </Col>
          </Row>
        </FormGroup>

        <h5 className='text-uppercase text-green' style={{marginTop:20}}>
          <label> <i className="fa fa-truck mr-5"></i>  Giao hàng  </label>
        </h5>
        <FormGroup>
          <label> 
              Địa chỉ giao hàng  
          </label>
          <Input  type="text" onChange={(e)=>{ props.onChangeCusInfo('address_delivery',e.target.value) }} defaultValue={ cusInfo.address_delivery}  />


        </FormGroup>

        <h5 className='text-uppercase text-green' style={{marginTop:20}}>
          <label> <i className="fa fa-shield mr-5"></i>  Thanh toán  </label>
          <label className="float-right"> { cusInfo.level_code } </label>

        </h5>

        <FormGroup> 
          <Row>
            <Col md={8}>
              <Label> Hạn mức thanh toán </Label>
              <SelectListModelCode 
                  
                  strModel='payments' onChange={(e)=>{  props.onChange('payment_code',e.target.value)  }} 
                  defaultValue={props.payment_code} name="Vui Lòng Chọn" id="payment_code" />
            </Col>
            <Col md={4}>
              <Label> Giảm % </Label>
              <Input disabled  style={{background:'#fff'}}  type='text' defaultValue={ cusInfo.benefit_discount === null ? 0 : cusInfo.benefit_discount }  />
            </Col>
          </Row>
         
          
        </FormGroup>
        
        <FormGroup>
          <Label> Ghi chú  </Label>
          <Input type="textarea"  defaultValue={ props.note } onChange={(e)=>{  props.onChange('note',e.target.value)  }} style={{height:100}} id="note" />
        </FormGroup>


    </div>

  )

}


function TableInfo(props){
    
  const grid = props.grid ; 
  
  
  const cusInfo = props.customer_info;

  return(

    <div style={{padding:'30px 10px',paddingBottom:0}}>

      <FormGroup>
        
        <Row>
          <Col md="9">
            <InputSuggestProduct  type="root" onSelected={(json)=>{ props.onSelectedProduct(json) }} defaultValue={props.main_code}   />
          </Col>
          <Col md="3">
            <ButtonGroup>
              <ButtonExpand width={720} name="SP Phụ" icon="fa-tags">
                  <FormAddOn onSelected={(json)=>{ props.onSelectedProduct(json) }} main_code={props.main_code} type='none-root' />
              </ButtonExpand>
              <ButtonExpand width={720} name="Phần mềm" icon="fa-desktop">
                    <FormAddOn onSelected={(json)=>{ props.onSelectedProduct(json) }} main_code={props.main_code} type='root-software' />
              </ButtonExpand>
              <ButtonExpand width={720} name="Dịch vụ" icon="fa-plus">
                  <FormAddOn onSelected={(json)=>{ props.onSelectedProduct(json) }} main_code={props.main_code} type='root-service' />
              </ButtonExpand>
            </ButtonGroup>
          </Col>
        </Row>

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
                    const totalWithVat = (total * (parseInt(props.vat) / 100)) + total ;
                    

                    return(
                      <tr key={item.id}>

                        <td style={{ width: grid['colums'][0]['width'] }}> { item.code } </td>
                        <td style={{width:grid['colums'][1]['width']}}> {item.name} </td>
                        
                        <td tyle={{ width:grid['colums'][2]['width'] }}> Cái </td>

                        <td style={{width:grid['colums'][3]['width']}}>
                            <Input type="number" 
                              onChange={(e)=>{ props.onCardChange({row_id:item.id,field:'amount',value:e.target.value}) }} 
                              min={1} max={1000000} 
                              defaultValue={ amount } 
                            />
                        </td>

                        <td style={{width:grid['colums'][4]['width']}}> 
                          <InputNumeral onChange={(value)=>{ props.onCardChange({row_id:item.id,field:'price',value:value}) }} defaultValue={price} />
                        </td>

                        <td style={{width:grid['colums'][5]['width']}} className="text-green"> { numeral(total).format('0,0') }  </td>
                        <td style={{width:grid['colums'][6]['width']}} className="text-danger" > { numeral(totalWithVat).format('0,0') }  </td>

                        <td style={{width:grid['colums'][7]['width']}}>
                          <button className="bg-green " style={{color:'#fff', border:0, width:24, height:24, borderRadius:'50%'}} onClick={()=>{ props.onRemoveCard(item.id) }} ><i className="fa fa-trash"></i></button>
                        </td>
                      </tr>
                    )
                  })
                }
               
              </tbody>
              
              <tfoot>

                
                <tr>
                  <td style={{ width: grid['colums'][0]['width'] }}> </td>
                  <td style={{ width: grid['colums'][1]['width'] }}> { cusInfo.level_name } </td>

                  <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                  <td style={{ width: grid['colums'][3]['width'] }}> </td>
                  <td style={{ width: grid['colums'][4]['width'] }}> 
                    <span className="txt-bold font-14" > Giảm </span>  
                  </td>
                  <td style={{ width: grid['colums'][5]['width'] }} className="text-green"> 
                    <span className="txt-bold font-14" >  { numeral(props.level_discount).format('0,0')+' đ' } </span>  
                  </td>
                  <td style={{ width: grid['colums'][6]['width'] }} className="text-danger">  </td>
                  <td style={{ width: grid['colums'][7]['width'] }}>  </td>
                </tr>
                
                <tr>
                  <td style={{ width: grid['colums'][0]['width'] }}> </td>
                  <td style={{ width: grid['colums'][1]['width'] }}>  </td>
                  
                  <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                  <td style={{ width: grid['colums'][3]['width'] }}> </td>
                  <td style={{ width: grid['colums'][4]['width'] }}> 
                    <span className="txt-bold font-14" > Tổng cộng </span>  
                  </td>
                  <td style={{ width: grid['colums'][5]['width'] }} className="text-green"> 
                    <span className="txt-bold font-14"> { numeral(props.total_sum).format('0,0')+' đ' } </span>  
                  </td>
                  <td style={{ width: grid['colums'][6]['width'] }} className="text-danger"> <label>  </label> </td>
                  <td style={{ width: grid['colums'][7]['width'] }}>  </td>
                </tr>

                <tr>
                  <td style={{ width: grid['colums'][0]['width'] }}> </td>
                  <td style={{ width: grid['colums'][1]['width'] }}>  </td>

                  <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                  <td style={{ width: grid['colums'][3]['width'] }}> </td>
                  <td style={{ width: grid['colums'][4]['width'] }}> 
                    <span className="text-danger font-14 txt-bold"> Thuế { props.vat+'%' } </span>  
                  </td>
                  <td style={{ width: grid['colums'][5]['width'] }} className="text-danger"> 
                    <span className="txt-bold font-14"> { numeral(props.total_vat).format('0,0')+' đ' } </span>  
                  </td>
                  <td style={{ width: grid['colums'][6]['width'] }} className="text-danger"></td>
                  <td style={{ width: grid['colums'][7]['width'] }}>  </td>
                </tr>

                <tr>
                  <td style={{ width: grid['colums'][0]['width'] }}> </td>
                  <td style={{ width: grid['colums'][1]['width'] }}> </td>

                  <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                  <td style={{ width: grid['colums'][3]['width'] }}> </td>
                  <td style={{ width: grid['colums'][4]['width'] }}> 
                    <span className="txt-bold font-14"> Thành tiền </span>  
                  </td>
                  <td style={{ width: grid['colums'][5]['width'] }} className="text-green"> 
                    <span className="txt-bold font-14"> { numeral(props.total_sum_vat).format('0,0')+' đ' } </span>  
                  </td>
                  <td style={{ width: grid['colums'][6]['width'] }} className="text-danger">  </td>
                  <td style={{ width: grid['colums'][7]['width'] }}>  </td>
                </tr>


                
              </tfoot>


            </Table>
          </Col>
        </Row>
      </FormGroup>
    </div>
  )
}


export default class MyForm extends Component {

  
  constructor(props){
    super(props);
    
    this.state = {
      id:0,
      customer_code:'',
      customer_info:{},
      cart:[], 
      vat:10,
      payment_code:'',
      note:'',
      main_code:'',
      total_sum:0,
      total_vat:0,
      total_sum_vat:0,
      belong_user:'',
      level_discount:0,
      promotion_discount:0,
      onSuccess:false
    
    }

    this.model = props.model ; 


    this.grid = {
      colums:[
        {headerName: "Mã",width:100},
        {headerName: "Sản phẩm", width:450},
        {headerName: "ĐVT", width:100},  
        {headerName: "SL", width:100},
        {headerName: "Đơn giá", width:140},
        {headerName: "Thành tiền", width:150},
        {headerName: "+VAT", width:150},
        {headerName: "", width:50}
      ]
    }

    

    
    this._addCard = this._addCard.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSelectedCustomer = this._onSelectedCustomer.bind(this) ; 
    
    this._onSubmit = this._onSubmit.bind(this);


  }

  _onSubmit(){

      
    const fields = [
      'customer_code','vat','payment_code',
    ];
    
    if(detectForm(fields,this.state)===''){
       if(this.state.cart.length>0){
          /// ok submit post data ;

          const data = this.state ; 
          const cusInfo = data.customer_info; 

          delete data.main_code; 
          data.customer_info = {
            id:cusInfo.id,
            code:cusInfo.code,
            name:cusInfo.name,
            contact_name:cusInfo.contact_name,
            phone:cusInfo.phone,
            address_delivery:cusInfo.address_delivery,
            level_code:cusInfo.level_code,
            customer_original:cusInfo.customer_original,
            customer_status:cusInfo.customer_status,
            ref_price:cusInfo.ref_price,
            type_name:cusInfo.type_name,
            tax_no:cusInfo.tax_no,
            city:cusInfo.city,
            belong_user:cusInfo.belong_user,
            benefit_discount:cusInfo.benefit_discount,
            discount_for:cusInfo.discount_for
          }
          
          this.model.axios('put',data,(res)=>{ 
            this._whereStateChange(res);               
          });
         
       }else{
          let el = document.querySelector("#form-err");
          el.innerHTML = '<span class="text-danger"><i class="fa fa-exclamation-triangle"></i>  Vui lòng chọn sản phẩm </span>';

       }
    }
    

  }

  _onSelectedCustomer(json){

      
    this.setState({
      customer_code:json.code,
      belong_user:json.belong_user,
      customer_info:json,
      cart:[],
      total_sum:0,
      total_vat:0,
      total_sum_vat:0,
      level_discount:0
    });
    
    
  }

  _calculateSUM(cart){

    let ret = {
      total_sum:0,
      total_sum_vat:0,
      total_vat:0,
      level_discount:0 ,
      promotion_discount:0
    };

    const benefit_discount = this.state.customer_info.benefit_discount === null ? 0 : parseInt(this.state.customer_info.benefit_discount) ;
    const discount_for = this.state.customer_info['discount_for'];

    let TOTAL_SUM_1 = 0 ;

    
    cart.map((item)=>{
      // calculate
      const amount = parseInt(item.amount) ; 
      const price = item.price;
      const total = parseInt(price) * amount ;  
      ret.total_sum += total;

      const totalWithVat = (total * (parseInt(this.state.vat) / 100)) + total ;
      ret.total_sum_vat += totalWithVat ;             
      // end calculate

      // PRODUCT TYPE 
      if(discount_for!=='all'){
        if(item.type===discount_for){
          const total_1 = parseInt(price) * amount ; 
          TOTAL_SUM_1 += total_1; 
          ret.level_discount = TOTAL_SUM_1 * ( benefit_discount / 100 );
          
        }
      }
      // END PRODUCT TYPE
    }) ;

    // SUMARY 
    ret.total_sum = ret.total_sum - ret.level_discount ; 
    ret.total_vat = ret.total_sum * ( parseInt(this.state.vat)/100 );

    ret.total_sum_vat = ret.total_sum + ret.total_vat;
    
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
      // LẤY GIÁ TỪ THÔNG TIN KHÁCHNG HÀNG 
      const price =  json['price_'+this.state.customer_info['ref_price']] || 0 ;   
      const main_code = json.type ==='root' ? json.code : this.state.main_code 
      
      cart.push({
        id:json.id,
        code:json.code,
        name:json.name,
        unit:json.unit_name,
        is_serial:json.is_serial,
        guran_month:json.guran_month,
        images:json.images,
        content:json.content,
        type:json.type,
        amount:1,
        price:price
      }); 

      const retSUM = this._calculateSUM(cart);

      this.setState({
        cart:cart,
        main_code:main_code,
        ...retSUM
      });

              
    }
    
    
  }

  _onChangeCusInfo(field,value){

    let cusInfo = this.state.customer_info;
    Object.assign(cusInfo,{
       [field]:value
    });

    this.setState({
      customer_info:cusInfo
    });
     

  }


  _onChange(name,value){
    this.setState({
      [name]:value
    });
    
  } 
  

  _whereStateChange(res){

   if(res.name==='success' || res.name ==='ok'){

      // pass back to parent
      this.props.onSubmit(res.name);
      
   }
   
  }

  componentWillReceiveProps(newProps){


   if(JSON.stringify(newProps.data) !=='{}'){

      const data = newProps.data;
      const cusInfo = JSON.parse(data.customer_info);

      const total_vat = parseFloat(data.total_sum) * ( data.vat / 100 );
      
    

      this.setState({ 
        
        id:data.id,
        customer_code:cusInfo.code,
        customer_info:cusInfo,
        cart:JSON.parse(data.cart),
        vat:data.vat,
        payment_code:data.payment_code,
        note:data.note,
        main_code:'',
        total_sum:data.total_sum,
        total_vat:total_vat,
        total_sum_vat:data.total_sum_vat,
        belong_user:data.belong_user,
        level_discount:data.level_discount,
        promotion_discount:data.promotion_discount
      });
      
   }

  }
  

  render(){
    
     return(
       <ViewModal {...this.props} onToggle={(isOpen)=>{  this.props.onToggle(isOpen)}}  >
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
                <CustomerInfo {...this.state} 
                      onChange={this._onChange}  
                      onSelectedCustomer={ this._onSelectedCustomer }  
                      onChangeCusInfo={(field,value)=>{  this._onChangeCusInfo(field,value)  }}  
                  />
              </Col>
          </Row>
          <div style={{borderTop:'1px solid #ddd',padding:20}}>
              <Button style={{width:120}} onClick={ this._onSubmit } className="btn btn-ubuntu-ok bg-green ">
              <i className="fa  fa-chevron-circle-right mr-5"></i> Đồng Ý 
            </Button>
            <span className="ml-10 form-err" id="form-err"></span>             
          </div>
       </ViewModal>
     )
  }

 }

 MyForm.defaultValue = {
   onToggle:()=>{}
 }
