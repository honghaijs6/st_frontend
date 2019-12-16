

export const MAU_QUOTATION = `


<!doctype html>
<html lang='en'>
    <head>
        <meta charset='utf-8'>
        <title>Print Preview</title>
        <meta name='description' content='Print preview'>
           
            <style type='text/css'>
                @import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css');
                @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
                   

              
               .text-uppercase{ text-transform:uppercase}
               .vendorListHeading th{ font-size: 12px !important;  border: 0px solid #111 !important; border-right: 1px solid #111 !important;}
                

                p.N2T{ text-transform:lowercase;}
                p.N2T:first-child:first-letter {
                    text-transform: uppercase !important;
                }
                
                
                @page {
                    size:'A4';
                    margin: 0.5cm;
                    
                }
                
                @media print {
                    
                    body {
                        
                        padding:0;
                        line-height: 1.4em;
                        word-spacing:1px;
                        letter-spacing:0.2px;
                        font: 12px Arial;
                        color: #000; -webkit-print-color-adjust: exact;
                        background: #fff !important;
                
                    }
                    
                
                    @page:top{
                        margin-top: 2cm !important;
                    }
                
                
                }
                
                td img{
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                
                }
                
                
                .print-table{ border: 1px solid #333; font-size: 12px;}
                .print-table .record-item td.item{ border: 0.5px solid #333;}
                .print-table .record-item td.item-footer{ border-bottom: 0.5px solid #333;}
                
                
                .print-table .record-border td{ border-top: 1px solid #333;}
                .print-table .record-last td{ border-top: 1px solid #333; }
                
                .print-table th{ font-size: 14px; font-weight: normal;}
                .print-table td{ font-size: 12px;}
                
                
                .conditions{font-size: 12px; margin-top: 30px;}
                .conditions p{ line-height: 5px;  margin-bottom: 10px; }
                .conditions label{
                    font-size: 12px; 
                    margin: 0px; padding: 0px; font-weight: normal !important;
                    line-height: 18px;
                }
                
                .table-term{margin-top: 20px}
                .table-term tr td{ padding: 3px 0px; font-size: 12px; }
                
                
                 *{
                 font-family: 'Roboto', sans-serif; font-size:14px ; 
               }
                
            </style>
    </head>
    <body>
        <div class="print-document" style="padding:30px">
            <div>
                <div style="float: left; width: 25%;">
                    
                    <img src="{{COMPANY_LOGO}}" style="height: 127px;">
                </div>
                <div style="float: left; width: 65%; padding-left: 40px;">
                    <p style="font-size: 14px; margin: 0px; padding: 5px 0px; font-weight: 500;"> {{COMPANY_NAME}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> {{COMPANY_ADDRESS}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> MST : {{COMPANY_TAXNO}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> Tel: {{COMPANY_PHONE}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> Website: {{COMPANY_WEBSITE}} - E-mail: {{COMPANY_EMAIL}} </p>
                </div>
                <div style="float: left; width: 10%; text-align: right;">
                    <img src="http://kpi.vikhang.com:9000/js/app/cpanel/img/brand.jpg" style="height: 127px;">
                </div>
                <div style="clear: both;"></div>
            </div>
            <div style="margin-top: 30px; position: relative;">
                <div>
                    <div style="text-align: center;">
                        <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500;"> QUOTATION </p>
                        <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500;"> BẢNG BÁO GIÁ </p>
                    </div>
                    <div style="position: absolute; right: 0px; top: -10px;">
                        {{BARCODE}}    
                    </div>
                </div>
                <div style="margin-top: 30px;">
                    <div style="float: left; width: 63%; border: 0px solid rgb(0, 0, 0);">
                        <table style="border: 1px solid rgb(0, 0, 0); padding: 10px 0px;">
                            <tbody>
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Company <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;"> 
                                        {{CUSTOMER_NAME}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Address (Địa chỉ) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_ADDRESS}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Tel (SĐT) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_PHONE}}
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">Email <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_EMAIL}}
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Attn(Người nhận) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_RECEIVER}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        MST/Tax Code <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_TAXNO}}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div style="margin-left: 1%; float: left; width: 36%;">
                        <table>
                            <tbody>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">Number <span style="padding: 0px 10px;"> : </span></td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_CODE}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">Date <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_CODE_CREATED}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Old Ref(Tài liệu TK Cũ) <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;"></td>
                                </tr>
                                
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Ref.(T.Gia T.Khảo) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;"></td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        A/C code <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_BELONG}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Term(Hạn thanh toán) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_PAYMENT_CODE}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
            <div class="page" style="margin-top: 30px;">
                <table class="table print-table">
                    <thead>
                        <tr class="vendorListHeading">
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">No STT</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 120px; font-family: Arial;">Model / Mã hàng</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 290px; font-family: Arial;">Description / Chi tiết hàng hoá</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">Unit / ĐVT</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Photo / Hình ảnh</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">Q.ty / S.lượng</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Unit Price / Đơn giá</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Amount / Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody style="border: 1px solid rgb(0, 0, 0);">
                        {{ORDER_RECORDS}}
                    </tbody>
                    <tfoot>
                        <tr class="record-item">
                            <td class="item" colspan="4" style="border-right: 0px;"> </td>
                            <td class="item" colspan="3" style="text-align: right; border-left: 0px;"> Giảm </td>
                            <td class="item" colspan="1"> {{ORDER_DISCOUNT}} </td>
                        </tr>
                        <tr class="record-item">
                            <td class="item" colspan="4" style="border-right: 0px;"> </td>
                            <td class="item" colspan="3" style="text-align: right; border-left: 0px;">Amount/ Cộng tiền hàng</td>
                            <td class="item" colspan="1"> {{ORDER_AMOUNT}} </td>
                        </tr>
                        <tr class="record-item">
                            <td class="item" colspan="4" style="border-right: 0px;"> </td>
                            <td class="item" colspan="3" style="text-align: right; border-left: 0px;">VAT Tax/ Tiền thuế GTGT (10%)</td>
                            <td class="item" colspan="1"> {{ORDER_AMOUNT_TAX}} </td>
                        </tr>
                        <tr class="record-item">
                            <td class="item" colspan="7" style="text-align: right; border-left: 0px;"> Total Payment/Tổng cộng tiền thanh toán </td>
                            <td class="item" colspan="1"> {{ORDER_SUM}} </td>
                        </tr>
                        <tr>
                            <td class="item" colspan="2"> Số tiền bằng chữ </td>
                            <td class="item N2T" colspan="6" style="font-style: italic;"> " {{ORDER_SUM_TEXT}} " </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="conditions ">
                <p class="font-12"> Term &amp; Conditions / Thời hạn và các điều khoản khác : </p>
                <p class="font-12"> Lưu ý : Giá trên không bao gồm phụ phí, chi phí phát sinh vào ngày thứ 7, CN và các ngày lễ </p>
                <table class="table-term">
                    <tbody>
                        <tr>
                            <td style="width: 220px;"> Delivery (Thời hạn giao hàng) </td>
                            <td>Within 15-45 days from the date of completing the first payment (Trong vòng 15-45 ngày kể từ ngày nhận thanh toán đợt 1)</td>
                        </tr>
                        <tr>
                            <td style="width: 220px;">Terms (Thời hạn thanh toán)</td>
                            <td> {{ORDER_PAYMENT_DESC}} </td>
                        </tr>
                        <tr>
                            <td style="width: 220px;">Validity (Giá trị báo giá)</td>
                            <td>30 days form the date of quotation (Có giá trị trong 30 ngày từ ngày báo giá)</td>
                        </tr>
                        <tr>
                            <td style="width: 220px;">Varranty (Bảo hành)</td>
                            <td>12 months for the device &amp; 06 months for Accessories (Bảo hành 12 tháng cho thiết bị &amp; 06 tháng cho phụ kiện kèm theo máy)</td>
                        </tr>
                        <tr>
                            <td style="width: 220px;">Prepared by (Được chuẩn bị bởi)</td>
                            <td> {{ORDER_PREPARE}} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </body>
</html>

`;

