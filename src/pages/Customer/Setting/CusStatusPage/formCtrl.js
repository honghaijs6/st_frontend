

import { detectForm } from '../../../../hook/before';
import error from '../../../../hook/after/error';

class formController {

    constructor(model,dispatcher=null){
      this.active = false ; /* FOR OPEN MODAL */

      this.state = {
        typeAction:'',
        onAction:'',
        status:''
      }

      this.model = model ;
      this.dispatcher = dispatcher; 

    }

    _stateDataTemp(){
      return {
        code:'',
        name:'',
        decription:'', 
        color_code:'rgba(30,49,121,1)'
      }
    }

    onSubmit(){

      const typeAction = this.state.typeAction; /* PUT - POST */

      /* HOOKED detectForm before save data*/
      // -->
      const fields = [
        'code','name'
      ];

      if(detectForm(fields,this.data)===''){

          this.model.axios(typeAction,this.data,(res)=>{
            // -->
            this._whereStateChange({
              onAction:'onSubmit',
              status:res.name
            });

              
            window.setTimeout(()=>{
              res.name === 'success' ? this.toggle() : error(this.model.model) ;  
            },1000)



          })
      }

    }

    onChange(name, value){
      Object.assign(this.data,{ [name]:value});
      //this.data[name] = e.target.value;
      // --> initial HOW -> WHERE
      this.processForm(name,value);

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

      switch(newState){
        case 'onSubmit' :
          this.toggle() ; 
        break ;

        default:

          Object.assign(this.state,newState);
          if(this.dispatcher!==null){
            this.dispatcher({
              type:'STATE-'+this.model.model,
              state:this.state
            })
          }

        break ;
      }
      
    }

    


}

export default formController;
