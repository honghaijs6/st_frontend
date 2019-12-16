export const PHIEU_XUATKHO = `
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


                .signature{ font-size: 14px; margin-top: 20px;}
                .signature p.cus{ line-height: 5px;}

                .font-15{ font-size:15px}
                
            </style>
    </head>
    <body style='background:#fff'>
        <div id="doc-pdf" class="print-document" style="padding: 30px;">
            <div style="position: relative;">

                <div>
                        
                    <div style="float:left; width:33%; color:#fff">left</div>
                    <div style="float:left; width:34%; text-align:center">
                    <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500;"> PHIẾU XUẤT KHO </p>
                    </div>
                    <div style="float:left; width:33%; line-height:22px" class="font-15">
                        Ngày : {{RECEIPT_DATE_CREATED}} <br>
                        Số :   <span class="text-uppercase"> {{RECEIPT_CODE_OUT}} </span> <br>
                        Kho : <span class="text-uppercase"> {{WAREHOUSE_CODE}} </span> <br>
                    </div>
                    <div style="clear:both"></div>
                    
                </div>
                
                <div style="margin-top: 10px;">
                    <table>
                        <tbody>
                            <tr>
                                <td class="font-15" style="width: 30%; text-align: right; padding: 3px 10px;">
                                    Lý do <span style="padding: 0px 10px;"> : </span>
                                </td>
                                <td  class="font-15" style="width: 100%;  padding: 3px;"> 
                                    {{RECEIP_TRACK_CODE}}
                                </td>
                            </tr>

                            <tr>
                                <td class="font-15" style="width: 30%; text-align: right; padding: 3px 10px;">
                                   Kèm theo chứng từ <span style="padding: 0px 10px;"> : </span>
                                </td>
                                <td class="font-15" style="width: 100%;  padding: 3px;">
                                    {{RECEIP_ATTACH}}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-15" style="width: 30%;  text-align: right; padding: 3px 10px;">
                                    Ghi Chú <span style="padding: 0px 10px;"> : </span>
                                </td>
                                <td class="font-15" style="width: 100%; padding: 3px;">
                                    {{RECEIPT_NOTE}}
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
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
            
            <div style="margin-top:30px;" class="font-15">
                <div style="margin-left:65%; font-style: italic;">
                     Ngày .........Tháng .........Năm ..........   
                </div>  
            </div>

            <div class="signature" style="margin-top:30px;">
                
                <div style="float:left; width:25%; text-align:center">
                    <p class="bold"> Phụ trách  </p>
                    <br> <br> <br><br>
                </div>

                <div style="float:left; width:25%; text-align:center">
                    <p class="bold"> Phụ trách  </p>
                    <br> <br> <br><br>
                </div>
                
                <div style="float:left; width:25%; text-align:center">
                    <p class="bold"> Phụ trách  </p>
                    <br> <br> <br><br>
                </div>
                
                <div style="float:left; width:25%; text-align:center">
                    <p class="bold"> Phụ trách  </p>
                    <br> <br> <br><br>
                </div>
                
                <div style="clear:both"></div>

                
            </div>
        </div>
    </body>
</html>

`;


export const PHIEU_NHAPKHO = `
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


                .signature{ font-size: 14px; margin-top: 20px;}
                .signature p.cus{ line-height: 5px;}

                .font-15{ font-size:15px}
                
            </style>
    </head>
    <body>
        <div id="doc-pdf" class="print-document" style="padding: 30px;">
            <div style="position: relative;">

                <div>
                        
                    <div style="float:left; width:33%; color:#fff">left</div>
                    <div style="float:left; width:34%; text-align:center">
                    <p style="margin: 0px; padding: 5px 0px; font-size: 16px; font-weight: 500;"> PHIẾU NHẬP KHO </p>
                    </div>
                    <div style="float:left; width:33%; line-height:22px" class="font-15">
                        Ngày : {{RECEIPT_DATE_CREATED}} <br>
                        Số :   <span class="text-uppercase"> {{RECEIPT_CODE_IN}} </span> <br>
                        Kho : <span class="text-uppercase"> {{WAREHOUSE_CODE}} </span> <br>
                    </div>
                    <div style="clear:both"></div>
                    
                </div>
                
                <div style="margin-top: 10px;">
                    <table>
                        <tbody>
                            <tr>
                                <td class="font-15" style="width: 30%; text-align: right; padding: 3px 10px;">
                                    Lý do <span style="padding: 0px 10px;"> : </span>
                                </td>
                                <td  class="font-15" style="width: 100%;  padding: 3px;"> 
                                    {{RECEIP_TRACK_CODE}}
                                </td>
                            </tr>

                            <tr>
                                <td class="font-15" style="width: 30%; text-align: right; padding: 3px 10px;">
                                   Kèm theo chứng từ <span style="padding: 0px 10px;"> : </span>
                                </td>
                                <td class="font-15" style="width: 100%;  padding: 3px;">
                                    {{RECEIP_ATTACH}}
                                </td>
                            </tr>
                            <tr>
                                <td class="font-15" style="width: 30%;  text-align: right; padding: 3px 10px;">
                                    Ghi Chú <span style="padding: 0px 10px;"> : </span>
                                </td>
                                <td class="font-15" style="width: 100%; padding: 3px;">
                                    {{RECEIPT_NOTE}}
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
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
            
            <div style="margin-top:30px;" class="font-15">
                <div style="margin-left:65%; font-style: italic;">
                     Ngày .........Tháng .........Năm ..........   
                </div>  
            </div>

            <div class="signature" style="margin-top:30px;">
                
                <div style="float:left; width:25%; text-align:center">
                    <p class="bold"> Phụ trách  </p>
                    <br> <br> <br><br>
                </div>

                <div style="float:left; width:25%; text-align:center">
                    <p class="bold"> Phụ trách  </p>
                    <br> <br> <br><br>
                </div>
                
                <div style="float:left; width:25%; text-align:center">
                    <p class="bold"> Phụ trách  </p>
                    <br> <br> <br><br>
                </div>
                
                <div style="float:left; width:25%; text-align:center">
                    <p class="bold"> Phụ trách  </p>
                    <br> <br> <br><br>
                </div>
                
                <div style="clear:both"></div>

                
            </div>
        </div>
    </body>
</html>
`;