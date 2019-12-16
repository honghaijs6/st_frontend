
import { MAU_PHIEU_XUATKHO, MAU_PHIEU_NHAPKHO } from '../../../config/temp-code-in-out';

// HOOKS 
import doUpdateModelInfo from '../../../hook/ultil/doUpdateModelInfo';

import React from 'react';
import { FormGroup, Col, Label, Button, Input } from 'reactstrap';

import BenTabs from '../../../components/BenTabs';

import PreviewForm from './PreviewForm';


class InOutDisplayConfig extends React.Component {

    constructor(props) {
        super(props);  
        
        this.state = {

            onTab:'out',  
            tabs:[
                { icon:'',code:'out',name:'Phiếu xuất kho' },
                { icon:'',code:'in',name:'Phiếu nhập kho' },

            ],
            
            companyInfo:{},

            receipt_out_temp: `` ,
            receipt_out_temp:``,
            isOpenForm:false
        };
    }

    _previewForm = (type)=>{ 
        this.setState({
            type:type,  
            isOpenForm:true
        });
    }
    
    
    _defaultTemplate(type){
        const arr = {
            receipt_out_temp:MAU_PHIEU_XUATKHO,
            receipt_in_temp: MAU_PHIEU_NHAPKHO
        };

        this.setState({
            [type]:arr[type]
        });


    }


    async _onSubmit(field){

        const data = {
            id:this.state.companyInfo.id,
            [field]:this.state[field]
        }

        const res =  await doUpdateModelInfo('companies',data) ;

    }
 
    async componentWillReceiveProps(newProps){

        if(JSON.stringify(newProps.companyInfo)!='{}'){
            const info = newProps.companyInfo;
            
            if(info.name==='success'){

                const data = info.data;
                //alert(data.receipt_out_temp);

                this.setState({
                    companyInfo:info.data,
                    receipt_out_temp: data.receipt_out_temp || MAU_PHIEU_XUATKHO,
                    receipt_in_temp:data.receipt_in_temp || MAU_PHIEU_NHAPKHO,
                });

            }
        }
        
    }

    

    render() {


        
        return (

            <div>
                <PreviewForm 
                                
                    name="Xem trước"
                    type={this.state.type}

                    width="72%"
                    isOpen={this.state.isOpenForm}
                    onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }} 

                    receipt_out_temp={ this.state.receipt_out_temp } 
                    receipt_in_temp={ this.state.receipt_in_temp } 
                    
                    companyInfo={this.state.companyInfo}

                    
                />

                <BenTabs
                    onChangeTab={(code)=>{ this.setState({onTab:code}) }}  
                    tabs={this.state.tabs}>
                    
                    {/* TAB PHIẾU XUAT KHO  */}
                    <div className={  `tab-pane  ${ this.state.onTab==='out'?'active':'' } ` }>
                        <FormGroup row style={{border:0}}>
                            <Col md={12}>
                                <Label> Mẫu hiển thị phiếu xuất kho </Label>
                                
                                <span style={{cursor:'pointer'}} onClick={()=>{ this._previewForm('receipt_out_temp') }} className="txt-green pull-right">  
                                    <i className="fa fa-search-plus mr-5"></i>    Xem trước 
                                </span>

                                <span onClick={()=>{ this._defaultTemplate('receipt_out_temp') }} className="pointer pull-right mr-20 text-red">  
                                    <i className="fa fa-file-code-o mr-5"></i> Template mặc định
                                </span>

                                <div style={{marginTop:10}}>
                                    <Input 
                                        onChange={(e)=>{ this.setState({receipt_out_temp:e.target.value}) }}    
                                        value={ this.state.receipt_out_temp }
                                        type="textarea" style={{
                                        height:300,
                                        background:'#262A2E',
                                        color:'#fff'
                                    }} />
                                </div>

                            </Col>
                            
                        </FormGroup>

                        <FormGroup row style={{marginTop:10, border:0, margin:-20}}>
                            <Col md={12}>
                                <Button onClick={ ()=>{ this._onSubmit('receipt_out_temp') } } className="btn btn-ubuntu bg-green"> 
                                    <i className="fa  fa-chevron-circle-right mr-5"></i> Cập nhật 
                                </Button>        
                                <span className="form-err text-red" id="form-err"></span>
                            </Col>
                        </FormGroup>
                    </div>
                
                    {/* TAB PHIẾU NHAP KHO */}
                    <div className={  `tab-pane  ${ this.state.onTab==='in'?'active':'' } ` }>
                        <FormGroup row style={{border:0}}>
                            <Col md={12}>
                                <Label> Mẫu hiển thị phiếu nhập kho </Label>
                                
                                <span style={{cursor:'pointer'}} onClick={()=>{ this._previewForm('receipt_in_temp') }} className="txt-green pull-right">  
                                    <i className="fa fa-search-plus mr-5"></i>    Xem trước 
                                </span>

                                <span onClick={()=>{ this._defaultTemplate('receipt_in_temp') }} className="pointer pull-right mr-20 text-red">  
                                    <i className="fa fa-file-code-o mr-5"></i> Template mặc định
                                </span>

                                <div style={{marginTop:10}}>
                                    <Input 
                                        onChange={(e)=>{ this.setState({receipt_in_temp:e.target.value}) }}    
                                        value={ this.state.receipt_in_temp }
                                        type="textarea" style={{
                                        height:300,
                                        background:'#262A2E',
                                        color:'#fff'
                                    }} />
                                </div>

                            </Col>
                            
                        </FormGroup>

                        <FormGroup row style={{marginTop:10, border:0, margin:-20}}>
                            <Col md={12}>
                                <Button onClick={ ()=>{ this._onSubmit('receipt_in_temp') } } className="btn btn-ubuntu bg-green"> 
                                    <i className="fa  fa-chevron-circle-right mr-5"></i> Cập nhật 
                                </Button>        
                                <span className="form-err text-red" id="form-err"></span>
                            </Col>
                        </FormGroup>
                    </div>
                    

                </BenTabs>

            </div>
            
        );
    }
}



export default InOutDisplayConfig;
