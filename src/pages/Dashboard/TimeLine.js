import React, { Component } from 'react';

import { Label, Input } from 'reactstrap';

function LineHeader(props){
   return(
     <li className="time-badge">
       <div className="btn-group">
           <button type="button" className="btn btn-ubuntu btn-order-status-holder btn-flat">
             <i className="fa fa-newspaper-o margin-r-5"></i> Tất cả
           </button>
           <button type="button" className="btn btn-ubuntu btn-flat dropdown-toggle" data-toggle="dropdown">
             <span className="caret"></span>
             <span className="sr-only">Toggle Dropdown</span>
           </button>
       </div>
       <div className="pull-right" style={{marginRight: 12}}>
         sdasd
       </div>

     </li>
   )
}

function FeedItem(props){

  return(
    <li className="record-item" id="rec-5970">
      <i className="fa fa-truck bg-green"></i>
      <div className="timeline-item card">
          { props.children }
      </div>
    </li>
  );
}

function FeedTable(props){

  return(
    <table className="table" style={{border:'1px solid #rgba(0,0,0,0.1)'}}>
      <thead style={{
          background:'#A6E3C8',
          color:'rgba(0,0,0,0.7)'
        }}>
        <tr>
          <th> Model </th>
          <th> Contact </th>
          <th> Phone</th>
          <th> Price? </th>
          <th> User </th>
          <th> Total  </th>
        </tr>
      </thead>
      <tbody style={{border:'0px'}}>
        <tr className="record-item" id="row-10" style={{background:'#A6E3C8'}}>
            <td>
               <img style={{height: 60}} src="" />
            </td>
        <td>
          <input type="text" style={{backgroundColor: 'transparent', borderWidth: 0}} defaultValue="Mr Trung" />
          </td>
          <td>
            <input type="text" style={{backgroundColor: 'transparent', borderWidth: 0}} defaultValue="0909091888" />
            </td>
            <td>
              <i title="Giá chuẩn" data-toggle="tooltip" className="fa fa-check"></i>
            </td>
            <td>
              <a className="badge bg-blue">
                <i className="fa fa-user margin-r-5"></i> HCM-OFVK18014
              </a>
            </td>
            <td> 6 </td>
          </tr>
      </tbody>
    </table>

  )
}

function FeedTools(props){

  return(
    <div style={{ paddingTop:'15px', paddingBottom:'10px' }} className="btn-group text-center">
      <button title="Sửa báo giá" type="button" className="btn btn-ubuntu btn-sm btn-timeline-edit">
        <i className="fa fa-pencil"></i>
      </button>
      <button type="button" title="In hoá đơn bán hàng" data-toggle="tooltip" data-id="5970" className="btn btn-ubuntu btn-sm btn-table-print">
        <i className="fa fa-print"></i>
      </button>
      <button title="Xuất File PDF báo giá" data-toggle="tooltip" data-id="5970" className="btn btn-ubuntu btn-sm btn-print-pdf">
        <i className="fa fa-file-pdf-o"></i>
      </button>
      <button title="Xuất PDF Hợp đồng theo báo giá" data-toggle="tooltip" data-id="5970" className="btn btn-ubuntu btn-sm btn-print-contract">
        <i className="fa fa-contao"></i>
      </button>
      <button type="button" title="Xem nhanh" data-toggle="tooltip" data-id="5970" className="btn btn-ubuntu btn-sm btn-table-view">
        <i className="fa fa-th-large"></i>
      </button>
      <button data-id="5970" className="btn btn-ubuntu btn-ubuntu-ok btn-sm btn-setup-installing">
        <i className="fa fa-truck margin-r-5"></i> Xác nhận hoàn tất
      </button>

    </div>
  )
}


export default class TimeLine extends Component{

  render(){

    return(
      <ul className="timeline">

          <LineHeader />

          <FeedItem>

            <div className="time strong">
              <a href="#!">
                <i className="fa fa-user mr-5"></i> HCM-OFVK18011
              </a> đã cập nhật
              <i className="fa fa-clock-o mr-5 ml-5"></i>
              <span id="ago-5970">vừa xong trước</span>
            </div>

            <div className="timeline-body card-body">
              <div className="cusInfo">
                  <div className="box-body">

                    <div className="ordCusInfo">
                      <Label> <i className="fa fa-user margin-r-5"></i> CÔNG TY TNHH THƯƠNG MẠI VÀ DỊCH VỤ THIẾT BỊ VĂN PHÒNG NHẤT PHÁT PHÁT </Label>
                      <p>
                        <small className="badge bg-blue text-uppercase mr-5 pa-5">
                          <i className="fa fa-tag margin-r-5"></i> vk-201904-038
                        </small>
                        <small className="badge bg-blue text-uppercase mr-5 pa-5">
                          <i className="fa fa-tag margin-r-5"></i> inv-201904-014
                        </small>
                        <small  data-toggle="tooltip" className="badge pa-5 mr-5 bg-blue text-uppercase">
                              <i className="fa fa-tag margin-r-5"></i>pt001
                            </small>
                            <small className="badge bg-red mr-5 pa-5">
                              <i className="fa fa-clock-o mr-5"></i> còn 1 ngày
                        </small>
                      </p>

                      <div style={{lineHeight: '24px', fontFamily: 'Roboto', fontSize: 16, marginBottom: 15}}>
                        <span> <i className="fa fa-dollar margin-r-5"></i> Tổng tiền đơn hàng (+VAT:10%): 1,011,241 đ </span> <br></br>
                        <span className="txt-green">
                          <i className="fa fa-dollar margin-r-5"></i> Đã thu : 1,011,241 đ  - Lần 1
                          <small className="ml-10">2019-04-04 14:48:04</small>
                        </span>
                      </div>

                    </div>

                    <FeedTable />

                    <FeedTools />

                  </div>
              </div>
            </div>
          </FeedItem>




      </ul>
    )
  }
}
