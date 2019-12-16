import { WAREHOUSE_RECEIPT, WAREHOUSE_TYPES, WAREHOUSE_TRACKS } from '../../../config/app.config';
import Model from '../../../model/model';

// HOOKS 
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo';

// LIBS 
import moment from 'moment';


import React, { Component } from 'react';
import { connect } from 'react-redux' ; 
import { Button, ButtonGroup, FormGroup, Input, Label } from 'reactstrap'; 




import { BenGrid } from '../../../components/BenGrid2' ; 

import BenMessage from '../../../components/BenMessage'; 
import ButtonExpand from '../../../components/ButtonExpand';
import ButtonExpandList from '../../../components/ButtonExpandList'; 

import SelectList from '../../../components/SelectList'; 
import RankDatePicker from '../../../components/RankDatePicker'; 


import ReceiptForm from './Form'; 
import DeleteForm from './DeleteForm'; 
import PrintForm from './PrintForm'; 



const MODE = 'warehouse_receipts';


class ReceiptWarehouse extends Component {

    _curInfo = {} 
    constructor(props){
        super(props);

        this.state = {
            typeAction:'',
            onAction:'',
            status:'',
            
            isOpenForm:false,
            isOpenDeleteForm:false,
            isOpenPrintForm:false,
            companyInfo:{},
            receiptType:'',
            actions:[
                {code:'update',icon:'fa-pencil',name:'Cập nhật phiếu'},
                {code:'remove',icon:'fa-trash',name:'Huỷ phiếu',active:true},
                {code:'print',icon:'fa-print',name:'In phiếu'}
            ]
        }

        this.grid = {
            colums:[
              {headerName: "Phiếu", field: "type",width:120,
                cellRenderer(params){

                    
                    return `
                        <span class="badge ${WAREHOUSE_TYPES[params.value]['code']} "> 
                            <i class="${WAREHOUSE_TYPES[params.value]['icon']} mr-5"></i> ${ WAREHOUSE_TYPES[params.value]['name'] } 
                        </span>
                    `
                }
              },
              {headerName: "Mã phiếu", field: "code_in",width:150,
                cellRenderer(params){

                    const code = params.data.type === 'in' ? params.value : params.data.code_out;
                    return `
                        <span class="text-uppercase"> ${ code } </span>
                    `
                }
              },
              
              {headerName: "Trạng thái", field: "status",width:180,
                cellRenderer(params){
                    return `
                        <span style="color:${ WAREHOUSE_RECEIPT[params.value]['color'] }"> 
                            <i class="mr-5 fa ${ WAREHOUSE_RECEIPT[params.value]['icon'] } "></i> ${ WAREHOUSE_RECEIPT[params.value]['name'] } 
                        </span>
                    `
                }
              },
              {
                headerName:"Số lượng", field:"total", width:120

              },

              {headerName: "Kho", field: "warehouse_code",width:140,

                cellRenderer(params){
                    return `
                        <span class="text-uppercase"> <i class="fa fa-home"></i> ${params.value} </span>
                    `
                }

              },
              {headerName: "Loại", field: "track_code",width:160,

                cellRenderer(params){

                    let name = '';
                    WAREHOUSE_TRACKS[ params.data.type ].map((item)=>{
                        if( params.value ===item['code']){
                            name = item['name']
                        }
                    });
                    
                    return `
                        ${ name }
                    `
                }
              },
              {headerName: "Mã đơn hàng", field: "order_code",width:180,
                cellRenderer(params){

                    const code = params.data.type === 'in' ?  params.data.purchase_code  : params.value ;
                    return `<span class="text-uppercase"> ${ code || 'n/a' } </span>`
                }
              },
              {headerName: "Người tạo", field: "creator",width:200},
              {
                headerName: "Ngày Tạo", field: "date_created",width:140,
                cellRenderer(params){
                    const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 
                    return `
                        ${ humanDate }
                    `
                }
              },
              {
                  headerName:"Ngày cập nhật", field:"date_modified", width:155,
                  cellRenderer(params){
                    const humanDate =   params.value === null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 
                    return `
                        ${ humanDate }
                    `
                  }
              }
            ],
            rowData: []
        }
        
        this._setup(); 
        
    }
    
    _setup(){
        this.model = new Model(MODE,this.props.dispatch);
    }

