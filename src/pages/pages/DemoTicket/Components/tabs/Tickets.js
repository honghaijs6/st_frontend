

import Model from '../../../../../model/model';
import zkpush from '../../../../../model/zkpush';
import socket from '../../../../../model/socket';


import moment from 'moment';


import React from 'react';
import { connect } from 'react-redux';

import { ButtonGroup, Button } from 'reactstrap';

import { BenGrid } from '../../../../../components/BenGrid2'
import BenMessage from '../../../../../components/BenMessage';


import MyForm from './FormTicket';
import FormPrint from './FormPrintTicket';

import ButtonImportCode2Device from '../../../../../components/ButtonImportCode2Device' ;



const MODE = 'coupons' ;







function calculateDay(start,end){

  start = moment(start,"YYYY-MM-DD");
  end = moment(end,"YYYY-MM-DD");

  return parseInt(moment.duration(end.diff(start)).asDays());

}



class Ticket extends React.Component {


  _curInfo = {} ;


  constructor(props){
        super(props);

        this.state = {
            typeAction:'',
            onAction:'',
            status:'',
            isOpen:false,
            isOpenFormPrint:false,

            devices : [],
            listSelectedDevice:[],

            logs:[]
        }

        this.grid = {
            colums:[
              {headerName: "Mã", field: "code",width:180,
                cellRenderer(params){
                    return `
                        <span class="badge bg-green font-12"> <i class="fa fa-tags"></i> ${params.value} <span>
                    `
                }
              },
              {
                headerName:"Size", field:"type", width:180,
                cellRenderer(params){

                  const types = {
                    nguoilon:'<span class="badge bg-blue"> Người lớn </span>',
                    treem:'<span class="badge bg-red"> Trẻ em </span>'
                  } ;
                  return `
                      ${types[params.value]}
                  `


                }
              },
              {
                headerName:"Loại", field:"card_type", width:180,
                cellRenderer(params){

                  const cardTypes = ['QRCode','Mifare'];
                  return `
                      ${cardTypes[params.value]}
                  `


                }
              },
              {headerName: "ST Xu",field: "value",width:140,
                cellRenderer(params){
                    return `
                      ${params.value}
                    `
                }
              },




              {headerName: "Số lần cho phép",field: "number_offer",width:180},
              {headerName: "Đã sử dụng",field: "used_count",width:180},

              {headerName: "Ngày tạo ", field: "date_created", width:180,
                cellRenderer(params){
                  return moment(params.value).format('YYYY-MM-DD')

                }
              }
            ],
            rowData: []
        }

          this._setup();

  }

  _setup(){
    this.model =  new Model(MODE,this.props.dispatch);
    this.zkpush = new zkpush() ;


  }


  indexDevice = 0 ;

  // WILL ADD USER TO ALL DEVICES
  _addUserToDevice(data){

      if(this.state.devices.length > this.indexDevice ){

        const curDevice = this.state.devices[this.indexDevice] ;
        const sn = curDevice.sn ;

        const cmd = "DATA UPDATE user cardno="+data.code+"	pin="+data.code+"	password=	starttime=0	endtime=0	name=ticket	superauthorize=1	disable=0"

        this.zkpush.createCmd(cmd,sn).then((res)=>{

          this.indexDevice += 1 ;

          // PUSH ACCESS LEVEL
          const cmd2 = "DATA UPDATE userauthorize pin="+data.code+"	authorizetimezoneid=1	authorizedoorid=15" ;
          this.zkpush.createCmd(cmd2,sn).then((res2)=>{

            this._addUserToDevice(data) ;

          }) ;




        })
      }else{
        this.indexDevice = 0;
      }
  }

  //WILL REMOVE USER TO ALL DEVICE
  _deleteUserToDevice(code){

    if(this.state.devices.length > this.indexDevice ){

        const curDevice = this.state.devices[this.indexDevice] ;
        const sn = curDevice.sn ;

        const cmd = "DATA DELETE user pin="+code

        this.zkpush.createCmd(cmd,sn).then((res)=>{

          this.indexDevice += 1 ;
          this._deleteUserToDevice(code) ;

        });

    }else{ this.indexDevice = 0 }

  }


