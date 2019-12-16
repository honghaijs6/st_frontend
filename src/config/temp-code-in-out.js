export const MAU_PHIEU_XUATKHO = `


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
                 font-family: 'Roboto', sans-serif; font-size:14px !important;
               }
            </style>
    </head>
    <body>
        <div id="doc-pdf" class="print-document" style="padding: 30px;">
                <div>
                    <div style="float: left; width: 25%;">
                            
                    <img src="{{COMPANY_LOGO}}" style="height: 127px;">
                </div>
                <div style="float: left; width: 65%; padding-left: 40px;">
                    <p style="font-size: 14px; margin: 0px; padding: 5px 0px; font-weight: 500; font-size:15px !important;"> {{COMPANY_NAME}} </p>
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
                        <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500; font-size:20px !important"> PHIẾU XUẤT KHO </p>
                    </div>
                    <div style="position: absolute; right: 0px; top: -10px;">
                        {{BARCODE}}
                    </div>
                </div>
                <div style="margin-top: 30px;">
                    <div style="float: left; width: 63%; border: 0px solid rgb(0, 0, 0);">
                        <table style="border: 1px solid rgb(0, 0, 0);">
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
                                        Phiếu xuất <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{RECEIPT_CODE_OUT}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Ngày/Date <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{RECEIPT_DATE_CREATED}}
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        T.liệu T.K <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        <span class="text-uppercase">{{RECEIPT_ORDER_INV}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                       Mã kho <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td class="text-uppercase" style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        {{WAREHOUSE_CODE}}
                                    </td>
                                </tr>

                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;"> Carton <span style="padding: 0px 10px;"> : </span></td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;"></td>
                                </tr>
                                <tr>
                                    <td style="width: 55%; font-size: 12px; text-align: right; padding: 3px 10px;">
                                        Kích thươc/Size <span style="padding: 0px 10px;"> : </span>
                                    </td>
                                    <td style="border: 1px solid rgb(0, 0, 0); width: 100%; padding: 3px; font-size: 12px;">
                                        
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
                        </tr>
                    </thead>
                    <tbody style="border: 1px solid rgb(0, 0, 0);">
                        {{ORDER_RECORDS}}
                    </tbody>
                   
                </table>
            </div>
            <div class="conditions ">
                <p class="font-12"> Ghi chú / <i>Noted</i> : {{RECEIPT_NOTE}}</p>
            </div>

            <div class="signature" style="margin-top:40px;">
                <table>
                    <tr>
                        <td style="width: 400px; ">
                            <p class="bold">Khách hàng/Cus  </p>
                            <br> <br> <br><br>
                            Ghi rõ họ tên<br>
                            Ngày/Date
                        </td>
                        <td style="width: 400px; ">
                            <p class="bold">Người giao/Del  </p>
                            <br> <br> <br><br>
                            Người giao hàng<br>
                            Ngày/date
                        </td>
                        <td style="width: 400px; ">
                            <p class="bold">Người xuất kho/Exp  </p>
                            <br> <br> <br><br>
                            {{USER_CODE}} <br>
                            Ngày/date
                        </td>
                        <td style="width: 400px; ">
                            <p class="bold">Người bán/Sale  </p>
                            <br> <br> <br><br>
                            {{ORDER_BELONG_USER}}<br>
                            Ngày/date
                        </td>
                    </tr>  
                </table>
            </div>
        </div>
    </body>
</html>


`;


