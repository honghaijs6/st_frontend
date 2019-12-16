
export const MAU_PHIEUCHI = `

<!doctype html>
<html lang='en'>
  <head>
      <meta charset='utf-8'>
      <title>Print Preview</title>
      <meta name='description' content='Print preview'>
      <style type='text/css'>
          @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
          *{
              font-family: 'Roboto', sans-serif;
          }
          .text-uppercase{ text-transform:uppercase}
          
          @media print {
              #printbutton {display:none;}
          }
          .tddetail td {
              border-top: 1px solid;
              border-right: 1px solid;
          }
          .tddetail th {
              border-right: 1px solid;
          }
          .tddetail td:last-child, th:last-child {
              border-right: none;
          }
          .trnobody td {
              border: none;
          }
          .trassign td {
              padding-top: 16px;
          }
          .dotline {
              border-bottom: 1px dashed;
              min-height: 20px;
             margin:5px 0 5px 0;


          }
          .phonediv {
              width: 175px;
          }

          .innerleft {
              float: left
          }
          .font-12{font-size:12px}
      </style>
  </head>
  <body style='background:#fff;'>
    <div style="padding:20px;">

        <div>
          <div style="float:left; width:70%; line-height:22px">
            {{COMPANY_NAME}}<br>
            <span style="font-size:14px">{{COMPANY_ADDRESS}}</span> <br>
            <span style="font-size:14px">SĐT : {{COMPANY_PHONE}} </span>
          </div>
          <div style="float:left;line-height:22px; width:30%">
            <span style="font-size:14px">Ngày : {{CASHFLOW_DATECREATED}}</span> <br>
            <span style="font-size:14px">Hình thức : {{PAYMENT_TYPE}} </span> <br>
            <span style="font-size:14px">Chứng từ : <span class="text-uppercase"> {{CASHFLOW_ATTACK}} </span> </span>
          </div>
          <div style="clear:both"></div>  
        <div>
        

        <table style='width: 100%; margin-top:20px; margin-bottom:20px;'>
            <tbody>
                <tr>
                    <td colspan='2' style='text-align: center'>
                        <h2 style="line-height:18px">
                          PHIẾU CHI <br> 
                          <span class="text-uppercase font-12"> SỐ : {{CASHFLOW_CODE}}</span>      
                        </h2>
                    </td>
                </tr>
                <tr>
                    <td style='width: 100px;padding-right 0'>
                         Đơn vị :
                    </td>
                    <td>
                        <div class='dotline'>{{CASHFLOW_PARTNER}}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                         Địa chỉ :
                    </td>
                    <td><div class='dotline'> {{CASHFLOW_PARTNER_ADDRESS}} </div></td>
                </tr>
                <tr>
                    <td>
                        Lý do nộp :
                    </td>
                    <td><div class='dotline'>{{CASHFLOW_REASON}}</div></td>
                </tr>
                
                <tr>
                    <td>
                        Số tiền :  
                    </td>
                    <td><div class='dotline'>{{CASHFLOW_VALUE}}</div></td>
                </tr>
                <tr>
                    <td>
                        Ghi chú :
                    </td>
                    <td><div class='dotline'>{{CASHFLOW_NOTE}}</div> </td>
                </tr>
            </tbody>
        </table>

        <table width='100%' style='margin-top: 16px'>
            <tr class='trnobody'>
                <td colspan='3'></td>
                <td  style='text-align: center; font-style:italic' colspan='7'>
                    Ngày.......... Tháng.......... Năm..........
                </td>
                <td></td>
            </tr>
            <tr class='trassign'>
                <td colspan='2' width='20%'> Giám đốc <br><br><br><br></td>
                <td colspan='2' width='20%'>Kế toán <br><br><br><br></td>
                <td colspan='2' width='20%'>Người nhận tiền<br><br><br><br></td>
                <td colspan='2' width='20%'>Người lập phiếu<br><br><br><br></td>
                <td colspan='2' wifth='20%'> Thủ quỹ <br><br><br><br></td>
            </tr>
        </table>    
    </div>
  </body>
</html>
`;


