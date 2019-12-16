// DATA
import Model from '../../../model/model';

// LIBS
import moment from 'moment';


import React, { Component } from 'react';
import { connect } from 'react-redux';

import { BenGrid } from '../../../components/BenGrid2';

import MyForm from './Form'; 


const MODE = 'departments';
const MODE_NAME = 'Bộ phận'; 


class MyDepartment extends Component {
    
    _curInfo = {};
    _isInitData = false;

    constructor(props){

        super(props);

        this.state = {
            typeAction:'',
            onAction:'',
            status:'',

            tab:'department',
            isOpenForm:false,

        }

        this.grid = {
            colums:[
                { headerName: "Tên ", field: "name",width:300,
                    cellRenderer(params){
                        return `
                            <span> <i class="fa fa-shirtsinbulk mr-5"></i> ${params.value} </span>
                        `;
                    }
                },

                { headerName:"Số Nhân viên", field:"total_user",width:180 },
                
                { headerName:"Ngày tạo", field:"date_created",width:140,

                    cellRenderer(params){
                        const humanDate = moment(params.value).format('YYYY-MM-DD')
                        return `
                            ${ humanDate }
                        `
                    }
                }
                
            ],
            rowData:[]
        }

        this._doOpenModalUpdate = this._doOpenModalUpdate.bind(this);
        this._doOpenModalPost = this._doOpenModalPost.bind(this);
        this._onSubmitForm = this._onSubmitForm.bind(this);

        this._setup();
    }   


    _onSubmitForm(res){

        if(res.name==='success' || res.name==='ok'){

            this._curInfo = {}
            
            this.setState({
                isOpenForm:false,
                typeAction:'',
                status:res.name
            });
        }
    }

    _doOpenModalPost(){

        this.setState({
            typeAction:'post',
            isOpenForm:true
        });

    }
    _doOpenModalUpdate(data){
        this._curInfo = data;

        this.setState({
            typeAction:'put',
            isOpenForm:true
        });
    }

    _setup(){
        this.model = new Model(MODE,this.props.dispatch);

    }
    componentWillReceiveProps(newProps){

        if(!this._isInitData){
            this.model.load();
            this._isInitData = true ; 
        }

        this.grid.rowData = newProps[MODE]['list'] || [];
        // CONNECT REDUX STATE 
        this._whereStateChange(newProps[MODE]['state']);
        

    }

    _whereStateChange(newState){
        this.setState(Object.assign(this.state,newState));
    }
    
    render() {
        return (
            <div hidden={ this.state.tab === this.props.onTab ? false : true } style={{padding:10}} className="animated fadeIn" >

                <MyForm
                    name={ MODE_NAME }
                    model={this.model}
                    isOpen={this.state.isOpenForm}
                    onToggle={  (isOpen)=>{  this.setState({isOpenForm:isOpen}) }}
                    typeAction={this.state.typeAction}

                    data={this._curInfo}
                    onSubmitForm={ this._onSubmitForm }

                />
                <BenGrid

                    height='77.5vh'
                    gridID="id"

                    onBtnEdit={ this._doOpenModalUpdate }
                    onBtnAdd={this._doOpenModalPost}   

                    rowSelection='single'
                    formStatus={ this.state.status }
                    isRightTool={ true }
                        

                    nextColums={ this.grid.colums }
                    rowData={this.grid.rowData}
                    model={ this.model }
                    
                        
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        [MODE]: state[MODE]
    }
}
export default connect(mapStateToProps)(MyDepartment);