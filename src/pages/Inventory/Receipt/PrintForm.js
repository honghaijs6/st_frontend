
// DATA 
import { PHIEU_XUATKHO, PHIEU_NHAPKHO } from '../../../config/temp-code-in-out-basic';
import {  WAREHOUSE_TRACKS } from '../../../config/app.config';

// HOOKS 
import doGetModelInfoCode from '../../../hook/ultil/doGetModelInfoCode';
import doPrint from '../../../hook/ultil/doPrint';


import React, { Component } from 'react';
import moment from 'moment';



import ViewModal from '../../../components/ViewModal';


class PrintForm extends Component {  

    
    state = {
        companyInfo:{},
        warehouseInfo:{},
        purchaseInfo:{},
        orderInfo:{}

    }

    async componentWillReceiveProps(newProp){

        if(JSON.stringify(newProp.companyInfo)!='{}'){
            this.setState(newProp.companyInfo);

            if(JSON.stringify(newProp.data)!=='{}'){
                
                const receiptInfo = newProp.data;
                
                switch(receiptInfo.track_code){

                    case 'muahang':
                        const resWHInfo = await doGetModelInfoCode('warehouses',newProp.data.warehouse_code);
                        if(resWHInfo.name==='success'){
                            this.setState({
                                warehouseInfo : resWHInfo.data
                            });
                        }

                        const resPurInfo = await doGetModelInfoCode('purchases',newProp.data.purchase_code);
                        if(resPurInfo.name==='success'){
                            this.setState({
                                purchaseInfo:resPurInfo.data
                            })
                        }
                    break;

                    case 'banhang':
                        
                        const resOrder = await doGetModelInfoCode('orders',receiptInfo.order_code);
                        
                        if(resOrder.name==='success'){
                            this.setState({
                                orderInfo:resOrder.data
                            });
                        }
                    break; 
                }
                
            }

        }
    }

    _getTrackCode(code){
        let name = '';
        const MY_TRACKCODE = WAREHOUSE_TRACKS['in'].concat(WAREHOUSE_TRACKS['out']);

        MY_TRACKCODE.map((item)=>{
            if(item.code===code){
                name = item.name;
            }
        });

        return name;

    }


    // USING FOR REDER BASIC
    _renderBodyCart(cart){
        let html = ``;
        cart.map((item,index)=>{
            const total = parseFloat(item.price) * parseInt(item.amount);
            const stt = index + 1; 

            html += `
                <tr class="record-item">
                    <td class="text-center item" style="vertical-align:middle">
                        ${stt}
                    </td>
                    
                    <td class="text-center item" style="vertical-align:middle" >
                        ${ item.code }
                    </td>
                    <td class="item-pro-desc item" style="word-wrap:break-word;">
                       ${item.name  }
                    </td>

                    <td class="text-center item" style="vertical-align:middle">
                        ${ item.unit || '' }
                    </td>

                    
                    <td class="text-center item" style="vertical-align:middle">
                        ${ item.amount }
                    </td>
                </tr>
            `
        });

        return html;
    }
    

