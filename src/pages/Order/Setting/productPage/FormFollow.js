

// MODEL 
import Model from '../../../../model/model' ; 

//import liraries
import React, { Component } from 'react';
import {   Input, FormGroup, Label, Table } from 'reactstrap' ; 

// create a component
class FormFollow extends Component {

    constructor(props){
        super(props);

        this.state={
            rows:[],
            data:{},
            err_msg:'Vui lòng chọn Sản phẩm phần mềm || Sản phẩm phụ để đưa vào liên kết sản phẩm chính'
        }

        this._onChange = this._onChange.bind(this);
    }

    _call(action,data){
        if(action){
            this.model.putCustom(action,data,(res)=>{
            
                if(res.name==='ok' || res.name==='success'){
                    
                    this.setState({
                        data:res.data
                    })
                }
    
            })
        }
    }
    _follow(code){
        const postData = {
            id:this.state.data.id, // ID của product phần mềm 
            code:code   // code của product SP chính
        }

        this._call('follow',postData);

        
    }

    _unfollow(code){
        const postData = {
            id:this.state.data.id, // ID của product phần mềm 
            code:code   // code của product SP chính
        }
        this._call('unfollow',postData);
    }

    _onChange(e){
        const key = e.target.value;
        
        this.model.set('paginate',{
            key:key
        });
        this.load();
        
    }

    load(){
        this.model.get((res)=>{
            
            if(res.name==='success'){
                this.setState({
                    rows:res.rows
                })
            }
        });
    }

    componentWillReceiveProps(newProps){
        
        // LOAD DATA 
        if(JSON.stringify(newProps.data)!='{}'){
            this.load();
        }

        
        this.setState({
            data:newProps.data
        });
        
        
    }

    componentDidMount(){
        this.model = new Model('products');
        this.model.set('paginate',{
            type:'MAIN',
            max:'all'
        });
    }

    BtnSelect(item){
        return(
            <i onClick={ ()=>{ this._follow(item.code) } } style={{fontSize:20,cursor:'pointer'}} className="fa fa-square"></i>
        );
    }

    BtnRemove(item){
        return(
            <i onClick={ ()=>{ this._unfollow(item.code) } } style={{fontSize:20,cursor:'pointer'}} className="fa fa-check-square"></i>
        );
    }

    render() {

        if(JSON.stringify(this.state.data)!='{}'){
            
            if(this.state.data.type === 'SOFTWARE' || this.state.data.type ==='SUB'){
                return (
                    <div>
                        <FormGroup>
                            <Label> { this.state.data.name } </Label>
                            <Input type="text" onChange={this._onChange} placeholder="Tìm kiếm" />
                        </FormGroup>
                        <Table className="table vk-table" >
                            <thead style={{ border:0, background:'#222D32', color:'#fff' }} >
                                <tr>
                                    <th style={{ width:'85%' }}> Sản phẩm chính </th>
                                    <th style={{ width:'15%' }}>  </th>
                                </tr>
                            </thead>
                            <tbody style={{height:420}}>
                                {
                                    this.state.rows.map((item)=>{
                                        
                                        const follow_list = this.state.data.follow_list || '';
                                        const Btn = follow_list.indexOf(item.code) >-1 ?  this.BtnRemove(item)  : this.BtnSelect(item) ; 
    
                                        return(
                                            <tr key={item.id}>
                                                <td style={{width:'90%'}}> { item.name } </td>
                                                <td className="text-center" style={{width:'10%'}}> { Btn } </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
        
                        </Table>
                    </div>
                );
            }else{
                return (
                    <div style={{border:'1px solid #18A689', padding:10}} className="text-green"> 
                        <i className="fa fa-exclamation-triangle mr-5"></i>  
                        { this.state.err_msg }
                    </div>
                )
            
            }
            
        }else{
            return (
                <div style={{border:'1px solid #18A689', padding:10}} className="text-green"> 
                        <i className="fa fa-exclamation-triangle mr-5"></i>  
                        { this.state.err_msg }
                </div>
            )
        }
       
    }
}

//make this component available to the app
export default FormFollow;