  // EVENT
  _onSubmit(data){

    this.model.axios(this.state.typeAction,data,(res)=>{


        if(res.name==='success'){



            this._addUserToDevice(res.data) ;

            this.setState({
                status:res.name,
                isOpen:false,
            }) ;


        }else{

            BenMessage({
                message:res.message
            });

        }
    })

  }

  _onCellSelected = (data)=>{

    this._curInfo = data === undefined ? {} : data ;

  }

  _doOpenForm = (type)=>{

      this.setState({
          typeAction:type,
          isOpen:true
      });
  }

  _doOpenFormPrint = ()=>{
      if(JSON.stringify(this._curInfo) !=='{}'){
          this.setState({
              isOpenFormPrint:true
          });
      }else{
          BenMessage({
              message:'You have to select record first '
          })
      }
  }

  componentWillReceiveProps(newProps){

      this.grid.rowData = newProps[MODE]['list'] || [] ;
      // CONNECT REDUX STATE
      this._whereStateChange(newProps[MODE]['state']);


  }

  componentDidMount(){

      this.model.load();

      zkpush.loadDevice().then((list)=>{

        this.setState({
          devices:list
        })
      });

      //this._iniSocket();


  }

  _iniSocket(){


    socket.client.service('coupons').on('logs',(res)=>{
      //const data = res.data;
      const { data } = res ;
      if(data.length > 0 ){


        this.setState((prevState)=>{

          return {
            logs : [...prevState,...data]
          }
        });


      }


    });
  }

  _whereStateChange(newState){
      this.setState(Object.assign(this.state,newState));
  }


  _onGridDeleted(list){
    const item = list[this.indexDevice] ;

    this._deleteUserToDevice(item.code) ;
  }

  _onCompleteUpload(){

    this.model.load() ;

  }
  render() {
    return (
      <div className="ubuntu-app" style={{ border:0, marginLeft:-10, marginTop:-10}}>
          <main>


              <MyForm
                  typeAction={ this.state.typeAction }
                  isOpen={this.state.isOpen}
                  onToggle={(isOpen)=>{ this.setState({isOpen:isOpen}) }}
                  width="40%"
                  data={this._curInfo}
                  onSubmit={(state)=>{ this._onSubmit(state)  }}
                  devices={ this.state.devices }
              />
              <FormPrint
                  isOpen={ this.state.isOpenFormPrint }
                  onToggle={(isOpen)=>{ this.setState({isOpenFormPrint:isOpen}) }}
                  data={this._curInfo}
                  name="Print QR Code"

              />

            <BenGrid

                gridID="id"

                rowSelection="single"


                onBtnAdd={ ()=>{  this._doOpenForm('post') } }
                onBtnEdit={()=>{ this._doOpenForm('put') }}
                onCellSelected={ this._onCellSelected }

                isRightTool={ true }
                isLeftTool={ false }
                formStatus={ this.state.status }

                onDeleted={(list)=>{  this._onGridDeleted(list) }}

                customButton={
                    <ButtonGroup style={{marginRight:10}}>


                        <Button className="btn-normal">
                           Reset Thẻ
                        </Button>

                        <ButtonImportCode2Device
                            title="Import File Excel "
                            strModel={MODE}
                            columns={ ['code','type','card_type','device_serial'] }
                            onComplete={()=>{ this._onCompleteUpload() }}
                        />

                        <Button
                            className="btn-normal"
                            onClick={ ()=>{ this._doOpenForm('post') } }  >
                            <i className="fa fa-plus mr-5"></i>  Tạo vé
                        </Button>
                        <Button
                            className="btn-normal"
                            onClick={ this._doOpenFormPrint }
                        >
                            <i className="fa fa-print mr-5"></i>
                            In QR Code
                        </Button>

                    </ButtonGroup>

                }


                height="67vh"

                nextColums={ this.grid.colums }
                rowData={this.grid.rowData}
                model={ this.model }

            />
          </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
      [MODE]: state[MODE]
  }
}

export default connect(mapStateToProps)(Ticket);
