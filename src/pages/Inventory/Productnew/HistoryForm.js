import Model from '../../../model/model';
import moment from 'moment'; 


import React, { Component } from 'react';
import {connect} from 'react-redux';


import { ButtonGroup } from 'reactstrap' ; 

import ViewModal from '../../../components/ViewModal';
import { BenGrid } from '../../../components/BenGrid2';

import SelectList from '../../../components/SelectList';


const MODE = 'product_logs';


class HistoryForm extends Component {

    constructor(props){
        super(props);


        this.state = {

            curCode:'',
            status:''
        }
        
        this.grid = {
            colums:[
              { headerName: "Mã Phiếu Kho", field: "warehouse_receipt_code", width:180,
                cellRenderer(params){
                    return `
                        <span class="text-uppercase"> ${params.value} </span>
                    `;
                }
              },
              { headerName: "Sản phẩm", field: "product_code", width:200 },

              { headerName: "Loại", field:"type",width:100, 
                cellRenderer(params){

                    const bgArr = {
                        in:'bg-red',
                        out:'bg-green'
                    }
                    return `
                        <span class="badge text-uppercase ${ bgArr[params.value] } " > ${ params.value} <span>
                    `
                }
              },

              {
                  headerName:"Mã chứng từ", field:"purchase_code", width:200
              },

              { headerName: "S.L", field:"balance", width:140 },
              { headerName: "Kho", field: "warehouse_code", width:140,
                 cellRenderer(params){
                     return `
                        <span class="text-uppercase"> ${params.value} </span>
                     `
                 }
              },
              { headerName: "Ngày", field: "date_created", width:140,
                cellRenderer(params){
                    return  moment(params.value).format('YYYY-MM-DD');

                }
              }
              
              
            ],
            rowData:[]
          }

        this._setup();

    }

    _setup(){

        this.model = new Model(MODE,this.props.dispatch);
        
    }

    componentWillReceiveProps(newProp){
        if(newProp.isOpen){

            
            if(this.state.curCode !== newProp.data.code){
                
                this.model.set('paginate',{
                    product_code: newProp.data.code
                });
                this.state.curCode = newProp.data.code;
                
                this.model.load();
            }

            this.grid.rowData = newProp[MODE]['list'] || [];
            this.setState(Object.assign(this.state,newProp[MODE]['state']));
            
            
        }
    }

    _onChangeType = (e)=>{
        const type = e.target.value;

        if(type!==''){
            this.model.set('paginate',{
                type:type
            });
        }else{
            this.model.remove('type');
        }

        this.model.load();

        
    }
    render() {

        
        return (
            <ViewModal
                width="68%"  
                name={ <span className="text-uppercase"> { this.props.data.code } </span> } {...this.props} >
                
                <div className="view-modal-body" style={{marginBottom:40, marginTop:10}}>
                    
                    <BenGrid

                        
                        gridID='id'
                        rowSelection='single'

                        isRightTool={ true }
                        height="60vh"

                        nextColums={ this.grid.colums }
                        rowData={this.grid.rowData}
                        model={ this.model }
                        
                        customButton = {

                            <ButtonGroup>

                                <SelectList

                                    onChange={ this._onChangeType }

                                    style={{borderRadius:0,borderRight:0}}
                                    name='Tất cả'
                                    rows={[
                                        {code:'in', name:'Nhập'},
                                        {code:'out', name:'Xuất'},

                                    ]}
                                />
                            </ButtonGroup>
                            
                        }

                        displayBtn = {[]}

                        
                        
                    />

                </div>

            </ViewModal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        [MODE]: state[MODE]
    }
}

export default connect(mapStateToProps)(HistoryForm);
