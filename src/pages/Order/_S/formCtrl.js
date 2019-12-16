

import { detectForm } from '../../../hook/before';
import error from '../../../hook/after/error';


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
        name:'',
        description:''
      }
    }

    onSubmit(){

      const typeAction = this.state.typeAction; /* PUT - POST */

      /* HOOKED detectForm before save data*/
      // -->
      const fields = [
        'name'
      ];

      if(detectForm(fields,this.data)===''){

          
          this.model.axios(typeAction,this.data,(res)=>{
            // -->
            this._whereStateChange({
              onAction:'onSubmit',
              status:res.name
            });

          })
      }

    }

    onChange(name, e){
      Object.assign(this.data,{ [name]:e.target.value});

      //this.data[name] = e.target.value;
      // --> initial HOW -> WHERE
      this.processForm(name,e);

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
        onAction:'toggle_modal'
      })


    }

    /* START : WHERE */
    _whereStateChange(newState={}){

      Object.assign(this.state,newState);
      if(this.dispatcher!==null){
        this.dispatcher({
          type:'STATE-'+this.model.model,
          state:this.state
        })
      }
      
      window.setTimeout(()=>{
        newState.status === 'success' ? this.toggle() : error(this.model.model)
      },1000)


    }

    


}

export default formController;
