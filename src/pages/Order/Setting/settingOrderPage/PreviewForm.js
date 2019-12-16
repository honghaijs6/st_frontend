
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
        
        

        HTML = HTML.replace(/{{COMPANY_LOGO}}/g,this.state.companyInfo['logo']);
        HTML = HTML.replace(/{{COMPANY_NAME}}/g,this.state.companyInfo['name']);
        HTML = HTML.replace(/{{COMPANY_ADDRESS}}/g,this.state.companyInfo['address']);
        HTML = HTML.replace(/{{COMPANY_TAXNO}}/g,this.state.companyInfo['tax_no']);
        HTML = HTML.replace(/{{COMPANY_PHONE}}/g,this.state.companyInfo['phone']);
        HTML = HTML.replace(/{{COMPANY_WEBSITE}}/g,this.state.companyInfo['website']);
        HTML = HTML.replace(/{{COMPANY_EMAIL}}/g,this.state.companyInfo['email']);
        


        return HTML; 
    }
    render() {

        
        let HTML = this._formatHTML(this.props[this.props.type]);
        
        

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