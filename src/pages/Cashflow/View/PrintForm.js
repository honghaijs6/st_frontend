
import doPrint from '../../../hook/ultil/doPrint';

import {N2T} from '../../../hook/ultil/N2T'; 
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
    

    _formatHTML(data,companyInfo){
        let HTML = ``;

        if(JSON.stringify(companyInfo)!='{}'){

            if(JSON.stringify(data)!=='{}'){
                
                const types = { pt:'phieuthu_temp', pc:'phieuchi_temp' } 
                HTML = companyInfo[types[data.type]];
                
                HTML = HTML.replace(/{{COMPANY_LOGO}}/g,companyInfo['logo']);
                HTML = HTML.replace(/{{COMPANY_NAME}}/g,companyInfo['name']);
                HTML = HTML.replace(/{{COMPANY_ADDRESS}}/g,companyInfo['address']);
                HTML = HTML.replace(/{{COMPANY_TAXNO}}/g,companyInfo['tax_no']);
                HTML = HTML.replace(/{{COMPANY_PHONE}}/g,companyInfo['phone']);
                HTML = HTML.replace(/{{COMPANY_WEBSITE}}/g,companyInfo['website']);
                HTML = HTML.replace(/{{COMPANY_EMAIL}}/g,companyInfo['email']);

                // BILL INFO 
                HTML = HTML.replace(/{{CASHFLOW_DATECREATED}}/g,moment(data.date_created).format('YYYY-MM-DD'));
                const paymentTypes = {tm:'Tiền mặt',ck:'Chuyển khoảng'}
                HTML = HTML.replace(/{{PAYMENT_TYPE}}/g, paymentTypes[data.bill_acc_type] );
                HTML = HTML.replace(/{{CASHFLOW_ATTACK}}/g, data.ref_code );
                HTML = HTML.replace(/{{CASHFLOW_CODE}}/g, data.code );
                    
                
                // BILL BODY
                HTML = HTML.replace(/{{CASHFLOW_PARTNER}}/g, data.person_name );
                HTML = HTML.replace(/{{CASHFLOW_PARTNER_ADDRESS}}/g, data.person_address );
                HTML = HTML.replace(/{{CASHFLOW_REASON}}/g, data.reason );
                HTML = HTML.replace(/{{CASHFLOW_VALUE}}/g,  numeral(data.total).format('0,0')+' đ'  );
                HTML = HTML.replace(/{{CASHFLOW_NOTE}}/g, data.note );

            }
            
        }

        return HTML;
    }

    print = (HTML)=>{
        
        
        var pri = document.querySelector('#ifmcontentstoprint').contentWindow; 
        pri.document.open();
        pri.document.write(HTML);
        pri.document.close();
        pri.focus();
        pri.print();

    }

    render() {
        
        const data = this.props.data;
        const HTML = this._formatHTML(data,this.props.companyInfo);
        

        return (
            <ViewModal  { ...this.props } >
                
                <div>
                    
                    <div style={{padding:10}}>
                        <div className="btn-group">
                            <a style={{ cursor:'pointer'}} onClick={()=>{ doPrint(HTML) }}> <i className="fa fa-print"></i> Print </a>
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
