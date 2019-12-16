// DATA 
import USER_CONFIG from '../../../config/user.conf'
import { JOB_TYPES, JOB_LEVELS } from '../../../config/app.config'; 

import Model from '../../../model/model';



// LIBS 
import moment from 'moment';


import React, { Component } from 'react';
import { FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';

import { BenGrid } from '../../../components/BenGrid2';

import ButtonExpand from '../../../components/ButtonExpand';
import SelectList from '../../../components/SelectList';


import MyForm from './Form';

const MODE = 'users';
const MODE_NAME = 'Nhân viên';


class MyEmployee extends Component {

    _curInfo = {}; 
    constructor(props){
        super(props);

        
        this.state = {

            typeAction:'',
            onAction:'',
            status:'',

            isOpenForm:false,
            
            tab:'employee'
        }

        this.grid = {
            colums:[
                { headerName: "Họ & Tên ", field: "name",width:300,
                    cellRenderer(params){
                        return `
                            <span> <i class="fa fa-user mr-5"></i> ${params.value} </span>
                        `;
                    }
                },
                { headerName: "Văn phòng", field: "office_name",width:180 },
                { headerName: "Cấp bậc", field: "job_level",width:180,
                    cellRenderer(params){
                        return USER_CONFIG['job_level'][params.value]
                    }
                },
                { headerName: "Loại hình", field:"job_type", width:180,
                    cellRenderer(params){
                        return USER_CONFIG['job_type'][params.value];
                    }
                },
                { headerName: "SĐT", field:"phone", width:140,
                    cellRenderer(params){
                        return params.value === 'null' ? 'n/a' : params.value
                    }
                },
                { headerName: "E-mail", field:"email", width:180 },
                {headerName: "Ngày tạo", field: "date_created",width:140,
                  
                  cellRenderer(params){
        
                    const humanDate = moment(params.value).format('YYYY-MM-DD')
                    return `
                     ${ humanDate }
                   `
                  }
                  
                },
                {headerName: "Hiệu chỉnh", field: "date_modified",width:140,
                  
                  cellRenderer(params){
        
                    const humanDate = params.value !== null ? moment(params.value).format('YYYY-MM-DD') : '';
                    return `
                     ${ humanDate }
                   `
                  }
                  
                }
                
              ],
              rowData: []
        }

        this._setup()

        this._doOpenModalPost = this._doOpenModalPost.bind(this);
        this._doOpenModalUpdate = this._doOpenModalUpdate.bind(this);
    }

    _setup(){

        this.model = new Model(MODE, this.props.dispatch);

    }

    _onChange(field,value){
    
        if(value!==''){
          this.model.set('paginate',{
            [field]:value
          });
        }else{ this.model.remove(field) }
        

        this.model.load(); 
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

    _doOpenModalPost(){
        this.setState({
            typeAction:'post',
            isOpenForm:true
        });

    }

    _doOpenModalUpdate(data){
        
        this._curInfo = data ; 
        this.setState({
            typeAction:'put',
            isOpenForm:true
        });

    }

    componentWillReceiveProps(newProps){
        
        this.grid.rowData = newProps[MODE]['list'] || [] ;  
        // CONNECT REDUX STATE 
        this._whereStateChange(newProps[MODE]['state']);


    }

    componentDidMount(){
        
        this.model.initData();


    }

    /* WHERE*/
    _whereStateChange(newState){
        this.setState(Object.assign(this.state,newState));
    }

    render() {
        return (
            <div  hidden={  this.props.onTab === this.state.tab ? false : true }  className="animated fadeIn" style={{padding:10}}> 

                <MyForm 

                    typeAction={this.state.typeAction}
                    model={this.model}

                    width="45%"
                    isOpen={this.state.isOpenForm}
                    onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen})  }}
                    data={this._curInfo}

                    onSubmitForm={ (res)=>{ this._onSubmitForm(res) }}

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

                    customButton = {
                        <ButtonExpand style={{borderRight:0}}  icon="fa-filter">
                          <FormGroup>
                            <Label> Cấp bậc </Label>
                            <SelectList name="Tất Cả" onChange={(e)=>{ this._onChange('job_level',e.target.value) }}  rows={ JOB_LEVELS } />

                          </FormGroup>
                          <FormGroup>
                            <Label> Loại hình  </Label>
                            <SelectList name="Tất Cả" onChange={(e)=>{ this._onChange('job_type',e.target.value) }}  rows={ JOB_TYPES } />
                            
                          </FormGroup>
                          

                      </ButtonExpand>
                    }

                        
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
export default connect(mapStateToProps)(MyEmployee);
