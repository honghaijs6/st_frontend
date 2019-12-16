import React, { Component } from 'react';
import {  Row, Col, Label,   FormGroup, Input    } from 'reactstrap';

import BenModal from '../../../components/BenModal';

import SelectListModelCode from '../../../components/SelectListModelCode' ; 
import SelectListModel from '../../../components/SelectListModel' ; 

import SelectRegion from '../../../components/SelectRegion';
import SelectSubRegion from '../../../components/SelectSubRegion';

import InputSuggest from '../../../components/InputSuggest'; 



function GeneralInfoRow(props){

  const modal = props.modal; 
  const data = modal.data; 


  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin chung  </h6>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Mã KH </label>
              <Input defaultValue={data.code} onChange={(e)=>{ modal.onChange('code',e.target.value) }}  id="code"  type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label> Công ty </label>
              <Input defaultValue={ data.name } onChange={(e)=>{ modal.onChange('name',e.target.value) }}  id="name" type="text"   />
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Người liên hệ </label>
              <Input defaultValue={data.contact_name} onChange={(e)=>{ modal.onChange('contact_name',e.target.value) }}  id="contact_name"  type="text"  />
            </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Số ĐT </label>
              <Input  defaultValue={data.phone} onChange={(e)=>{ modal.onChange('phone',e.target.value) }} id="phone"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label> E-mail </label>
              <Input  id="email" defaultValue={data.email} onChange={(e)=>{ modal.onChange('email',e.target.value) }}   type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Mã số thuế </label>
              <Input defaultValue={data.tax_no} onChange={(e)=>{ modal.onChange('tax_no',e.target.value) }} id="tax_no"    type="text"/>
            </FormGroup>
          </Col>
      </Row>
    </div>
  )
}

function ContactInfoRow(props){

  const modal = props.modal; 
  const data = modal.data; 
  

  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin Liên hệ  </h6>
      <Row>
          <Col md="6">
            <FormGroup>
              <label> Địa chỉ </label>
              <Input defaultValue={data.address} onChange={(e)=>{ modal.onChange('address',e.target.value) }}  id="address" type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Tỉnh / Thành </label>
              <SelectRegion 
                defaultValue={ data.region_code === null ? '' : data.region_code } 
                onChange={(e)=>{  modal.onChange('region_code',e.target.value) }} 
                id="region_code"  name="Vui lòng chọn" 
              />

            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Quận / Huyện </label>
              <SelectSubRegion 
                  status={props.status}
                  onChange={(e)=>{ modal.onChange('subregion_code',e.target.value) }} 
                  defaultValue={data.subregion_code === null ? '' : data.subregion_code } 
                  parent_code={data.region_code} name="Vui lòng chọn" />

            </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md="6">
            <FormGroup>
              <label> Địa chỉ giao hàng </label>
              <Input defaultValue={data.address_delivery} onChange={(e)=>{ modal.onChange('address_delivery',e.target.value) }}  id="address_delivery"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label> Địa chỉ xuất hoá đơn </label>
              <Input id="address_xhd"  defaultValue={data.address_xhd}  onChange={(e)=>{ modal.onChange('address_xhd',e.target.value) }}  type="text"/>
            </FormGroup>
          </Col>

      </Row>
    </div>
  )
}


function ClassifyInfoRow(props){

  const modal = props.modal; 
  const data = modal.data; 

  console.log();
                    
  

  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Phân loại khách hàng  </h6>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Nhóm KH </label>
              <SelectListModelCode id="type" defaultValue={data.type.toLowerCase()} onChange={(e)=>{  modal.onChange('type',e.target.value)  }}  strModel="customer_types" name="Vui lòng chọn" /> 


            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Cấp bậc </label>
              <SelectListModel strModel="levels" defaultValue={ data.level_id } onChange={(e)=>{  modal.onChange('level_id',e.target.value) }} name="Vui lòng chọn" id="level_id" />
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup>
              <label> Trạng thái KH </label>
              <SelectListModelCode defaultValue={ data.status_code === null ? '' : data.status_code } onChange={(e)=>{ modal.onChange('status_code',e.target.value) }} strModel="customer_status" name="Vui lòng chọn" id="status_code" />

            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Nguồn </label>
              <SelectListModelCode 
                defaultValue={ data.original_code === null ? '' : data.original_code } 
                onChange={(e)=>{ modal.onChange('original_code',e.target.value) }} 
                strModel="customer_originals" name="Vui lòng chọn" id="original_code" />

            </FormGroup>
          </Col>
      </Row>

    </div>
  )
}


function OtherInfoRow(props){

  const modal = props.modal; 
  const data = modal.data; 
  

  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin khác  </h6>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> NV Phụ trách </label>
              <InputSuggest 
                strModel='users' 
                code="username" 
                onSelected={(value)=>{ modal.onChange('belong_user',value.username) }} defaultValue={ data.belong_user }  id="belong_user" 
              />


            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label> Ghi chú </Label>
              <Input id="note" onChange={(e)=>{ modal.onChange('note',e.target.value) }} defaultValue={ data.note } style={{ height:90}} type="textarea"   />
            </FormGroup>
          </Col>
      </Row>
    </div>
  )
}




class CustomerForm extends Component {

   render(){


     return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
          <div style={{padding:0}}>
            <GeneralInfoRow {...this.props} />
            <ContactInfoRow {...this.props} />
            <ClassifyInfoRow {...this.props}  />
            <OtherInfoRow {...this.props} />
          </div>
       </BenModal>
     )
   }
 }

 export default CustomerForm;
