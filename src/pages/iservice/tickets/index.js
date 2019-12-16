
// DATA
import {ISERVICE_TYPES} from '../../../config/app.config';
import Model from '../../../model/model';

// LIBS 
import moment from 'moment';

// HOOKS 
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo';



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup, FormGroup, Input, Label } from 'reactstrap'; 

import { BenGrid } from '../../../components/BenGrid2' ; 

import BenMessage from '../../../components/BenMessage'; 
import ButtonExpand from '../../../components/ButtonExpand';
import ButtonExpandList from '../../../components/ButtonExpandList'; 


import RankDatePicker from '../../../components/RankDatePicker'; 
import DeleteForm from '../../../components/DeleteForm';


import MyForm from './Form'; 
import ReportForm from './ReportForm';
import PrintForm from './PrintForm';



const MODE = 'iservices';
 
class Tickets extends Component {

    _curInfo={};

    constructor(props){
        super(props);

        this.state = {
            typeAction:'',
            onAction:'',
            status:'',

            isOpenForm:false,
            isOpenDeleteForm:false,
            isOpenReportForm:false,
            isOpenFormPrint:false,

            receiptType:'osv', // MAC DINH LA DỊCH VỤ TẬN NƠI
            actions:[
                {code:'update',icon:'fa-pencil',name:'Cập nhật phiếu'},
                {code:'remove',icon:'fa-trash',name:'Huỷ phiếu',active:true},
                {code:'report',icon:'fa-mail-reply',name:'Báo cáo kết quả'},
                {code:'print',icon:'fa-print',name:'In phiếu'}
            ],

            companyInfo:{}



        }

        this.grid = {
            colums:[
              {headerName: "Mã", field: "code",width:140, 
                cellRenderer(params){
                    return `<span class=" finalcial-${params.data.type} text-uppercase"> ${params.value} </span>`
                }
              },
              {headerName: "Loại", field: "type",width:180,
                cellRenderer(params){


                    return `<span style="color:${ISERVICE_TYPES[params.value]['color']}">
                              <i class="fa ${ISERVICE_TYPES[params.value]['icon']} mr-5"></i>  ${ISERVICE_TYPES[params.value]['name']}                
                            </span>`;
                }
              },
              {headerName: "Chứng từ", field: "ref_code", width:180,
                 cellRenderer(params){
                     return `<span class="text-uppercase"> ${params.value} </span>`
                 }
              },
              
              {headerName: "Nội dung", field: "content_issue",width:410 },
              {
                  headerName:"Trạng thái", field:"status", width:150,
                  cellRenderer(params){
                      const arr = [
                          { class:'badge bg-red', name:'<i class="fa fa-clock-o mr-5"></i> Đang xử lý' },
                          { class:'badge bg-green', name:'<i class="fa fa-check mr-5"></i> Hoàn thành'}
                      ]
                      return `<span class="${arr[params.value]['class']}"> ${arr[params.value]['name']} </span>`
                  }
              },
              {
                  headerName:"Hẹn giờ đến", field:"date_arrived", width:180,
                  cellRenderer(params){
                    const humanDate = moment(params.value).format('YYYY-MM-DD HH:mm');
                    return humanDate;
                  }
              },
              {headerName: "Phụ trách", field:"belong_user",width:140,
                cellRenderer(params){
                    return `<i class="fa fa-user mr-5"></i> ${params.value} `
                }
              },  
              
              {
                  headerName: "Người tạo", field: "creator",width:180,
                  cellRenderer(params){
                      return `
                        <i class="fa fa-user mr-5"></i> ${params.value}
                      `
                  }
              },

              {headerName: "Ngày tạo", field: "date_created",width:140,
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
               isOpenReportForm:false,
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
                case 'report':
                    this.setState({
                        isOpenReportForm:true
                    });
                break ;

                case 'print':
                    this.setState({
                        isOpenFormPrint:true
                    });
                break ;
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
                <div className="blank-app">
                    

                        <PrintForm
                            width="72%"
                            data={this._curInfo}
                            isOpen={ this.state.isOpenFormPrint }
                            onToggle={(isOpen)=>{ this.setState({isOpenFormPrint:isOpen}) }}
                            companyInfo={this.state.companyInfo}
                        /> 
                        
                        <DeleteForm  
                            data={this._curInfo}
                            isOpen={ this.state.isOpenDeleteForm }
                            onToggle={(isOpen)=>{ this.setState({isOpenDeleteForm:isOpen}) }}
                            model={this.model}
                            onSubmitForm={(res)=>{ this._onSubmitForm(res) }}
                        />

                        <MyForm
                            width="63%"

                            isOpen={this.state.isOpenForm}
                            onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }}

                            model={this.model}
                            receiptType={this.state.receiptType}
                            typeAction={this.state.typeAction}
                            onSubmitForm={ (res)=>{ this._onSubmitForm(res) }}

                            data={this._curInfo}
                        />

                        <ReportForm
                            isOpen={this.state.isOpenReportForm}
                            onToggle={(isOpen)=>{ this.setState({isOpenReportForm:isOpen}) }}
                            model={this.model}
                            onSubmitForm={(res)=>{ this._onSubmitForm(res) }}
                            data={this._curInfo}
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
                                    
                                    <Button 
                                        onClick={()=>{ this._doOpenModal('osv') }} className="btn btn-normal">
                                        <i className="fa fa-plus-circle mr-5"></i> Phiếu Dịch vụ  
                                    </Button>

                                    {/*<Button 
                                        onClick={()=>{ this._doOpenModal('isv') }} className="btn btn-normal">
                                        <i className="fa fa-plus-circle mr-5"></i> Phiếu tiếp nhận 
                                    </Button>*/}
                                     
                                    <ButtonExpandList onSelected={(item)=>{  this._callAction(item) }} data={ this.state.actions } />
                                    
                                    
                                    <RankDatePicker onChange={(rank)=>{ this._loadWithDate(rank) }} />
                                    
                                    <ButtonExpand style={{borderRight:0}}  icon="fa-filter">
                                        
                                        <FormGroup>
                                            <Label> Loại Phiếu  </Label>
                                            <Input type="select" onChange={(e)=>{ this._onChange('type',e.target.value) }}>
                                                <option value=""> Tất cả </option>
                                                <option value="osv"> Phiếu dịch vụ </option>
                                                <option value="isv"> Phiếu tiếp nhận </option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Label> Trạng thái </Label>
                                            <Input type="select" onChange={(e)=>{ this._onChange('status',e.target.value) }} >
                                                <option value=""> Tất cả </option>
                                                <option value="0"> Đang xử lý </option>
                                                <option value="1"> Hoàn tất </option>

                                            </Input>

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

export default connect(mapStateToProps)(Tickets) ; 
