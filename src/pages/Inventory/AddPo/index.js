// DATA
import Model from '../../../model/model';
// HOOKS
import { isExisted, detectForm } from '../../../hook/before'; 
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo'; 

// LIBS 
import numeral from 'numeral';


import React, { Component } from 'react';
import { connect  } from 'react-redux';



import {  Row, Col, FormGroup,Label, Input, Table, Button, ButtonGroup  } from 'reactstrap';
import { Redirect  } from 'react-router-dom'; 



import InputNumeral from '../../../components/InputNumeral'; 
import InputSuggest from '../../../components/InputSuggest';   
import InputSuggestProduct from '../../../components/InputSuggestProduct' ; 

import SelectListModelCode from '../../../components/SelectListModelCode';



const MODE = 'purchases';



function SupplierInfo(props){

    const supInfo = props.supplier_info || {} ; 
    const receiverInfo = props.receiver_info || {}; 
    
    return( 
      <div style={{padding:24,paddingTop:30,paddingRight:10}}>
          
          <h5 className="text-uppercase font-14 txt-green">
            <Label >
             <i className="fa fa-user mr-5"></i> 
              NHÀ CUNG CẤP
            </Label>
            <span className="pull-right"> { supInfo.roots } </span>
          </h5>

          <FormGroup>
            <Label> Mã NCC  <span className="text-red">*</span></Label>
            <InputSuggest  defaultValue={ supInfo.code } onSelected={(json)=>{ props.onSelectedSupplier(json) }} strModel='suppliers' id="supplier_code"  />
          </FormGroup>
  
          <FormGroup>
            <Label> Công ty </Label>
            <Input disabled style={{background:'#fff'}} type="text" defaultValue={supInfo.name}    />
          </FormGroup>
          
          <h5 className='text-uppercase txt-green' style={{marginTop:20}}>
            <label> <i className="fa fa-truck mr-5"></i>  Thông tin nhận hàng  </label>
          </h5>

          <FormGroup>
            <Row>
                <Col md={6}>
                    <Label> Người nhận </Label>
                    <Input onChange={(e)=>{ props.onChangeReceiInfo('user_name',e.target.value) }} defaultValue={ receiverInfo.user_name } type="text" />
                </Col>
                <Col md={6}>
                    <Label> SĐT </Label>
                    <Input onChange={(e)=>{  props.onChangeReceiInfo('user_phone',e.target.value) }} defaultValue={receiverInfo.user_phone} type="text" />
                </Col>

            </Row>
          </FormGroup>

          
          <FormGroup>
            <label> 
                Địa chỉ 
            </label>
            <Input  type="text"  onChange={(e)=>{ props.onChangeReceiInfo('address',e.target.value) }} defaultValue={ receiverInfo.address}  />

          </FormGroup>

          <h5 className='text-uppercase txt-green' style={{marginTop:20}}>
            <label> <i className="fa fa-shield mr-5"></i>  Thanh toán  </label>
            <label className="float-right"> { supInfo.level_code } </label>

          </h5>

          <FormGroup> 
            <Row>
              <Col md={6}>
                <Label> Hạn mức <span className="text-red">*</span> </Label>
                <SelectListModelCode 
                    
                    strModel='payments' onChange={(e)=>{  props.onChange('payment_code',e.target.value)  }} 
                    defaultValue={props.payment_code} name="Vui Lòng Chọn" id="payment_code" />
              </Col>
              <Col>
                <Label> Thuế %  </Label>
                <Input defaultValue={ props.vat } onChange={(e)=>{ props.onChange('vat',e.target.value) }} min={0} max={50} type='number'    />
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
    const supInfo = props.supplier_info || {};

    
    return(

      <div style={{paddingRight:20}}>

        <FormGroup>
          
          <Row>
            <Col md="9">
              <InputSuggestProduct supplier_codes={ supInfo.code }  type="all" onSelected={(json)=>{ props.onSelectedProduct(json) }}    />
            

            </Col>
            <Col md="3">
              
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
                          
                          <td style={{ width:grid['colums'][2]['width'] }}>
                            {
                              item.images !== null ? <img style={{height:90,border:'1px solid #ddd'}} src={ item.images }  /> : null
                            }
                          </td>

                          <td tyle={{ width:grid['colums'][3]['width'] }}> { item.unit } </td>

                          <td style={{width:grid['colums'][4]['width']}}>
                              <Input type="number" 
                                onChange={(e)=>{ props.onCardChange({row_id:item.id,field:'amount',value:e.target.value}) }} 
                                min={1} max={1000000} 
                                defaultValue={ amount } 
                              />
                          </td>

                          <td style={{width:grid['colums'][5]['width']}}> 
                            <InputNumeral onChange={(value)=>{ props.onCardChange({row_id:item.id,field:'price',value:value}) }} defaultValue={price} />
                          </td>

                          <td style={{width:grid['colums'][6]['width']}} className="txt-green"> { numeral(total).format('0,0') }  </td>
                          <td style={{width:grid['colums'][7]['width']}} className="text-danger" > { numeral(totalWithVat).format('0,0') }  </td>

                          <td style={{width:grid['colums'][8]['width']}}>
                            <Button onClick={()=>{ props.onRemoveCard(item.id) }}  className="btn-trio"><i className="fa fa-trash"></i></Button>
                          </td>
                        </tr>
                      )
                    })
                  }
                 
                </tbody>
                
                <tfoot>

                  
                  <tr>
                    <td style={{ width: grid['colums'][0]['width'] }}> </td>
                    <td style={{ width: grid['colums'][1]['width'] }}> { supInfo.level_name } </td>
                    <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][3]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][4]['width'] }}> </td>
                    <td style={{ width: grid['colums'][5]['width'] }}> 
                      <span className="txt-bold font-14" > Giảm </span>  
                    </td>
                    <td style={{ width: grid['colums'][6]['width'] }} className="txt-green"> 
                      <span className="txt-bold font-14" >  { numeral(props.level_discount).format('0,0')+' đ' } </span>  
                    </td>
                    <td style={{ width: grid['colums'][7]['width'] }} className="text-danger">  </td>
                    <td style={{ width: grid['colums'][8]['width'] }}>  </td>
                  </tr>
                  
                  <tr>
                    <td style={{ width: grid['colums'][0]['width'] }}> </td>
                    <td style={{ width: grid['colums'][1]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][3]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][4]['width'] }}> </td>
                    <td style={{ width: grid['colums'][5]['width'] }}> 
                      <span className="txt-bold font-14" > Tổng cộng </span>  
                    </td>
                    <td style={{ width: grid['colums'][6]['width'] }} className="txt-green"> 
                      <span className="txt-bold font-14"> { numeral(props.total_sum).format('0,0')+' đ' } </span>  
                    </td>
                    <td style={{ width: grid['colums'][7]['width'] }} className="text-danger"> <label>  </label> </td>
                    <td style={{ width: grid['colums'][8]['width'] }}>  </td>
                  </tr>

                  <tr>
                    <td style={{ width: grid['colums'][0]['width'] }}> </td>
                    <td style={{ width: grid['colums'][1]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][3]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][4]['width'] }}> </td>
                    <td style={{ width: grid['colums'][5]['width'] }}> 
                      <span className="text-danger font-14 txt-bold"> Thuế { props.vat+'%' } </span>  
                    </td>
                    <td style={{ width: grid['colums'][6]['width'] }} className="text-danger"> 
                      <span className="txt-bold font-14"> { numeral(props.total_vat).format('0,0')+' đ' } </span>  
                    </td>
                    <td style={{ width: grid['colums'][7]['width'] }} className="text-danger"></td>
                    <td style={{ width: grid['colums'][8]['width'] }}>  </td>
                  </tr>

                  <tr>
                    <td style={{ width: grid['colums'][0]['width'] }}> </td>
                    <td style={{ width: grid['colums'][1]['width'] }}> </td>
                    <td style={{ width: grid['colums'][2]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][3]['width'] }}>  </td>
                    <td style={{ width: grid['colums'][4]['width'] }}> </td>
                    <td style={{ width: grid['colums'][5]['width'] }}> 
                      <span className="txt-bold font-14"> Thành tiền </span>  
                    </td>
                    <td style={{ width: grid['colums'][6]['width'] }} className="txt-green"> 
                      <span className="txt-bold font-14"> { numeral(props.total_sum_vat).format('0,0')+' đ' } </span>  
                    </td>
                    <td style={{ width: grid['colums'][7]['width'] }} className="text-danger">  </td>
                    <td style={{ width: grid['colums'][8]['width'] }}>  </td>
                  </tr>


                  
                </tfoot>


              </Table>
            </Col>
          </Row>
        </FormGroup>
      </div>
    )
}


