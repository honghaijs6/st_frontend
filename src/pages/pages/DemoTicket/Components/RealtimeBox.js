
import socket from '../../../../model/socket' ;
import React, { Component, StyleSheet } from 'react';
import { Row, Col } from 'reactstrap';



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
      ],
      logs:[]
    };


  }

  _onChangeTab(code){
    this.setState({
      activeTab:code
    });

  }

  componentDidMount(){
    this._iniSocket() ;
  }

  _iniSocket(){


    socket.client.service('coupons').on('logs',(res)=>{
      //const data = res.data;
      const { data } = res ;
      if(data.length > 0 ){

          let logs = Object.assign([],this.state.logs) ;
          logs.push(data[0]) ;
          this.setState({ logs });

      }


    });
  }

  render(){



    return(
      <div className="box-realtime-activity" style={{position: 'relative', width: '95%', top: 0}}>
        <div className="nav-tabs-custom" id="task-holder">

            <ul className="nav nav-tabs" style={{ borderBottom:'1px solid rgba(0,0,0,0.1)'}}>
              <li>
                <a>  RealTime logs</a>
              </li>

            </ul>

            <div className="slimScrollDiv">
              <div style={{position: 'relative', overflow: 'hidden', width: 'auto', height: '80vh'}}>

                  <div className={` tab-pane chat active `} id="chat-box" style={{ marginTop:14, marginLeft:7}}>

                      {
                        this.state.logs.map((item)=>{
                          return (
                            <div className="item" style={{ lineHeight:'8px', paddingBottom:10, paddingTop:10, borderBottom:'1px solid #f0f0f0'}}>
                                <div className="float-left">
                                <label className="font-17 text-green">
                                    Cổng : { item.sn}
                                </label>
                                <span>  @{ item.inoutstatus }    </span>
                                <br />
                                <small><i className="fa fa-ticket"></i> { item.cardno }</small>
                                <small>
                                  - { item.verifytype+' - '+ item.event + ' - '+ item.eventaddr }
                                </small>

                              </div>
                              <div className="float-right">
                                <small>{  item.time.substr(-8) }</small>
                              </div>
                              <div style={{ clear:'both'}}></div>
                            </div>
                          )
                        })
                      }
                  </div>

              </div>
            </div>


        </div>

      </div>
    )
  }
}

export default RealtimeBox ;
