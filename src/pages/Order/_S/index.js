
import { ORDER_STATUS } from '../../../config/app.config'; 
import { PAYMENT_TYPES_DECO } from '../../../config/payment.type'; 

// HOOKS 
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo'; 

 /* OBJECT - PLUGIN*/ 
import Model from '../../../model/model';

// HOOK ULTI 
import moment from 'moment';


import React, { Component } from 'react';
import { ButtonGroup, FormGroup, Input, Label } from 'reactstrap'; 



import { connect } from 'react-redux';
import { Link } from 'react-router-dom' ; 

import numeral from 'numeral' ; 


/* MODAL FORM & CTRL */
import MyForm from './Form';
import ProgressForm from './ProgressForm' ; 
import DeleteForm from './DeleteForm'; 
import ReceiptForm from './ReceiptForm' ; 
import CashFlowForm from './CashflowForm';


import PrintForm from './PrintForm'; 


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';
import ButtonExpand from '../../../components/ButtonExpand';

import ButtonExpandList from '../../../components/ButtonExpandList'; 
import BenMessage from '../../../components/BenMessage' ; 


import SelectList from '../../../components/SelectList'; 
import SelectListModelCode from '../../../components/SelectListModelCode';
import RankDatePicker from '../../../components/RankDatePicker' ; 



const MODE = 'orders';
const WAREHOUSE_RECEIPT = 'warehouse_receipts';
const BILLS = 'bills';




class OrderView extends Component{

  _curInfo = {}
  _companyInfo = {}

  constructor(props){
    super(props);

    this.state = {

      typeAction:'',
      onAction:'',
      status:'',

      isOpenForm:false, 
      isOpenProgressForm:false,
      isOpenDeleteForm:false,
      isOpenReceiptForm:false,
      isOpenPrintForm:false,
      isOpenCashflowForm: false,

      defaultStatusType:2, // 0 : BAO GIA - 1 DON HANG - 2 : TAT CA
      
      type:'', // ORDER TYPE : QUOTATION - ORDER FOR RENDER PRINT FORM

      actions:[
        {code:'update',icon:'fa-pencil',name:'Cập nhật báo giá'},
        {code:'remove',icon:'fa-trash',name:'Huỷ báo giá',active:true},
        {code:'progress',icon:'icon icon-fire',name:'Xử lý tiến trình'},
        
        {code:'out_stock', icon:'fa-truck',name:'Tạo phiếu xuất kho'},
        {code:'income',icon:'fa-heart',name:'Tạo phiếu thu'},

        {code:'view-quotation',icon:'fa-search',name:'Xem Báo Giá'},
        {code:'view-order',icon:'fa-search',name:'Xem Đơn hàng'}
        
        
      ]  
    }

    

    this.grid = {
      colums:[
        {headerName: "Mã KH", field: "customer_code",width:150,
          cellRenderer(params){

            return `<span class="badge bg-green"> <i class="fa fa-user mr-5"></i> ${params.value} </span>`;
          }
        },
        {headerName: "Mã", field: "code",width:150,
          cellRenderer(params){

            const code = params.data.code_pi !== null ? params.data.code_pi : params.value;
            return `<span  style="background:${ ORDER_STATUS[params.data.status]['color'] }; color:#fff "class="badge text-uppercase"> ${ code } </span>`
          }
        },
        {headerName: "Trạng thái", field: "status",width:140,
          cellRenderer(params){
            return `
              <span style="background:${ ORDER_STATUS[params.value]['color'] }; color:#fff " class="badge"> ${ORDER_STATUS[params.value]['name']} </span>
            `
          }
        },
        {headerName: "Hạn mức", field: "payment_code",width:120,
          cellRenderer(params){
            //params.data.payment_type
            
            return ` ${ PAYMENT_TYPES_DECO[params.data.payment_type] }  <span class="text-uppercase ml-5"> ${ params.value } </span>` 
          }
        },
        {headerName: "Ngày tạo ", field: "date_created",width:120,  
          
          cellRenderer(params){
            const humanDate = moment(params.value).format('YYYY-MM-DD')
            return `
            ${ humanDate }
          `
          }
        },
        {headerName: "Ngày xuất kho", field: "date_out",width:155,

          cellRenderer(params){
            const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 

            return `
            ${ humanDate }
          `
          }
        },

        {headerName: "Ngày kết thúc", field: "date_finish",width:155,

          cellRenderer(params){
            const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 

            return `
            ${ humanDate }
          `
          }
        },  

        
        {headerName: "Tiền đơn hàng", field: "total_sum",width:150,

          cellRenderer(params){

              return numeral(params.value).format('0,0')+' đ';
          }
        },

        {
          headerName:"+VAT", field:"vat",width:90
        },


        {headerName: "Tiền sau thuế", field: "total_sum_vat",width:171,

          cellRenderer(params){

            return numeral(params.value).format('0,0')+' đ';
          }
        },

        {headerName: "Đã thanh toán", field: "total_bill",width:171,

          cellRenderer(params){

              return params.value;
          }
        },
        {
          headerName:"Phụ trách",field:"belong_user",width:140,
            cellRenderer(params){
              return `<span class="badge bg-green"> <i class="fa fa-user mr-5"></i> ${ params.value } </span>`
            }
        }
        

      
      ],
      rowData: []
    }

    this._setup();
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onProgressFormSubmit = this._onProgressFormSubmit.bind(this); 
    this._onDeleteFormSubmit = this._onDeleteFormSubmit.bind(this);
    
    
  }