class CreatePO extends Component {

    constructor(props){

        super(props);
        
        this.state = {
            
            supplier_code:'',
            supplier_info:{},
            receiver_info:{},
            cart:[], 
            vat:10,
            payment_code:'',
            note:'',
            total_sum:0,
            total_vat:0,
            total_sum_vat:0, 
            belong_user:'',
            promotion_discount:0,
            onSuccess:false
        }

        this.grid = {
            colums:[
              {headerName: "Mã",width:100},
              {headerName: "Sản phẩm", width:250},
              {headerName: "Hình Ảnh",width:140},
              {headerName: "ĐVT", width:120},
              {headerName: "SL", width:100},
              {headerName: "Đơn giá", width:150},
              {headerName: "Thành tiền", width:150},
              {headerName: "+VAT", width:150},
              {headerName: "", width:70}
            ]
        }

        this._onSelectedSupplier = this._onSelectedSupplier.bind(this);
        this._onChangeReceiInfo = this._onChangeReceiInfo.bind(this);
        
        this._onChange = this._onChange.bind(this); 
        this._onSubmit = this._onSubmit.bind(this);


    }

    _onSubmit(){

      
        const fields = [
          'supplier_code','vat','payment_code',  
        ];
        
        if(detectForm(fields,this.state)===''){
          
           if(this.state.cart.length>0){
              /// ok submit post data ;
  
              const data = this.state ; 
              const supInfo = data.supplier_info; 
              
              data.supplier_info = {
                id:supInfo.id,
                code:supInfo.code,
                name:supInfo.name,
                address:supInfo.address,
                phone:supInfo.phone,
                roots:supInfo.roots,
                tax_no:supInfo.tax_no,
                email:supInfo.email
              }
              
              this.model.axios('post',data,(res)=>{ 
                this._whereStateChange(res);               
              });
             
           }else{
              let el = document.querySelector("#form-err");
              el.innerHTML = '<span class="text-danger"><i class="fa fa-exclamation-triangle"></i>  Vui lòng chọn sản phẩm </span>';
  
           }
        }
  
  
        
  
    }

