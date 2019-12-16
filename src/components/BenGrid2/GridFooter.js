import React, {Component} from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Row, Col, ButtonGroup, Button, Input } from 'reactstrap';


class GridFooter extends Component{

  constructor(props){

    super(props);


    this.state = {
      pages:0,
      p:0,
    }


    this.model = props.model ;


    this.first = this.first.bind(this);
    this.next = this.next.bind(this);
    this.last = this.last.bind(this);
    this.pre = this.pre.bind(this);


  }


  onChange(e){
    const p = e.target.value ;
    this.model.goto(p,(res)=>{})

  }

  first(){
    this.model.goto(0,(res)=>{})
  }
  last(){

    const p = this.state.pages - 1;
    this.model.goto(p,(res)=>{})

  }

  next(){

    this.model.next((res)=>{});

  }
  pre(){
    this.model.pre((res)=>{});
  }


  render(){

    const { total } =  this.model.db;
    const paginate = this.model.paginate;
    this.state.pages =  Math.ceil(total /  paginate.max);


    let list = [] ;
    for(let a = 0; a < this.state.pages ; a++){

      const stt = a + 1 ;
      list.push(<option value={a} key={a} > { stt } </option>)
    }



    return(
      <div className="ag-footer">
         <div className="pull-left">
            <ButtonGroup>
              <Button size="xs" onClick={ this.first } className="btn-datagrid" > <i className="fa fa-step-backward"></i> </Button>
              <Button size="xs" onClick={ this.pre } className="btn-datagrid" > <i className="fa fa-chevron-left"></i> </Button>
              <Input className="btn-datagrid"  onChange={ (e)=>{ this.onChange(e) } } type="select" style={{
                borderRadius:0,
                borderLeft:0,
                borderRight:0,
                fontWeight:500

              }} value={ paginate.p } >
                { list }
              </Input>
              <Button className="btn-datagrid" onClick={ this.next } size="xs" > <i className="fa fa-chevron-right"></i> </Button>
              <Button size="xs" onClick={ this.last } className="btn-datagrid" > <i className="fa fa-step-forward"></i> </Button>

            </ButtonGroup>
         </div>
         <div className="pull-right" style={{marginTop:10}}>
             
             <span className="info" >
                { paginate.max} dòng / trang
                { ' của '+ total }
             </span>

         </div>

      </div>
    )
  }
}

export default GridFooter;
