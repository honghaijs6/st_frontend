// HOOKS 
import detectForm from '../../hook/before/detectform';
import doUpdateModelInfo from '../../hook/ultil/doUpdateModelInfo';
import doLogin from '../../hook/ultil/doLogin';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Row, Col, Button, FormGroup, Input, InputGroup,InputGroupAddon, InputGroupText  } from 'reactstrap';

import BenTabs from '../../components/BenTabs';
import ButtonUploadImage from '../../components/ButtonUploadImage';
import BenMessage from '../../components/BenMessage';


class Profile extends Component{


  constructor(props){

    super(props);

    this.state = {
      
      data:{
        name:'',
        photoURL:'',
        phone:'',
        email:''
      },

      data_pass:{
        pre_password:'',
        new_password:'',
        rep_password:''
      },

      onTab:'info',
      tabs:[
        { icon:'fa fa-user',code:'info',name:'Thông tin' },
        { icon:'fa fa-lock',code:'password',name:'Mật khẩu' }
      ]
    }


    this._updateUserInfo = this._updateUserInfo.bind(this);
    this._submitChangePassword = this._submitChangePassword.bind(this);

  }

  async _submitChangePassword(){

    
    const fields = ['pre_password','new_password','rep_password'];

    

    if(detectForm(fields,this.state.data_pass)===''){

      const checkPrePass =  await doLogin(window.USERINFO.email,this.state.data_pass['pre_password']);
      let msg = '';


      if(checkPrePass.token!=='no-key'){
        
        if(this.state.data_pass['new_password']===this.state.data_pass['rep_password']){
          const data = {
            id:window.USERINFO.id,
            password:this.state.data_pass['rep_password']
          }
  
          const res = await  doUpdateModelInfo('users',data);
          msg =  res.name === 'success' ? 'Đã đổi mật khẩu thành công !' : res.message
          


        }else{
          
          msg = 'Mật khẩu mới không khớp';
          
        }
      }else{
        msg = 'Mật khẩu cũ không đúng'
      }

      if(msg!==''){
        BenMessage({
          title:'Thông báo',
          message:msg
        });
      }
      
      
    }
  }
  async _updateUserInfo(){
    
    const fields = ['name','phone','email'];
    if(detectForm(fields,this.state.data)===''){
      
      const res = await  doUpdateModelInfo('users',this.state.data);
      const userInfo =  Object.assign(this.props.users.info,this.state.data);
      
      this.props.saveUserInfo(userInfo);
      


    }

  }
  _onUploaded(res){
    
    if(res.success){
      
      let info = this.state.data;
      Object.assign(info,{
        photoURL:res.data.link
      });
      this.setState({
        data:info
      });


    }
    
  }

  _onChangeUserPass(field,value){
    this.setState({
      data:Object.assign(this.state.data_pass,{
        [field]:value
      })
    })
  }

  _onChangeUserInfo(field,value){
    
    this.setState({
      data:Object.assign(this.state.data,{
        [field]:value
      })
    })
    
  }

  componentDidMount(){
    const userInfo = this.props.users.info
    
    this.setState({
      data:{
        id:userInfo.id,
        name:userInfo.name,
        photoURL:userInfo.photoURL || '',
        phone:userInfo.phone,
        email:userInfo.email
      }
    });


  }
  

