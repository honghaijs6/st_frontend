import React, { Component } from 'react';
import { Row, Col  } from 'reactstrap';

class MyHeader extends Component{

  constructor(props){
    super(props);

    this.state = {
      boxs:[
        {
          bgClass:'bg-red',
          name:'Chờ duyệt báo giá',
          num:0,
          icon:'fa-clock-o',
          actDesc:'Duyệt'
        },
        {
          bgClass:'bg-aqua',
          name:'Đã duyệt',
          num:0,
          icon:'fa-shopping-cart',
          actDesc:'Xác nhận mua'
        },
        {
          bgClass:'bg-blue',
          name:'K.H đã xác nhận',
          num:0,
          icon:'fa-cube',
          actDesc:'Lập xuất kho'
        },
        {
          bgClass:'bg-green',
          name:'Đang thi công',
          num:0,
          icon:'fa-truck',
          actDesc:'Xác nhận hoàn tất'
        },
        {
          bgClass:'bg-yellow',
          name:'Đã hoàn tất',
          num:0,
          icon:'fa-dollar',
          actDesc:'Lập phiếu thu'
        },
        {
          bgClass:'bg-purple',
          name:'Kết thúc đơn hàng',
          num:0,
          icon:'fa-check',
          actDesc:'Đã kết thúc'
        }

      ]
    }

  }
  render(){
    return(
      <Row>

        {
          this.state.boxs.map((item,index)=>{
            return(
              <Col md={2} key={index}>
                <div className={ 'small-box '+item.bgClass }>
                  <div className="inner">
                    <h3> { item.num } </h3>
                    <p className="font-16"> { item.name } </p>
                  </div>
                  <a style={{cursor:'pointer'}} onClick={()=>{ alert('press me') }} className="small-box-footer pa-10">
                    <i className={'fa mr-5 '+item.icon}></i> { item.actDesc }
                  </a>
                </div>
              </Col>
            )
          })
        }


      </Row>
    )
  }
}

export default MyHeader