export const MAU_PHIEUTHU = `

<!doctype html>
<html lang='en'>
  <head>
      <meta charset='utf-8'>
      <title>Print Preview</title>
      <meta name='description' content='Print preview'>
      <style type='text/css'>
          @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
          *{
              font-family: 'Roboto', sans-serif;
          }
          .text-uppercase{ text-transform:uppercase}
          
          @media print {
              #printbutton {display:none;}
          }
          .tddetail td {
              border-top: 1px solid;
              border-right: 1px solid;
          }
          .tddetail th {
              border-right: 1px solid;
          }
          .tddetail td:last-child, th:last-child {
              border-right: none;
          }
          .trnobody td {
              border: none;
          }
          .trassign td {
              padding-top: 16px;
          }
          .dotline {
              border-bottom: 1px dashed;
              min-height: 20px;
             margin:5px 0 5px 0;


          }
          .phonediv {
              width: 175px;
          }

          .innerleft {
              float: left
          }
          .font-12{font-size:12px}
      </style>
  </head>
  <body style='background:#fff;'>
    <div style="padding:20px;">
        <div>
          <div style="float:left; width:70%; line-height:22px">
            {{COMPANY_NAME}}<br>
            <span style="font-size:14px">{{COMPANY_ADDRESS}}</span> <br>
            <span style="font-size:14px">SĐT : {{COMPANY_PHONE}} </span>
          </div>
          <div style="float:left;line-height:22px; width:30%">
            <span style="font-size:14px">Ngày : {{CASHFLOW_DATECREATED}}</span> <br>
            <span style="font-size:14px">Hình thức : {{PAYMENT_TYPE}} </span> <br>
            <span style="font-size:14px">Chứng từ : <span class="text-uppercase"> {{CASHFLOW_ATTACK}} </span> </span>
          </div>
          <div style="clear:both"></div>  
        <div>

        <table style='width: 100%; margin-top:20px; margin-bottom:20px;'>
            <tbody>
                <tr>
                    <td colspan='2' style='text-align: center'>
                        <h2 style="line-height:18px">
                          PHIẾU THU <br> 
                          <span class="text-uppercase font-12"> SỐ : {{CASHFLOW_CODE}}</span>      
                        </h2>
                    </td>
                </tr>
                <tr>
                    <td style='width: 100px;padding-right 0'>
                         Đơn vị :
                    </td>
                    <td>
                        <div class='dotline'>{{CASHFLOW_PARTNER}}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                         Địa chỉ :
                    </td>
                    <td><div class='dotline'> {{CASHFLOW_PARTNER_ADDRESS}} </div></td>
                </tr>
                <tr>
                    <td>
                        Lý do nộp :
                    </td>
                    <td><div class='dotline'>{{CASHFLOW_REASON}}</div></td>
                </tr>
                
                <tr>
                    <td>
                        Số tiền :  
                    </td>
                    <td><div class='dotline'>{{CASHFLOW_VALUE}}</div></td>
                </tr>
                <tr>
                    <td>
                        Ghi chú :
                    </td>
                    <td><div class='dotline'>{{CASHFLOW_NOTE}}</div> </td>
                </tr>
            </tbody>
        </table>

        <table width='100%' style='margin-top: 16px'>
            <tr class='trnobody'>
                <td colspan='3'></td>
                <td  style='text-align: center; font-style:italic' colspan='7'>
                    Ngày.......... Tháng.......... Năm..........
                </td>
                <td></td>
            </tr>
            <tr class='trassign'>
                <td colspan='2' width='20%'> Giám đốc <br><br><br><br></td>
                <td colspan='2' width='20%'>Kế toán <br><br><br><br></td>
                <td colspan='2' width='20%'>Người nhận tiền<br><br><br><br></td>
                <td colspan='2' width='20%'>Người lập phiếu<br><br><br><br></td>
                <td colspan='2' wifth='20%'> Thủ quỹ <br><br><br><br></td>
            </tr>
        </table>    
    </div>
  </body>
</html>

`