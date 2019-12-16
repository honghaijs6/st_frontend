
/* OBJECT - PLUGIN*/
import Model from '../../../model/model';

// HOOK ULTI 
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo' ; 
import moment from 'moment';

import React, { Component } from 'react';
import {   FormGroup, ButtonGroup } from 'reactstrap'; 
import { connect } from 'react-redux';

/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';


import ButtonExpand from '../../../components/ButtonExpand'; 
import SelectListModelCode from '../../../components/SelectListModelCode';
import SelectListModel from '../../../components/SelectListModel';

import ButtonImportXLS from '../../../components/ButtonImportXLS' ; 
import ButtonExportXLS from '../../../components/ButtonExportXLS';
import ButtonExportXLSTemp from '../../../components/ButtonExportXLSTemp';





/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';

const MODE = 'customers';
const MODE_NAME = 'Khách Hàng';


class OrderView extends Component{

  constructor(props){
    super(props);

    this.state = {

      typeAction:'',
      onAction:'',
      status:'',

    }

    this.data = {}

    this.grid = {
      colums:[
        {headerName: "Mã KH", field: "code",
          cellRenderer(params){

            return `<span class="badge text-uppercase" style="color:${params.data.color_code}; font-size:14px"> ${ params.value } <span>` ; 
          }
        },
        {headerName: "Nhóm", field: "type_name",width:120,
          cellRenderer(params){

            const colorCode = params.data.color_code === null || params.data.color_code ==='n/a' ? '#666' : params.data.color_code;
            return `<span class="badge myBadge" style="color:#fff; background:${colorCode}"> ${ params.value } <span>` ; 
          }
        },

        {headerName: "Cấp bậc", field: "level_code",width:120,
          cellRenderer(params){
            const colorCode = params.data.color_code === null || params.data.color_code ==='n/a' ? '#666' : params.data.color_code;
            return `<span class="badge myBadge" style="color:#fff; background:${colorCode}"> ${ params.value } <span>` ; 
          }
        },

        {headerName: "Trạng thái", field: "customer_status",width:140,
          cellRenderer(params){

            const colorCode = params.data.color_code === null || params.data.color_code ==='n/a' ? '#666' : params.data.color_code;
            return `<span class="badge myBadge" style="color:#fff; background:${colorCode}"> ${ params.value || 'n/a' } <span>` ; 
          }
        },

        {headerName: "Nguồn", field: "customer_original",width:160,
          cellRenderer(params){
            const colorCode = params.data.color_code === null || params.data.color_code ==='n/a' ? '#666' : params.data.color_code;
            return `<span class="badge myBadge" style="color:#fff; background:${colorCode}"> ${ params.value || 'n/a' } <span>` ; 
          }
        },
        

        {headerName: "Khách Hàng", field: "name",width:400},
        
        {headerName: "Địa chỉ ", field: "address",width:400},
        {headerName: "MST", field: "tax_no"},
        {headerName: "Số ĐT", field: "phone"},
        {headerName: "Người Liên Hệ", field: "contact_name"},
        {headerName: "Quản lý bởi", field: "belong_user",
          cellRenderer(params){
            const colorCode = params.data.color_code === null || params.data.color_code ==='n/a' ? '#666' : params.data.color_code;
            return `<span class="badge myBadge" style="color:#fff; background:${colorCode}"> <i class="fa fa-user mr-5"></i> ${ params.value } <span>` ; 
          }
        },
        {headerName: "Người tạo", field: "creator",
          cellRenderer(params){
             return params.value || 'system' 
          }
        },
        {headerName: "Ngày tạo", field: "date_created",width:140,
          
          cellRenderer(params){

              const humanDate = moment(params.value).format('YYYY-MM-DD')
              return `
                ${ humanDate }
              `;
          }
        },
        {headerName: "Điều chỉnh", field: "date_modified",width:140,
          
          cellRenderer(params){

              const humanDate = params.value !== null ? moment(params.value).format('YYYY-MM-DD') : ''
              return `
                ${ humanDate }
              `;
          }
        }
        
      ],
      rowData: []
    }

    this._setup();

    this.onBtnNew = this.onBtnNew.bind(this);



  }

