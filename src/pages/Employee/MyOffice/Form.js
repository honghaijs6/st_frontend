
// HOOKS
import detectForm from '../../../hook/before/detectform';

import React from 'react';
import { FormGroup, Input, Row, Col } from 'reactstrap';

import ViewModal from '../../../components/ViewModal';
import SelectRegion from '../../../components/SelectRegion' ; 

class MyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this._onSubmit = this._onSubmit.bind(this);
    }
    
    _onSubmit(){
        
        const field = ['name','address','region_code'];

        if(detectForm(field,this.state)===''){
            
            this.props.model.axios(this.props.typeAction,this.state,(res)=>{
                this._whereStateChange(res);     
            })
        }


    }
    _resetForm(){
        return {
            name:'',
            address:'',
            region_code:'79'
        }
    }

    componentWillReceiveProps(newProp){

        let state = this._resetForm();
        
        if(newProp.typeAction==='put'){

            const data = newProp.data;
            state = {
                id:data.id,
                name:data.name,
                address:data.address,
                region_code:data.region_code
            };

        }

        this.setState(state);
    }

    _onChange(field,value){

        this.setState({
            [field]:value
        });

    }

    _whereStateChange(res){
        if(res.name==='success' || res.name ==='ok'){
            this.props.onSubmitForm(res);
        }
    }

    render() {

        const title = 'Văn phòng';

        return (
            <ViewModal onSubmit={ this._onSubmit } name={title} isFooter={true}  {...this.props} >
                <div className="view-modal-body">
                    <FormGroup>
                        <Row>
                            <Col md={8}>
                                <label> Tên Văn phòng </label>
                                <Input onChange={(e)=>{ this._onChange('name',e.target.value) }} defaultValue={ this.state.name } id="name" type="text" />
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col md={8}>
                                <label> Địa chỉ </label>
                                <Input onChange={(e)=>{  this._onChange('address',e.target.value) }} type="text" defaultValue={this.state.address} id="address" />
                            </Col>
                            <Col md={4}>
                                <label> Tỉnh/Thành </label>
                                <SelectRegion 
                                    id="region_code"
                                    onChange={(e)=>{ this._onChange('region_code',e.target.value) }} 
                                    defaultValue={ this.state.region_code }  
                                />
                            </Col>
                        </Row>
                    </FormGroup>
                </div>
            </ViewModal>
        );
    }
}



export default MyForm;
