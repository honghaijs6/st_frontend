
// DATA
// HOOKS 
import { detectForm } from '../../../hook/before'; 
import doUpdateModelInfo from '../../../hook/ultil/doUpdateModelInfo'; 
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo';

import React, { Component } from 'react';
import { Row, Col, FormGroup, Input, Button, InputGroup,InputGroupAddon, InputGroupText  } from 'reactstrap';
import { AppSwitch } from '@coreui/react' ; 

import InOutDisplayConfig from './InOutDisplayConfig';


class Dashboard extends Component{


  _companyInfo = {};

  constructor(props){
    super(props);

    this.state = {
      auto_do : true,
      ban_delete : true,
      is_serial : true,
      location:'',
      address:'',
      user_name:'',
      user_phone:''  
    }



    this._onSubmit = this._onSubmit.bind(this);
    
  }

  async _onSubmit(){
    
    const fields = [
      'location','address','user_name','user_phone'
    ];


    if(detectForm(fields,this.state)===''){
      //  CHECK VALUE FORMULA ; 
       const res =  await doUpdateModelInfo('companies',{
        id:window.USERINFO.company_id, 
        warehouse_setting:this.state
      }) ;
      

    }

  }

  async componentDidMount(){
    const info = await doGetModelInfo('companies',window.USERINFO.company_id);
    this._companyInfo = info ;

    if(info.name==='success'){
       const setting = JSON.parse(info.data.warehouse_setting);
       this.setState(setting);

    }

  } 
  
  render(){
    return (
      <div className="animated fadeIn">
        <div className="div-main">
            <main className="form-general" >
              
              <h4 className="text-uppercase"> Cài đặt kho hàng </h4>
              <Row>
                  <Col md="4">
                    <h5 className="txt-green"> Đặt hàng </h5>
                    Thiết lâp liên quan đến đặt hàng
                  </Col>
                  <Col md="4" style={{
                      verticalAlign:'middle'
                    }}>
                    <p>Tự động tạo hóa đơn XUẤT sản phẩm</p><br/>
                    <p> Cấm hủy PHIẾU đã hoàn thành </p>
                  </Col>
                  <Col md="4"
                    style={{
                        verticalAlign:'middle'
                      }}
                    >
                    <p> <AppSwitch onClick={()=>{ this.setState({auto_do:!this.state.auto_do}) }} className={'mx-1'} variant={'pill'} color={'primary'}  checked={ this.state.auto_do } /> </p>
                    <p> <AppSwitch onClick={()=>{ this.setState({ban_delete:!this.state.ban_delete}) }} className={'mx-1'} variant={'pill'} color={'primary'}  checked={ this.state.ban_delete } /> </p>
                  </Col>

              </Row>

              <Row>
                  <Col md="4" className="align-middle">
                    <h5 className="txt-green"> Phương pháp tồn kho </h5>
                    Thiết lâp liên quan đến Phương pháp tồn kho
                  </Col>
                  <Col md="4" className="align-middle">
                    <p> Cho phép tồn kho theo Serial Number / IMEI </p>
                  </Col>
                  <Col md="4" className="align-middle">
                    <AppSwitch onClick={()=>{ this.setState({is_serial:!this.state.is_serial}) }} className={'mx-1'} variant={'pill'} color={'primary'} checked={ this.state.is_serial } />
                  </Col>

              </Row>
                
              <Row style={{borderBottom:0}}>  
                  <Col md={9}>
                      <h5 className='txt-green'> Thông tin nhận hàng </h5>
                      <span> Thiết lập thông tin khi tạo PO mua hàng </span>

                      <div style={{
                        marginTop:30,
                        padding:'0px 20px',
                        background:'#f5f5f5',
                        border:'1px solid #ddd'  
                      }}>

                          <FormGroup>
                            <Row style={{borderBottom:0, marginBottom:0, paddingBottom:0}}>
                              <Col md={5}>
                                  <label> Địa điểm </label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText> <i className="icon icon-map"></i> </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="location" defaultValue={this.state.location} onChange={ (e)=>{ this.setState({location:e.target.value}) }} />
                                    
                                  </InputGroup>
                              </Col>
                              <Col md={5}>
                                  <label> Địa chỉ </label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText> <i className="icon icon-location-pin"></i> </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="address" defaultValue={this.state.address} onChange={ (e)=>{ this.setState({address:e.target.value}) }} />
                                  </InputGroup>


                              </Col>
                            </Row>
                            <Row style={{borderBottom:0}}>
                              <Col md={5}>
                                  <label> Người nhận </label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText> <i className="icon icon-user"></i> </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="user_name" defaultValue={this.state.user_name} onChange={ (e)=>{ this.setState({user_name:e.target.value}) }} />
                                    

                                  </InputGroup>
                              </Col>
                              <Col md={5}>
                                  <label> SĐT </label>
                                  <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                      <InputGroupText> <i className="icon icon-phone"></i> </InputGroupText>
                                    </InputGroupAddon>
                                    <Input id="user_phone" defaultValue={this.state.user_phone} onChange={ (e)=>{ this.setState({user_phone:e.target.value}) }} />
                                  </InputGroup>

                              </Col>
                            </Row>
                            <Row style={{borderBottom:0}}>
                              <Col md={12}>
                                <Button onClick={ this._onSubmit } className="btn btn-normal bg-green"> 
                                  <i className="fa  fa-chevron-circle-right mr-5"></i> Cập nhật  
                                </Button>

                                <span className="form-err text-danger ml-10" id="form-err"></span>
                              </Col>
                            </Row>
                        </FormGroup>
                      </div>
                      
                  </Col>  
                </Row>

                <h4 style={{marginBottom:0, marginTop:20}} className="text-uppercase"> Cấu hình phiếu Nhập - Xuất </h4>
                <Row style={{border:0}}>
                  <Col md={9}>
                    <InOutDisplayConfig companyInfo={this._companyInfo} />  
                  </Col>
                </Row>
                


            </main>
        </div>
      </div>
    )
  }
}

export default Dashboard;
