
// HOOKS    
import doGetModelInfo from '../hook/ultil/doGetModelInfo'; 
import {N2T} from '../hook/ultil/N2T'; 


import React, { Component } from 'react';
import Barcode from 'react-barcode';


import '../scss/print.scss';

import moment from 'moment';
import numeral from 'numeral'; 



class TemplateQuotation extends Component {

    constructor(props){  
        super(props);


        this.state = {
            cusInfo : {},
            companyInfo:{}
        }
        this.grid = {
            colums:[
                { headerName:'No STT', width:41 },
                { headerName:'Model / Mã hàng', width:120 },
                { headerName:'Description / Chi tiết hàng hoá', width:290 },
                { headerName:'Unit / ĐVT', width:41 },
                { headerName:'Photo / Hình ảnh', width:90 },
                { headerName:'Q.ty / S.lượng', width:41 },
                { headerName:'Unit Price / Đơn giá', width:90 },
                { headerName:'Amount / Thành tiền', width:90 },
            ]
                    
        }
    }

    async componentDidMount(){
        const cusInfo = JSON.parse(this.props.data.customer_info);
        const info =   await doGetModelInfo('customers',cusInfo.id);
        const comInfo = await doGetModelInfo('companies',window.USERINFO['company_id']);
        
        this.setState({
            cusInfo:info['data'],
            companyInfo:comInfo['data']
        });

    }
    
