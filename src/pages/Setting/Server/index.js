
// HOOKS 
import doLoadAll from '../../../hook/ultil/doLoadAll';
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo';
import doUpdateModelInfo from '../../../hook/ultil/doUpdateModelInfo';


import React, { Component } from 'react';
import { Row, Col, Card, CardBody,FormGroup, Input, Button } from 'reactstrap';

import Select from 'react-select';
import { AppSwitch } from '@coreui/react';



class Server extends Component {

    constructor(props){
        super(props);

        this.state = {
            
            users:[]
        }
    } 

    _resetForm(){
        return {
            "Host":"smtp.gmail.com",
            "SMTPOptions":{
                "ssl":{
                    "verify_peer":false,
                    "verify_peer_name":false,
                    "allow_self_signed":true
                }
            },
            "SMTPAuth":true,   
            "SMTPSecure":"tls",
            "Port":587,
            "Username":"sale@rambo.vn",
            "Password":"123Rambo",
            "setFrom":"ABC Co.,Ltd",
            "AddReplyTo":["norely@rambo.vn","RAMBO Co.,Ltd"],

            "forwards":null,
        }
    }

    componentDidMount(){
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
                    label:item.email
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
            
            let server_setting = res.data.server_setting || this._resetForm();
            server_setting = typeof server_setting === 'string' ? JSON.parse(server_setting) : server_setting;

            let data = {
                id:res.data.id,
                ...server_setting
            }
            
            this.setState(data);
            
        }
    }

    _onChangeReplyTo(index,value){
        let AddReplyTo = this.state.AddReplyTo;
        AddReplyTo[index] = value;

        this.setState({
            AddReplyTo:AddReplyTo
        });


    }

    _onSubmit = async () =>{
        
        
        let data = this._resetForm();
        Object.assign(data,this.state);
        delete data.users;
        delete data.id ; 

        let data2 = {
            id:this.state.id,
            server_setting:data
        }
        
        const res =  await doUpdateModelInfo('companies',data2) ;


    }

    render() {
        return (
            <div className="animated fadeIn">
                <main className="div-main" style={{padding:30}}>
                    <Row>
                        <Col md={9}>
                            <h4 className="text-uppercase" style={{marginBottom:20}}>  
                                Thiết lập Mail server 
                            </h4>
                            <Card style={{padding:30}}>
                                <CardBody>
                                    
                                    <FormGroup row>
                                        <Col md="3">
                                            <label> Host </label>
                                        </Col>
                                        <Col  md="4">
                                            <Input onChange={(e)=>{  this.setState({Host:e.target.value}) }}  type="text" defaultValue={this.state.Host} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md={3}>
                                            <label> SMTPAuth </label>
                                        </Col>
                                        <Col md={4}>
                                            <AppSwitch 
                                                onClick={()=>{ this.setState({SMTPAuth:!this.state.SMTPAuth}) }} className={'mx-1'} 
                                                variant={'pill'} color={'primary'}  checked={ this.state.SMTPAuth } />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md={3}>
                                            <label> SMTPSecure </label>
                                        </Col>
                                        <Col md={4}>
                                            <Input onChange={(e)=>{  this.setState({SMTPSecure:e.target.value}) }} type="text" defaultValue={this.state.SMTPSecure} />

                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={3}>
                                            <label> Port </label>
                                        </Col>
                                        <Col md={4}>
                                            <Input onChange={(e)=>{  this.setState({Port:e.target.value}) }} type="text" defaultValue={this.state.Port} />

                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md={3}>
                                            <label> Username </label>
                                        </Col>
                                        <Col md={4}>
                                            <Input type="text" onChange={(e)=>{  this.setState({Username:e.target.value}) }} defaultValue={this.state.Username} />
                                        </Col>
                                    </FormGroup>
                                    
                                    <FormGroup row>
                                        <Col md={3}>
                                            <label> Password </label>
                                        </Col>
                                        <Col md={4}>
                                            <Input type="password" onChange={(e)=>{  this.setState({Password:e.target.value}) }} defaultValue={this.state.Password} />
                                        </Col>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md={3}>
                                            <label> Tên người gủi  </label>
                                        </Col>
                                        <Col md={4}>
                                            <Input 
                                                type="text" 
                                                onChange={(e)=>{  this.setState({setFrom:e.target.value}) }} 
                                                placeholder="Tên người gủi" defaultValue={this.state.setFrom  } 
                                            />
                                        </Col>
                                        
                                    </FormGroup>

                                    <FormGroup row>
                                        <Col md={3}>
                                            <label> Thông tin nhận  </label>
                                        </Col>
                                        <Col md={4}>
                                            <Input 
                                                type="text" 
                                                onChange={ (e)=>{ this._onChangeReplyTo(0,e.target.value)  } } 
                                                placeholder="email nhận" 
                                                defaultValue={this.state.AddReplyTo !== undefined ? this.state.AddReplyTo[0] : '' } 
                                            />
                                        </Col>
                                        <Col md={5}>
                                            <Input 
                                                type="text" 
                                                onChange={ (e)=>{ this._onChangeReplyTo(1,e.target.value)  } } 
                                                placeholder="Tên người nhận" 
                                                defaultValue={this.state.AddReplyTo !== undefined ? this.state.AddReplyTo[1] : '' } 
                                            />
                                        </Col>
                                    </FormGroup>
                                    
                                    <FormGroup row>
                                        <Col md={3}>
                                            <label> Forwards  </label>
                                        </Col>
                                        <Col md={9}>
                                            
                                            <Select
                                                    placeholder="Thêm người nhận"
                                                    isSearchable ={true}
                                                    isMulti ={true}
                                                    value={ this.state.forwards }
                                                    onChange={(option)=>{ this.setState({ forwards:option })  }} 
                                                    options={this.state.users}
                                            />
                                                

                                        </Col>
                                        
                                    </FormGroup>

                                    <FormGroup style={{marginTop:90}} row>
                                        <Col md={12}>
                                            <Button onClick={ this._onSubmit } className="btn btn-normal bg-green">
                                                <i className="fa  fa-chevron-circle-right mr-5"></i>  Cập nhận 
                                            </Button>
                                            <span className="form-err text-red ml-10 " id="form-err"></span>

                                            <div className="pull-right">
                                                <Button className="btn btn-normal bg-blue" size="sm"> 
                                                   <i className="fa fa-bug mr-5"></i> Test mail server </Button>
                                            </div>
                                        </Col>

                                    </FormGroup>

                                    

                                    
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </main>
            </div>
        );
    }
}

export default Server;