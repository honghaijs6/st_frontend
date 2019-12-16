
import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';


class TabObject extends Component{

  constructor(props){
    super(props);

  }
  render(){

    return(
      <div style={{padding:'30px'}}>
        <Table>
          <thead style={{ border:'0px !important' }} >
            <tr>
              <th style={{width:'33%'}}> Đối tượng </th>
              <th style={{width:'33%'}}> Thu </th>
              <th style={{width:'33%'}}> Chi </th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Nhân viên </td>
              <td>
                 200,000
              </td>
              <td> 200,000 </td>
            </tr>
            <tr>
              <td> Khách hàng </td>
              <td> 1 </td>
              <td> 2 </td>
            </tr>
            <tr>
              <td> Nhà cung cấp </td>
              <td> 1 </td>
              <td> 2 </td>
            </tr>

          </tbody>

          <tfoot style={{ border:0 }} >
            <tr>
              <th style={{width:'33%'}}> Tổng </th>
              <th style={{width:'33%'}}> 200,000 </th>
              <th style={{width:'33%'}}> 200,000 </th>

            </tr>
          </tfoot>


        </Table>
      </div>

    )
  }
}

export default TabObject;
