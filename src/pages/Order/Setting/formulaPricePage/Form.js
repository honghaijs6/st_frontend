
import React, { Component } from 'react';
import {  Col, FormGroup, Input, InputGroup,InputGroupAddon, InputGroupText  } from 'reactstrap';
import doUpdateModelInfo from '../../../../hook/ultil/doUpdateModelInfo'; 




import ViewModal from '../../../../components/ViewModal';

class MyForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            price_setting:props.price_setting
        }
    }
    
    _getTitle(level){

        const arr = {
            b:'B. Giá Gốc',
            c:'C. Giá ĐL',
            d:'D. Giá Lẻ'
        }

        return arr[level]
    }

    componentWillReceiveProps(newProps){

        this.setState({
            price_setting:newProps.price_setting
        });


    }


    _onChange(level,value){
        

        this.setState(Object.assign(this.state.price_setting,{
            [level]:value
        }));
        
    }

    _onSubmit = async  ()=>{

        const data = {
            id:this.props.id,
            price_setting:this.state.price_setting
        }
        const res =  await doUpdateModelInfo('companies',data) ;
        
        if(res.name==='success' || res.name==='ok'){
            this.props.onSubmitForm(res)
        }


    }

    render() {

        const title = this._getTitle(this.props.level);
        let data = this.state.price_setting

        return (
            <ViewModal onSubmit={ this._onSubmit } isFooter={true}  name={title} {...this.props}  >
                <div className="view-modal-body">
                    <FormGroup row>
                        <Col md={12}>
                            <label> Công thức </label>
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                      <InputGroupText> =  </InputGroupText>
                                </InputGroupAddon>
                                <Input type="text" onChange={(e)=>{ this._onChange(this.props.level,e.target.value) }} defaultValue={ data[this.props.level] } />
                                    
                            </InputGroup>

                        </Col>
                    </FormGroup>
                </div>
            </ViewModal>
        );
    }
}


MyForm.defaultProps = {
    level:"b",
    onSubmitForm:()=>{},
    onChange:()=>{}
}

export default MyForm;