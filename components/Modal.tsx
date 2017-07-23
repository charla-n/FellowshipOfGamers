declare var require;

import * as React from "react";
import * as lodash from 'lodash';
import * as constants from "../utils/Constants";
import { Modal } from 'react-overlays';

export interface FSGModalProps {
    content: any;
    show: boolean;
}

export interface FSGModalState {
}

export class FSGModal extends React.Component<FSGModalProps, FSGModalState> {

    constructor() {
        super();

        this.state = {
            show: false,
        };
    }

    render() {
        return (
            <Modal
                className={'fsg-modal-normal fsg-modal'}
                backdropClassName={'fsg-modal-backdrop'}
                aria-labelledby='modal-label'
                show={this.props.show}
                onHide={() => { }}
            >
                <div className={'fsg-dialog-normal'}>
                    {this.props.content}
                </div>
            </Modal>
        );
    }
}

export default FSGModal;