export const MAU_PHIEU_NHAPKHO = `

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

                
                .table-page-header td{ font-size: 12px; color: #121212 !important; }
                .table-page-header td.left-left{width: 180px; text-align: right;}
                .table-page-header td.left-left span{ padding: 0px 10px 0px 10px;}

                .table-page-header td.right-left{ width: 250px; text-align: right;}
                .table-page-header td.right-left-wh{ width: 138px; text-align: left;}


                .table-page-header td.right-left span{ padding: 0 10px 0 10px;}
                .table-page-header td.right-right{ text-align: right }
                .table-page-header td.right-right-wh{ text-align: left; border: 1px solid #333; width: 160px}
  
              *{
                 font-family: 'Roboto', sans-serif; font-size:14px !important;
               }
                
            </style>
    </head>
    <body>
        <div id="doc-pdf" class="print-document" style="padding: 30px;">
                <div>
                    <div style="float: left; width: 25%;">
                            
                    <img src="{{COMPANY_LOGO}}" style="height: 127px;">
                </div>
                <div style="float: left; width: 65%; padding-left: 40px;">
                    <p style="font-size: 14px; margin: 0px; padding: 5px 0px; font-weight: 500; font-size:15px !important"> {{COMPANY_NAME}} </p>
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
                        <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500; font-size:20px !important"> PHIẾU NHẬP KHO </p>
                    </div>
                    <div style="position: absolute; right: 0px; top: -10px;">
                        {{BARCODE}}
                    </div>
                </div>

                <div style="margin-top: 30px;">
                    <div style="float: left; width: 48%; padding:3px 0 3px 0px; border-top: 1px solid #111111; border-bottom:1px solid #111111">
                        <table class="table-page-header">
                            <tbody>
                                <tr>
                                    <td style="width:100px; line-height:15px; padding:3px;"> Nhà thầu/Vendor  </td>
                                    <td style=" padding: 3px; text-transform:uppercase">  {{SUPPLIER_CODE}}   </td>
                                </tr>

                                <tr>
                                    <td colspan="2" style="line-height:15px; padding:3px;">  {{SUPPLIER_NAME}} </td>
                                </tr>

                                <tr>
                                     <td colspan="2" style="line-height:15px; padding:3px;">  {{SUPPLIER_ADDRESS}} </td>
                                </tr>

                                <tr>
                                    <td style=" width:100px;line-height:15px; padding:3px;">MST/Tax Code  </td>
                                    <td style=" line-height:15px; padding:3px;"> {{SUPPLIER_TAXNO}} </td>
                                </tr>
                                <tr>
                                    <td style=" line-height:15px; padding:3px;">SĐT/phone </td>
                                    <td style=" line-height:15px; padding:3px;"> {{SUPPLIER_PHONE}} </td>
                                </tr>
                
                                <tr>
                                    <td style=" line-height:15px; padding:3px;">E-mail  </td>
                                    <td style=" line-height:15px; padding:3px;"> {{SUPPLIER_EMAIL}} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style="margin-left: 4%; float: left; width: 48%; padding:3px 0 3px 0px; border-top: 1px solid #111111; border-bottom:1px solid #111111">
                        <table class="table-page-header">
                            <tbody>
                                <tr>
                                    <td style="width:100px; line-height:15px; padding:3px;"> Số P.O  </td>
                                    <td style=" padding: 3px; text-transform:uppercase">

                                    {{PURCHASE_CODE}} 

                                    </td>
                                </tr>
                                <tr>
                                    <td style="width:100px; line-height:15px; padding:3px;"> Bill To  </td>
                                    <td style=" padding: 3px; line-height:15px; font-style:italic;"> (Thông tin xuất hoá đơn)   </td>
                                </tr>
                             
                                <tr>
                                    <td colspan="2" style="line-height:15px; padding:3px;"> {{COMPANY_NAME}} </td>
                                </tr>

                                <tr>
                                    <td colspan="2" style="line-height:15px; padding:3px;">  {{COMPANY_ADDRESS}}  </td>
                                </tr>
                               
                                <tr>
                                    <td colspan="2" style="line-height:15px; padding:3px;">Tax Code : {{COMPANY_TAXNO}} </td>
                                </tr>
                                <tr>                                                                        
                                    <td style="line-height:15px; padding:3px;" colspan="2">Mã Kho : <span class="text-uppercase">{{WAREHOUSE_CODE}}</span> </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div style="clear: both;"></div>
                </div>

                <div style="margin-top:30px">
                    <div style="float: left; width: 48%; padding:3px 0 3px 0px; border-top: 1px solid #111111; border-bottom:1px solid #111111">
                        <table class="table-page-header">
                            <tbody>
                                <tr>
                                    <td  style="width:100px; line-height:15px"> Ship to. </td>
                                    <td style=" padding: 3px; text-transform:uppercase">     </td>
                                </tr>
                                
                                <tr>
                                    <td colspan='2' style=" line-height:15px; padding:3px">  {{RECEIVER_LOCATION}} </td>
                                </tr>
                            
                                <tr>
                                    <td colspan='2' style="line-height:15px; padding:3px">  
                                        {{RECEIVER_ADDRESS}}
                                    </td>
                                </tr>
                                <tr>
                                    <td  style=" width:100px;line-height:15px; padding:3px;"> Liên hệ  </td>
                                    <td  style=" line-height:15px; padding:3px;"> {{RECEIVER_CONTACT}} </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div  style="margin-left: 4%; float: left; width: 48%; padding:3px 0 3px 0px; border-top: 1px solid #111111; border-bottom:1px solid #111111">
                        <table class="table-page-header">
                            <tr>
                                <td style="width:100px; line-height:15px; padding:3px"> Staff Code  </td>
                                <td style=" padding: 3px; text-transform:uppercase"> {{PURCHASE_BELONG_USERCODE}}   </td>
                            </tr>
                            <tr>
                                <td style="width:100px; line-height:15px"> Payment Term:  </td>
                                <td style=" padding: 3px; line-height:15px; text-transform:uppercase"> {{PURCHASE_PAYMENT}}   </td>
                            </tr>
                            <tr>
                                <td style="width:100px; line-height:15px"> Người mua:  </td>
                                <td style=" padding: 3px; line-height:15px;"> {{PURCHASE_BELONG_USERNAME}}  </td>
                            </tr>
                            <tr>
                                <td style="width:100px; line-height:15px"> E-mail  </td>
                                <td style=" padding: 3px; line-height:15px;">  {{PURCHASE_BELONG_USERMAIL}}   </td>
                            </tr>
                        </table>
                    </div>

                    <div style="clear:both"></div>
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
                        </tr>
                    </thead>
                    <tbody style="border: 1px solid rgb(0, 0, 0);">
                        {{ORDER_RECORDS}}
                    </tbody>
                   
                </table>
            </div>
            <div class="conditions ">
                <p class="font-12"> Ghi chú / <i>Noted</i> : {{RECEIPT_NOTE}} </p>
                <table>
                    <tr>
                        <td>
                        - Phương thức thanh toán : <?php echo $whInfo['Payment']['name'] ?>
                        </td>
                    </tr>
                    <tr>
                        <td >
                            - Một bản sao của PO này phải được nộp kèm khi giao hàng, cùng với biên bản giao hàng và hóa đơn tài chính. Số và ngày PO phải được thể hiện rõ ràng và đầy đủ trên biên bản giao hàng và hóa đơn, nếu không việc thanh toán sẽ tạm đình chỉ cho đến khi các sửa đổi cần thiết được thực hiện.
                        </td>

                    </tr>
                    <tr>
                        <td>
                            - Công ty chỉ thanh toán cho nhà cung cấp có tên ghi trên PO này, trừ trường hợp hợp đồng mua bán giữa công ty và nhà cung cấp có quy định khác hoặc các bên có thỏa thuận khác bằng văn bản.
                        </td>
                    </tr>
                    <tr>
                        <td>
                            - Việc thanh toán cho PO này sẽ được thực hiện theo hợp đồng mua bán giữa Công ty và nhà cung cấp và PO này.
                        </td>
                    </tr>

                </table>

                <p style=" margin-top:10px"> Coppy to : <input style="width:200px; background:#fff; border:0px; border-bottom:1px solid #000" type="text" /> </p>
            </div>

            <div class="signature" style="  margin: auto; width: 900px; margin-top:40px;">
                <table>
                    <tr>
                        <td style="width: 100px; ">
                            <p class="bold"> </p>
                            <br> <br> <br><br>


                        </td>
                        <td style="width: 200px; ">
                            <p class="bold"> Buyer </p>
                            <br> <br> <br><br>


                        </td>
                        <td style="width: 300px; text-align: right">
                            <p class="bold"> Seller</p>
                            <br> <br> <br><br>


                        </td>
                        <td style="width: 100px; ">
                            <p class="bold"> </p>
                            <br> <br> <br><br>

                        </td>

                    </tr>
                </table>
                
            </div>
        </div>
    </body>
</html>


`;