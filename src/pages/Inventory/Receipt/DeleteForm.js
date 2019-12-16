
// HOOKS
import detectForm from '../../../hook/before/detectform';

import React, { Component } from 'react';
import { Row, Col, Button, FormGroup, Input } from 'reactstrap';

import ViewModal from '../../../components/ViewModal';
import SelectListModel from '../../../components/SelectListModel' ; 



export default  class DeleteForm extends Component {
    

    
    _curInfo = {}

    constructor(props){
        super(props);

        this.state = {
            delete_reason_id:0
        }

        this._cancel = this._cancel.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    
    _cancel(){
        document.querySelector('.close').click();

    }
    _onSubmit(){

        const fields = ['delete_reason_id']
        if(detectForm(fields,this.state)===''){
            
            const data = {
               id:this._curInfo.id,
               delete_reason_id:this.state.delete_reason_id 
            };
            
            this.props.model.putCustom('cancel',data,(res)=>{
            
                if(res.name === 'success' || res.name==='ok'){
                    this.props.onSubmitForm(res);
                }
            });


        }
        
    }

    componentDidMount(){
        this.model = this.props.model ; 

    }
    
    componentWillReceiveProps(newProps){
        this._curInfo = newProps.data;
        
    }


    render() {
        return (
            <ViewModal isFooter={true}  name="Cảnh báo" { ...this.props } onSubmit={ this._onSubmit } >
                <div className="view-modal-body" >

                    {
                        this.props.data.status === 0 ? 
                        (
                            <div>
                                <p> Bạn có chắc là muốn xoá dữ liệu này? </p>
                                <FormGroup>
                                    <Row>
                                        <Col md={12}>
                                            <label> Lý do xoá </label>
                                            <SelectListModel id="delete_reason_id" onChange={(e)=>{ this.setState({delete_reason_id:e.target.value}) }} strModel="delete_reasons" name="Vui lòng chọn" />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </div>
                        ): <div style={{textAlign:'center'}} className="text-red" > <i className="fa fa-warning mr-5"></i> Xin lỗi bạn không thể xoá !  </div>
                    }

                    
                
                </div>

                 
            </ViewModal>
        );
    }
}


DeleteForm.defaultProps = {
    onSubmitForm:()=>{},
    data:{}
}