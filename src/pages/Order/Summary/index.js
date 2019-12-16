
import React, { Component } from 'react';

import {BenExplorer} from '../../../components/BenExplorer';


/*import ProductPage from './productPage';
import CategoryPage from './categoryPage';
import SupplierPage from './supplierPage';
import CauseDelPage from './causeDelPage';

import SettingOrderPage from './settingOrderPage';
import NotificationPage from './notificationPage';
import UnitPage from './unitPage';*/





class OrderSetting extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',
      status:'',
 
      onTab:'productPage',
      navData:[
        {icon:'fa fa-dashboard', code:'dashboardtPage',name:'Tổng quan',active:true},
        {icon:'fa fa-map-marker', code:'cityPage',name:'Khu Vực'},
        {icon:'fa fa-clock-o', code:'statusPage',name:'Trạng Thái'},
        {icon:'fa fa-user', code:'userPage',name:'Nhân Viên'},
        {icon:'fa fa-truck', code:'transporterPage',name:'Nhà Vận Chuyển'}
      ]
    }

    this._onNavChange = this._onNavChange.bind(this);

  }

  /* WHEN */
  _onNavChange(code){
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
        <div className="ubuntu-app " style={{border:0, marginTop: 20}}>
            <main>
              <BenExplorer onLeftSideChange={ this._onNavChange } data={this.state.navData} >
                  
              </BenExplorer>
            </main>
        </div>
      </div>
    )
  }
}

export default OrderSetting;
