import  detectForm from '../../../hook/before/detectform';
import { ISERVICE_TYPES } from '../../../config/app.config';

// LIBS 
import moment from 'moment';
import numeral from 'numeral';
import {myTime} from '../../../hook/ultil/myTime';



import React, { Component } from 'react';
import {  Row, Col, FormGroup, Input, ButtonGroup, Button  } from 'reactstrap';

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



import SelectList from '../../../components/SelectList';
import InputSuggestOrder from '../../../components/InputSuggestOrder'
import InputSuggest from '../../../components/InputSuggest';
import InputSuggestProduct from '../../../components/InputSuggestProduct';
import BenTable from '../../../components/BenTable';


import SelectHour from '../../../components/SelectHour';
import SelectMinute from '../../../components/SelectMinute'; 



import ViewModal from '../../../components/ViewModal';


const FROM_OBJECTS = [
    {code:'inv_code',name:'Đơn hàng bán'},
    {code:'customer_code',name:'Khách hàng'}   
]


export default class MyForm extends Component {



    constructor(props){
        super(props);

        this.state = {

            code:'',
            customer_info:{
                name:'',
                address_delivery:'',
                phone:''
            },
            startDate: new Date( myTime.curDateEn() ),
            hour:0,
            minute:0,
            
        }


        this.grid = {
            colums:[
                { headerName:'Mã', field:'code', width:'100px' },
                { headerName:'Dịch vụ', field:'name', width:'200px' },
                { headerName:'Đơn giá', field:'price', width:'90px' }
            ],
            rowData:[]
        }

        this._onChange = this._onChange.bind(this) ; 
        this._onSubmit = this._onSubmit.bind(this);
        


    }

    
    _clearCart = ()=>{
        this.grid.rowData = [] ;
        this.setState({
            status:'_clearCart'
        })
    }
    