    render() {

        //const orderInfo = this.props.data;
        const cusInfo = this.state.cusInfo;
        const orderInfo = this.props.data ; 
        const comInfo =  this.state.companyInfo;  
        const cart = JSON.parse(orderInfo.cart);  
        
        const TOTAL_VAT = parseFloat(orderInfo['total_sum']) * ( parseInt(orderInfo['vat'])/100 ) ; 
        

        return (
            <div id={this.props.id} className="print-document" style={{padding:'0px', width:'92%', margin:'auto'}}>
                        {/* TITLE */}
                        
                        <div>
                            <div style={{float:'left', width:'25%'}}>
                                <img style={{height:127}} src="http://kpi.vikhang.com:9000/js/app/cpanel/img/kpi.vikhang.com-logo.jpg" />
                            </div>
                            <div style={{float:'left', width:'65%', paddingLeft:40}}>
                                <p style={{fontSize:14, margin:0, padding:'5px 0', fontWeight:'500'}}> { comInfo['name'] } </p>
                                <p style={{fontSize:12, margin:0, padding:'5px 0'}}> { comInfo['address'] } </p>
                                <p style={{fontSize:12, margin:0, padding:'5px 0'}}> MST : { comInfo['tax_no'] || 'n/a' } </p>
                                <p style={{fontSize:12, margin:0, padding:'5px 0'}}> Tel: { comInfo['phone'] || 'n/a' } </p>
                                <p style={{fontSize:12, margin:0, padding:'5px 0'}}> Website: { comInfo['website'] || 'n/a' } - E-mail: { comInfo['email'] || 'n/a' } </p>
                            </div>
                            <div style={{float:'left', width:'10%', textAlign:'right'}}>
                                <img src="http://kpi.vikhang.com:9000/js/app/cpanel/img/brand.jpg" style={{height:127}} />
                            </div>
                            <div style={{clear:'both'}}></div>
                        </div>

                        {/* HEADER */}
                        <div style={{marginTop:30, position:'relative'}}>
                            <div>
                                <div style={{textAlign:'center'}}>
                                    <p style={{margin:0, padding:'5px 0px', fontSize:16, fontWeight:'500'}}> QUOTATION </p>
                                    <p style={{margin:0, padding:'5px 0px', fontSize:16, fontWeight:'500'}}> BẢNG BÁO GIÁ </p>
                                </div>
                                <div style={{position:'absolute',right:0, top:-10}}>
                                    <Barcode 
                                        value={ orderInfo.code } 
                                        width={1.5}
                                        displayValue={false}
                                        height={60}     
                                    />
            
                                </div>
                            </div>

                            <div style={{marginTop:30}}>
                                <div style={{
                                    float:'left',
                                    width:'63%',
                                    border:'0px solid #000',
                                    padding:10
                                }}>
                                    <table style={{border:'1px solid #000', padding:'10px 0px'}}>
                                        <tbody>
                                            <tr>
                                                <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'9px 10px'}}> 
                                                    Company  <span style={{padding:'0px 10px'}}> : </span> 
                                                </td>
                                                <td style={{width:'100%', fontSize:12, padding:'9px 10px'}}>
                                                    { cusInfo['name'] }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'3px 10px'}}> 
                                                    Address (Địa chỉ) <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td style={{width:'100%', fontSize:12, padding:'3px 10px'}}>
                                                    {cusInfo['address'] }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'3px 10px'}}> 
                                                    Tel (SĐT) <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td style={{width:'100%', fontSize:12, padding:'3px 10px'}}>
                                                    { cusInfo['phone'] }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'3px 10px'}}> 
                                                    FAX <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td style={{width:'100%', fontSize:12, padding:'3px 10px'}}>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'3px 10px'}}> 
                                                    Email <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td style={{width:'100%', fontSize:12, padding:'3px 10px'}}>
                                                    { cusInfo['email'] }
                                                </td>
                                            </tr>

                                            <tr>
                                                <td style={{width:'30%',fontSize:12,textAlign:'right',padding:'9px 10px'}}> 
                                                    Attn(Người nhận) <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td style={{width:'100%', fontSize:12, padding:'9px 10px'}}>
                                                    { cusInfo['contact_name'] }
                                                </td>
                                            </tr>
                                        </tbody>
                                    
                                    </table>
                                </div>  
                                <div style={{
                                    marginLeft:'1%',
                                    float:'left',
                                    width:'36%',
                                }}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                                Number <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td className="text-uppercase" style={{border:'1px solid #000', width:'100%', padding:3,fontSize:12}}>
                                                    { orderInfo['code'] }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                                    Date  <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td style={{border:'1px solid #000', width:'100%',padding:3,fontSize:12}}>
                                                    { moment(orderInfo['date_created']).format('YYYY-MM-DD') }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                                    Old Ref(Tài liệu TK Cũ)  <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td style={{border:'1px solid #000', width:'100%',padding:3,fontSize:12}}>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                                    Ref.(T.Gia T.Khảo)  <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td style={{border:'1px solid #000', width:'100%',padding:3,fontSize:12}}>
                                                    
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                                    A/C code  <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td style={{border:'1px solid #000', width:'100%',padding:3,fontSize:12}}>
                                                    { orderInfo['belong_user'] }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{width:'55%', fontSize:12, textAlign:'right', padding:'3px 10px'}}>  
                                                    Term(Hạn thanh toán)  <span style={{padding:'0px 10px'}}> : </span>  
                                                </td>
                                                <td className="text-uppercase" style={{border:'1px solid #000', width:'100%',padding:3, fontSize:12}}>
                                                    { orderInfo['payment_code'] }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div style={{clear:'both'}}></div>
                            </div>

                        </div>

                        {/* END HEADER */}

                        {/* BODY TABLE */}
                        <div style={{marginTop:30}} className="page">
                            <table className="table print-table">       
                                <thead >
                                    <tr className="vendorListHeading">
                                        {
                                            this.grid.colums.map((item,index)=>{
                                                return(
                                                    <th key={index} className="text-center" style={{
                                                        verticalAlign:'middle',
                                                        fontSize:17,
                                                        color:'#111',
                                                        width: item.width,
                                                        fontFamily:'Arial' 
                                                    }}>
                                                        { item.headerName }
                                                    </th>
                                                )
                                            })
                                        }   

                                    </tr>
                                </thead>
                                <tbody style={{border:'1px solid #000'}}>
                                    {
                                        cart.map((item,index)=>{

                                            const total = parseFloat(item.price) * parseInt(item.amount);
                                            const stt = index + 1; 
                                            return (
                                                <tr key={index} className="record-item">

                                                    <td className="text-center item" style={{
                                                        verticalAlign:'middle'
                                                    }}>
                                                        { stt }
                                                    </td>

                                                    <td className="text-center item" style={{
                                                        verticalAlign:'middle'
                                                    }}>
                                                        { item.name }
                                                    </td>
                                                    <td className="item-pro-desc item">
                                                        <div 
                                                            style={{wordWrap:'break-word', width: this.grid.colums[2]['width'] }} 
                                                            dangerouslySetInnerHTML={{ __html: item.content }} 
                                                        />
                                                    </td>
                                                    <td className="text-center item" style={{
                                                        verticalAlign:'middle'
                                                    }}>
                                                        { item.unit }
                                                    </td>
                                                    <td className="text-center item" style={{
                                                        verticalAlign:'middle'
                                                    }}>
                                                        <img style={{maxHeight:72}} className="img-responsive" src={ item.images } />
                                                    </td>
                                                    <td className="text-center item" style={{
                                                        verticalAlign:'middle'
                                                    }}>
                                                        { item.amount }
                                                    </td>
                                                    <td className="text-center item" style={{
                                                        verticalAlign:'middle'
                                                    }}>
                                                        { numeral(item.price).format('0,0')  }
                                                    </td>
                                                    <td className="text-center item" style={{
                                                        verticalAlign:'middle'
                                                    }}>
                                                        { numeral(total).format('0,0') }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                                <tfoot>
                                    <tr className="record-item">
                                        <td className="item"  colSpan="4" style={{borderRight:0}}  > { cusInfo['level_name'] } </td>
                                        <td className="item" style={{textAlign:"right", borderLeft:0}} colSpan="3"> Giảm </td>
                                        <td className="item" colSpan="1"> { numeral(orderInfo['level_discount']).format('0,0') } </td>
                                    </tr>
                                    <tr className="record-item">
                                        <td className="item"  colSpan="4" style={{borderRight:0}}  >  </td>
                                        <td className="item" style={{textAlign:"right", borderLeft:0}} colSpan="3">Amount/ Cộng tiền hàng</td>
                                        <td className="item" colSpan="1"> { numeral(orderInfo['total_sum']).format('0,0') } </td>
                                    </tr>
                                    <tr className="record-item">
                                        <td className="item"  colSpan="4" style={{borderRight:0}} >  </td>
                                        <td className="item" style={{textAlign:"right", borderLeft:0}} colSpan="3">VAT Tax/ Tiền thuế GTGT ({ orderInfo['vat']+'%' })</td>
                                        <td className="item" colSpan="1"> {numeral(TOTAL_VAT).format('0,0')  } </td>
                                    </tr>
                                    <tr className="record-item">
                                        <td className="item" style={{textAlign:"right", borderLeft:0}} colSpan="7"> Total Payment/Tổng cộng tiền thanh toán </td>
                                        <td className="item" colSpan="1"> { numeral(orderInfo['total_sum_vat']).format('0,0') } </td>
                                    </tr>
                                    <tr>
                                        <td className="item" colSpan="2"> Số tiền bằng chữ </td>
                                        <td  className="item N2T" style={{fontStyle:'italic'}} colSpan="6"> " { N2T(orderInfo['total_sum_vat'])+' đồng' } " </td>
                                    </tr>
                                </tfoot>
                            
                                
                            </table>
                        </div>       
                        {/* END BODY TABLE */}

                        {/* CONDITION */}
                        <div className="conditions ">
                            <p className="font-12"> Term & Conditions / Thời hạn và các điều khoản khác : </p>             
                            <p className="font-12"> Lưu ý : Giá trên không bao gồm phụ phí, chi phí phát sinh vào ngày thứ 7, CN và các ngày lễ </p>

                            <table className="table-term">
                                <tbody>
                                    <tr>
                                        <td style={{width:220}}> Delivery (Thời hạn giao hàng) </td>
                                        <td> 
                                            Within 15-45 days from the date of completing the first payment (Trong vòng 15-45 ngày kể từ ngày nhận thanh toán đợt 1) 
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width:220}}> 
                                            Terms (Thời hạn thanh toán)
                                        </td>
                                        <td> 
                                            { orderInfo['payment_name'] } 
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width:220}}> 
                                            Validity (Giá trị báo giá)
                                        </td>
                                        <td> 
                                            30 days form the date of quotation (Có giá trị trong 30 ngày từ ngày báo giá) 
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width:220}}> 
                                            Varranty (Bảo hành)
                                        </td>
                                        <td > 
                                            12 months for the device & 06 months for Accessories (Bảo hành 12 tháng cho thiết bị & 06 tháng cho phụ kiện kèm theo máy)
                                        </td>
                                    </tr>

                                    <tr>
                                        <td style={{width:220}}> 
                                            Prepared by (Được chuẩn bị bởi)
                                        </td>
                                        <td> 
                                            { orderInfo['username'] }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* END CONDITION */}


            </div>
        );
    }
}


TemplateQuotation.defaultProps = {
    id:'doc-pdf'
}
export default TemplateQuotation ; 