    _onSelectedSupplier(json){


        this.setState({
          supplier_code:json.code,
          supplier_info:json,
          cart:[],
          total_sum:0,
          total_vat:0,
          total_sum_vat:0

        });
        
        
    }

    _calculateSUM(cart){

        let ret = {
          total_sum:0,
          total_sum_vat:0,
          total_vat:0,
          promotion_discount:0
        };
        
        cart.map((item)=>{
          // calculate
          const amount = parseInt(item.amount) ; 
          const price = item.price;
          const total = parseInt(price) * amount ;  
          ret.total_sum += total;
  
          const totalWithVat = (total * (parseInt(this.state.vat) / 100)) + total ;
          ret.total_sum_vat += totalWithVat ;             
          // end calculate
            
         
        }) ;
  
        // SUMARY 
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
        this.model = new Model(MODE,this.props.dispatch); 

        // GET COMPANY INFO
        const res = await doGetModelInfo('companies',window.USERINFO.company_id); 
        if(res.name==='success'){
           let receiver_info = res.data.warehouse_setting ; 
           receiver_info = receiver_info !== null ? JSON.parse(receiver_info) : {}

           this.setState({
             receiver_info:receiver_info
           });
          
        }
        
        
    }

    _whereStateChange(res){

        if(res.name==='success' || res.name ==='ok'){
          this.setState({
            onSuccess:true
          });
        }
        
    }

      
    render() {
        
        return this.state.onSuccess === false ?  (
            <div className="animated fadeIn">
                <main className="div-croll" style={{border:0, marginTop: 20}}>
                    <Row style={{height:'90vh'}}>
                        <Col md={3} style={{background:'#f0f0f0',borderRight:'1px solid rgba(0,0,0,0.1)'}}>
                            <SupplierInfo {...this.state} 
                                onChange={this._onChange}  
                                onSelectedSupplier={ this._onSelectedSupplier }  
                                onChangeReceiInfo={(field,value)=>{ this._onChangeReceiInfo(field,value) }}
                            />
                            
                        </Col>
                        <Col style={{padding:30,background:'#fff'}} md={9}>
                            <TableInfo 
                                {...this.state} 
                                grid={this.grid}
                                onCardChange={ (json)=>this._updateCard(json) } 
                                onRemoveCard={(id)=>{ this._removeCard(id) }}  
                                onSelectedProduct={(json)=>{  this._addCard(json)  }} 
                            />

                            <Button style={{width:120}} onClick={ this._onSubmit } className="btn btn-ubuntu-ok bg-green ">
                              <i className="fa  fa-chevron-circle-right mr-5"></i> Đồng Ý 
                            </Button>
                            
                            <span className="ml-10 form-err" id="form-err"></span>

                        </Col>
                    </Row>
                </main>
            </div>
        ): <Redirect to="/inventory/po"/>

    }
}

const mapStateToProps = (state) => {
    return {
       [MODE] : state.purchases
    }
}

export default connect(mapStateToProps)(CreatePO);
      