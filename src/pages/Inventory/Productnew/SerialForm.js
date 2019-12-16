import Model from '../../../model/model';
import moment from 'moment'; 

import React from 'react';
import {connect} from 'react-redux';


import { ButtonGroup } from 'reactstrap' ; 

import ViewModal from '../../../components/ViewModal';
import { BenGrid } from '../../../components/BenGrid2';

import SelectList from '../../../components/SelectList';


const MODE = 'serials';




class SerialForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {

            curCode:'',
            status:''
        }

        this.grid = {
            colums:[
              { headerName: "Serial/Emei", field: "code", width:180,
                cellRenderer(params){
                    return `
                        <span class="text-uppercase"> ${params.value} </span>
                    `;
                }
              },
              { headerName: "Sản phẩm", field: "product_code", width:200,  
                cellRenderer(params){
                    return `<span class="text-uppercase"> ${params.value} </span>`
                }
              },

              { headerName: "Trạng thái", field:"status",width:180, 
                cellRenderer(params){

                    const bgArr = [
                        {
                            class:'text-green',
                            name:'<i class="fa fa-clock-o mr-5"></i> còn hàng'
                        },
                        {
                            class:'text-blue',
                            name:'<i class="fa fa-truck mr-5"></i> đã bán'
                        },
                        
                    ] ; 

                    return `
                        <span class="${bgArr[params.value]['class']}"> ${   bgArr[params.value]['name']} <span>
                    `
                }
              },

              { headerName: "Ngày Nhập", field: "date_created", width:140,
                cellRenderer(params){
                    return  moment(params.value).format('YYYY-MM-DD');

                }
              },

              { headerName: "Ngày bán", field: "date_modified", width:140,
                cellRenderer(params){
                    return  params.value === null ? '' : moment(params.value).format('YYYY-MM-DD')

                }
              },
              {
                  headerName:"Chứng từ", field:"warehouse_receipt_code_in",width:200,
                  cellRenderer(params){
                    const code = params.data.status === 0 ? params.value : params.data.warehouse_receipt_code_out
                      return ` <span class="text-uppercase"> ${code} </span> `
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
        const status = e.target.value;

        if(status!==''){
            this.model.set('paginate',{
                status:status
            });
        }else{
            this.model.remove('status');
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
                                        {code:0, name:'Còn hàng'},
                                        {code:1, name:'Đã bán'},

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

export default connect(mapStateToProps)(SerialForm);
