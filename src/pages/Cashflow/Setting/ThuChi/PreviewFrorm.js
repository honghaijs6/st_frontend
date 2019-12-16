
import React, { Component } from 'react';
import ViewModal from '../../../../components/ViewModal';

class PreviewForm extends Component {


    state = {
        companyInfo:{}
    }

    componentWillReceiveProps(newProps){
        this.setState({
            companyInfo:newProps.companyInfo
        });
    }

    _formatHTML(HTML){
        
        
        
        return HTML; 
    }  
    render() {


        
        //let HTML = this._formatHTML(this.props[this.props.type]);
        let HTML = this.props.type !== undefined ?  this._formatHTML(this.props[this.props.type]) : '';
                    
        

        return (
            <ViewModal {...this.props}>
                <div 
                    style={{
                        padding:"20px"
                        
                    }}
                    dangerouslySetInnerHTML={{ __html: HTML  }} 
                />
            </ViewModal>
        );
    }
}

export default PreviewForm;