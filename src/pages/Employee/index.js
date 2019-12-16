

import React, { Component } from 'react';

import {BenExplorer} from '../../components/BenExplorer';

import MyEmployee from './MyEmployee'; 
import MyOffice from './MyOffice' ; 
import MyDepartment from './MyDepartment';
import Role from './Role'; 


class Employee extends Component {

    constructor(props){
        super(props);

        this.state = {

             
            onTab:'employee',
            navData:[
                {icon:'fa fa-user', code:'employee',name:'Nhân viên',active:true},
                {icon:'fa fa-folder', code:'office',name:'Văn phòng làm việc'},
                {icon:'fa  fa-th-large', code:'department',name:'Phòng ban'},
                {icon:'fa fa-gavel', code:'role',name:'Quyền truy cập'}
            ]
        }

        

        this._onNavChange = this._onNavChange.bind(this);
    }
    
    /* WHEN */
    _onNavChange(code){
        this._whereStateChange({
            onTab:code
        });
    }

    _whereStateChange(newState){
        this.setState(Object.assign(this.state,newState));
    }
    
        
    render() {
        return (
            <div className="animated fadeIn">
                <BenExplorer style={{marginTop: 20,}} onLeftSideChange={ this._onNavChange } data={this.state.navData} >
                    <MyEmployee  {...this.state} />
                    <MyOffice {...this.state} />
                    <MyDepartment {...this.state} />
                    <Role {...this.state} />
                </BenExplorer> 
            </div>
        );
    }
}

export default Employee ; 

