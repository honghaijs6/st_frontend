
import React, { Component } from 'react';

/* OBJECT - PLUGIN*/
import Store from '../../../redux/store';
import Model from '../../../model/model';

/* HOOKED*/
/*............*/

/* NAMED*/
import { CUSTOMERS } from '../../../model/model-mode';
import { CUSTOMER_NAME } from '../../../model/model-name';
import { POST, SEARCH } from '../../../model/action-mode';
/*------------*/

/* MODAL FORM & CTRL */

/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';


class Point extends Component{

  constructor(){
    super();

    this.state = {
      typeAction:'',
      onAction:'',
      status:''
    }

    this.data = {
      customers:''
    }

    this.grid = {
      colums:[
        {headerName: "Mã", field: "type"},
        {headerName: "Khách hàng", field: "type"},
        {headerName: "Loại", field: "type"},
        {headerName: "Hình thức", field: "date_created"},
        {headerName: "Mã đơn hàng", field: "code"},
        {headerName: "Điểm", field: "inventory_id"},
        {headerName: "Ngày tạo", field: "action_type"}
      ],
      rowData: []
    }

    this._setup();


  }

  _setup(){
    this.model = new Model(CUSTOMERS);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:20,
      is_deleted:0,
      key:''
    });


    this._listenStore();
  }

  /* HOW */
  resetGrid(){
      /*let list = this.data.users || []  ;

      list.filter((item)=>{
        item['str_job_level'] = userConf.job_level[item['job_level']];
        item['str_job_type'] = userConf.job_type[item['job_type']];
        item['str_phone'] = item['phone'] === null ? 'n/a' : item['phone'];
        item['str_date_created'] = moment(item['date_created']).format('YYYY-MM-DD');
      });

      //alert('resetGrid');
      this.grid.rowData = list ;*/

  }


  /* WHEN */
  /*componentDidMount(){}*/
  componentWillUnmount() {
    this.unsubscribe();
  }
  _listenStore(){

    this.unsubscribe = Store.subscribe(()=>{

      this.data.customers = Store.getState().customer.list || []  ;

      this._whereStateChange({
        onAction:'_listenStore'
      });

    })
  }

  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){
    return (
      <div className="animated fadeIn">
        <div className="blank-app">
              <BenGrid

                 isRightTool={ false }
                 height="79.9vh"
                 nextColums={ this.grid.colums }
                 rowData={this.grid.rowData}
                 model={ this.model }

              />
        </div>
      </div>
    )
  }
}

export default Point;
