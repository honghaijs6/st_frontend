import Model from '../../../model/model';

// HOOKS 

import moment from 'moment';



import React, { Component } from 'react';
import { connect } from 'react-redux'; 


import { BenGrid } from '../../../components/BenGrid2';

import MyForm from './Form';

const MODE = 'warehouses';
const MODE_NAME = 'Nhà kho'; 

class Warehouse extends Component {


  _curInfo = {}

  constructor(props){
    super(props);

    this.state = {
      typeAction :'',
      onAction:'',
      status:'',

      isFormOpen:false
    }

    this.grid = {
        colums:[
          {headerName: "Mã Kho", field: "code", width:150,
            cellRenderer(params){
                return `<span class="badge bg-green text-uppercase"> ${ params.value } </span>` ;
            }
          },
          {
            headerName:"Kho Hàng",field:"name", width:270},
          {
              headerName:"Địa chỉ", field:"address", width:400
          },

          {
            headerName:"Người liên hệ", field:"contact_person", width:220
          },

          {
            headerName:"SĐT", field:"phone", width:140
          },
          
        

          {
            headerName:"Người tạo", field:"creator",width:180
          },
          

          {headerName: "Ngày tạo", field: "date_created",width:140,
            cellRenderer(params){
                const humanDate =   params.value ===null ? '<i class="fa fa-clock-o"></i>': moment(params.value).format('YYYY-MM-DD') ; 
                return `
                ${ humanDate }
            `
            }
          },
          {headerName: "Điều chỉnh", field: "date_modified",width:140,
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
    
    const isOpen = res.name === 'success' || res.name === 'ok' ? false : true ;
    this.setState({
      isFormOpen:isOpen,
      typeAction:'',
      status:res.name
    });

  }

  componentDidMount(){
    // LOAD DATA HERE 
    this.model.load();
  }

  componentWillReceiveProps(newProps){
    this.grid.rowData = newProps[MODE]['list'];
    // CONNECT REDUX STATE 
    this._whereStateChange(newProps[MODE]['state']);
    
  }

  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }
  render() {

    
    return (
      <div className="animated fadeIn">
        <div className="blank-app">
          
              <MyForm 
                 name={ MODE_NAME }
                 width='41%'
                 
                 typeAction={this.state.typeAction}
                 isOpen={this.state.isFormOpen}
                 onToggle={(isOpen)=>{ this.setState({isFormOpen:isOpen,typeAction:''}) }}
                 model={ this.model }
                 data={ this._curInfo }

                 onSubmitForm={(res)=>{ this._onSubmitForm(res) }}

              />
              <BenGrid

                  onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
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

export default connect(mapStateToProps)(Warehouse);


