
// DATA
import { MAU_ISERVICE } from '../../../config/temp-code-iservice';
// HOOKS 
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo';
import doUpdateModelInfo from '../../../hook/ultil/doUpdateModelInfo'

import React, { Component } from 'react';
import { Card, CardBody, Row, Col, FormGroup, Input, Form, Button } from 'reactstrap';


import PreView from './PreView';

class IserviceSetting extends Component {


    state = {
        isOpenForm:false,
        companyInfo:{},
        iservice_temp:MAU_ISERVICE
    }

    _onSubmit = async (e) =>{
        e.preventDefault();

        const data = {
            id:this.state.companyInfo.id,
            iservice_temp:this.state.iservice_temp
        };

        const res = await doUpdateModelInfo('companies',data);
        
        
    }
    _preView = ()=>{
        this.setState({
            isOpenForm:true
        });

    }

    async componentDidMount(){

        const info = await doGetModelInfo('companies',window.USERINFO.company_id);
        if(info.name==='success'){

            this.setState({
                companyInfo:info.data,
                iservice_temp:info.data.iservice_temp || MAU_ISERVICE
            });
        }

    }
    
    render() {
        return (
            <div className="animated fadeIn">
                <main className="div-main">

                    <PreView

                        companyInfo={this.state.companyInfo}
                        temp={ this.state.iservice_temp }
                        width="72%"
                        name="Xem trước"
                        isOpen={this.state.isOpenForm}
                        onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }}


                    />
                    <div style={{padding:30}}>
                        <Row>
                            <Col md={10}>
                                <h4 className="text-uppercase" style={{paddingBottom:10}}> Cấu hình phiếu IN </h4>
                                <Card>
                                    <CardBody style={{padding:30}}>
                                        <Form onSubmit={this._onSubmit}>
                                            <FormGroup row>
                                                <Col>
                                                    <label> Mẫu phiếu  </label>

                                                    <span onClick={this._preView} style={{cursor:'pointer'}} className="txt-green pull-right">
                                                        <i className="fa fa-search-plus"></i> Xem trước
                                                    </span>

                                                    <span className="pull-right pointer" style={{marginRight:15}}>
                                                        Lấy mẫu mặc định
                                                    </span>

                                                    <Input 
                                                        type="textarea" 
                                                        onChange={(e)=>{ this.setState({iservice_temp:e.target.value})  }} 
                                                        defaultValue={this.state.iservice_temp} style={{
                                                        height:420,
                                                        background:'#262A2E',
                                                        color:'#f1f1f1',
                                                        marginTop:9       
                                                    }} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row style={{marginTop:30}}>
                                                <Col>
                                                    <Button className="btn btn-normal bg-green"> 
                                                        <i className="fa fa-chevron-circle-right mr-5"></i>Cập nhật
                                                    </Button>
                                                </Col>            
                                            </FormGroup>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </main>
            </div>
        );
    }
}

export default IserviceSetting;