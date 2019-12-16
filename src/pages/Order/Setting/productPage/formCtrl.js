
import { detectForm } from '../../../../hook/before';
import error from '../../../../hook/after/error' ; 


class formController {

    constructor(model,dispatcher=null){
      this.active = false ; /* FOR OPEN MODAL */

      this.state = {
        typeAction:'',
        onAction:'',
        status:''
      }

      this.data = {};
      this.model = model ;
      this.dispatcher = dispatcher || null ; 

      

    }

    _stateDataTemp(){
      return {
        code:'',
        name:'',
        is_serial:0,
        categories_id:0,
        supplier_codes:'',
        price_1:0,
        price_2:0,
        price_3:0,
        price_4:0,
        unit:0,
        type:'root',
        images:'',
        content:''
      }
    }

    onSubmit(){

      const typeAction = this.state.typeAction; /* PUT - POST */
      /* HOOKED detectForm before save data*/
      // -->
      const fields = [
        'code','name','categories_id','supplier_codes','unit'
      ];

      
      
      if(detectForm(fields,this.data)===''){

          this.model.axios(typeAction,this.data,(res)=>{
            
            this._whereStateChange({
              onAction:'onSubmit',
              status:res.name
            });

            // on success 
            //res.name === 'success' ? this.toggle() : error(this.model.model) ;  
            
          })
      }

    }

    onChange(name, value){
      //Object.assign(this.data,{ [name]:e.target.value});
      Object.assign(this.data,{ [name]:value});
      
      if(name!=='content'){
        this.processForm(name,value);
      }

    }

    /* START : HOW */
    open(typeAction, info){

      //const {temp} = info || FORM_TEMP ;
      this.data = info || this._stateDataTemp() ;
      this.active = true ;

      this._whereStateChange({
        typeAction:typeAction,   
        onAction:'open',
        status:'opened'
      });

    }

    processForm(name,e){
       //-->
       this._whereStateChange({
         onAction:'processForm'
       });

    }


    toggle(){

      this.active = !this.active;
      // -->
      this._whereStateChange({
        onAction:'toggle_modal',
        status:'closed',
      });
      
    }

    /* START : WHERE */
    _whereStateChange(newState={}){
      
      // passing form state to index 
      Object.assign(this.state,newState);
      if(this.dispatcher!==null){
          this.dispatcher({
              type:'STATE-'+this.model.model,
              state:this.state
          })
      }

      window.setTimeout(()=>{
        newState.status === 'success' ? this.toggle() : error(this.model.model) ;
      },1000)
          

    }


}

export default formController;
