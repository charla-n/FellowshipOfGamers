declare var require;

import * as React from "react";
import * as lodash from 'lodash';
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import Modal from './Modal';

export interface MarkupHelpModalProps {
    text: any;
    close: string;
    closeClick: any;
    show: boolean;
}

export class MarkupHelpModal extends React.Component<MarkupHelpModalProps, {}> {

    constructor() {
        super();
    }

    render() {

        let content = (
            <div>
                <div dangerouslySetInnerHTML={{ __html: this.props.text }}>
                </div>
                <br/>
                <div className={'pull-right'}>
                    <button onClick={this.props.closeClick} className={'btn btn-default'}>{this.props.close}</button>
                </div>
            </div>    
        );

        return (
            <div>
                <Modal content={content} show={this.props.show} />
            </div>
        );
    }
}

export default MarkupHelpModal;