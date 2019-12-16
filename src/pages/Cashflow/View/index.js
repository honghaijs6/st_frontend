// DATA
import { BILL_ACC_TYPES } from '../../../config/app.config';
import Model from '../../../model/model';

// HOOKS
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo';

// LIBS 
import moment from 'moment';
import numeral from 'numeral' ; 


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, FormGroup, Input, Label } from 'reactstrap'; 


import { BenGrid } from '../../../components/BenGrid2' ; 

import BenMessage from '../../../components/BenMessage'; 
import ButtonExpand from '../../../components/ButtonExpand';
import ButtonExpandList from '../../../components/ButtonExpandList'; 

import SelectList from '../../../components/SelectList'; 
import RankDatePicker from '../../../components/RankDatePicker'; 


import MyForm from './Form'; 
import DeleteForm from './DeleteForm';
import PrintForm from './PrintForm'




const MODE = 'bills';
class CashFlowView extends Component {

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

            receiptType:'',
            actions:[
                {code:'update',icon:'fa-pencil',name:'Cập nhật phiếu'},
                {code:'remove',icon:'fa-trash',name:'Huỷ phiếu',active:true},
                {code:'print',icon:'fa-print',name:'In phiếu'}
            ],
            companyInfo:{}
  
        }

        this.grid = {
            colums:[
              {headerName: "Phiếu", field: "code",width:140, 
                cellRenderer(params){
                    return `<span class=" finalcial-${params.data.type} text-uppercase"> ${params.value} </span>`
                }
              },
              {headerName: "PTTT", field: "bill_acc_type",width:100,
                cellRenderer(params){
                    return `<span class=" finalcial-${params.value} text-uppercase"> ${params.value}  </span>`
                }
              },
              {headerName: "Chứng từ", field: "ref_code", width:180,
                 cellRenderer(params){
                     return `<span class="text-uppercase"> ${params.value} </span>`
                 }
              },
              {headerName: "Đối tượng", field: "person_name",width:300},
              {headerName: "Số tiền", field: "total",width:140, cellRenderer(params){ return numeral(params.value).format('0,0')+' đ' } },
              {headerName: "Giá trị", field:"total_before",width:140,cellRenderer(params){ return numeral(params.value).format('0,0')+' đ' }},  
              {headerName: "Tài khoản", field: "bill_acc_name",width:240},
              {headerName: "Người tạo", field: "creator",width:160},
              {headerName: "Ngày", field: "date_created",width:140,
                  cellRenderer(params){
                      const humanDate = moment(params.value).format('YYYY-MM-DD');
                      return humanDate;
                  }
              },
              {
                  headerName:"Điều chỉnh",field:"date_modified",width:140,
                  cellRenderer(params){
                    const humanDate =  params.value !== null ? moment(params.value).format('YYYY-MM-DD') : '' ;
                    return humanDate;
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
            receiptType:this._curInfo.type,
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

        // LOAD COMPANY INFO
        const resComInfo = await doGetModelInfo('companies',window.USERINFO.company_id);
        if(resComInfo.name==='success'){
            this.setState({
                companyInfo:resComInfo.data
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
                        <DeleteForm  
                            data={this._curInfo}
                            isOpen={ this.state.isOpenDeleteForm }
                            onToggle={(isOpen)=>{ this.setState({isOpenDeleteForm:isOpen}) }}
                            model={this.model}
                            onSubmitForm={(res)=>{ this._onSubmitForm(res) }}
                        />
                        
                        <MyForm 
                            width="45%"   
                            model={this.model}
                            isOpen={ this.state.isOpenForm }
                            onToggle={ (isOpen)=>{  this.setState({isOpenForm:isOpen}) }}
                            data={ this._curInfo }
                            receiptType={this.state.receiptType}
                            typeAction={this.state.typeAction}
                            onSubmitForm={ (res)=>{ this._onSubmitForm(res) }}
                        />
                        <PrintForm 
                            
                            width="60%"
                            name="Print"
                            isOpen={this.state.isOpenPrintForm}
                            onToggle={(isOpen)=>{ this.setState({isOpenPrintForm:isOpen}) }}
                            data={this._curInfo}
                            companyInfo={this.state.companyInfo}

                        />
                        <BenGrid

                            onBtnEdit={(data)=>{ this._doOpenModalUpdate()  }}
                            
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
                                    
                                    <Button onClick={()=>{ this._doOpenModal('pt') }} className="btn btn-normal"><i className="fa fa-plus-circle mr-5"></i> Tạo phiếu thu </Button>
                                    <Button onClick={()=>{ this._doOpenModal('pc') }} className="btn btn-normal"><i className="fa fa-plus-circle mr-5"></i> Tạo phiếu chi </Button>
                                    
                                    <ButtonExpandList onSelected={(item)=>{  this._callAction(item) }} data={ this.state.actions } />
                                    
                                    
                                    <RankDatePicker onChange={(rank)=>{ this._loadWithDate(rank) }} />
                                    
                                    <ButtonExpand style={{borderRight:0}}  icon="fa-filter">
                                        
                                        <FormGroup>
                                            <Label> Loại Phiếu  </Label>
                                            <Input type="select" onChange={(e)=>{ this._onChange('type',e.target.value) }}>
                                                <option value=""> Tất cả </option>
                                                <option value="pt"> Phiếu thu </option>
                                                <option value="pc"> Phiếu chi </option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label> Hình thức T.T </Label>
                                            <SelectList onChange={(e)=>{ this._onChange('acc_type',e.target.value) }} name="Tất cả" rows={ BILL_ACC_TYPES } />

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

const mapStateToProps = (state, ownProps) => {
    return {
        [MODE]: state[MODE]
    }
}

export default connect(mapStateToProps)(CashFlowView);