import detectForm from '../../../hook/before/detectform';

import React, { Component } from 'react';
import { FormGroup, Row, Col, Input} from 'reactstrap'; 

import ViewModal from '../../../components/ViewModal';

class MyForm extends Component {


    constructor(props){
        super(props);

        this.state = {}

        this._onSubmit = this._onSubmit.bind(this);
    }


    _onSubmit(){

        const field = ['name'];
        if(detectForm(field,this.state)===''){
            
            this.props.model.axios(this.props.typeAction,this.state,(res)=>{
                this.props.onSubmitForm(res);
                
            })
        }

    }
    _resetForm(){
        return {
            name:''
        }
    }
    componentWillReceiveProps(newProps){
        
        let state = this._resetForm();

        if(newProps.typeAction==='put'){
            state = {
                id:newProps.data.id,
                name:newProps.data.name
            }
        }

        this.setState(state);
    }
    render() {

        
        return (    
            <ViewModal onSubmit={ this._onSubmit }  isFooter={true} {...this.props} >
                <div className="view-modal-body">
                    <FormGroup>
                        <Row>
                            <Col md={12}>
                                <label> Tên bộ phận </label>
                                <Input onChange={(e)=>{ this.setState({name:e.target.value})  }} defaultValue={this.state.name} id="name" type="text"/>
                            </Col>
                        </Row>
                    </FormGroup>
                </div>
            </ViewModal>
        );
    }
}

export default MyForm;