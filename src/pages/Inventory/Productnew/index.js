// DATA 
import Model from '../../../model/model';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ButtonGroup, Button } from 'reactstrap';

import { BenGrid } from '../../../components/BenGrid2'; 
import BenMessage from '../../../components/BenMessage';

import ButtonExportXLS from '../../../components/ButtonExportXLS'; 
import HistoryForm from './HistoryForm';
import SerialForm from './SerialForm'; 


const MODE = 'products';



class ProductNew extends Component {

    
  constructor(props){
    super(props);

    this.state = {
      selectedData:{},

      isOpen:false,
      isOpenSerialForm:false
    }

    this.grid = {
      colums:[
        { headerName: "Mã", field: "code", width:180} ,
        { headerName: "Sản phẩm", field: "name", width:600 },
        { headerName: "ĐVT", field:"unit_name",width:140 },
        { headerName: "Serial/Emei", field:"SERIAL_NUM", width:140},
        { headerName: "Tổng nhập", field: "NHAP", width:180 },
        { headerName: "Tổng xuất", field: "XUAT", width:180 },
        { headerName: "Tồn kho", field: "total_available", width:180 },
        
        
      ],
      
      rowData:[]
    }

    this._setup();
  }
  
  _setup(){
    this.model = new Model(MODE,this.props.dispatch);

    this.model.set('method',{
      name:'listAll',
      params:'inventory'
    });
    
  }

  componentDidMount(){


    this.model.initData();
  }

  componentWillReceiveProps(newProps){
    this.grid.rowData = newProps[MODE]['list'] || [];
    this.setState(Object.assign(this.state,newProps[MODE]['state']));

  }

  _openForm = (json)=>{

    if(JSON.stringify(this.state.selectedData)!=='{}'){
      
      this.setState({
       ...json
      });

    }else{
      BenMessage({
        message:'Vui lòng chọn dữ liệu để xem'
      });

    }


  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="blank-app">
          
                <SerialForm
                  
                  isOpen={this.state.isOpenSerialForm}
                  onToggle={(isOpen)=>{ this.setState({isOpenSerialForm:isOpen}) }}
                  data={this.state.selectedData}

                />
                <HistoryForm
        
                  isOpen={this.state.isOpen}
                  onToggle={(isOpen)=>{ this.setState({isOpen:isOpen}) }}
                  data={this.state.selectedData}


                />
                <BenGrid

                  
                  gridID='id'
                  rowSelection='single'

                  isRightTool={ true }
                  height="77.5vh"

                  nextColums={ this.grid.colums }
                  rowData={this.grid.rowData}
                  model={ this.model }
                  
                  onCellSelected={(json)=>{  this.setState({selectedData:json})  }}


                  displayBtn = {[]}

                  customButton={
                        <ButtonGroup> 
      
                            <Button onClick={ ()=>{ this._openForm({isOpen:true}) } } className="btn btn-normal">
                              <i className="fa fa-history mr-5"></i> Xem lich sử
                            </Button>

                            <Button onClick={ ()=>{ this._openForm({isOpenSerialForm:true}) } } className="btn btn-normal" >
                              <i className="fa fa-ticket mr-5"></i> Xem Serial/Emei
                            </Button>
                            
                            <ButtonExportXLS  
                              style={{
                                borderTopRightRadius:0,
                                borderBottomRightRadius: 0,
                                borderRight:0
                              }}
                              
                              title="Export File Excel"
                              strModel={MODE}
                              columns={ ['code','name','type','supplier_codes','price_1','price_2','price_3','price_4','is_serial'] }
                            />
                            
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

export default connect(mapStateToProps)(ProductNew);
