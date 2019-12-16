
import React, { Component } from 'react';

import {BenExplorer} from '../../../components/BenExplorer';

 

import ProductPage from './productPage';
import CategoryPage from './categoryPage';
import SupplierPage from './supplierPage';
import CauseDelPage from './causeDelPage';

import SettingOrderPage from './settingOrderPage';
import UnitPage from './unitPage';
import FormulaPricePage from './formulaPricePage' ; 





class OrderSetting extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',
      status:'',
 
      onTab:'productPage',
      navData:[
        {icon:'fa fa-get-pocket', code:'productPage',name:'Sản phẩm',active:true},
        {icon:'fa fa-folder', code:'categoryPage',name:'Danh mục sản phẩm'},
        {icon:'fa fa-gg', code:'supplierPage',name:'Nhà Cung Cấp'},
        {icon:'fa fa-tags', code:'unitPage',name:'Đơn vị tính'},
        {icon:'fa fa-trash', code:'causeDelPage',name:'Lý do huỷ đơn hàng'},
        {icon:'fa  fa-codepen', code:'settingOrderPage',name:'Cấu hình đơn hàng'},
        {icon:'fa  fa-dollar', code:'formulaPricePage',name:'Công thức tính giá'},
        
        
        
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

                <ProductPage {...this.state} />
                <CategoryPage {...this.state} />
                <SupplierPage {...this.state} />
                <CauseDelPage {...this.state} />
                <SettingOrderPage {...this.state} />
                <UnitPage {...this.state} /> 
                <FormulaPricePage {...this.state} />
        

              </BenExplorer>
            </main>
        </div>
      </div>
    )
  }
}

export default OrderSetting;
