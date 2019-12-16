
// HOOKS 
import {N2T} from '../../../hook/ultil/N2T';
import doPrint from '../../../hook/ultil/doPrint';

import React from 'react';

import numeral from 'numeral';
import moment from 'moment';


import ViewModal from '../../../components/ViewModal';


class PrintForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }   

    // USING FOR REDER BASIC
    _renderBodyCart(cart){
        let html = ``;
        

        cart.map((item,index)=>{

            const price = item.price.replace(/,/g,'');
            const total = parseInt(price) * parseInt(item.amount);
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
                    
                    <td class="text-center item" style="vertical-align:middle">
                        ${ numeral(item.price).format('0,0') }
                    </td>
                    <td class="text-center item" style="vertical-align:middle">
                        ${ numeral(price).format('0,0') }
                    </td>
                    
                    

                </tr>
            `
        });

        return html;
    }

    _sumCart(cart){
        let sum = 0 ;
        cart.map((item)=>{
            const price = item.price.replace(/,/g,'');
            const total = parseInt(price) * parseInt(item.amount);
            sum += total;
        });

        return sum; 
    }
    _formatHtml(data,companyInfo){

        let HTML = ``;
        if(JSON.stringify(data)!=='{}'){
            if(JSON.stringify(companyInfo)!=='{}'){

                HTML = companyInfo.iservice_temp ; 

                HTML = HTML.replace(/{{COMPANY_LOGO}}/g,companyInfo['logo']);
                HTML = HTML.replace(/{{COMPANY_NAME}}/g,companyInfo['name']);
                HTML = HTML.replace(/{{COMPANY_ADDRESS}}/g,companyInfo['address']);
                HTML = HTML.replace(/{{COMPANY_TAXNO}}/g,companyInfo['tax_no']);
                HTML = HTML.replace(/{{COMPANY_PHONE}}/g,companyInfo['phone']);
                HTML = HTML.replace(/{{COMPANY_WEBSITE}}/g,companyInfo['website']);
                HTML = HTML.replace(/{{COMPANY_EMAIL}}/g,companyInfo['email']);

                console.log(data);

                // CUSTOMER INFO 
                const cusInfo = JSON.parse(data.customer_info);
                HTML = HTML.replace(/{{CUSTOMER_NAME}}/g,cusInfo['name']);
                HTML = HTML.replace(/{{CUSTOMER_ADDRESS}}/g,cusInfo['address_delivery']);
                HTML = HTML.replace(/{{CUSTOMER_PHONE}}/g,cusInfo['phone']);
                HTML = HTML.replace(/{{CUSTOMER_EMAIL}}/g,cusInfo['email']);
                HTML = HTML.replace(/{{CUSTOMER_RECEIVER}}/g,cusInfo['contact_name']);
                HTML = HTML.replace(/{{CUSTOMER_RECEIVER}}/g,cusInfo['contact_name']);
                HTML = HTML.replace(/{{CUSTOMER_TAXNO}}/g,cusInfo['tax_no']);

                // TICKET INFO 
                HTML = HTML.replace(/{{ORDER_CODE_PI}}/g,data.ref_code);
                HTML = HTML.replace(/{{DATE_ARRIVED}}/g,moment(data.date_arrived).format('YYYY-MM-DD'));
                HTML = HTML.replace(/{{TIME_ARRIVED}}/g,moment(data.date_arrived).format('HH:MM'));
                HTML = HTML.replace(/{{CREATOR_CODE}}/g, data.creator_code );
                HTML = HTML.replace(/{{SERVICE_CODE}}/g, data.code );
                
                const cart = data.cart !== null ? JSON.parse(data.cart) : [];
                const temp = data.cart !== null ? HTML = HTML.replace(/{{ORDER_RECORDS}}/g, this._renderBodyCart(JSON.parse(data.cart))  ) : '';    
                HTML = HTML.replace(/{{ORDER_AMOUNT}}/g, numeral(this._sumCart(cart)).format('0,0') );
                HTML = HTML.replace(/{{ORDER_AMOUNT_TAX}}/g, numeral((parseFloat(data.vat)/100 ) * this._sumCart(cart)).format('0,0') );

                const ORDER_SUM = this._sumCart(cart) + ( parseFloat(data.vat)/100 * this._sumCart(cart) );
                HTML = HTML.replace(/{{ORDER_SUM}}/g,numeral(ORDER_SUM).format('0,0') );
                HTML = HTML.replace(/{{ORDER_SUM_TEXT}}/g, N2T(ORDER_SUM) );
                
                // TICKET FOOTER
                HTML = HTML.replace(/{{BELONG_USER}}/g, data.belong_user );
                HTML = HTML.replace(/{{CONTENT_ISSUES}}/g, data.content_issue );
                HTML = HTML.replace(/{{CONTENT_SOLVED}}/g, data.timeline_replies || '' );
                
                // BARCODE ;
                HTML = HTML.replace(/{{BARCODE}}/g, `<img style="height:60px" src="https://barcode.tec-it.com/barcode.ashx?data=${ data.code.toUpperCase() }"/>`);
                
                
                
                
                


            }
        }



        return HTML
    }

    
    render() {

        
        const data = this.props.data;
        const HTML = this._formatHtml(data,this.props.companyInfo);
        
        

        return (
            <ViewModal name={ 'Print' } {...this.props}  >
                <div>
                    <div style={{padding:10}}>
                        <div className="btn-group">

                            <a onClick={()=>{ doPrint(HTML) }} className="btn btn-normal btn-sm"> <i className="fa fa-print"></i></a>

                            
                        </div>
                        
                    </div>
                    <div    
                        ref={el => (this.componentRef = el)}
                        style={{
                                paddingTop:30,
                                paddingBottom:30
                        }}
                            dangerouslySetInnerHTML={{ __html: HTML  }} 
                    />
                </div>
            </ViewModal>
        );
    }
}

export default PrintForm;
