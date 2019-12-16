import { ORDER_STATUS } from '../../../config/app.config'

import React, { Component } from 'react';
import { Button } from 'reactstrap'; 


import ViewModal from '../../../components/ViewModal';
import BenButtonSelect from '../../../components/BenButtonSelect';
import BenProcess from '../../../components/BenProcess'; 



class ProgressForm extends Component {
    

    constructor(props){
        super(props);

        this.state = {
            orderStatus:0,
            originStatus:0,
            ORDER_STATUS:ORDER_STATUS,
            actionName:''
        };


        this._closeForm = this._closeForm.bind(this);
        this._onSubmit = this._onSubmit.bind(this);

    }

    getOrderStatus(status){
        
        this.state.ORDER_STATUS.map((item,index)=>{
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
            orderStatus:status,
            actionName: ORDER_STATUS[status]['action']
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
                    
                    <BenProcess status={ this.state.orderStatus } />      
                    

                </div>
                
                <div style={{borderTop:'1px solid #eee',padding:'20px 0px',margin:'0px 20px'}}>
                    <Button onClick={this._onSubmit} className="btn btn-ubuntu" style={{ background: ORDER_STATUS[this.state.orderStatus]['color'] }}  > 
                        <i className={'fa mr-5 '+ORDER_STATUS[this.state.orderStatus]['icon']}></i> { ORDER_STATUS[this.state.orderStatus]['action'] } 
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



