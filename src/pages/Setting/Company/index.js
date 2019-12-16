
// HOOKS 
import doGetModelInfo from '../../../hook/ultil/doGetModelInfo'; 
import detectForm from '../../../hook/before/detectform';
import doUpdateModelInfo from '../../../hook/ultil/doUpdateModelInfo';


import React, { Component } from 'react';

import { Row, Col, FormGroup, Input, Button, InputGroup,InputGroupAddon, InputGroupText  } from 'reactstrap';
import  ButtonUploadImage from '../../../components/ButtonUploadImage';


class Company extends Component {

    
    constructor(props){
        super(props);

        this.state = {

            logo:'',
            name:'',
            address:'',
            tax_no:'',
            region_code:'',
            subregion_code:'',
            phone:'',
            email:'',
            fax:'',
            website:''   
        }

        this._onSubmit = this._onSubmit.bind(this);
    }

    _onUploaded(res){
        if(res.success){
      
            this.setState({
                logo:res.data.link
            });
            
        }
    }

    async _onSubmit(){
    
        const fields = [
          'name','address','tax_no','phone','email'
        ];
        
    
        if(detectForm(fields,this.state)===''){
           //  CHECK VALUE FORMULA ; 
           const res =  await doUpdateModelInfo('companies',this.state) ;

        }
    
    }

    async componentDidMount(){
        const info = await doGetModelInfo('companies',window.USERINFO.company_id);

        if(info.name==='success'){
            
            const data = info.data;
            
            this.setState({
                id:data.id,
                logo:data.logo || '',
                name:data.name,
                address:data.address,
                tax_no:data.tax_no,
                phone:data.phone,
                email:data.email,
                website:data.website
            });
            
        }
    
    } 

    render() { 
        return (
            <div className="animated fadeIn">
                <main className="div-main">
                    <div style={{padding:30}}>
                        <h3 className="text-uppercase" style={{margin:0, padding:0}}> Thiết lập </h3>
                        <Row>
                            <Col md={9}>
                                <div style={{
                                    marginTop:20,
                                    padding:30,
                                    background:'#f5f5f5',
                                    border:'1px solid #ddd'  
                                }}>



                                    <FormGroup>
                                        
                                        <Row style={{marginBottom:30}}>
                                            <Col md={3}>
                                                <ButtonUploadImage onUploaded={(res)=>{ this._onUploaded(res) }} />
                                            </Col>  

                                            <Col md={6}>
 
                                                <div>
                                                    <img style={{height: 90, padding:2,position: 'absolute',border:'1px dashed #aaa'}} src={ this.state.logo } />
                                                </div>

                                            </Col>
                                        </Row>
                                        <Row style={{marginBottom:20}}>
                                            <Col md={5}>
                                                <label> Tên Doanh Nghiệp </label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                    <InputGroupText> <i className="icon icon-map"></i> </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input id="name" defaultValue={this.state.name} onChange={ (e)=>{ this.setState({name:e.target.value}) }} />
                                                    
                                                </InputGroup>
                                            </Col>
                                            <Col md={5}>
                                                <label> Địa chỉ </label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                    <InputGroupText> <i className="icon icon-location-pin"></i> </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input id="address" defaultValue={this.state.address} onChange={ (e)=>{ this.setState({address:e.target.value}) }} />
                                                </InputGroup>


                                            </Col>
                                        </Row>

                                        <Row style={{marginTop:20}}>
                                            <Col md={5}>
                                                <label> MST </label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                    <InputGroupText> <i className="fa fa-adjust"></i> </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input id="tax_no" defaultValue={this.state.tax_no} onChange={ (e)=>{ this.setState({tax_no:e.target.value}) }} />
                                                    

                                                </InputGroup>
                                            </Col>
                                            <Col md={5}>
                                                <label> Hotline </label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                    <InputGroupText> <i className="icon icon-phone"></i> </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input id="phone" defaultValue={this.state.phone} onChange={ (e)=>{ this.setState({phone:e.target.value}) }} />
                                                </InputGroup>

                                            </Col>
                                        </Row>

                                        <Row style={{marginTop:20}}>
                                            <Col md={5}>
                                                <label> E-mail </label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                    <InputGroupText> <i className="fa fa-envelope"></i> </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input id="email" defaultValue={this.state.email} onChange={ (e)=>{ this.setState({email:e.target.value}) }} />
                                                    

                                                </InputGroup>
                                            </Col>
                                            <Col md={5}>
                                                <label> Website </label>
                                                <InputGroup>
                                                    <InputGroupAddon addonType="prepend">
                                                    <InputGroupText> <i className="fa fa-chrome"></i> </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input id="website" defaultValue={this.state.website} onChange={ (e)=>{ this.setState({website:e.target.value}) }} />
                                                </InputGroup>

                                            </Col>
                                        </Row>

                                        <Row style={{marginTop:60}}>
                                            <Col md={12}>
                                                <Button onClick={ this._onSubmit } className="btn btn-normal bg-green"> 
                                                    <i className="fa  fa-chevron-circle-right mr-5"></i> Cập nhật  
                                                </Button>

                                                <span className="form-err text-danger ml-10" id="form-err"></span>
                                            </Col>
                                        </Row>
                                    </FormGroup>

                                
                                </div>
                            </Col>
                        </Row>
                    </div>
                </main>
            </div>
        );
    }
}
 
export default Company;