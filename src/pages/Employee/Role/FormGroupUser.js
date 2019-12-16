
// HOOKS 
import doLoadAll from '../../../hook/ultil/doLoadAll';
import detechForm from '../../../hook/before/detectform';

import React, { Component } from 'react';
import ViewModal from '../../../components/ViewModal';
 
import { FormGroup, Input, Col } from 'reactstrap';
import Select from 'react-select';


import BenConfirm from '../../../components/BenConfirm';




class FormGroupUser extends Component {

    
    state={}
    _users=[];

    _resetForm(){
        return {
            groupName:'',
            selectedUsers:[],
            users:[]
        }
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
            this.users = users;
            
        }
    }

    _onSubmit = ()=>{
        //this.props.onSubmit
        //alert(JSON.stringify(this.state.selectedUsers));

        const fields = ['groupName'] ; 
        if(detechForm(fields,this.state) ===''){
            
            if(this.state.selectedUsers.length > 0){

                this.props.onSubmit(this.state);

            }else{  
                let el = document.querySelector("#form-err");
                el.innerHTML = 'Vui lòng gán nhân viên';

            }

        }


    }
    async componentDidMount(){
        await this._loadUser();
    }

    componentWillReceiveProps(newProps){
        if(newProps.typeAction==='post'){
            this.setState(this._resetForm);
            
        }else{
            // UPDATE MEMBERS 
            if(JSON.stringify(newProps.curGroupInfo)!=='{}'){

                const info = newProps.curGroupInfo;
                
                this.setState({
                    id:info.id,
                    groupName:info.group_name,
                    selectedUsers:JSON.parse(info.staff_on)
                });

            }
        }
    }

    _removeGroup = async ()=>{
        let result = await BenConfirm({
            title: 'Cảnh báo',
            message: "Bạn có chắc là muốn xoá nhóm này ?"
        });

        if(result){
            this.props.onDeleteGroup(this.state.id);
        }
    }
    render() {
        const title = this.props.typeAction === 'post' ? 'Tạo nhóm mới' : 'Chỉnh sửa nhóm' 
        return (
            <ViewModal isFooter={true} name={title} {...this.props} onSubmit={ this._onSubmit } >
                <div className="view-modal-body"> 
                    <FormGroup row>
                        <Col>
                            <label> Nhóm </label>
                            <Input id="groupName" defaultValue={this.state.groupName} onChange={(e)=>{  this.setState({groupName:e.target.value})  }} type="text" />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col> 
                            <label> Gán nhân viên </label>
                            <Select
                                
                                placeholder="Thêm người nhận"
                                isSearchable ={true}
                                isMulti ={true}
                                value={this.state.selectedUsers}
                                onChange={(option)=>{ this.setState({ selectedUsers:option }) }} 
                                options={this.users}
                             />
                        </Col>
                    </FormGroup>
                    {
                        this.props.typeAction === 'put' ? 
                        <FormGroup row>
                            <Col>
                                <a onClick={this._removeGroup} className="text-red" style={{
                                    cursor:'pointer',
                                    fontSize:12
                                }}> Xoá nhóm phần quyền này </a>
                            </Col>
                        </FormGroup> :
                        <div></div>
                    }
                    


                </div>
            </ViewModal>
        );
    }
}

FormGroupUser.defaultProps= {
    typeAction:'post',
    onSubmit:()=>{},
    onDeleteGroup:()=>{}
}

export default FormGroupUser;