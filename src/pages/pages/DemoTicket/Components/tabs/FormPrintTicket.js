import doPrint from '../../../../../hook/ultil/doPrint';

import React, { Component } from 'react';
import ViewModal from '../../../../../components/ViewModal';

export default class FormPrint extends Component {


    _formatHtml(data){

        let HTML = ``;
        if(JSON.stringify(data) !=='{}'){

            HTML = `<div >
                        <img src="https://chart.apis.google.com/chart?cht=qr&chs=360x360&chl=${ data.code }&chld=H|0" />
                    </div>
            `;

        }

        return HTML ;
    }
    render() {

        const HTML = this._formatHtml(this.props.data);

        return (
            <ViewModal {...this.props}>
                <div className="view-modal-body">

                    <div style={{marginBottom:20}}>
                        <div className="btn-group">

                            <a onClick={()=>{ doPrint(HTML) }} className="btn btn-normal btn-sm"> <i className="fa fa-print"></i></a>


                        </div>

                    </div>
                    <div
                        ref={el => (this.componentRef = el)}
                        style={{
                                paddingBottom:20
                        }}
                            dangerouslySetInnerHTML={{ __html: HTML  }}
                    />
                </div>
            </ViewModal>
        );
    }
}