    _renderOrderBody(HTML,data){

        // CUSTOMER INFO 
        
        const cusInfo = JSON.parse(data.customer_info);
            
        HTML = HTML.replace(/{{CUSTOMER_NAME}}/g, cusInfo.name);
        HTML = HTML.replace(/{{CUSTOMER_ADDRESS}}/g, cusInfo.address_delivery);
        HTML = HTML.replace(/{{CUSTOMER_PHONE}}/g, cusInfo.phone);
        HTML = HTML.replace(/{{CUSTOMER_EMAIL}}/g, cusInfo.email);
        HTML = HTML.replace(/{{CUSTOMER_RECEIVER}}/g, cusInfo.contact_name);
        HTML = HTML.replace(/{{CUSTOMER_TAXNO}}/g, cusInfo.tax_no);
        // END CUSTOMER
            
        // ORDER INFO 
        HTML = HTML.replace(/{{RECEIPT_CODE_OUT}}/g, data.code_out);
        HTML = HTML.replace(/{{RECEIPT_DATE_CREATED}}/g, moment(data.date_created).format('YYYY-MM-DD'));
        HTML = HTML.replace(/{{RECEIPT_ORDER_INV}}/g, data.order_code);
        HTML = HTML.replace(/{{WAREHOUSE_CODE}}/g, data.warehouse_code);
        HTML = HTML.replace(/{{BARCODE}}/g, `<img style="height:60px" src="https://barcode.tec-it.com/barcode.ashx?data=${ data.code_out.toUpperCase() }"/>`);

        HTML = HTML.replace(/{{RECEIPT_NOTE}}/g, data.note);
        // END ORDER INFO 

        // CART TABLE
        const cart = JSON.parse(data.cart);  
        HTML = HTML.replace(/{{ORDER_RECORDS}}/g,  this._renderBodyCart(cart) ); 
        

        // FOOTER 
        HTML = HTML.replace(/{{USER_CODE}}/g, window.USERINFO.username);
        console.log(this.state.orderInfo);

        if(JSON.stringify(this.state.orderInfo)!=='{}'){
            HTML = HTML.replace(/{{ORDER_BELONG_USER}}/g, this.state.orderInfo.belong_user);
        }
         

        return HTML ; 
    }
    _renderPOBody(HTML, data){
        
        // SUPPLIER INFO
        const supInfo = JSON.parse(data.supplier_info);
        HTML = HTML.replace(/{{SUPPLIER_CODE}}/g, supInfo.code );
        HTML = HTML.replace(/{{SUPPLIER_NAME}}/g, supInfo.name );
        HTML = HTML.replace(/{{SUPPLIER_ADDRESS}}/g, supInfo.address );
        HTML = HTML.replace(/{{SUPPLIER_TAXNO}}/g, supInfo.tax_no );
        HTML = HTML.replace(/{{SUPPLIER_PHONE}}/g, supInfo.phone  );
        HTML = HTML.replace(/{{SUPPLIER_EMAIL}}/g, supInfo.email || 'n/a' );
        // END SUPPLIER INFO

        // RECEIP INFO 
        HTML = HTML.replace(/{{PURCHASE_CODE}}/g, data.purchase_code );
        HTML = HTML.replace(/{{WAREHOUSE_CODE}}/g, data.warehouse_code );
        
        // END RECEIPT INFO 

        // SHIP TO 
        if(JSON.stringify(this.state.warehouseInfo) !=='{}'){
            
            HTML = HTML.replace(/{{RECEIVER_LOCATION}}/g, this.state.warehouseInfo.name );
            HTML = HTML.replace(/{{RECEIVER_ADDRESS}}/g, this.state.warehouseInfo.address );
            HTML = HTML.replace(/{{RECEIVER_CONTACT}}/g, this.state.warehouseInfo.contact_person + ' - '+ this.state.warehouseInfo.phone );
            

        }
        // END SHIP TO

        // PURCHASE INFO 
        if(JSON.stringify(this.state.purchaseInfo)!=='{}'){
            const purInfo = this.state.purchaseInfo;
            

            HTML = HTML.replace(/{{PURCHASE_BELONG_USERCODE}}/g, purInfo.user_code );
            HTML = HTML.replace(/{{PURCHASE_PAYMENT}}/g, purInfo.payment_code );
            HTML = HTML.replace(/{{PURCHASE_BELONG_USERNAME}}/g, purInfo.creator );
            HTML = HTML.replace(/{{PURCHASE_BELONG_USERMAIL}}/g, purInfo.creator_email );

            // 
            HTML = HTML.replace(/{{BARCODE}}/g, `<img style="height:60px" src="https://barcode.tec-it.com/barcode.ashx?data=${ purInfo.code.toUpperCase() }"/>`);
                
            
        }
        // END PURCHASE

        const cart = JSON.parse(data.cart);  
        HTML = HTML.replace(/{{ORDER_RECORDS}}/g,  this._renderBodyCart(cart) ); 
        HTML = HTML.replace(/{{RECEIPT_NOTE}}/g,  data.note );
        


        return HTML;

    }

