declare var require;

import * as React from "react";
import * as lodash from 'lodash';
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import Modal from './Modal';
import renderTextArea from './TextArea';
var ReduxForm = require('redux-form');

export interface GroupReportModalProps {
    text: string;
    send: string;
    cancel: string;
    sendClick: any;
    cancelClick: any;
    show: boolean;
}

export class GroupReportModal extends React.Component<GroupReportModalProps, {}> {

    constructor() {
        super();
    }

    render() {

        let content = (
            <div>
                <div className={"form-group"}>
                    <ReduxForm.Field name="description"
                        id={"description"}
                        label={this.props.text}
                        component={renderTextArea}
                    />
                </div>
                <br/>
                <div className={'pull-right'}>
                    <button onClick={this.props.cancelClick} className={'btn btn-default'}>{this.props.cancel}</button>
                    <button onClick={this.props.sendClick} className={'btn btn-primary small-margin-left'}>{this.props.send}</button>
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

export default GroupReportModal;