  _setup(){

    this.model = new Model(MODE,this.props.dispatch);
    this.model.set('method',{
      name:'listAll',
      params:'all'
    });

    this.formCtrl = new formCtrl(this.model,this.props.dispatch);
    
  }

  _doFilter(name,value){
    
    if(value!==''){
      this.model.set('paginate',{
        [name]:value
      });
    }else{
      this.model.remove(name) ; 
    }

    this.model.load(); 
      
  }

  /* HOW */
  resetGrid(){
    
    this.grid.rowData = this.data[MODE];

    this._whereStateChange({
      onAction:'resetGrid'
    });

  }

  _doOpenModalPost(){

    //this.modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })

  }

  async _doOpenModalUpdate(data){
    
    const info = await doGetModelInfo('customers',data.id);
    Object.assign(data,info.data) ; 
    this.formCtrl.open('put',data);

    this._whereStateChange({
      typeAction:'put',
      onAction:'open_modal'
    }); 


  }

  _doOpenForm(){

    this.formCtrl.open('post');

    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })
  }

  /* WHEN*/

  componentDidMount(){
    this.model.initData() ; 
  }

  _onCompleteUpload = ()=>{
    this.model.load();
    
  }
  componentWillReceiveProps(newProps){
    
    // RESET GRID DATA
    this.data[MODE] = newProps[MODE]['list'] || [] ;
    // UPDATE STATE FORM DATA
    Object.assign(this.state,newProps[MODE]['state']) ;
    

    this.resetGrid();


  }

  onBtnNew(){
    this._doOpenForm();
  }
  
  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }  


  render(){

    
    return (
      <div className="animated fadeIn">
        <div className="blank-app ">
              
              <MyForm

                width='72%'
                name={ MODE_NAME }
                
                modal={this.formCtrl}

                status={this.state.status}
                

              />

              <BenGrid

                 onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                 onBtnAdd={this.onBtnNew}
                 gridID='id'
                 rowSelection='single'

                 isRightTool={ true }
                 height="78vh"

                 formStatus={ this.state.status }

                 nextColums={ this.grid.colums }
                 rowData={this.grid.rowData}
                 model={ this.model }  

                 customButton={


                    <ButtonGroup>
                        <ButtonExportXLSTemp
                          strModel={MODE}
                          columns={['code','type','name','address','subregion_code','region_code','tax_no','contact_name','phone','email','belong_user']}

                        />

                        <ButtonImportXLS 
                          title="Import File Excel "
                          strModel={MODE}
                          columns={['code','type','name','address','subregion_code','region_code','tax_no','contact_name','phone','email','belong_user']}
                          
                          onComplete={ this._onCompleteUpload }
                        />

                        <ButtonExportXLS  
                          title="Export File Excel"
                          strModel={MODE}
                          columns={['code','type','name','address','subregion_code','region_code','tax_no','contact_name','phone','email','belong_user']}
                        />

                        <ButtonExpand style={{borderRight:0}}> 
                            <FormGroup>
                                  <label> Nhóm </label>
                                  <SelectListModelCode onChange={(e)=>{ this._doFilter('type',e.target.value) }} name="Tất cả" strModel='customer_types' />
                            </FormGroup>
                            <FormGroup>
                                  <label> Cấp Bậc </label>
                                  <SelectListModel onChange={(e)=>{ this._doFilter('level_id',e.target.value) }} name="Tất cả" strModel='levels' />
                            </FormGroup>

                            <FormGroup>
                                  <label> Trạng Thái </label>
                                  <SelectListModelCode onChange={(e)=>{ this._doFilter('status_code',e.target.value) }} name="Tất cả" strModel='customer_status' />

                            </FormGroup>
                              
                            <FormGroup>
                                  <label> Nguồn </label>
                                  <SelectListModelCode onChange={(e)=>{ this._doFilter('original_code',e.target.value) }} name="Tất cả" strModel='customer_originals' />
                            </FormGroup>
                        </ButtonExpand>     
                        
                    </ButtonGroup>
                    

                    
                 }
                 
              />
              
            
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