    _renderBasic(HTML,data){
        

        HTML = HTML.replace(/{{RECEIP_TRACK_CODE}}/g, this._getTrackCode(data.track_code) );
        HTML = HTML.replace(/{{RECEIP_ATTACH}}/g, this._getTrackCode(data.attack_code) );
        HTML = HTML.replace(/{{RECEIPT_NOTE}}/g, this._getTrackCode(data.note));
        
        HTML = HTML.replace(/{{RECEIPT_DATE_CREATED}}/g,  moment(data.date_created).format('YYYY-MM-DD') );
        HTML = HTML.replace(/{{RECEIPT_CODE_OUT}}/g,  data.code_out );
        HTML = HTML.replace(/{{RECEIPT_CODE_IN}}/g,  data.code_in );
        
        HTML = HTML.replace(/{{WAREHOUSE_CODE}}/g,  data.warehouse_code );

        const cart = JSON.parse(data.cart);  
        HTML = HTML.replace(/{{ORDER_RECORDS}}/g,  this._renderBodyCart(cart) ); 
        
        

        return HTML;
    }

    _formatHTML(data,companyInfo){
        let HTML = ``;

        if(JSON.stringify(companyInfo)!='{}'){

            // DECODE DATA
            if(JSON.stringify(data)!=='{}'){


                
                const tempBasic = {
                    in:PHIEU_NHAPKHO,
                    out:PHIEU_XUATKHO
                }

                
                switch(data.track_code){
                    case 'banhang':
                        HTML = companyInfo['receipt_out_temp'];
                        HTML = this._renderOrderBody(HTML,data);
                        
                    break;
                    case 'muahang':
                        HTML = companyInfo['receipt_in_temp']; 
                        //alert(HTML)
                        HTML = this._renderPOBody(HTML,data);

                    break;

                    default:
                        // TEMPLATE MẪU CƠ BẢN
                        HTML = tempBasic[data.type];
                        HTML = this._renderBasic(HTML,data);
                        
                    break;
                    
                }
                
                HTML = HTML.replace(/{{COMPANY_LOGO}}/g,companyInfo['logo']);
                HTML = HTML.replace(/{{COMPANY_NAME}}/g,companyInfo['name']);
                HTML = HTML.replace(/{{COMPANY_ADDRESS}}/g,companyInfo['address']);
                HTML = HTML.replace(/{{COMPANY_TAXNO}}/g,companyInfo['tax_no']);
                HTML = HTML.replace(/{{COMPANY_PHONE}}/g,companyInfo['phone']);
                HTML = HTML.replace(/{{COMPANY_WEBSITE}}/g,companyInfo['website']);
                HTML = HTML.replace(/{{COMPANY_EMAIL}}/g,companyInfo['email']);
                
            }
            

        }

        return HTML;
    }


    render() {
        
        const data = this.props.data;
        const HTML = this._formatHTML(data,this.props.companyInfo); //this._formatQuotationHTML(data,this.props.companyInfo);
        
       
        return (
            <ViewModal name={ <span className="text-uppercase"> form </span> }  { ...this.props }   >
                <div>
                    
                    <div style={{padding:10}}>
                        <div className="btn-group">
                        
                            <a onClick={()=>{ doPrint(HTML) }} className="btn btn-normal btn-sm"> <i className="fa fa-print"></i> Print</a>

                            
                        </div>
                          
                    </div>
                    <div    
                        ref={el => (this.componentRef = el)}
                        style={{
                                paddingBottom:20
                        }}
                            dangerouslySetInnerHTML={{ __html: HTML  }} 
                    />

                </div>
            </ViewModal>
        );
    }
}

PrintForm.defaultProps = {
    onToggle:()=>{},
    data:{}
}  

export default PrintForm
