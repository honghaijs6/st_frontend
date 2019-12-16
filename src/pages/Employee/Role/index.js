
import Model from '../../../model/model'

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {   Table  } from 'reactstrap';

import { AppSwitch } from '@coreui/react';


import FormGroupUser from './FormGroupUser';

const MODE = 'roles';
const MODE_NAME = 'Vai trò';

const MODE_USER_ROLES = 'user_roles';
const MODE_GROUP_USERS = 'group_users';

class Role extends Component {

    _isInitData = false;
    _curInfo = {};

    constructor(props){
        super(props);

        this.state = {
            typeAction:'',  
            onAction:'',
            status:'',

            isOpenForm:false,
            tab:'role',
            userRoles:[],
            curGroupInfo:{}
        }

        this.grid = {
            colums:[
              { headerName:"STT",field:"stt",width:'50px' },
              { headerName:"SID",field:"id",width:'50px'},
              { headerName: "Mã",field:"code",width:'180px'},
              { headerName:" Tính năng ",field:"name", width:'240px'},
              { headerName: "Root Admin",field:"admin", width:'140px'}
              
              
            ],
            rowData:[]
        }



        this._setup();

        
        

    }


    _setup(){
        this.model = new Model(MODE,this.props.dispatch);
        this.moUserRoles = new Model(MODE_USER_ROLES);
        this.moGroupUsers = new Model(MODE_GROUP_USERS);

        
        // SETUP FOR GET ALL RECORD HERE 
        this.model.set('paginate',{
            offset:0,
            p:0,
            max:'all',
            sort_by:'code', 
            sort_type:'asc' 
        });
        

    }

    _listRoles(group_id){
        const rets = [];
        this.state.userRoles.map((rows)=>{
            rows.map((item2)=>{
                if(parseInt(item2.id) === parseInt(group_id)){
                    rets.push(item2);
                }
            })
        });
        return rets;

    }
    _detectRoles(group_id,role_id){
        
        let rets = this._listRoles(group_id);
        let ret = false;
        rets.map((item)=>{
            if(parseInt(item.role_id) === parseInt(role_id)){
                ret = true;
            }
        })
        
        return ret;
    }

    _loadGroupUserRoles(){
        const url = '/listAll/all';

        this.moGroupUsers.doCall(url,(res)=>{
            const data = res.data;
            if(data.name==='success'){
                
                const rows = data.rows;
                

                const object = {};
                const result = [];
                const newArr = []

                // GET DUPLICATED GROUP_USER ID ;
                rows.map((item)=>{
                    if(!object[item.id]){
                        object[item.id] = 0;
                    }
                    object[item.id] +=1 ;
                });
                Object.keys(object).map((item)=>{
                    if(object[item]>=1){
                        result.push(item);
                    }
                });
                
                result.map((item)=>{
                    let arr = [];
                    rows.map((item2)=>{
                        if(parseInt(item)===parseInt(item2.id)){
                            arr.push(item2);
                        }
                    
                    });
                    newArr.push(arr);
                });

                //console.log(newArr);
                this._fixColumRoles(newArr);

                this.setState({
                    userRoles:newArr
                });
                

            }
        })        

    }
    

    _openForm(type='post',data={}){

        
        this.setState({
            isOpenForm:true,
            typeAction:type,
            curGroupInfo:data[0]
        })
    }
    
    
    _onSubmitForm(res){
        if(res.name==='success' || res.name==='ok'){

            this._curInfo = {}
            
            this.setState({
                isOpenForm:false,
                typeAction:'',
                receiptType:'',
                status:res.name
            });
 
         }
    }
    

    componentDidMount(){
        this._loadGroupUserRoles();

    }
    componentWillReceiveProps(newProps){  

        if(!this._isIniData){
            this.model.load();
            this._isIniData = true ; 
        }
        this.grid.rowData = newProps[MODE]['list'] || [] ;  
        // CONNECT REDUX STATE 
        this._whereStateChange(newProps[MODE]['state']);

    }

    /* WHERE*/
    _whereStateChange(newState){
        this.setState(Object.assign(this.state,newState));
    }