export const MAU_ORDER = `

<!doctype html>
<html lang='en'>
    <head>
        <meta charset='utf-8'>
        <title>Print Preview</title>
        <meta name='description' content='Print preview'>
            <style type='text/css'>
                @import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.css');
                @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

                .vendorListHeading th{ font-size: 12px !important;  border: 0px solid #111 !important; border-right: 1px solid #000 !important;}

                p.N2T{ text-transform:lowercase;}
                p.N2T:first-child:first-letter {
                    text-transform: uppercase !important;


                }


                @page {
                    size:'A4';
                    margin: 0;
                    margin-top: 1cm;
                }

                @media print {
                    

                    body {
                        
                        padding:0;
                        line-height: 1.4em;
                        word-spacing:1px;
                        letter-spacing:0.2px;
                        font: 12px Arial;
                        color: #000; -webkit-print-color-adjust: exact;
                        background: #fff !important;

                    }
                   

                    @page:top{
                        margin-top: 2cm !important;
                    }


                }

                
                td.company-info p{
                    padding-left: 90px;
                    font-size: 10px;
                    line-height: 10px;
                    font-family: 'Arial'; color: #121212 !important;
                }
                .row-page-name{ font-size: 14px; font-weight: bold; line-height: 12px; margin-top: 30px;}
                

                .print-table{ border: 1px solid #333; font-size: 12px;}
                .print-table .record-item td.item{ border: 0.5px solid #333;}
                .print-table .record-item td.item-footer{ border-bottom: 0.5px solid #333;}


                .print-table .record-border td{ border-top: 1px solid #333;}
                .print-table .record-last td{ border-top: 1px solid #333; }

                .print-table th{ font-size: 14px; font-weight: normal;}
                .print-table td{ font-size: 12px;}
                
                .conditions{font-size: 12px; margin-top: 30px;}
                .conditions p{ line-height: 5px;  margin-bottom: 10px; }
                .conditions label{
                    font-size: 12px; 
                    margin: 0px; padding: 0px; font-weight: normal !important;
                    line-height: 18px;
                }

                .table-term{margin-top: 20px}
                .table-term tr td{ padding: 3px 0px; font-size: 12px; }


                .signature{ font-size: 12px; margin-top: 20px;}
                .signature p.cus{ line-height: 5px;}
                 
                 *{
                 font-family: 'Roboto', sans-serif;
               }
            </style>
    </head>
    <body style='background:#fff'>
        <div id="doc-pdf" class="print-document" style="padding: 30px; ">
                <div>
                    <div style="float: left; width: 25%;">
                            
                    <img src="{{COMPANY_LOGO}}" style="height: 127px;">
                </div>
                <div style="float: left; width: 65%; padding-left: 40px;">
                    <p style="font-size: 14px; margin: 0px; padding: 5px 0px; font-weight: 500;"> {{COMPANY_NAME}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> {{COMPANY_ADDRESS}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> MST : {{COMPANY_TAXNO}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> Tel: {{COMPANY_PHONE}} </p>
                    <p style="font-size: 12px; margin: 0px; padding: 5px 0px;"> Website: {{COMPANY_WEBSITE}} - E-mail: {{COMPANY_EMAIL}} </p>
                </div>
                <div style="float: left; width: 10%; text-align: right;">
                    <img src="http://kpi.vikhang.com:9000/js/app/cpanel/img/brand.jpg" style="height: 127px;" />
                </div>
                
                <div style="clear: both;"></div>


            </div>
            <div style="margin-top: 30px; position: relative;">
                <div>
                    <div style="text-align: center;">
                        <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500;"> HOÁ ĐƠN BÁN HÀNG </p>
                        <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500;"> SALES INVOICE </p>
                    </div>
                    <div style="position: absolute; right: 0px; top: -10px;">
                        {{BARCODE}}
                    </div>
                </div>
                <div style="margin-top: 30px;">
                    <div style="float: left; width: 63%; border: 0px solid rgb(0, 0, 0); padding: 10px;">
                        <table style="border: 1px solid rgb(0, 0, 0); padding: 10px 0px;">
                            <tbody>
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Company <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;"> 
                                        {{CUSTOMER_NAME}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Address (Địa chỉ) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_ADDRESS}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Tel (SĐT) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_PHONE}}
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">Email <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_EMAIL}}
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Attn(Người nhận) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_RECEIVER}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 30%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        MST/Tax Code <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="width: 100%; font-size: 12px; padding: 3px;">
                                        {{CUSTOMER_TAXNO}}
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div style="margin-left: 1%; float: left; width: 36%;">
                        <table>
                            <tbody>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Số Inv/Inv No <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_CODE_PI}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Ngày/Date <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_DATE_CONFIRMED}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Báo giá số/Quo. No <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_CODE}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">Ref.(T.Gia T.Khảo) <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;"></td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">A/C code <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_BELONG}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Term(Hạn thanh toán) <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{ORDER_PAYMENT_CODE}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
            <div class="page" style="margin-top: 30px;">
                <table class="table print-table">
                    <thead>
                        <tr class="vendorListHeading">
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">No STT</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 120px; font-family: Arial;">Model / Mã hàng</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 290px; font-family: Arial;">Name / Tên hàng hoá</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">Unit / ĐVT</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">Q.ty / S.lượng</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Unit Price / Đơn giá</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Amount / Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody style="border: 1px solid rgb(0, 0, 0);">
                        {{ORDER_RECORDS}}
                    </tbody>
                    <tfoot>
                        <tr class="record-item">
                            <td class="item" colspan="4" style="border-right: 0px;"> </td>
                            <td class="item" colspan="2" style="text-align: right; border-left: 0px;"> Giảm </td>
                            <td class="item" colspan="1"> {{ORDER_DISCOUNT}} </td>
                        </tr>
                        <tr class="record-item">
                            <td class="item" colspan="3" style="border-right: 0px;"> </td>
                            <td class="item" colspan="3" style="text-align: right; border-left: 0px;">Amount/ Cộng tiền hàng</td>
                            <td class="item" colspan="1"> {{ORDER_AMOUNT}} </td>
                        </tr>
                        <tr class="record-item">
                            <td class="item" colspan="3" style="border-right: 0px;"> </td>
                            <td class="item" colspan="3" style="text-align: right; border-left: 0px;">VAT Tax/ Tiền thuế GTGT (10%)</td>
                            <td class="item" colspan="1"> {{ORDER_AMOUNT_TAX}} </td>
                        </tr>
                        <tr class="record-item">
                            <td class="item" colspan="6" style="text-align: right; border-left: 0px;"> Total Payment/Tổng cộng tiền thanh toán </td>
                            <td class="item" colspan="1"> {{ORDER_SUM}} </td>
                        </tr>
                        <tr>
                            <td class="item" colspan="2"> Số tiền bằng chữ </td>
                            <td class="item N2T" colspan="5" style="font-style: italic;"> " {{ORDER_SUM_TEXT}} " </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div class="conditions ">
                <p class="font-12"> Ghi chú / <i>Noted</i> : </p>
                <label> - Thông tin ngân hàng <i>(Bank Information)</i>: ... </label>
                <br>
                <label> - Số tài khoản <i>(A/C NO.Beneficiary)</i>: ... </label>
                <br>
                <label> - Thụ hưởng bởi <i>(Beneficiary)</i>: ... </label>
                <br>
                <label> - Địa chỉ ngân hàng <i>(Bank Address)</i>: ... </label>
                <br>
                <label> - Terms (Thời hạn thanh toán) : {{ORDER_PAYMENT_DESC}} </label>
                <br>
                <br>
                <label>Đơn đặt hàng đặc biệt không thể bị hủy bỏ trong quá trình sản xuất. Không chấp nhận trả lại cho đơn đặt hàng đặc biệt.Tất cả các đơn đặt hàng cho dự án (Như là: sản phẩm OEM, dự án) đều được coi là đơn hàng đặc biệt. Không trả lại mà không có sự cho phép trước hoặc không có số RMA phải được phê duyệt từ nhà cung cấp.<i>(Notes: Special order cannot be cancelled once in production.No return allowned on special orders. All Project orders (Ex: OEM Products, project) are considered special orders. No return without prior authorization and without RMA number and subject to an approval from supplier)</i></label>

            </div>
            <div class="signature">
                <div style="float: left; width: 33%; border: 1px solid rgb(0, 0, 0); padding: 5px;">
                    <label> Accepted by : </label>
                    <br>
                    <br>
                    <br>Customer's chops &amp; Signature
                    <br>Date :</div>
                <div style="float: left; width: 33%; color: rgb(255, 255, 255);">_</div>
                <div style="float: left; width: 33%; border: 1px solid rgb(0, 0, 0); padding: 5px;">
                    <label> {{COMPANY_NAME}} </label>
                    <br>
                    <br>
                    <br>Verified by (Được xác nhận bởi)
                    <br>Date :</div>
                <div style="clear: both;"></div>
            </div>
        </div>
    </body>
</html>

`;
