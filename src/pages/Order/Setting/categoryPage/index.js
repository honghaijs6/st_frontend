/* 
DANH MUC : categories 
TAB  : categoryPage
*/

/* OBJECT - PLUGIN*/
import Model from '../../../../model/model';

// HOOK ULTI 
import moment from 'moment';



import React, { Component } from 'react';
import { connect } from 'react-redux';


import { Button } from 'reactstrap';


/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';

/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';

const MODE = 'categories';
const MODE_TAB = 'categoryPage';
const MODE_NAME = 'Danh Mục';


class CategoryPage extends Component{

  _isData = false;
  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:MODE_TAB
      
    }

    this.data = {}

    this.grid = {
      colums:[
        {headerName: "Tên ", field: "name",width:400},
        { headerName:"Sản phẩm ", field:"total_product", width:140 },
        {headerName: "Thứ tự", field: "sort",width:120},
        {headerName: "Người tạo", field: "creator",width:200},
        
        {headerName: "Ngày tạo", field: "date_created",width:140,
          
          cellRenderer(params){

            const humanDate = moment(params.value).format('YYYY-MM-DD')
            return `
             ${ humanDate }
           `
          }
          
        },
        {headerName: "Hiệu chỉnh", field: "date_modified",width:140,
          
          cellRenderer(params){

            const humanDate = params.value !== null ? moment(params.value).format('YYYY-MM-DD') : '';
            return `
             ${ humanDate }
           `
          }
          
        },
        


      ],
      rowData: []
    }

    this._setup();
    
    this._doOpenModalPost = this._doOpenModalPost.bind(this);
    this._doOpenModalUpdate = this._doOpenModalUpdate.bind(this);


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
        onAction:'resetGrid'
      });


  }

  _doOpenModalPost(){

    this.modal.open('post');
    
  }
  _doOpenModalUpdate(data){
    this.modal.open('put',data);
  }
  /* END HOW*/

  /* WHEN*/
  
  
  componentWillReceiveProps(newProps){
    
    if(!this._isData){
      this.model.initData() ; 
      this._isData = true ; 

    }

    this.grid.rowData = newProps[MODE]['list'] || [] ;
    this._whereStateChange(newProps[MODE]['state']);
    
  }
  

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){

    
    return(
      <div hidden={  this.props.onTab === this.state.tab ? false : true } style={{padding:10}} >

          <MyForm
            
            name={ MODE_NAME }
            modal={this.modal} 

          />
          <BenGrid

             height='78vh'
             gridID="id"
             onBtnEdit={ this._doOpenModalUpdate }
             onBtnAdd={this._doOpenModalPost}   
             rowSelection='single'
             formStatus={ this.state.status }
             isRightTool={ true }
             

             nextColums={ this.grid.colums }
             rowData={this.grid.rowData}
             model={ this.model }

             
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


export default connect(mapStateToProps)(CategoryPage)