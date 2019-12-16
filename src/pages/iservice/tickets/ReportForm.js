import detectForm from '../../../hook/before/detectform'

import React, { Component } from 'react';
import { Input, Row, Col, FormGroup } from 'reactstrap';


import ViewModal from '../../../components/ViewModal';


class ReportForm extends Component {


    constructor(props){

        super(props);
        this.state = {
            timeline_replies:''
        };

        this._onSubmit = this._onSubmit.bind(this);
    }
    _onSubmit(){
        const fields = ['timeline_replies'];
        

        if(detectForm(fields,this.state)===''){
            
            const data = this.state;
            

            this.props.model.putCustom('report',data,(res)=>{
            
                if(res.name === 'success' || res.name==='ok'){
                    this.props.onSubmitForm(res);
                }
            });
            
        }
          
    }

    _whereStateChange(res){

        if(res.name==='success' || res.name ==='ok'){
          this.props.onSubmitForm(res);
        }
        
    }


    componentWillReceiveProps(newProps){

        if(JSON.stringify(newProps.data)!=='{}'){
            
            const data = newProps.data;
            
            this.setState({
                id:data.id,
                type:data.type,
                belong_user:data.belong_user,
                timeline_replies:data.timeline_replies || ''
            });

        }
    }
    render() {
        return (
            <ViewModal onSubmit={this._onSubmit} name="Báo cáo kết quả" isFooter={true}  {...this.props} >
                <div className="view-modal-body">
                    <FormGroup>
                        <Row>
                            <Col md={12}>
                                <label> Nội dung </label>
                                <Input 
                                    defaultValue={this.state.defaultValue} 
                                    onChange={(e)=>{ this.setState({timeline_replies:e.target.value}) }} 
                                    id="timeline_replies" style={{height:100}} 
                                    type="textarea" 
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                </div>
            </ViewModal>
        );
    }
}

export default ReportForm
