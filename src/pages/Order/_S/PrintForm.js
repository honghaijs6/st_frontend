
import {N2T} from '../../../hook/ultil/N2T'; 
import doPrint from '../../../hook/ultil/doPrint';


import React, { Component } from 'react';
import moment from 'moment';
import numeral from 'numeral';


import ViewModal from '../../../components/ViewModal';


class PrintForm extends Component {  

    
    state = {
        companyInfo:{}
    }

    componentWillReceiveProps(newProp){

        if(JSON.stringify(newProp.companyInfo)!='{}'){

            this.setState(newProp.companyInfo);

        }
    }

    _renderBodyOrder(cart){
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
                    <td class="text-center item"  style="vertical-align:middle">
                        ${ numeral(item.price).format('0,0')  }
                    </td>

                    <td class="text-center item" style="vertical-align:middle">
                        ${ numeral(total).format('0,0') }
                    </td>
                </tr>
            `
        });

        return html;
    }

    _renderBodyQuotation(cart){
        
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
                        ${ item.name }
                    </td>
                    <td class="item-pro-desc item" style="word-wrap:break-word;">
                       ${item.content || ''  }
                    </td>

                    <td class="text-center item" style="vertical-align:middle">
                        ${ item.unit || '' }
                    </td>

                    <td class="text-center item" style="vertical-align:middle">
                        ${ item.images === null ? '' : <img style={{maxHeight:72}} className="img-responsive" src={ item.images } />  }
                    </td>
                    <td class="text-center item" style="vertical-align:middle">
                        ${ item.amount }
                    </td>
                    <td class="text-center item"  style="vertical-align:middle">
                        ${ numeral(item.price).format('0,0')  }
                    </td>

                    <td class="text-center item" style="vertical-align:middle">
                        ${ numeral(total).format('0,0') }
                    </td>
                </tr>
            `
        });

        return html;
    }
    

    _formatHTML(data,companyInfo,type){
        let HTML = ``;

        if(JSON.stringify(companyInfo)!='{}'){

            type = type === '' ? 'quotation_temp':type;

            HTML = companyInfo[type];


            HTML = HTML.replace(/{{COMPANY_LOGO}}/g,companyInfo['logo']);
            HTML = HTML.replace(/{{COMPANY_NAME}}/g,companyInfo['name']);
            HTML = HTML.replace(/{{COMPANY_ADDRESS}}/g,companyInfo['address']);
            HTML = HTML.replace(/{{COMPANY_TAXNO}}/g,companyInfo['tax_no']);
            HTML = HTML.replace(/{{COMPANY_PHONE}}/g,companyInfo['phone']);
            HTML = HTML.replace(/{{COMPANY_WEBSITE}}/g,companyInfo['website']);
            HTML = HTML.replace(/{{COMPANY_EMAIL}}/g,companyInfo['email']);

            // DECODE DATA
            if(JSON.stringify(data)!=='{}'){



                const cusInfo = JSON.parse(data.customer_info);
                
                // PARSE CODE CUSTOMER
                HTML = HTML.replace(/{{CUSTOMER_NAME}}/g,cusInfo.name);
                HTML = HTML.replace(/{{CUSTOMER_ADDRESS}}/g,cusInfo.address_delivery);
                HTML = HTML.replace(/{{CUSTOMER_PHONE}}/g,cusInfo.phone);
                HTML = HTML.replace(/{{CUSTOMER_EMAIL}}/g,cusInfo.email);
                HTML = HTML.replace(/{{CUSTOMER_RECEIVER}}/g,cusInfo.contact_name);
                HTML = HTML.replace(/{{CUSTOMER_TAXNO}}/g,cusInfo.tax_no);
                // END PARSE CODE CUSTOMER  

                const orderInfo = data ; 
                // ORDER INFO 
                
                HTML = HTML.replace(/{{ORDER_CODE_PI}}/g,orderInfo.code_pi);
                HTML = HTML.replace(/{{ORDER_CODE}}/g,orderInfo.code);
                HTML = HTML.replace(/{{ORDER_CODE_CREATED}}/g, moment(orderInfo.date_created).format('YYYY-MM-DD'));
                HTML = HTML.replace(/{{ORDER_DATE_CONFIRMED}}/g, moment(orderInfo.date_confirmed).format('YYYY-MM-DD'));

                HTML = HTML.replace(/{{ORDER_BELONG}}/g, orderInfo.belong_user);
                HTML = HTML.replace(/{{ORDER_PAYMENT_CODE}}/g, orderInfo.payment_code);

                

                HTML = HTML.replace(/{{BARCODE}}/g, `<img style="height:72px" src="https://barcode.tec-it.com/barcode.ashx?data=${ type==='quotation_temp' ? orderInfo.code.toUpperCase() : orderInfo.code_pi.toUpperCase() }"/>`);
                
                   
                // END ORDER INFO 

                // CART TABLE
                const cart = JSON.parse(orderInfo.cart);  
                const TOTAL_VAT = parseFloat(orderInfo['total_sum']) * ( parseInt(orderInfo['vat'])/100 ) ; 

                HTML = HTML.replace(/{{ORDER_RECORDS}}/g, type === 'quotation_temp' ? this._renderBodyQuotation(cart) : this._renderBodyOrder(cart) ); 
                HTML = HTML.replace(/{{ORDER_DISCOUNT}}/g, numeral(orderInfo.level_discount).format('0,0') );
                HTML = HTML.replace(/{{ORDER_AMOUNT}}/g, numeral(orderInfo.total_sum).format('0,0') );
                HTML = HTML.replace(/{{VAT}}/g, orderInfo.vat );
                HTML = HTML.replace(/{{ORDER_AMOUNT}}/g, numeral(orderInfo.total_sum_vat).format('0,0') );
                HTML = HTML.replace(/{{ORDER_AMOUNT_TAX}}/g, numeral(TOTAL_VAT).format('0,0') );
                HTML = HTML.replace(/{{ORDER_SUM}}/g, numeral(orderInfo['total_sum_vat']).format('0,0')+' đ' );
                HTML = HTML.replace(/{{ORDER_SUM_TEXT}}/g, N2T(orderInfo['total_sum_vat'])+' đồng' );
                // END CART TABLE

                // FOOTER INFO 
                HTML = HTML.replace(/{{ORDER_PAYMENT_DESC}}/g, orderInfo['payment_desc'] ); 
                HTML = HTML.replace(/{{ORDER_PREPARE}}/g, window.USERINFO.username ); 
                


                // END FOOTER INFO
                
            }
            

        }

        return HTML;
    }


    render() {
        
        const data = this.props.data;
        const HTML = this._formatHTML(data,this.props.companyInfo,this.props.type); //this._formatQuotationHTML(data,this.props.companyInfo);
        
        

        return (
            <ViewModal name={ <span className="text-uppercase"> { data.code } </span> }  { ...this.props }  onToggle={(isOpen)=>{  this.props.onToggle(isOpen)}} >
                <div>
                    
                    <div style={{padding:10}}>
                        <div className="btn-group">
                            <a onClick={()=>{ doPrint(HTML)  }} className="btn btn-normal btn-sm"> <i className="fa fa-print"></i></a>
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
