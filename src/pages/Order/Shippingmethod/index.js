
/* OBJECT - PLUGIN*/
import Model from '../../../model/model';

// HOOK ULTI 
import moment from 'moment';

import React, { Component } from 'react';
import { connect } from 'react-redux';




/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';

const MODE = 'transporters';
const MODE_NAME = 'Nhà Vận Chuyển';


class Transporter extends Component{
 
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
        {headerName: "Tên ", field: "name",width:400},
        {headerName: "Người tạo", field: "creator",width:200},
        {headerName: "Ngày tạo", field: "date_created",width:200,
          
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
    this._whereStateChange({
      typeAction:'post',
      onAction:'_doOpenModalPost'
    })

  }
  _doOpenModalUpdate(data){
    this.modal.open('put',data);
    this._whereStateChange({
      typeAction:'put',
      onAction:'_doOpenModalUpdate'
    })

  }

  _doOpenForm(){

    this.formCtrl.open('post');

    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })
  }

  onBtnNew(){
    this._doOpenModalPost();
  }

  componentDidMount(){
    this.model.initData();
  }

  componentWillReceiveProps(newProps){
    
    if(!this._isData){
      this.model.initData() ; 
      this._isData = true ; 
      
    }

    this.data[MODE] = newProps[MODE]['list'] || [] ;
    Object.assign(this.state,newProps[MODE]['state']) ; 
    

    this.resetGrid();


  }
  
  /* WHEN*/

  /* WHERE*/

  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){

    
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, marginTop: 20,padding:10}}>
            <main>

              <MyForm
                name={ MODE_NAME }
                typeAction={ this.state.typeAction }
                modal={this.modal}
                
              />

              <BenGrid

                 onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                 onBtnAdd={this.onBtnNew}
                 gridID='id'
                 rowSelection='single'
                 formStatus={this.state.status}  
                 isRightTool={ true }
                 height="78vh"

                 nextColums={ this.grid.colums }
                 rowData={this.grid.rowData}
                 model={ this.model }

                 
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
export default connect(mapStateToProps)(Transporter);