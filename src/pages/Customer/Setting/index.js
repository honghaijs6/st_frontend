
import React, { Component } from 'react';


/* INCLUDE */
import {BenExplorer} from '../../../components/BenExplorer';

import CusTypePage from './CusTypePage/';
import CusStatusPage from './CusStatusPage/';
import CusOriginPage from './CusOriginPage/';
import CusPointRulePage from './CusPointRulePage/';
import CusLevelPage from './CusLevelPage' ; 




class CustomerSetting extends Component{

  constructor(){
    super();

    this.state = {
      typeAction:'',
      onAction:'',
      status:'',

      onTab:'CusTypePage',
      leftData:[
        {icon:'fa fa-folder-open', code:'CusTypePage',name:'Nhóm khách hàng',active:true},
        {icon:'fa fa-heartbeat', code:'CusStatusPage',name:'Trạng thái khách hàng'},
        {icon:'fa fa-anchor', code:'CusOriginPage',name:'Nguồn khách hàng'},
        {icon:'fa fa-lightbulb-o', code:'CusPointRulePage',name:'Công thức tính điểm'},
        {icon:'fa fa-shield', code:'CusLevelPage',name:'Cấp bậc khách hàng'},
        

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

                 <CusTypePage {...this.state} />
                 <CusStatusPage {...this.state} />
                 <CusOriginPage {...this.state} />
                 <CusPointRulePage {...this.state} />
                 <CusLevelPage {...this.state} />

              </BenExplorer>
            </main>
        </div>
      </div>
    )
  }
}

export default CustomerSetting;