  _setup(){

    this.model = new Model(MODE,this.props.dispatch);
    this.mWarehousrReceipt = new Model(WAREHOUSE_RECEIPT,this.props.dispatch); 
    this.mBills = new Model(BILLS,this.props.dispatch); 
        
    
    
  }


  _load(status_type=0){
    this.model.set('paginate',{
      status_type:status_type
    });
    this.model.load();
  }

  _loadWithDate(jsonDate){  

    const formatDate = {
      start: moment(jsonDate.start).format('YYYY-MM-DD'),
      end:moment(jsonDate.end).format('YYYY-MM-DD')
    }
    this.model.set('paginate',{
      ...formatDate
    });

    this._load(this.state.defaultStatusType);
  }
  

  async componentDidMount(){

    this._load(this.state.defaultStatusType); 

    // GET COMPANY INFO
    const resComInfo = await doGetModelInfo('companies', window.USERINFO.company_id );
    if(resComInfo.name==='success'){
      this._companyInfo = resComInfo.data;
    }
    
  }

  componentWillReceiveProps(newProps){
    
    this.grid.rowData = newProps[MODE]['list'];
    this._whereStateChange(newProps[MODE]['state']);
    
  }

  /* HOW */
    
  async _callAction(item){
    
    //const eventClick = new Event('click');
    document.querySelector('body').click();
    
    
    if(JSON.stringify(this._curInfo)!=='{}'){

      
      switch(item.code){

        case 'update':
          this._doOpenModalUpdate() ; 
        break;

        case 'remove':
           this.setState({
             isOpenDeleteForm:true
           });
           
        break ;

        case 'progress':
           this.setState({
             isOpenProgressForm:true
           }); 
        break ;

        case 'out_stock':
           this.setState({
             isOpenReceiptForm:true
           });
        break ; 

        case 'view-quotation':
           this.setState({
             isOpenPrintForm:true,
             type:'quotation_temp'
           }); 
        break ;

        case 'view-order':

           
           if(this._curInfo.code_pi !== null){
              this.setState({
                isOpenPrintForm:true,
                type:'order_temp'
              });
           }else{  BenMessage({message:'Đơn hàng này chưa được xác nhận'}) }


        break ;


        case 'income':
           this.setState({
             isOpenCashflowForm:true
           });

        break; 
  
      }
    }else{ 
        BenMessage({
          title:'Thông báo',
          message:'Vui lòng chọn chọn dữ liệu cần xử lý '
        }) ;
    }
  }
  
  _doOpenModalUpdate(data){
    //this._curInfo = data ;
    this.setState({
      isOpenForm:true
    });
   
  }

 