  render(){

    
    
    return (  
      <div className="animated fadeIn">
        <main className="div-main">

            <div style={{
              width:'70%',
              margin:'auto',
            }}>

                <BenTabs 
                onChangeTab={(code)=>{ this.setState({onTab:code}) }} 
                tabs={ this.state.tabs }
              >

                <div style={{padding:40}} className={  `tab-pane  ${ this.state.onTab==='info'?'active':'' } ` }>
                  <FormGroup>
                    <Row>
                      <Col md={3}>
                        <ButtonUploadImage onUploaded={(res)=>{ this._onUploaded(res) }} />
                      </Col>
                      <Col md={6}>
                          <div style={{
                              width: 90,height: 90,
                              border:'1px dashed #aaa',
          
                            }}>
                              <img style={{maxHeight: 90,position: 'absolute'}} src={ this.state.data.photoURL } />
                          </div>
                      </Col>
                    </Row>
                  </FormGroup>
                  
                  <FormGroup style={{marginTop:30}}>
                    <Row>
                      <Col md={4}>
                          <label> Họ & Tên </label>    
                          <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText> <i className="fa fa-user"></i> </InputGroupText>
                              </InputGroupAddon>
                              <Input id="name" defaultValue={this.state.data.name} onChange={ (e)=>{ this._onChangeUserInfo('name',e.target.value) }} />
                                 
                          </InputGroup>
                                  
                      </Col>
                      <Col md={4}>
                          <label> Số ĐT </label>    
                          <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText> <i className="fa fa-phone"></i> </InputGroupText>
                              </InputGroupAddon>
                              <Input id="phone" defaultValue={this.state.data.phone} onChange={ (e)=>{ this._onChangeUserInfo('phone',e.target.value) }} />
                                 
                          </InputGroup>
                      </Col>
                      <Col md={4}>
                          <label> E-mail </label>    
                          <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText> <i className="fa fa-envelope"></i> </InputGroupText>
                              </InputGroupAddon>
                              <Input id="email" defaultValue={this.state.data.email} onChange={ (e)=>{ this._onChangeUserInfo('email',e.target.value) }} />
                                 
                          </InputGroup>
                      </Col>
                      
                      
                    </Row>

                    <Row style={{marginTop:60}}>
                       <Col md={4}>
                           <Button onClick={ this._updateUserInfo } className="btn btn-normal bg-green"> <i className="fa  fa-chevron-circle-right mr-5"></i> Cấp nhật </Button> 
                           <span className="text-red ml-10 form-err " id="form-err"></span>
                       </Col>     
                    </Row>
                  </FormGroup>

                </div>

                <div style={{padding:40}} className={  `tab-pane  ${ this.state.onTab==='password'?'active':'' } ` }>
                    <FormGroup>
                      <Row>
                         <Col md={4}>
                            <label>  Mật khẩu hiện tại </label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText> <i className="fa fa-info"></i> </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                    id="pre_password" 
                                    type="password" 
                                    onChange={ (e)=>{ this._onChangeUserPass('pre_password',e.target.value) }} 
                              />
                          </InputGroup>
                         </Col>  
                      </Row>
                      
                      <Row style={{marginTop:30}}>
                         <Col md={4}>
                            <label>  Mật khẩu mới </label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText> <i className="fa  fa-key"></i> </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                    id="new_password" 
                                    type="password" 
                                    onChange={ (e)=>{ this._onChangeUserPass('new_password',e.target.value) }} 
                              />
                          </InputGroup>
                         </Col>
                      </Row>

                      <Row style={{marginTop:30}}>
                         <Col md={4}>
                            <label>  Nhập lại mật khẩu mới </label>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText> <i className="fa  fa-key"></i> </InputGroupText>
                              </InputGroupAddon>
                              <Input 
                                    id="rep_password" 
                                    type="password" 
                                    onChange={ (e)=>{ this._onChangeUserPass('rep_password',e.target.value) }} 
                              />
                          </InputGroup>
                         </Col>
                      </Row>
                       
                      <Row style={{marginTop:30}}>
                          <Col md={4}>
                            <Button onClick={this._submitChangePassword}  className="btn btn-normal bg-green" >
                              <i className="fa  fa-chevron-circle-right mr-5"></i> Cập nhật 
                            </Button>
                            <span className=" text-red form-err"></span>
                          </Col>
                      </Row>
                      

                    </FormGroup>
                </div>

                
              </BenTabs>
              
            </div>
        </main>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}
const mapDispatchToProps = dispatch => {
  return {
    saveUserInfo: (info) => {
      dispatch({
        type:'SAVE_USER',
        info:info
      });
    },
    saveUserRoles:(roles)=>{
      dispatch({
        type:'SAVE_USER_ROLE',
        userRoles:roles
      })
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Profile);
