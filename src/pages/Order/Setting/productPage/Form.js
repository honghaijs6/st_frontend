
import {PRODUCT_TYPE} from '../../../../config/product.conf';


import React, { Component } from 'react';
import {  Row, Col,  FormGroup, Input  } from 'reactstrap';

import CKEditor from "react-ckeditor-component";





import BenModal from '../../../../components/BenModal';
import InputNumeral from '../../../../components/InputNumeral';
import InputSuggest from '../../../../components/InputSuggest';
import ButtonUploadImage from '../../../../components/ButtonUploadImage';

import SelectListModel from '../../../../components/SelectListModel';




function FormRow1(props){

  const modal = props.modal;
  const data = modal.data ;


  return(
    <div className="row-form">
      <h6 className="txt-green text-uppercase"> Thông tin sản phẩm  </h6>
      <Row>
          <Col md="2">
            <FormGroup>
              <label> Mã  <span className="text-danger">*</span></label>
              <Input  id="code" onChange={(e)=>{ modal.onChange('code',e.target.value) }} defaultValue={ data.code }  type="text"/>
            </FormGroup>
          </Col>
          <Col md="4">
            <FormGroup>
              <label> Tên sản phẩm  <span className="text-danger">*</span> </label>
              <Input id="name" defaultValue={ data.name } onChange={(e)=>{ modal.onChange('name',e.target.value) }}    type="text"/>
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <label> Serial? </label>
              <Input id="is_serial" onChange={(e)=>{ modal.onChange('is_serial',e.target.value) }} defaultValue={ data.is_serial }  type="select">
                <option value={0}> Không </option>
                <option value={1}> Có </option>
              </Input>
            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <label> Danh mục </label>
              <SelectListModel id="categories_id"
                  defaultValue={ data.categories_id }
                  strModel="categories" onChange={(e)=>{ modal.onChange('categories_id',e.target.value) }}
                  name="Vui lòng chọn"
              />


            </FormGroup>
          </Col>
          <Col md={2}>
             <FormGroup>
                <label> Nhà cung cấp </label>
                <InputSuggest
                  strModel='suppliers'
                  defaultValue={data.supplier_codes}
                  onSelected={(json)=>{ modal.onChange('supplier_codes',json.code) }}
                  value={ data.supplier_codes }  id="supplier_codes"
                />

             </FormGroup>
          </Col>

      </Row>

    </div>
  )
}

function FormRow2(props){

  const modal = props.modal;
  const data = modal.data ;

  let photo_url = data.images ;   




  return(
    <div style={{marginTop: -20}} className="row-form">

      <Row>
          <Col md="2">
            <FormGroup>
              <label> Giá nhà máy <span className="text-danger">*</span></label>
              <InputNumeral  onChange={(value)=>{ props.onChangePrice('price_1',value) }} id="price_1"  defaultValue={ data.price_1 } />

            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <label> Giá gốc  <span className="text-danger">*</span> </label>
              <InputNumeral id="price_2" onChange={(value)=>{ props.onChangePrice('price_2',value) }} defaultValue={ data.price_2 }   type="text"/>
            </FormGroup>
          </Col>
          <Col md="2">
            <FormGroup>
              <label>Giá ĐL </label>
              <InputNumeral id="price_3" onChange={(value)=>{ props.onChangePrice('price_3',value) }}  defaultValue={ data.price_3 }    type="text"/>

            </FormGroup>
          </Col>

          <Col md={2}>
            <FormGroup>
              <label>Giá lẻ </label>
              <InputNumeral id="price_4" onChange={(value)=>{ props.onChangePrice('price_4',value) }} defaultValue={ data.price_4 }  type="text"/>
            </FormGroup>
          </Col>

          <Col md={2}>
             <FormGroup>
                <label> ĐVT </label>
                <SelectListModel id="unit" defaultValue={ data.unit } onChange={(e)=>{ modal.onChange('unit',e.target.value) }} strModel="units" name="Vui lòng chọn" />


             </FormGroup>
          </Col>
          <Col md="2">
             <FormGroup>
                <label> Thuộc </label>
                <Input id="type" type="select" onChange={(e)=>{ modal.onChange('type',e.target.value) }} defaultValue={ data.type } >
                    {

                      Object.keys(PRODUCT_TYPE).map((item)=>{
                        return(
                          <option key={item} value={ item }> { PRODUCT_TYPE[item] } </option>
                        )
                      })

                    }


                </Input>
             </FormGroup>
          </Col>

      </Row>

      <Row style={{marginBottom: 10}}>
        <Col md={6}>
          <Row>
            <Col md={6}>

                <ButtonUploadImage onUploaded={(res)=>{ props.onUploaded(res) }} />

            </Col>
            <Col md={6}>
                <div style={{
                    width: 90,height: 90,
                    border:'1px dashed #aaa',

                  }}>
                    <img style={{maxHeight: 90,position: 'absolute'}} src={ photo_url } />
                </div>
            </Col>
          </Row>
        </Col>
      </Row>

    </div>
  )
}



class MyForm extends Component {


  constructor(props){
    super(props);

    this.state = {
      onAction:'',
      content:props.modal.data.content,

    }

    this.onChange = this.onChange.bind(this);

  }

  componentWillReceiveProps(newProps){

    this.setState({
      content:newProps.modal.data.content
    })
  }

  onChange(evt){

      const newContent = evt.editor.getData();
      this.props.modal.onChange('content',newContent);

      this.setState({
        content: newContent
      })
  }

  _onUploadImage(res){
    if(res.success !== false){

      this.props.modal.onChange('images',res.data.link);
      this.setState({
        onAction:'_onUploadImage'
      })

    }
  }

  onChangePrice(field,value){


    try{

        if(field==='price_1'){
          let a = value

          let b = eval( this.props.price_setting['b'] );
          let c = eval( this.props.price_setting['c'] );
          let d = eval( this.props.price_setting['d'] );

          this.props.modal.onChange('price_1',value);
          this.props.modal.onChange('price_2',b);
          this.props.modal.onChange('price_3',c);
          this.props.modal.onChange('price_4',d);

        }else{ this.props.modal.onChange(field,value) }



    }catch(err){
        console.log(err);
    }

    //this.props.modal.onChange(field,value);
  }

  render(){



    return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >

          <FormRow1 {...this.props} />
          <FormRow2 onUploaded={(res)=>{ this._onUploadImage(res) }} onChangePrice={ (field, value)=>{ this.onChangePrice(field,value) } } {...this.props} />

          <div>
            <CKEditor

              activeClass="p10"
              content={this.state.content}
              events={{

                "change": this.onChange
              }}
             />
          </div>

       </BenModal>
     )
  }
}

 export default MyForm;
