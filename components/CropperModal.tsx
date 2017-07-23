declare var require;

import * as React from "react";
import * as lodash from 'lodash';
import * as Update from 'immutability-helper';
import * as constants from "../utils/Constants";
import Common from '../utils/Common';
import Separator from "../components/Separator";
import Modal from './Modal';
var Cropper = require('cropperjs');

export interface CropperModalProps {
    img: any;
    Resource: any;
    okClick: any;
    cancelClick: any;
    show: boolean;
}

export class CropperModal extends React.Component<CropperModalProps, {}> {

    img: any;
    Cropper: any;

    constructor() {
        super();

        this.onCropClick = this.onCropClick.bind(this);
        this.onImageLoad = this.onImageLoad.bind(this);
    }

    componentDidMount() {
    }

    shouldComponentUpdate(nextprops: CropperModalProps) {
        return !lodash.isEqual(nextprops, this.props);
    }

    componentDidUpdate(prevprops: CropperModalProps, prevstate) {
    }

    onCropClick() {

        let ret = this.Cropper.getCroppedCanvas({
            width: 128,
            height: 128,
        });
        this.props.okClick(ret);
    }

    onImageLoad() {
        if (this.Cropper) {
            this.Cropper.destroy();
        }
        this.Cropper = new Cropper(this.img, {
            aspectRatio: 1,
            minContainerWidth: 300,
            minContainerHeight: 300,
            zoomable: false,
        });
        //debugger;
    }

    render() {

        let cropperContainerStyle = {
            width: "50%",
            margin: "0 auto",
        }

        let content = (
            <div>
                <div>
                    <div style={cropperContainerStyle}>
                        <img ref={(control) => this.img = control}
                            onLoad={this.onImageLoad}
                            className={"cropperModal_img"} id={"cropperModal_img"} src={this.props.img} />
                    </div>
                </div>
                <div className={'pull-right small-margin-top'}>
                    <button type="button" className={"btn btn-default"} id={"closeCropModal"} onClick={this.props.cancelClick}>Close</button>
                    <button type="button" className={"btn btn-primary small-margin-left"} id={"saveCropModal"} onClick={this.onCropClick}>Save</button>
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

export default CropperModal;