
// DATA
import { JOB_TYPES, JOB_LEVELS, DEFAULT_PASSWORD } from '../../../config/app.config'; 


// HOOKS 
import detectForm  from '../../../hook/before/detectform';

import React, { Component } from 'react';
import { Row, Col, FormGroup, Input } from 'reactstrap'; 

import { AppSwitch } from '@coreui/react';



import ViewModal from '../../../components/ViewModal';
import SelectList from '../../../components/SelectList';
import SelectListModel from '../../../components/SelectListModel'; 



class MyForm extends Component { 


    constructor(props){
        super(props);

        this.state = {}


        this._onSubmit = this._onSubmit.bind(this);
    }

    _onChange(field, value){

        this.setState({
            [field]:value
        });

    }

    _resetForm(){
        return {

            name:'',
            gender:1,
            email:'',
            phone:'',
            office_id:0,
            job_type:0,
            department_id:0,
            job_level:0,
            username:'',
            is_limit_ip_chamcong: true
  
        }
    }

    _onSubmit(){
        //alert(this.props.typeAction);

                const fields = ['name','email','phone','office_id','department_id','job_level','username'];
        if(detectForm(fields,this.state)===''){
            
            let data = this.state ; 
            data.is_limit_ip_chamcong = data.is_limit_ip_chamcong === true ? 1 : 0 ;
            data.password =  DEFAULT_PASSWORD

            
            this.props.model.axios(this.props.typeAction,data,(res)=>{ 

                this._whereStateChange(res);     
                

            });


        }


    }

    componentWillReceiveProps(newProps){

        if(newProps.typeAction==='put'){

            const data = newProps.data;

            const state = {
                id:data.id,
                name:data.name,
                gender:data.gender,
                email:data.email,
                phone:data.phone,
                office_id:data.office_id,  
                job_type:data.job_type,
                department_id:data.department_id,
                job_level:data.job_level,
                username:data.username,
                is_limit_ip_chamcong: parseInt(data.is_limit_ip_chamcong) > 0 ? true : false
            }

            this.setState(state);


        }else{
            const state = this._resetForm();
            this.setState(state);
        }
    }

    _whereStateChange(res){
        if(res.name==='success' || res.name ==='ok'){
            this.props.onSubmitForm(res);
        }
    }
    
    render() {

        const title = 'Nhân viên ' + this.state.name
        return (
            <ViewModal name={title} onSubmit={this._onSubmit} isFooter={true} {...this.props}>
                <div className="view-modal-body" style={{padding:30}}>

                    <h5 className="txt-green font-12 text-uppercase"> Thông tin cá nhân </h5>
                    <FormGroup>
                        <Row>
                            <Col md={6}>
                                <label> Họ & Tên </label>
                                <Input id="name" onChange={(e)=>{ this._onChange('name',e.target.value) }} defaultValue={ this.state.name } type="text"  />
                            </Col>
                            <Col md={6}>
                                <label> Giới tính </label>
                                <SelectList id="gender" onChange={(e)=>{ this._onChange('gender',e.target.value)  }} defaultValue={ this.state.gender } name="Vui lòng chọn" rows={[
                                    { code:1,name:'Nam' },
                                    { code:0, name:'Nữ' }
                                ]} /> 

                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={6}>
                                <label> E-mail </label>
                                <Input id="email" onChange={(e)=>{ this._onChange('email',e.target.value) }} defaultValue={ this.state.email } type="text" />
                            </Col>
                            <Col md={6}>  
                                <label> Điện thoại </label>
                                <Input id="phone" onChange={(e)=>{ this._onChange('phone',e.target.value) }} defaultValue={ this.state.phone } type="text" />
                            </Col>
                        </Row>
                    </FormGroup>

                    <h5 style={{marginTop:40}} className="txt-green font-12 text-uppercase"> Thông tin nhân viên </h5>
                    <FormGroup>
                        <Row>
                            <Col md={6}>
                                <label> Văn phòng làm việc </label>
                                <SelectListModel 
                                    id="office_id" 
                                    onChange={(e)=>{  this._onChange('office_id',e.target.value)  }} 
                                    defaultValue={ this.state.office_id } 
                                    strModel="offices" name="Vui lòng chọn" 
                                />

                            </Col>
                            <Col md={6}>
                                <label> Loại hình công việc </label>
                                <SelectList 
                                    id="job_type" 
                                    onChange={(e)=>{ this._onChange('job_type',e.target.value) }}
                                    defaultValue={ this.state.job_type }  
                                    name="Vui lòng chọn" 
                                    rows={ JOB_TYPES } 
                                />

                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={6}>
                                <label> Phòng ban </label>
                                <SelectListModel 
                                    id="department_id" 
                                    defaultValue={ this.state.department_id } 
                                    onChange={(e)=>{  this._onChange('department_id',e.target.value)  }} 
                                    strModel="departments" name="Vui lòng chọn" 
                                />  
                            </Col>    
                            <Col md={6}>
                                <label> Cấp bậc </label>
                                <SelectList 
                                    id="job_level" 
                                    onChange={(e)=>{ this._onChange('job_level',e.target.value) }}
                                    defaultValue={this.state.job_level} 
                                    name="Vui lòng chọn" 
                                    rows={ JOB_LEVELS } 
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={6}>
                                <label> ID nội bộ </label>
                                <Input id="username" onChange={(e)=>{ this._onChange('username',e.target.value) }} defaultValue={ this.state.username } type="text" />
                            </Col>
                            <Col md={6}>
                                <label>Không giới hạn IP khi chấm công</label> <br></br>
                                <AppSwitch 
                                    onClick={ ()=>{   
                                        this.setState({
                                            is_limit_ip_chamcong: !this.state.is_limit_ip_chamcong
                                        });
                                    }} 
                                    className={'mx-1'} 
                                    variant={'pill'} 
                                    color={'primary'}  
                                    checked={ this.state.is_limit_ip_chamcong } />

                            </Col>
                        </Row>
                        
                    </FormGroup>
                </div>
            </ViewModal>
        );
    }
}

MyForm.defaultProps = {
    typeAction:'post'
}

export default MyForm;
