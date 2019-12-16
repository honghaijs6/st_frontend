export const MAU_ISERVICE = `

<!doctype html>
<html lang='en'>
    <head>
        <meta charset='utf-8'>
        <title>Print Preview</title>
        <meta name='description' content='Print preview'>
            <style type='text/css'>
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
                
            </style>
    </head>
    <body style='background:#fff'>
        <div id="doc-pdf" class="print-document" style="padding: 0px; width: 92%; margin: auto;">
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
                        <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500;"> DỊCH VỤ KHÁCH HÀNG </p>
                        <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500;"> CUSTOMERS SERVICE </p>
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
                                        Ngày X.lý/Date act <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{DATE_ARRIVED}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Giờ đến/Time begin <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{TIME_ARRIVED}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">Ref.(T.Gia T.Khảo) <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;"></td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        A/C code <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{CREATOR_CODE}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Số/Service No. <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{SERVICE_CODE}}
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
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 290px; font-family: Arial;">Diễn giải/Description</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;">Unit / ĐVT</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 41px; font-family: Arial;"> Q.ty / S.lượng</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Unit Price / Đơn giá</th>
                            <th class="text-center" style="vertical-align: middle; font-size: 17px; color: rgb(17, 17, 17); width: 90px; font-family: Arial;">Amount / Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody style="border: 1px solid rgb(0, 0, 0);">
                        {{ORDER_RECORDS}}
                    </tbody>
                    <tfoot>
                        
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
            
            <div style="margin-top:20px; font-size:12px">
                <div>
                    <div style="float:left; width:50%">Thực hiện/Task todo :</div>
                    <div style="float:right; width:50%; text-align:right">Phụ trách/Serve by : {{BELONG_USER}}</div>
                    <div style="clear:both"></div>
                </div>
                <div style="border:1px solid #333; padding:10px; margin-top:10px; height:100px">
                    {{CONTENT_ISSUES}}
                </div>
            </div>

            <div style="margin-top:20px; font-size:12px">
                <div> Phản hồi/Cus.Resp :</div>
                <div style="border:1px solid #333; padding:10px; margin-top:10px; height:100px">
                    {{CONTENT_SOLVED}}
                </div>
            </div>
             

            <div class="signature">
                <div style="width:90%; margin:auto">
                    <div style="float:left; width:50%; text-align:center">
                        Chúng tôi xác nhận rằng các dịch vụ nêu trên đã được thực hiện đầy đủ và đem đến sự hài lòng cho tôi/chúng tôi 
                        <br><br><br><br>
                        Ký tên & đóng dấu
                    </div>
                    <div style="float:left; width:50%; text-align:center">
                    Dành cho văn phòng
                        <br><br><br><br>
                        Kiểm tra bởi
                    </div>
                    <div style="clear:both"></div>
                </div>
            </div>
        </div>
    </body>
</html>

`;
