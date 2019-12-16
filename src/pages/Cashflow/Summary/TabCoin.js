
import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';


class TabCoin extends Component{

  constructor(props){
    super(props);

  }
  render(){

    return(
      <div style={{padding:'30px'}}>
        <Table>
          <thead style={{ border:'0px !important' }} >
            <tr>
              <th style={{width:'33%'}}> Tài khoản </th>
              <th style={{width:'33%'}}> Thu </th>
              <th style={{width:'33%'}}> Chi </th>

            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Tài khoản chính </td>
              <td>
                 200,000
              </td>
              <td> 200,000 </td>
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

export default TabCoin;
