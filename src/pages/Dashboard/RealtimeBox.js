import React, { Component, StyleSheet } from 'react';
import { Row, Col } from 'reactstrap';

import classnames from 'classnames';

class RealtimeBox extends Component{

  constructor(props) {
    super(props);

    
    this.state = {

      activeTab: '1',
      tabs:[
        {
          icon:'fa fa-list-alt',
          code:'1',
          name:'Hoạt động'
        },
        {
          icon:'fa fa-bell-o',
          code:'2',
          name:'Nhắc việc'
        },
        {
          icon:'fa fa-legal',
          code:'3',
          name:'DS Phạt'
        }
      ]
    };

    
  }
  
  _onChangeTab(code){
    this.setState({
      activeTab:code
    });
    
  }
  render(){


    
    return(
      <div className="box-realtime-activity" style={{position: 'relative', width: '100%', top: 0}}>
        <div className="nav-tabs-custom" id="task-holder">

            <ul className="nav nav-tabs">
              {
                this.state.tabs.map((item,index)=>{
                  const active = item.code === this.state.activeTab ? 'active' : '';
                  return(
                    <li key={index} onClick={ ()=>{ this._onChangeTab(item.code) } } className={active} title={ item.name}>
                      <a><i className={ item.icon }></i></a>
                    </li>
                  )
                })
              }
          </ul>

            <div className="slimScrollDiv">
              <div className="tab-content" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 600}}>

                  <div className={` tab-pane chat  ${ this.state.activeTab === '1' ? 'active':'' }  `} id="chat-box">
                    <div className="item">
                      <img src="http://kpi.vikhang.com:9000/files/kpi.vikhang.com/HCM-OFVK18014/photos/14.jpg" className="online myname" />
                      <p className="message">
                        <a href="#!" className="name myname">
                          <small className="text-muted pull-right">
                            <i className="fa fa-clock-o"></i> 11:19:44
                            </small> Văn Công An
                        </a>
                        asdads
                      </p>
                    </div>
                  </div>

                  <div className={` tab-pane  ${ this.state.activeTab === '2' ? 'active':'' }  `}>
                      sadasd 2
                  </div>

                  <div className={` tab-pane  ${ this.state.activeTab === '3' ? 'active':'' }  `}>
                      sadasd 3
                  </div>


              </div>
            </div>


        </div>

      </div>
    )
  }
}

export default RealtimeBox ;
