
// HOOKS 
import doLoadAll from '../../../hook/ultil/doLoadAll';
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo';
import doUpdateModelInfo from '../../../hook/ultil/doUpdateModelInfo';

import React, { Component } from 'react';
import { Row, Col, FormGroup, Button } from 'reactstrap';


import Select from 'react-select';
import BenTabs from '../../../components/BenTabs';



class Notification extends Component {



    constructor(props){
        super(props);

        this.state = {

            orders: null,
            customers:null,
            inventories:null,
            bills:null,

            onTab:'order',
            tabs:[
                { icon:'fa fa-slack',code:'order',name:'Đơn hàng' },
                { icon:'fa fa-users',code:'customer',name:'Khách hàng' },
                { icon:'fa fa-cubes',code:'inventory',name:'Phiếu Xuất/Nhập' },
                { icon:'fa fa-dollar ',code:'bill',name:'Phiếu Thu/Chi' },
            ],
            users:[]
        }
        
        
    }

    async componentDidMount(){
        this._loadUser();
        this._getCompanyInfo();

    }   

    async _loadUser(){
        const res = await doLoadAll('users');
        if(res.name==='success'){

            let users = [];
            res.rows.map((item)=>{
                
                users.push({
                    value:item.email,
                    label:item.name
                });

            });
            
            this.setState({
                users:users
            });
        }
    }
    async _getCompanyInfo(){
        const res = await doGetModelInfo('companies',window.USERINFO.company_id);
        
        if(res.name==='success'){
            let notification_setting = res.data.notification_setting || {
                orders:null,
                customers:null,
                inventories:null,
                bills:null
            }; 

            notification_setting = typeof notification_setting === 'string' ? JSON.parse(notification_setting) : notification_setting;
            


            this.setState({
                id:res.data.id,
                orders:notification_setting.orders,
                customers:notification_setting.customers,
                inventories:notification_setting.inventories,
                bills:notification_setting.bills
            });
            
        }
    }

    _onSubmit = async () =>{
        
        const data = {

            id:this.state.id,
            notification_setting:{
                orders:this.state.orders,
                customers:this.state.customers,
                inventories:this.state.inventories,
                bills:this.state.bills
            }
        }
        
        const res =  await doUpdateModelInfo('companies',data) ;


    }
    
    render() {

        
        return (
            <div className="animated fadeIn">
                <main className="div-main">
                    <div style={{
                        padding:30,
                        width:'81%'
                    }}>
                        <h4 className="text-uppercase" style={{marginBottom:20}}> Thông báo </h4>

                        <BenTabs 
                            onChangeTab={(code)=>{ this.setState({onTab:code}) }} 
                            tabs={ this.state.tabs }
                        >

                            {/* TAB ORDER */}
                            <div className={  `tab-pane  ${ this.state.onTab==='order'?'active':'' } ` }>
                                <FormGroup>
                                    <Row>
                                        <Col md={12}>
                                            <label className="txt-green"> <i className="fa fa-slack mr-5"></i> Người nhận </label>
                                            <Select
                                                placeholder="Thêm người nhận"
                                                isSearchable ={true}
                                                isMulti ={true}
                                                value={ this.state.orders }
                                                onChange={(option)=>{ this.setState({ orders:option })  }} 
                                                options={this.state.users}
                                            />

                                        </Col>
                                        
                                    </Row>

                                    <Row style={{marginTop:60}}>
                                        <Col md={12}>
                                            <Button onClick={ this._onSubmit } className="btn btn-normal bg-green "> 
                                                <i className="fa  fa-chevron-circle-right mr-5"></i>  Cập nhận 
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </div>
                            {/* END TAB ORDERS */}

                            {/* TAB CUSTOMERS */}
                            <div className={  `tab-pane  ${ this.state.onTab==='customer'?'active':'' } ` }>
                                <FormGroup>
                                    <Row>
                                        <Col md={12}>
                                            <label className="txt-green"> <i className="fa fa-users mr-5"></i> Người nhận </label>
                                            <Select
                                                placeholder="Thêm người nhận"
                                                isSearchable ={true}
                                                isMulti ={true}
                                                value={ this.state.customers }
                                                onChange={(option)=>{ this.setState({customers:option})  }} 
                                                options={this.state.users}
                                            />

                                        </Col>
                                        
                                    </Row>

                                    <Row style={{marginTop:60}}>
                                        <Col md={12}>
                                            <Button onClick={ this._onSubmit } className="btn btn-normal bg-green "> 
                                                <i className="fa  fa-chevron-circle-right mr-5"></i>  Cập nhận 
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </div>
                            {/* END TAB CUSTOMER */}

                            {/* PHIEU NHAP/XUAT  */}
                            <div className={  `tab-pane  ${ this.state.onTab==='inventory'?'active':'' } ` } >
                                <FormGroup>
                                    <Row>
                                        <Col md={12}>
                                            <label className="txt-green"> <i className="fa fa-cubes mr-5"></i> Người nhận </label>
                                            <Select
                                                placeholder="Thêm người nhận"
                                                isSearchable ={true}
                                                isMulti ={true}
                                                value={ this.state.inventories }
                                                onChange={(option)=>{ this.setState({inventories:option})  }} 
                                                options={this.state.users}
                                            />

                                        </Col>
                                        
                                    </Row>

                                    <Row style={{marginTop:60}}>
                                        <Col md={12}>
                                            <Button onClick={ this._onSubmit } className="btn btn-normal bg-green "> 
                                                <i className="fa  fa-chevron-circle-right mr-5"></i>  Cập nhận 
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </div>
                            {/* END PHIEU NHAP / XUAT */}

                            {/* PHIEU THU/CHI */}
                            <div className={  `tab-pane  ${ this.state.onTab==='bill'?'active':'' } ` } >
                                <FormGroup>
                                    <Row>
                                        <Col md={12}>
                                            <label className="txt-green"> <i className="fa fa-dollar mr-5"></i> Người nhận </label>
                                            <Select
                                                placeholder="Thêm người nhận"
                                                isSearchable ={true}
                                                isMulti ={true}
                                                value={ this.state.bills }
                                                onChange={(option)=>{ this.setState({bills:option})  }} 
                                                options={this.state.users}
                                            />

                                        </Col>
                                        
                                    </Row>

                                    <Row style={{marginTop:60}}>
                                        <Col md={12}>
                                            <Button onClick={ this._onSubmit } className="btn btn-normal bg-green "> 
                                                <i className="fa  fa-chevron-circle-right mr-5"></i>  Cập nhận 
                                            </Button>
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </div>
                            {/* END PHIEU THU CHI */}

                        </BenTabs>
                    </div>
                </main>
            </div>
        );
    }
}

export default Notification;