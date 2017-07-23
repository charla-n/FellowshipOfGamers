declare var require;

import * as React from "react";
import { Overlay } from 'react-overlays';
import Tooltip from '../components/Tooltip';

export interface LabelProps {
    label: any;
    hasHelp: any;
    help: any;
    id: any;
}

export interface LabelState {
    showHelp: boolean;
}

const helpIconStyle = {
    marginLeft: "5px"
};

export class Label extends React.Component<LabelProps, LabelState> {

    labelRef: any;

    constructor() {
        super();

        this.state = {
            showHelp: false,
        };

        this.toggleHelp = this.toggleHelp.bind(this);
    }

    toggleHelp() {
        this.setState({ showHelp: !this.state.showHelp });
    }

    render() {
        let labelContent;

        if (!this.props.hasHelp) {
            labelContent = (
                <span>{this.props.label}</span>
            );
        } else {
            labelContent = (
                <div>
                    <Overlay
                        show={this.state.showHelp}
                        target={this.labelRef}
                        placement={'top'}>
                        <Tooltip>
                            <div dangerouslySetInnerHTML={{ __html: this.props.help }}>
                            </div>
                        </Tooltip>
                    </Overlay>
                    {this.props.label}
                    <a href="javascript:void(0);"
                        ref={(control) => this.labelRef = control}
                        style={helpIconStyle}
                        onClick={this.toggleHelp}
                     >
                        <i className={"fa-hover fa fa-question-circle"}></i>
                    </a>
                </div>
            );
        }

        return (
            <label className={"control-label"} htmlFor={this.props.id}>{labelContent}</label>
        )
    }
}

export default Label;