/* OBJECT - PLUGIN*/
import Model from '../../../../model/model';
// HOOK ULTI 
import moment from 'moment';


import React, { Component } from 'react';
import { connect } from 'react-redux';

/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';
import MyForm from './Form';

const MODE = 'bill_accounts';
const MODE_TAB = 'BillAccountPage';
const MODE_NAME = 'Tài khoản thu - chi';


class BillAccountPage extends Component{

  _isData = false;
  _curInfo = {};

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status

      tab:MODE_TAB,
      isFormOpen:false
      
    }
    
    this.grid = {
      colums:[
        {headerName: "Tên", field: "name", width:270},
        {headerName: "Loại", field: "type", width:100,
          cellRenderer(params){
            return `<span class="text-uppercase"> ${params.value} </span>`
          }
        },
        {headerName: "Số TK", field: "bank_no", width:200},
        {headerName:"Ngân hàng",field:"bank_name",width:240},
        {headerName: "Người tạo", field: "creator",width:180},
        {headerName: "Ngày tạo", field: "date_created",width:140,
          cellRenderer(params){
            const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 
                return `
                ${ humanDate }
            `
          }
        },

      ],
      rowData: []
    }

    this._setup();
    this._doOpenModal = this._doOpenModal.bind(this); 
    this._doOpenModalUpdate = this._doOpenModalUpdate.bind(this); 

    
  }

  _setup(){
    this.model = new Model(MODE,this.props.dispatch);
    
  }

  _doOpenModalUpdate(data){
    this._curInfo = data ; 
    this._whereStateChange({
      typeAction:'put',
      isFormOpen:true
    });
  }

  _doOpenModal(){
    
    this._whereStateChange({
      typeAction:'post',
      isFormOpen:true
    });

  }

  _onSubmitForm(res){
    
    this._curInfo = res.data; 

    const isOpen = res.name === 'success' || res.name === 'ok' ? false : true ;
    this.setState({
      isFormOpen:isOpen,
      typeAction:'',
      status:res.name
    });

  }


  /* HOW */
  /* END HOW*/

  /* WHEN*/
  componentDidMount(){
    this.model.initData() ; 
  }
  componentWillReceiveProps(newProps){
    
    this.grid.rowData = newProps[MODE]['list'];
    // CONNECT REDUX STATE 
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
            width="36%"

            model={this.model}
            data={this._curInfo}
            isOpen={this.state.isFormOpen}
            typeAction={ this.state.typeAction }
            onToggle={(isOpen)=>{ this.setState({isFormOpen:isOpen}) }}
            onSubmitForm={(res)=>{  this._onSubmitForm(res) }}
          />
          <BenGrid

             height='77.5vh'
             gridID="id"
             onBtnEdit={ this._doOpenModalUpdate }
             onBtnAdd={this._doOpenModal}   
             onCellSelected={(json)=>{ this._curInfo = json  }}
             rowSelection='single'

             isRightTool={ true }

             nextColums={ this.grid.colums }
             rowData={this.grid.rowData}
             model={ this.model }
             formStatus={this.state.status}

             
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


export default connect(mapStateToProps)(BillAccountPage)