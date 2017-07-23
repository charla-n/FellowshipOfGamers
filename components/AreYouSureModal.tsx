declare var require;

import * as React from "react";
import * as lodash from 'lodash';
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import Modal from './Modal';

export interface AreYouSureProps {
    text: string;
    yes: string;
    no: string;
    yesClick: any;
    noClick: any;
    show: boolean;
}

export class AreYouSureModal extends React.Component<AreYouSureProps, {}> {

    constructor() {
        super();
    }

    render() {

        let content = (
            <div>
                {this.props.text}
                <br/>
                <div className={'pull-right'}>
                    <button onClick={this.props.noClick} className={'btn btn-default'}>{this.props.no}</button>
                    <button onClick={this.props.yesClick} className={'btn btn-danger small-margin-left'}>{this.props.yes}</button>
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

export default AreYouSureModal;