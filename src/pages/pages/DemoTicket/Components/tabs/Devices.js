
import  React from 'react';
import axios from 'axios' ;

import { Table, Row, Col, ButtonGroup, Button } from 'reactstrap';
import { toast } from "react-toastify";

import server from '../../../../../config/server';




class Devices extends React.Component {

  constructor(props) {

    super(props);

    this.state = {

      server: server.base(),
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'',

    }

    this.grid = {
      columnDefs:[
        {headerName: "Serial No", field: "sn",width:200},
        {headerName: "Device Name", field: "DeviceName",width:330},
        {headerName: "Lock count ", field: "LockCount",width:140},
        {headerName: "Register Code	", field: "registrycode",width:200},
        {headerName: "Device Version", field: "FirmVer",width:340}


      ],
      rowData: []
    }


  }

  componentDidMount(){

    const url = server.base()+'/pushapi/deviceServlet?type=1';
    axios.post(url).then((responese)=>{
      const res = responese.data ;
      if(res.desc==='ok'){
        this.grid.rowData = res.data ;

      }
    })

  }



  _openDoor(json){

    const url = server.base()+'/pushapi/createCmd?cmdType=userDefined&sn='+json.sn+'&originalCmd=CONTROL DEVICE 01010103';
    toast.info('Đã mở khoá ');
    axios.post(url).then((responese)=>{
      const res = responese.data ;

      toast.info('Khoá đã đóng : '+json.sn);

      /*if(res.desc==='ok'){
           toast.info('Đã mở khoá : '+json.sn);
      }*/

    })
  }


  render() {
    return (
      <Table  className="table" >

              <thead style={{ border:0, background:'#222D32', color:'#fff' }} >
                <tr>
                  <th style={{width: 30}}>
                      #
                  </th>
                  {
                    this.grid.columnDefs.map((item,index)=>{
                      return(
                        <th key={index} style={{
                          width: item.width
                        }} > { item.headerName } </th>
                      )
                    })
                  }
                  <th style={{width: 180}}>
                    Operation
                  </th>


                </tr>
              </thead>

              <tbody style={{height: '74vh'}}>
                {
                  this.grid.rowData.map((item,index)=>{

                    let stt = index + 1 ;
                    return(
                      <tr key={index}>
                        <td style={{width: 30}}>
                          { stt }
                        </td>
                        {
                          this.grid.columnDefs.map((item2,index2)=>{
                              return(
                                <td key={index2} style={{
                                  width: item2.width+'px'
                                }}> { item[item2['field']] }

                                </td>
                              )
                          })
                        }
                        <td style={{width: 140}}>
                          <ButtonGroup>
                              <Button onClick={ ()=>{ this._openDoor(item) } } className="btn btn-sm btn-success"><i className="fa fa-unlock mr-5" /> Remote Open </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>


      </Table>
    );
  }
}



export default Devices;
