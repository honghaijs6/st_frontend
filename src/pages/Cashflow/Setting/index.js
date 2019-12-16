
import React, { Component } from 'react';


/* INCLUDE */
import {BenExplorer} from '../../../components/BenExplorer';

import BillAccountPage from './BillAccountPage'; // LOAI TÀI KHOẢN THANH TOÁN



import ThuChi from './ThuChi';

import PaymentLimitPage from './PaymentLimitPage' ;



class CashflowSetting extends Component{


  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',
      status :'',

      onTab:'BillAccountPage',
      leftData:[
        {icon:'fa fa-credit-card', code:'BillAccountPage',name:'Loại tài khoản',active:true},
        {icon:'fa fa-print', code:'ThuChi',name:'Cấu hình Thu - Chi'},
        {icon:'fa fa-clock-o', code:'PaymentLimitPage',name:'Hạn mức thanh toán'}
        
      ]
    }

    this._onLeftSideChange = this._onLeftSideChange.bind(this);


  }

  /* WHEN */
  _onLeftSideChange(code){

    this._whereStateChange({
      onTab:code
    })
  }

  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }
  render(){


    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, marginTop:20}}>
            <main>

                <BenExplorer onLeftSideChange={ this._onLeftSideChange } data={this.state.leftData} >

                   <BillAccountPage {...this.state} />
                   <ThuChi {...this.state} /> 
                   <PaymentLimitPage {...this.state} />
                   

                </BenExplorer>

            </main>
        </div>
      </div>
    )
  }
}

export default CashflowSetting;