    _addCart(json){
        
        const item = {
            id:json.id,
            code:json.code,
            unit:json.unit_name,
            name:json.name,
            price:numeral(json.price_4).format('0,0'),
            amount:1,
        }

        this.grid.rowData.push(item);
        this.setState({
            status:'_addCart'
        });


    }
    _onSubmit(){
        const fields = [
            'from_type','ref_code','belong_user','content_issue'
        ];
          
        if(detectForm(fields,this.state)===''){
            
            const date_arrived = moment(this.state.startDate).format('YYYY-MM-DD')  +' '+this.state.hour+':'+this.state.minute;
            let data = this.state ; 

            data.date_arrived = date_arrived;
            data.cart = this.grid.rowData;


            delete data.startDate;
            delete data.hour;
            delete data.minute;
            
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



    _getTitle(){

        const type = this.props.receiptType === '' ? 'osv':this.props.receiptType; 
        
        return ISERVICE_TYPES[type]['name'] ;

    }

    _resetForm(){

        this.grid.rowData = [] ;

        return {

            type:this.props.receiptType, 
            from_type:'inv_code',
            ref_code:'',
            refcode_name:'Đơn hàng bán',
            customer_code:'',
            customer_info:{
                name:'',
                address_delivery:'',
                phone:''
            },
            content_issue:'',
            belong_user:'',
            cart:[]

          
        }
    }

    
    _onChangeRefcodeCustomer(item){
          
            
        this.setState({
            ref_code:item.code,
            customer_code:item.code,
            customer_info:{
                name:item.name,
                address_delivery:item.address,
                phone:item.phone
            },
            
        });

        
    }
    _onChangeRefcode(item){
        
        
        const cusInfo = JSON.parse(item.customer_info);
        
        this.setState({
            ref_code:item.code_pi,
            customer_code:cusInfo.code,
            customer_info:cusInfo
        });

    }
    _onCustomerChange(name,value){
        let cusInfo = this.state.customer_info;
        cusInfo[name] = value;

        this.setState({
            customer_info:cusInfo
        })
    }

    _onObjectChange(code){
        
        const refcode_name = FROM_OBJECTS.map((item)=>{  if(item.code===code){ return item.name } });
        
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

        let state = {};
        
        if(newProps.typeAction==='post'){

            state = this._resetForm();
            this.setState(state);

        }else if(newProps.typeAction==='put'){
            
            if(JSON.stringify(newProps.data) !=='{}'){

                const data = newProps.data ;
                const cusInfo = JSON.parse(data.customer_info);
    
                const startDate = moment(data.date_arrived).format('YYYY-MM-DD');
                const hh = moment(data.date_arrived).format('HH');
                const mm = moment(data.date_arrived).format('mm');
                
                this.grid.rowData = data.cart !== null ? JSON.parse(data.cart) : [] ;
                
                
                
                state = {
                    id:data.id,
                    code:data.code,
                    type:data.type, 
                    from_type:data.from_type,
                    ref_code:data.ref_code,
                    refcode_name:'Đơn hàng bán',
                    customer_code:data.customer_code,
                    customer_info:cusInfo,
                    content_issue:data.content_issue,
                    belong_user:data.belong_user,
                    startDate: new Date( startDate ),
                    hour:hh,
                    minute:mm
    
                }

                this.setState(state);
                

            }
        }
        
        
        
    }

    RefCode(from_type){

        const arr = {
            inv_code:<div>
                            <label> Mã chứng từ </label>
                            <InputSuggestOrder id="ref_code" onSelected={(item)=>{ this._onChangeRefcode(item) }} defaultValue={this.state.ref_code} />
                     </div>,
            customer_code:<div>
                        <label> Mã khách hàng </label>
                        <InputSuggest strModel="customers" onSelected={(item)=>{ this._onChangeRefcodeCustomer(item) }} id="ref_code" defaultValue={this.state.ref_code} />
                    </div>
         
        };
        return(
          arr[from_type]                     
        )
    }
    render() {

        const title = this._getTitle();
        const cusInfo = this.state.customer_info ; 


        
        return (
            
            <ViewModal name={title}  isFooter={true} {...this.props} onSubmit={this._onSubmit} >
                <div className="view-modal-body">
                    <Row>

                        {/* LEFT */}
                        <Col md={8}>

                            <FormGroup row>
                                <Col md={6}>
                                    <label> Phiếu theo </label>
                                    <SelectList 

                                        onChange={(e)=>{ this._onObjectChange(e.target.value) }} 
                                        defaultValue={ this.state.from_type } id="from_type" name="Vui lòng chọn"
                                        rows={ FROM_OBJECTS } 
                                    /> 
                                </Col>
                                <Col md={6}>
                                    { this.RefCode(this.state.from_type) }
                                </Col>
                                
                            </FormGroup>
                            
                            <FormGroup row>
                                <Col>
                                    <label> Dịch vụ </label>
                                    <span onClick={this._clearCart}  className="pull-right pointer">
                                        <small> Xoá  </small>
                                    </span>
                                    <InputSuggestProduct  type="SERVICE" onSelected={(json)=>{ this._addCart(json) }}  />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>
                                    <BenTable height="333px" grid={this.grid} />
                                </Col>
                            </FormGroup>

                             
                        </Col>
                        {/* END LEFT */}

                        {/* RIGHT */}
                        <Col md={4}>
                            <FormGroup row>
                                <Col>
                                    <label> Khách hàng </label>
                                    <Input   
                                        defaultValue={ cusInfo['name'] } 
                                        type="text" 
                                        onChange={(e)=>{ this._onCustomerChange('name',e.target.value) }}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>
                                    <label> SĐT </label>
                                    <Input 
                                        type="text" 
                                        onChange={(e)=>{ this._onCustomerChange('phone',e.target.value) }}
                                        defaultValue={cusInfo['phone']}    
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col>
                                    <label> Địa chỉ </label>
                                    <Input 
                                        type="text" 
                                        onChange={(e)=>{ this._onCustomerChange('address_delivery',e.target.value) }}
                                        defaultValue={cusInfo['address_delivery']}    
                                    />
                                </Col>
                            </FormGroup>
                            
                            <FormGroup row>
                                <Col>
                                    <label> Người phụ trách </label>
                                    <InputSuggest  
                                        
                                        strModel='users' 
                                        code="username" 
                                        onSelected={(value)=>{ this._onChange('belong_user',value.username) }} defaultValue={ this.state.belong_user }  
                                        id="belong_user"  
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col>
                                    <label> Lịch hẹn đến </label>
                                    <div style={{'clear':'both'}}>
                                        <ButtonGroup>
                                            <Button style={{background:'#fff', borderRight:0}} disabled> <i className="fa fa-calendar"></i> </Button>
                                            <DatePicker
                                                onChange={(date)=>{ this.setState({startDate:date}) }}

                                                dateFormat="yyyy-MM-dd"
                                                selected={this.state.startDate}

                                                className="input-datepicker"
                                            />

                                            <SelectHour 
                                                onChange={(e)=>{ this.setState({hour:e.target.value}) }} 
                                                defaultValue={this.state.hour} 
                                                style={{borderRadius:0,borderLeft:0,height:37}}  
                                            />
                                            <SelectMinute 
                                                onChange={(e)=>{ this.setState({minute:e.target.value}) }} 
                                                defaultValue={this.state.minute} style={{borderRadius:0, borderLeft:0, width:120, height:37}} 
                                            />

                                        </ButtonGroup>
                                    </div>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col md={12}>
                                    <label> Mô tả vấn đề </label>
                                    <Input 
                                        id="content_issue"
                                        onChange={(e)=>{ this._onChange('content_issue',e.target.value) }} 
                                        defaultValue={this.state.content_issue} type="textarea" style={{height:120}} 
                                    />
                                </Col>
                            </FormGroup>

                        </Col>
                        {/* END RIGHT */}
                    </Row>
                    
                </div>
            </ViewModal>
        );
    }
}

MyForm.defaultProps = {
    onToggle:()=>{},
    onSubmitForm:()=>{},
    receiptType:'osv'
}

