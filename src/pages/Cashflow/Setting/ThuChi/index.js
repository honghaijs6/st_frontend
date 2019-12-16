import { MAU_PHIEUCHI, MAU_PHIEUTHU } from '../../../../config/temp-code-thu-chi';

// HOOKS 
import doUpdateModelInfo from '../../../../hook/ultil/doUpdateModelInfo';
import doGetModelInfo from '../../../../hook/ultil/doGetModelInfo'

import React, { Component } from 'react';
import {  Row, Col, Label, Input, Button } from 'reactstrap';

import PreviewForm from './PreviewFrorm';



class ThuChi extends Component{

  constructor(props){
    super(props);
    this.state = {

      tab:'ThuChi',

      phieuthu_temp:{},
      phieuchi_temp:{},

      type:'phieuchi_temp', // thu-chi
      companyInfo:{},
      isOpenForm:false
    }

    this._onSubmit = this._onSubmit.bind(this);
  }

  _previewForm = (type)=>{ 
      this.setState({
          type:type,  
          isOpenForm:true
      });
  }


  _defaultTemplate(type){
      const arr = {
          phieuchi_temp: MAU_PHIEUCHI,
          phieuthu_temp: MAU_PHIEUTHU
      };

      this.setState({
          [type]:arr[type]
      });


  }


  async _onSubmit(field){

        const data = {
            id:this.state.companyInfo.id,
            phieuchi_temp:this.state.phieuchi_temp,
            phieuthu_temp:this.state.phieuthu_temp
        }

        const res =  await doUpdateModelInfo('companies',data) ;

  }


  /* WHEN*/
  /* NHẬN lệnh : từ NEW PROPS TỪ BODY OBJECT*/
  async componentWillReceiveProps(newProps){
    if(newProps.onTab===this.state.tab){
      const resCompany = await doGetModelInfo('companies',window.USERINFO.company_id);
      if(resCompany.name==='success'){

        const info = resCompany.data;
        
        this.setState({
          companyInfo:info,
          phieuchi_temp: info.phieuchi_temp || MAU_PHIEUCHI,
          phieuthu_temp:info.phieuthu_temp || MAU_PHIEUTHU
        });

      }
    }
  }

  /* WHERE*/
  render(){


    return(

      <div hidden={  this.props.onTab === this.state.tab ? false : true } >

            <PreviewForm 
                width="60%"
                name="Xem trước"

                type={this.state.type}

                isOpen={this.state.isOpenForm}
                onToggle={(isOpen)=>{ this.setState({isOpenForm:isOpen}) }}
                companyInfo={this.state.companyInfo}

                phieuchi_temp={this.state.phieuchi_temp}
                phieuthu_temp={this.state.phieuthu_temp}

        
            />
            <div className="pa-30 need-scroll">
                <h5> Cấu Hình Phiếu  </h5>
                <p> Cấu hình liên quan đến tính năng sổ tiền </p>

                <div className="container pt-30 pb-30">
                    
                    <Row style={{
                        paddingBottom:20
                    }}>
                    <Col md="12">
                        <Label> Mẫu PHIẾU CHI để IN  </Label>
                        
                        <span style={{cursor:'pointer'}} onClick={()=>{ this._previewForm('phieuchi_temp') }} className="txt-green pull-right">  
                            <i className="fa fa-search-plus mr-5"></i>    Xem trước 
                        </span>

                        <span style={{cursor:'pointer'}} className="txt-red pull-right mr-15" onClick={()=>{ this._defaultTemplate('phieuchi_temp') }}> 
                            Lấy mẫu mặc định
                        </span>
                        
                        <Input 
                            onChange={(e)=>{ this.setState({phieuchi_temp:e.target.value}) }}    
                            value={ this.state.phieuchi_temp }
                            type="textarea" style={{
                                height:300,
                                background:'#262A2E',
                                marginTop:5,
                                color:'#fff'
                            }} 
                        />

                    
                    </Col>


                    </Row>

                    <Row style={{marginTop:20}}>
                        <Col md="12">
                            <Label> Mẫu PHIẾU THU để IN </Label>
                            <span style={{cursor:'pointer'}} onClick={()=>{ this._previewForm('phieuthu_temp') }} className="txt-green pull-right">  
                                <i className="fa fa-search-plus mr-5"></i>    Xem trước 
                            </span>

                            <span style={{cursor:'pointer'}} className="txt-red pull-right mr-15" onClick={()=>{ this._defaultTemplate('phieuthu_temp') }}> 
                                Lấy mẫu mặc định
                            </span>
                            

                            <Input 
                                onChange={(e)=>{ this.setState({phieuthu_temp:e.target.value}) }}    
                                value={ this.state.phieuthu_temp }
                                type="textarea" 
                                style={{
                                    marginTop:5,
                                    height:300,
                                    background:'#262A2E',
                                    color:'#fff'
                                }} 
                            />

                        </Col>
                    </Row>

                    <Row className="pt-30">
                    <Col md="12">
                        <Button onClick={this._onSubmit}  className="btn-ubuntu bg-green" style={{width:100}} >  
                            <i className="fa fa-chevron-circle-right mr-5"></i> Lưu 
                        </Button>
                    </Col>
                    </Row>

                </div>


            </div>
      </div>
    )

  }
}

export default ThuChi;