    _doOpenModalUpdate(){
        
        this.setState({
            receiptType:this.state.receiptType,
            isOpenForm:true,
            typeAction:'put'
        });
    }
    _doOpenModal(receiptType){

        this.setState({
            receiptType:receiptType,
            isOpenForm:true,
            typeAction:'post'
        });
        

    }
    _onSubmitForm(res){
        if(res.name==='success' || res.name==='ok'){
           this._curInfo = {}

           this.setState({
               isOpenForm:false,
               isOpenDeleteForm:false,
               typeAction:'',
               receiptType:'',
               status:res.name
           });

        }
    }
    _callAction(item){
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

                case 'print':
                    this.setState({
                        isOpenPrintForm:true
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
    _loadWithDate(jsonDate){
        const formatDate = {
            start: moment(jsonDate.start).format('YYYY-MM-DD'),
            end:moment(jsonDate.end).format('YYYY-MM-DD')
         }
        this.model.set('paginate',{
            ...formatDate
        });

        this.model.load();
        
    }
    _onChange(field,value){

        if(value!==''){
            this.model.set('paginate',{
              [field]:value
            });
        }else{ this.model.remove(field) }
          
        this.model.load(); 
    }

    /* WHERE*/
    _whereStateChange(newState){
        this.setState(Object.assign(this.state,newState));
    }


    async componentDidMount(){
        this.model.load(); 
        const resCom = await doGetModelInfo('companies',window.USERINFO.company_id);

        if(resCom.name==='success'){
            this.setState({
                companyInfo:resCom.data
            });
        }

    }
    componentWillReceiveProps(newProps){
        this.grid.rowData = newProps[MODE]['list'];

        // CONNECT REDUX STATE 
        this._whereStateChange(newProps[MODE]['state']);
    }
    render() {

        
        return (
            <div className="animated fadeIn">
                <div className="blank-app ">
                   


                        <PrintForm
                            width="72%"
                            data={this._curInfo}
                            isOpen={ this.state.isOpenPrintForm }
                            onToggle={ (isOpen)=>{ this.setState({isOpenPrintForm:isOpen}) } }
                            companyInfo={this.state.companyInfo}
                        />
                        <DeleteForm  
                            data={this._curInfo}
                            isOpen={ this.state.isOpenDeleteForm }
                            onToggle={(isOpen)=>{ this.setState({isOpenDeleteForm:isOpen}) }}
                            model={this.model}
                            onSubmitForm={(res)=>{ this._onSubmitForm(res) }}

                        />
                        <ReceiptForm 

                            
                            width="72%"
                            isOpen={ this.state.isOpenForm }
                            onToggle={(isOpen)=>{this.setState({isOpenForm:isOpen}) }}
                            receiptType={ this.state.receiptType }
                            typeAction={ this.state.typeAction }
 
                            data={this._curInfo}
                            onSubmitForm={ (res)=>{ this._onSubmitForm(res) }}
                            model={this.model}
                        />

                        <BenGrid

                            onBtnEdit={(data)=>{ this._doOpenModalUpdate()  }}
                            onBtnAdd={ this._doOpenModal }
                            onCellSelected={(json)=>{ this._curInfo = json  }}
        
                            gridID='id'
                            rowSelection='single'
        
                            isRightTool={ true }
                            height="77.5vh"
        
                            nextColums={ this.grid.colums }
                            rowData={this.grid.rowData}
                            model={ this.model }
                            formStatus={ this.state.status }
                            displayBtn={[]}

                            customButton={
                                <ButtonGroup>
                                    
                                    <Button onClick={()=>{ this._doOpenModal('in') }} className="btn btn-normal"><i className="fa fa-plus-circle mr-5"></i> Tạo phiếu nhập </Button>
                                    <Button onClick={()=>{ this._doOpenModal('out') }} className="btn btn-normal"><i className="fa fa-plus-circle mr-5"></i> Tạo phiếu xuất </Button>
                                    
                                    <ButtonExpandList onSelected={(item)=>{  this._callAction(item) }} data={ this.state.actions } />
                                    
                                    
                                    <RankDatePicker onChange={(rank)=>{ this._loadWithDate(rank) }} />
                                    
                                    <ButtonExpand style={{borderRight:0}}  icon="fa-filter">
                                        <FormGroup>
                                            <Label> Trạng thái </Label>
                                            <SelectList name="Tất Cả" onChange={(e)=>{ this._onChange('status',e.target.value) }}  rows={ WAREHOUSE_RECEIPT } />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label> Phiếu  </Label>
                                            <Input type="select" onChange={(e)=>{ this._onChange('type',e.target.value) }}>
                                                <option value=""> Tất cả </option>
                                                <option value="in"> Phiếu nhập </option>
                                                <option value="out"> Phiếu xuất </option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label> Loại </Label>
                                            <Input />

                                        </FormGroup>

                                    </ButtonExpand>
                                    
                                </ButtonGroup>
                            
                            }
                            
                        />
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        [MODE]: state[MODE]
    }
}

export default connect(mapStateToProps)(ReceiptWarehouse); 
