
import { PRODUCT_TYPE } from '../../../config/product.conf' ; 

import Model from '../../../model/model' ; 


import React,{ Component} from 'react';
import { FormGroup, Label, Input, Table } from 'reactstrap' ; 

class FormAddOn extends Component {

    constructor(props){
        super(props);

        this.state = {
            
            type:props.type || 'none-root',
            rows:[],
            main_code:'',
            err_msg:'Vui lòng chọn sản phẩm chính '
        }

    }

    _Require(){
       return (
            <div style={{border:'1px solid #18A689', padding:10}} className="text-green"> 
                <i className="fa fa-exclamation-triangle mr-5"></i>  
                { this.state.err_msg }
            </div>
       )  
    }

    _load(){
        this.model.get((res)=>{

            if(res.name==='success'){
                this.setState({
                    rows:res.rows
                })
            }
        });
    }

    _addCart(json){
        
        this.props.onSelected(json);

    }


    componentWillReceiveProps(newProps){
        
        if(newProps.main_code!==''){
            // load here 
            
            let paginate = {
                type:newProps.type,
                follow_list:newProps.main_code,
                max:'all'
            };
            if(newProps.type==='root-service'){ delete paginate.follow_list }
            
            this.model.set('paginate', paginate );
        
            
            this._load();

        }

        this.setState({
            main_code:newProps.main_code
        })
    }
    componentDidMount(){
        this.model = new Model('products');

        
  
    }
    render() {

        if(this.state.main_code!==''){
            return (
                <div>
                    <FormGroup>
                        <Label className="text-uppercase text-green"> Thêm { PRODUCT_TYPE[this.state.type] +' cho : '+this.state.main_code } </Label>
                        <Input type="text" onChange={this._onChange} placeholder="Tìm kiếm" />
                    </FormGroup>
                    <Table className="table vk-table" >
                        <thead>
                            <tr>
                                <th style={{width:'20%'}}> Code </th>
                                <th style={{ width:'65%' }}> { PRODUCT_TYPE[this.state.type] } </th>
                                <th style={{ width:'15%' }}>  </th>
                            </tr>
                        </thead>
                        <tbody style={{height:420}}>
                            {
                                this.state.rows.map((item)=>{
                                    
                                    
                                    return(
                                        <tr key={item.id}>
                                            <td style={{width:'20%'}}> { item.code } </td>
                                            <td style={{width:'65%'}}> { item.name } </td>
                                            <td className="text-center" style={{width:'15%'}}>
                                                <i onClick={ ()=>{ this._addCart(item);  } } style={{fontSize:20, cursor:'pointer'}} className="fa fa-plus-circle"></i>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
    
                    </Table>
                </div>
                
            );
        }else{ return this._Require() }
        
    }
}

export default FormAddOn ;
