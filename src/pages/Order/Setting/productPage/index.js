import {PRODUCT_TYPE_DECO,LIST_PRODUCT_TYPE} from '../../../../config/product.conf';
import { PRICE_SETTING } from '../../../../config/app.config'; 

/* OBJECT - PLUGIN*/
import Model from '../../../../model/model';

/*  HOOKS */
import { doGetModelInfo } from '../../../../hook/ultil'
import React, { Component } from 'react';
import {ButtonGroup, FormGroup} from 'reactstrap';

import { connect } from 'react-redux';


import moment from 'moment';
import numeral from 'numeral';

  

/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';

import FormFollow from './FormFollow'; 



/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';
import SelectListModel  from '../../../../components/SelectListModel';
import SelectList from '../../../../components/SelectList'; 

import ButtonExpand from '../../../../components/ButtonExpand'; 

import ButtonImportXLS from '../../../../components/ButtonImportXLS' ; 
import ButtonExportXLS from '../../../../components/ButtonExportXLS';
import ButtonExportXLSTemp from '../../../../components/ButtonExportXLSTemp';



const MODE = 'products';
const MODE_NAME = 'Sản phẩm';
const MODE_TAB = 'productPage';




class ProductPage extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status
      
      selectedData:{},
      price_setting:{},

      tab:MODE_TAB
    }

    this.data = {
      [MODE]:[]
    }

    this.grid = {
      colums:[
        {headerName: "Mã", field: "code",width:140},
        {headerName: "Tên SP", field: "name",width:280},
        {headerName: "Loại", field: "type",width:100,
          cellRenderer(params){

            return PRODUCT_TYPE_DECO[params.value];
          }
        },
        {headerName: "Danh Mục", field: "category",width:140},
        {headerName: "Nhà Cung Cấp", field: "supplier_codes",width:160,
          cellRenderer(params){
            return `
              <i class="fa fa-user mr-5"></i> ${params.value}
            `;
          }
        },

        {headerName: "Giá nhà máy", field: "price_1",width:140,
          cellRenderer(params){

            const price_1 = numeral(params.value).format('0,0')+' đ';
            return `<span class="text-green"> ${price_1} </span>`
          }
        },
        {headerName: "Giá gốc", field: "price_2",width:140,
          cellRenderer(params){

            const price_2 = numeral(params.value).format('0,0')+' đ';
            return `<span class="text-green"> ${price_2} </span>`
          }
        },
        {headerName: "Giá đại lý", field: "price_3",width:140,
          cellRenderer(params){

            const price_3 = numeral(params.value).format('0,0')+' đ';
            return `<span class="text-green"> ${price_3} </span>`
          }
        },
        {headerName: "Giá lẻ", field: "price_4",width:140,
          cellRenderer(params){
            const price_4 = numeral(params.value).format('0,0')+' đ';
            return `<span class="text-green"> ${price_4} </span>`
          }
        },
        {headerName: "ĐVT", field: "unit_name",width:100},
        {headerName: "BH", field: "guran_month",width:100},
        {headerName: "Serial", field: "is_serial",width:100},
        {headerName: "Người tạo", field: "creator",width:160,
          cellRenderer(params){
            return `
              <i class="fa fa-user mr-5"></i> ${params.value}
            `;
          }
        },
        {headerName: "Ngày tạo", field: "date_created",
          cellRenderer(params){
            const humanDate = moment(params.value).format('YYYY-MM-DD')
            return `
              ${ humanDate }
            `
          }
        }

      ],
      rowData: []
    }

    this._setup();
    this.onBtnNew = this.onBtnNew.bind(this)


  }

  _setup(){

    this.model = new Model(MODE,this.props.dispatch);
    this.model.set('method',{
      name:'listAll',
      params:'all'
    });

    this.modal = new formCtrl(this.model,this.props.dispatch);


  }

  /* HOW */
  resetGrid(){

      this.grid.rowData = this.data[MODE];
      
      this._whereStateChange({
        selectedData: this.state.status === 'closed' ? {} : this.state.selectedData,  // update current selected data on close form
        onAction:'resetGrid'
      });


  }

  _doOpenModalPost(){

    this.modal.open('post');
    

  }
  async _doOpenModalUpdate(data){
      
      const info =  await doGetModelInfo('products',data.id);
      Object.assign(data,info.data); 
      this.modal.open('put',data);
      

  }
  /* END HOW*/

  /* WHEN*/

  onBtnNew(){
    this._doOpenModalPost();
  }

  async componentDidMount(){
    //this._isMounted = true;
    this.model.initData();

    // GET COMPANY INFO 
    const comInfo = await doGetModelInfo('companies',window.USERINFO.company_id);

    if(comInfo.name==='success'){

      let price_setting =  typeof comInfo.data.price_setting === 'string' ? JSON.parse(comInfo.data.price_setting) : PRICE_SETTING

      this.setState({price_setting});
      
    }      

    
  }


  componentWillReceiveProps(newProps){

    // revice redux data
    this.data[MODE] = newProps[MODE]['list'] || [] ;
    // UPDATE CURRRENT STATE 
    Object.assign(this.state,newProps[MODE]['state']);
    this.resetGrid(); // HAD INSIDE setSatte 
    

  }

  /* WHERE*/
  async _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
    
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

  render(){

    

    return(
      <div hidden={  this.props.onTab === this.state.tab ? false : true } style={{padding:10}} >

          <MyForm
            name={ MODE_NAME }
            
            modal={this.modal}
            width='70%'
            
            price_setting = {this.state.price_setting}

          />
          <BenGrid
             
             height='78vh'
             rowSelection="single"
             gridID="id"
             onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
             onBtnAdd={this.onBtnNew} 

             formStatus={ this.state.status }

             isRightTool={ true }
             nextColums={ this.grid.colums }
             rowData={this.grid.rowData}
             model={ this.model }

             onCellSelected={(json)=>{  this.setState({selectedData:json})  }}
             

             customButton={
                  <ButtonGroup > 

                      <ButtonExportXLSTemp
                        strModel={MODE}
                        
                        columns={['code','name','type','supplier_codes','price_1','price_2','price_3','price_4','is_serial']}
                      />

                      <ButtonImportXLS 
                         title="Import File Excel "
                         strModel={MODE}
                         columns={ ['code','name','type','supplier_codes','price_1','price_2','price_3','price_4','is_serial'] }
                      />
 
                      <ButtonExportXLS  
                        title="Export File Excel"
                        strModel={MODE}
                        columns={ ['code','name','type','supplier_codes','price_1','price_2','price_3','price_4','is_serial'] }
                      />

                      <ButtonExpand width={720} icon="fa-tags">
                          <FormFollow data={this.state.selectedData} />
                      </ButtonExpand>
                      
                      <ButtonExpand icon="fa-filter" style={{borderRight:0}}>
                          <FormGroup>
                                <label> Danh mục </label>
                                <SelectListModel onChange={(e)=>{ this._doFilter('categories_id',e.target.value) }} name="Tất cả" strModel='categories' />
                          </FormGroup>
                          <FormGroup>
                                <label> Loại hình</label>
                                <SelectList onChange={(e)=>{ this._doFilter('type',e.target.value) }} name="Tất cả" style={{borderRadius:0}} rows={ LIST_PRODUCT_TYPE } />

                          </FormGroup>
                          
                      </ButtonExpand>     
                      
                  </ButtonGroup>
                  
             }
          />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
     [MODE]:state[MODE]
  }
}


export default connect(mapStateToProps)(ProductPage)