    _fixColumRoles(userRoles){

        // GROUP BY : GROUP_USER_ID ;
        this.grid.colums.length = 5 ; 

        userRoles.map((item)=>{
            
            // detect colums
            let isDup = false; 
            this.grid.colums.map((colum)=>{
                if(colum.field==='field-'+item[0]['id']){
                    isDup = true;
                }
            });

            if(!isDup){
                this.grid.colums.push(
                    { headerName: <a style={{cursor:'pointer'}} onClick={()=>{ this._openForm('put',item) }} className="text-red">{ item[0]['group_name'] }</a>, field:"field-"+item[0]['id'], width:'140px'}
                );
            }
            
        });
        

        // ADD LASTEST COLUMS
        // REMOVE LASTITEM - AND RE-ADD IT AGAIN 
        this.grid.colums.push(
            { 
                headerName: <a style={{borderRadius:12,fontSize:9}} className="btn btn-xs btn-normal" onClick={ ()=>{ this._openForm('post') } }> 
                    <i className="font-12 mr-5 fa fa-plus-circle"></i> Thêm nhóm phân quyền </a>, 
                field:"field-button", 
                width:'140px'
            }
        );
         
       
        

    }

    _toggleSetRoles(isChecked,group_id,role_id){

        
        if(isChecked){
            // remove user_roles : 
            const listRoles = this._listRoles(group_id);
            // GET user_role_id ; 
            let userRoleId = 0
            listRoles.map((item)=>{
                if(parseInt(item.role_id) === parseInt(role_id)){
                    userRoleId = item.user_roles_id   
                }
            });

            this.moUserRoles.delete(userRoleId,(data)=>{
                if(data.name==='success'){
                    this._loadGroupUserRoles()
                }
            });

        }else{
            this.moUserRoles.post({
                role_id:role_id,
                group_user_id:group_id
            },(data)=>{
                if(data.name==='success'){
                    this._loadGroupUserRoles() 
                }

            })
        }
        

    }

    // DELETE GROUP 
    _deleteGroup(id){
        this.moGroupUsers.delete(id,(data)=>{
            if(data.name==='success'){
                this._loadGroupUserRoles();
                    this.setState({
                        isOpenForm:false
                    })
            }
        })
    }
    // groupName :''  - selectedUsers : [] 
    _submitGroup(state){

        if(this.state.typeAction!==''){
            let data = {
                name:state.groupName,
                staff_on:state.selectedUsers
            };
    
            if(this.state.typeAction==='put'){
                data['id'] = state.id
            }
    
            this.moGroupUsers.axios(this.state.typeAction,data,(data)=>{
                if(data.name==='success'){
                    this._loadGroupUserRoles();
                    this.setState({
                        isOpenForm:false
                    })
                }
            });
        }
        
    }
    render() {

        
        return (
            <div hidden={ this.state.tab === this.props.onTab ? false : true } style={{padding:30}} className="animated fadeIn">

                <FormGroupUser 
                    width="600"
                    isOpen={this.state.isOpenForm}
                    onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }}
                    typeAction={this.state.typeAction}
                    onSubmit={(state)=>{ this._submitGroup(state) }}
                    curGroupInfo={this.state.curGroupInfo}
                    onDeleteGroup={(id)=>{ this._deleteGroup(id) }}

                />
                <Table className="product-board table vk-table">
                    <thead>
                        <tr>
                            { 
                                this.grid.colums.map((item,index)=>{
                                    return(
                                        <th key={index} style={{width:item.width}}>{ item.headerName } </th> 
                                    )
                                })
                            }
                        </tr>
                    </thead>

                    <tbody style={{height:'79vh'}}>          
                        {
                            this.grid.rowData.map((item,index)=>{
                                const stt = index + 1;
                                
                                
                                                    

                                return(
                                    <tr key={item.id}>
                                        {
                                            this.grid.colums.map((item2,index2)=>{
                                                //console.log(item2);

                                                let value = '';
                                                if(index2===0){
                                                    value = stt  
                                                }else if(item2['field']==='admin'){
                                                    value = <AppSwitch 
                                                                 className={'mx-1'} 
                                                                variant={'pill'} color={'primary'}  checked={ true } disabled={true} />
                                                }else if(item2['field'].indexOf('field-')>-1){

                                                    if(item2['field'] !=='field-button'){
                                                        const group_id = parseInt(item2['field'].replace('field-',''));
                                                        const isChecked =  this._detectRoles(group_id,item['id']);

                                                        value = <AppSwitch 
                                                                    onClick={()=>{ this._toggleSetRoles(isChecked,group_id,item['id']) }}  
                                                                    className={'mx-1'} 
                                                                    variant={'pill'} color={'primary'}  checked={ isChecked }  
                                                                />
                                                        
                                                    }
                                                
                                                }else{
                                                    value = item[item2['field']];
                                                }
                                                return (
                                                    <td key={index2} style={{ width: item2['width'] }} >  
                                                         { value }
                                                    </td>
                                                )
                                            })
                                        }
                                        
                                        
                                    </tr>
                                )
                            })
                        }
                    </tbody> 
                </Table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        [MODE]: state[MODE]
    }
}

export default connect(mapStateToProps)(Role);