  /* WHEN*/
  
  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }

  _onDeleteFormSubmit(res){
    this._curInfo = res.data; 
    const isOpen = res.name === 'success' || res.name === 'ok' ? false : true ;
    
    this.setState({
      status:res.name,
      isOpenDeleteForm:isOpen
    });
  }
  _onProgressFormSubmit(res){
    
    // update curent info
    this._curInfo = res.data; 
    const isOpen = res.name === 'success' || res.name === 'ok' ? false : true ;
    
    this.setState({
      status:res.name,
      isOpenDeleteForm:isOpen
    });


  }
  _onFormSubmit(status){

    const isOpen = status === 'success' || status ==='ok' ? false : true;
    this.setState({
      status:status,
      isOpenForm:isOpen
    });

  }  

  _onSubmitCashFlowForm(res){

      if(res.name==='success' || res.name === 'ok'){

        const isOpen = res.name === 'success' || res.name ==='ok' ? false : true;

        const is_finish_bill = res.data.is_finish_bill ; 
        
        this.setState({
            status:false,
            isOpenCashflowForm:isOpen
        });

        // UPDATE STATUS PROCESS 
        if(is_finish_bill==='yes'){
          
          const data = {
            id:this._curInfo.id,
            status: parseInt(this._curInfo.status) + 1
          }
  
          this.model.putCustom('progress',data,(res2)=>{
              
              if(res.name === 'success' || res.name==='ok'){
                  this._onProgressFormSubmit(res2);
              }
  
          });
        }



      }
      
  }
  _onSubmitReceiptForm(res){
        
      //this._curInfo = res.data;
      const isOpen = res.name === 'success' || res.name ==='ok' ? false : true;
      
      this.setState({
          status:res.name,
          isOpenReceiptForm:isOpen,
      });

      const data = {
          id:this._curInfo.id,
          status: parseInt(this._curInfo.status) + 1
      }

      this.model.putCustom('progress',data,(res2)=>{
          
          if(res.name === 'success' || res.name==='ok'){
              this._onProgressFormSubmit(res2);
          }

      });
        
  }
  
  _onChange(field,value){
    
    if(value!==''){
      this.model.set('paginate',{
        [field]:value
      });
    }else{ this.model.remove(field) }

    this.model.load(); 
  }
  
  render(){ 

    const FORM_NAME  = this._curInfo.status_type === 0 ?  
          <span> Báo giá : <span className='text-uppercase'> { this._curInfo.code } </span> </span> 
        : <span> Đơn hàng : <span className='text-uppercase'> { this._curInfo.code_pi } </span> </span> 
    
    return (
      <div className="animated fadeIn">
        <div className="blank-app">
            <main>
                <PrintForm width="72%" 
                  type={this.state.type}
                  isOpen={ this.state.isOpenPrintForm }
                  onToggle={(isOpen)=>{ this.setState({isOpenPrintForm:isOpen}) }}
                  data={this._curInfo}

                  companyInfo = {this._companyInfo}

                />
                

                <CashFlowForm  
                  width="45%"
                  isOpen={this.state.isOpenCashflowForm}
                  onToggle={(isOpen)=>{ this.setState({isOpenCashflowForm:isOpen}) }}
                  model={ this.mBills }
                  data={ this._curInfo }
                  receiptType="pt"
                  typeAction="post"
                  onSubmitForm={(res)=>{   this._onSubmitCashFlowForm(res) }}

                />
                <ReceiptForm 
                  width="72%"
                  isOpen={this.state.isOpenReceiptForm}
                  onToggle={(isOpen)=>{ this.setState({isOpenReceiptForm:isOpen}) }}
                  model={this.mWarehousrReceipt}
                  data={this._curInfo}
                  receiptType='out'
                  typeAction='post'

                  onSubmitForm={ (res)=>{  this._onSubmitReceiptForm(res) }}


                />
                <ProgressForm 

                  name="Tiến trình" 
                  isOpen={ this.state.isOpenProgressForm } 
                  onToggle={(isOpen)=>{ this.setState({isOpenProgressForm:isOpen}) }}
                  onSubmit={ this._onProgressFormSubmit }

                  model={this.model}
                  data={ this._curInfo }
                  width='40%'

                />
                <DeleteForm  
                  name="Cảnh báo"
                  isOpen={ this.state.isOpenDeleteForm }
                  onToggle={(isOpen)=>{ this.setState({isOpenDeleteForm:isOpen}) }}
                  onSubmit={ this._onDeleteFormSubmit }

                  model={this.model}
                  data={this._curInfo}


                />
                <MyForm

                  width='90%'
                  name={ FORM_NAME }
                  data={ this._curInfo }
                  
                  isOpen={this.state.isOpenForm}

                  onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }}

                  model={this.model}

                  onSubmit={ this._onFormSubmit }
                  
                />

                <BenGrid

                  onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                  

                  onCellSelected={(json)=>{ this._curInfo = json  }}

                  gridID='id'
                  rowSelection='single'

                  isRightTool={ true }
                  height="78vh"

                  nextColums={ this.grid.colums }
                  rowData={this.grid.rowData}
                  model={ this.model }
                  formStatus={ this.state.status }
                  
                  customButton={
                    <ButtonGroup>

                        
                        <Link className="btn btn-normal" style={{borderRadius:0}} to="/order/add"> <i className="fa fa-plus-circle"></i> Tạo báo giá </Link>
                        
                        <ButtonExpandList onSelected={(item)=>{  this._callAction(item) }} data={ this.state.actions } />
                        

                        <Input 
                            defaultValue={ this.state.defaultStatusType } 
                            onChange={(e)=>{ this._load(e.target.value) }} style={{marginRight:10, borderRadius:0, backgroundColor:'#F5F6F7'}} type="select">
                            <option value="2"> Tất cả </option>
                            <option value="0"> Quản lý báo giá </option>
                            <option value="1"> Quản lý đơn Hàng </option>
                        </Input>

                        <RankDatePicker onChange={(state)=>{ this._loadWithDate(state) }} />
                        

                        <ButtonExpand style={{borderRight:0}}  icon="fa-filter">
                            <FormGroup>
                              <Label> Trạng thái </Label>
                              <SelectList name="Tất Cả" onChange={(e)=>{ this._onChange('status',e.target.value) }}  rows={ ORDER_STATUS } />
                            </FormGroup>
                            <FormGroup>
                              <Label> Hạn mức  </Label>
                              <SelectListModelCode onChange={(e)=>{ this._onChange( 'payment_code',e.target.value)  }}  name="Tất Cả" strModel='payments' />
                            </FormGroup>
                            

                        </ButtonExpand>
                        
                    </ButtonGroup>
                    
                  }

                  displayBtn = {[]}
                />    
            </main>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
     [MODE]:state[MODE]
  }
}

export default connect(mapStateToProps)(OrderView);
