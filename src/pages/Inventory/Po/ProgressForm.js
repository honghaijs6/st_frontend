import { PURCHASE_STATUS } from '../../../config/app.config'

import React, { Component } from 'react';
import { Button } from 'reactstrap'; 


import ViewModal from '../../../components/ViewModal';
import BenProcess from '../../../components/BenProcess'; 



class ProgressForm extends Component {
    

    constructor(props){
        super(props);

        this.state = {
            status:0,
            originStatus:0,
            PURCHASE_STATUS:PURCHASE_STATUS,
            actionName:''
        };


        this._closeForm = this._closeForm.bind(this);
        this._onSubmit = this._onSubmit.bind(this);

    }

    getOrderStatus(status){
        
        this.state.PURCHASE_STATUS.map((item,index)=>{
            if(index===status){
                item['active'] = true 
            }else{
                delete item.active
            }                                                              
        });
        
    }

    componentWillReceiveProps(newProps){

        const status = newProps.data.status || 0 ;

        this.getOrderStatus(status);

        this.setState({
            originStatus:status,
            status:status,
            actionName: PURCHASE_STATUS[status]['action']
        });

    }

    _closeForm(){
        document.querySelector('.close').click();
    }

    _onSubmit(){

        const status = this.state.originStatus;
        const mustBe = parseInt(status) + 1

        let data = {
            id:this.props.data.id,
            status:mustBe
        };
        
        this.props.model.putCustom('progress',data,(res)=>{
            
            if(res.name === 'success' || res.name==='ok'){
                this.props.onSubmit(res);
            }

        });


    }
    
    render() {
        

        return (
            <ViewModal {...this.props} onToggle={(isOpen)=>{  this.props.onToggle(isOpen)}}  >

                <div style={{
                    padding:'40px 20px'
                }}>
                    <label> Trạng thái tiến trình </label>
                    
                    <BenProcess type="po" status={ this.state.status } />      
                    
                </div>
                
                <div style={{borderTop:'1px solid #eee',padding:'20px 0px',margin:'0px 20px'}}>
                    <Button onClick={this._onSubmit} className="btn btn-ubuntu" style={{ background: PURCHASE_STATUS[this.state.status]['color'] }}  > 
                        <i className={'fa mr-5 '+PURCHASE_STATUS[this.state.status]['icon']}></i> { PURCHASE_STATUS[this.state.status]['action'] } 
                    </Button>
                </div>
                
            </ViewModal>
        );
    }
}


ProgressForm.defaultProps = {
    onToggle:()=>{},
    onSubmit:()=>{}
}

export default ProgressForm;



