
import { PRICE_SETTING } from '../../../../config/app.config'; 
import doGetModelInfo from '../../../../hook/ultil/doGetModelInfo';

import React, { Component } from 'react';
import { FormGroup, Col } from 'reactstrap';

import InputNumeral from '../../../../components/InputNumeral';
import MyForm from './Form'; 


const MODE_TAB = 'formulaPricePage' ;


class SettingOrderPage extends Component{

    
    constructor(props){
        super(props);

        this.state = {
            typeAction:'', // post - put - delete ...
            onAction:'', // string method
            status:'', // status
            
            isOpenForm:false,
            level:'x1',
            price_setting:PRICE_SETTING,
            
            a:0,
            b:0,
            c:0,
            d:0,

            tab:MODE_TAB 
        }
    }

    _onSubmit = async  ()=>{
        
            
    }

    _openForm(level){
        
        this.setState({
            level:level,
            isOpenForm:true
        });

    }

    async componentWillReceiveProps(newProps){
        if(newProps.onTab === this.state.tab){
            const info = await doGetModelInfo('companies',window.USERINFO.company_id);
            this._parsePrice(100);
    
            if(info.name==='success'){
                
                const data = info.data;
                const price_setting =  typeof data.price_setting ==='string' ? JSON.parse(data.price_setting) : this.state.price_setting
                
                this.setState({
                    id:data.id,
                    price_setting:price_setting 
                });
                
                this._parsePrice(100)
                
            }
        }
    }
    
    _parsePrice(value){
        const a = value ; 
        
        try{
            let b = eval( this.state.price_setting['b'] );
            let c = eval( this.state.price_setting['c'] );
            let d = eval( this.state.price_setting['d'] );
            

            this.setState({
                a:value,
                b:b,
                c:c,
                d:d
            })
        }catch(err){
            console.log(err);
        }
        
        

    }

    _onSubmitForm(res){
        
        const data = res.data; 
        

        this.setState({
            isOpenForm:false,
            price_setting:JSON.parse(data.price_setting)
        });

        this._parsePrice(this.state.a);


    }
    render(){

        return(
            <div hidden={  this.props.onTab === this.state.tab ? false : true } style={{padding:10}} >
                <div className="div-croll" style={{padding:30}}>
                    <h4 className="text-uppercase" style={{marginBottom:20}}> Công thức tính giá </h4>
                    
                    <MyForm 

                        isOpen={this.state.isOpenForm}
                        onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }}
                        price_setting={this.state.price_setting} 
                        id = { this.state.id }
                        level={this.state.level}
                        onSubmitForm = {(res)=>{ this._onSubmitForm(res) }}  

                    />
                    <div className="div-form" style={{padding:50}}>
                        <FormGroup row >
                            <Col md={2}>
                                <label> A. Giá Mua </label>
                                <InputNumeral style={{borderRadius:0}} defaultValue={this.state.a} onChange={(value)=>{ this._parsePrice(value) }} />
                            </Col>
                            <Col md={2} style={{marginLeft:-30}} >
                                <label> B. Giá Gốc </label>

                                <InputNumeral onDoubleClick={()=>{ this._openForm('b') }} defaultValue={this.state.b}  style={{ borderRadius:0, borderLeft:0}} />
                            </Col>
                            <Col md={2} style={{marginLeft:-30}}  >
                                <label> C. Giá ĐL </label>
                                
                                <InputNumeral onDoubleClick={()=>{ this._openForm('c') }} defaultValue={this.state.c}  style={{ borderRadius:0, borderLeft:0}} />
                            </Col>
                            <Col md={2} style={{marginLeft:-30}}>
                                <label> D. Giá Lẻ </label>
                                
                                <InputNumeral onDoubleClick={()=>{ this._openForm('d') }} defaultValue={this.state.d}  style={{ borderRadius:0, borderLeft:0}} />
                            </Col>
                            
                        </FormGroup>

                        
                        
                    </div>
                    
                </div>
            </div>
        )
    }
}

export default SettingOrderPage; 