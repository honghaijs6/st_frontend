
// DATA
import Model from '../../../model/model';

// HOOKS 
import {  myTime } from '../../../hook/ultil/myTime';

// LIBS 
import numeral from 'numeral';
import moment from 'moment';

import React, { Component } from 'react';
import { Col, Row, ButtonGroup, Button } from 'reactstrap';


import BenTabs from '../../../components/BenTabs';
import BenTable from '../../../components/BenTable';
import RankDatePicker from '../../../components/RankDatePicker' ; 


const MODE = 'bills';


class CashflowSummary extends Component{

  constructor(props) {
    super(props);

    
    this.state = {
      onTab:'object',
      tabs:[
        { icon:'fa fa-user', code:'object', name:'Xem theo đối tượng' },
        { icon:'fa fa-credit-card', code:'bill_account', name:'Xem theo tài khoản' }
      ],

      startDate: myTime.headMonthEn(),
      endDate: myTime.curDateEn()

    };

    this.grid_object = {
      colums:[
        { headerName:'Đối tượng', field:'object', width:'50%' },
        { headerName:'Thu', field:'thu',width:'25%' },
        { headerName:'Chi', field:'chi',width:'25%' },
      ],
      rowData:[]
    }

    this.grid_bill_account = {
      colums:[
        { headerName:'Đối tượng', field:'object', width:'50%' },
        { headerName:'Thu', field:'thu',width:'25%' },
        { headerName:'Chi', field:'chi',width:'25%' },
      ],
      rowData:[]
    }

    this._setup()

  }

  _setup(){
    this.model = new Model(MODE);

  }

  _calculateSUM(rows){
    let THU = 0;
    let CHI = 0 ;

    rows.map((item)=>{
      THU += parseInt(item.thu);
      CHI += parseInt(item.chi);
      

    });
    
    return {
      object:<span className="text-red text-uppercase"> Tổng </span>,
      thu:THU,
      chi:CHI
    }

  }
  _formatForSumObject(data){

    let rows = [];
        rows.push({
          object:'Nhân viên',
          thu: data['USER_THU'] ,
          chi:data['USER_CHI']
        });

        rows.push({
          object:'Khách hàng',
          thu:data['CUSTOMER_THU'],
          chi:data['CUSTOMER_CHI']
        });

        rows.push({
          object:'Nhà cung cấp',
          thu:data['SUPPLIER_THU'],
          chi:data['SUPPLIER_CHI']
        });

        rows.push({
          object:'Khác',
          thu:data['OTHER_THU'],
          chi:data['OTHER_THU']
        });
        
        rows.push(this._calculateSUM(rows));
        
        rows = rows.map((item)=>{
          return {
            object:item.object,
            thu:numeral(item.thu).format('0,0'),
            chi:numeral(item.chi).format('0,0')
          }
        })
        
        
        
    return rows
  }

  _formatForSumBillAccount(rows){

    rows.push(this._calculateSUM(rows));

    let newRow = [];
    rows.map((item)=>{
      newRow.push({
        object:item.object,
        thu:numeral(item.thu).format('0,0'),
        chi:numeral(item.chi).format('0,0')
      })
    });

    return newRow;

  }

  _getSumary(option){
    
    const url = '/sumaryBy/'+option + '?start='+this.state.startDate+'&end='+this.state.endDate;  


    this.model.doCall(url,(res)=>{
      const ret = res.data;
      if(ret.name==='success'){
        // FORMAT DATA FIRST
        const data = ret.rows[0]; // RESUM BY OBJECT
        
        switch(option){
          case 'object':
            this['grid_object'].rowData = this._formatForSumObject(data);
          break;
          case 'bill_account':
            this['grid_bill_account'].rowData = this._formatForSumBillAccount(ret.rows);
          break ;
        }
        
        this.setState({
          status:ret.name
        });


      }
    });
  }
  componentDidMount(){
    
    this._getSumary('object');
    this._getSumary('bill_account');
    

  }
  
  _loadWithDate(state){
    this.setState({
      startDate:moment(state.start).format('YYYY-MM-DD'),
      endDate:moment(state.end).format('YYYY-MM-DD'),
    });

  }
  _loadAllSum = ()=>{
    //alert(JSON.stringify(this.state));

    this._getSumary('object');
    this._getSumary('bill_account');



  }

  // DBCABC
  findDup(str){

    const arr = {};
    
    Object.keys(str.split('')).map((item)=>{
      if(str.indexOf(item)>-1){
        arr.push({
          item:item,
          count:1
        });
      }
    })
  }

  render(){
    return (
      <div className="animated fadeIn">
        <main className="div-main"> 
          <div style={{padding:30}}>
            <h4 className="text-uppercase" style={{marginBottom:15}}> Tổng quan Thu - Chi </h4>
            <Row>
              <Col md={10}>
                <BenTabs onChangeTab={(code)=>{ this.setState({onTab:code}) }}  tabs={this.state.tabs}>
                  <div style={{padding:'30px 0 0 30px'}}>
                    <ButtonGroup>
                      <RankDatePicker onChange={(state)=>{ this._loadWithDate(state) }} />  
                      <Button onClick={this._loadAllSum} style={{marginLeft:-10, borderLeft:0}} className="btn btn-ubuntu">
                        <i className="fa fa-filter"></i>
                      </Button>
                    </ButtonGroup>

                  </div>
                  {/* TAB ĐỐI TƯỢNG */}
                  <div style={{padding:30}} className={  `tab-pane  ${ this.state.onTab==='object'?'active':'' } ` }>
                      <BenTable
                        grid={this.grid_object}
                        height="42vh"
                      />
                  </div>
                  {/* END TAB ĐỐI TƯỢNG */}


                  {/* TAB TÀI KHOẢN */}
                  <div style={{padding:30}} className={  `tab-pane  ${ this.state.onTab==='bill_account'?'active':'' } ` }>
                      <BenTable
                        grid={this.grid_bill_account}
                        height="42vh"
                      />
                  </div>
                  {/* END TAB TÀI KHOẢN */}
                  

                </BenTabs>  
              </Col>
            </Row>
          </div>
        </main>
      </div>
    )
  }
}

export default CashflowSummary;
