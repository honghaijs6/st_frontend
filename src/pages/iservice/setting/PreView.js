import React, { Component } from 'react';
import ViewModal from '../../../components/ViewModal';

class Preview extends Component {

    state = {
        companyInfo:{}
    }
    componentWillReceiveProps(newProp){
        if(JSON.stringify(newProp.companyInfo)!=='{}'){
            
            this.setState({
                companyInfo:newProp.companyInfo
            });
        }
    }
    formatHtml(HTML){

        if(JSON.stringify(this.state.companyInfo)!=='{}'){
            
            HTML = HTML.replace(/{{COMPANY_LOGO}}/g,this.state.companyInfo['logo']);
            HTML = HTML.replace(/{{COMPANY_NAME}}/g,this.state.companyInfo['name']);
            HTML = HTML.replace(/{{COMPANY_ADDRESS}}/g,this.state.companyInfo['address']);
            HTML = HTML.replace(/{{COMPANY_TAXNO}}/g,this.state.companyInfo['tax_no']);
            HTML = HTML.replace(/{{COMPANY_PHONE}}/g,this.state.companyInfo['phone']);
            HTML = HTML.replace(/{{COMPANY_WEBSITE}}/g,this.state.companyInfo['website']);
            HTML = HTML.replace(/{{COMPANY_EMAIL}}/g,this.state.companyInfo['email']);
            
        }

        return HTML;
    }
    render() {

        const HTML = this.formatHtml(this.props.temp); 

        return (
            <ViewModal {...this.props}>
                <div style={{padding:20}}>
                    <div
                        dangerouslySetInnerHTML={{__html:HTML}}
                    />
                </div>
            </ViewModal>
        );
    }
}

export default Preview;