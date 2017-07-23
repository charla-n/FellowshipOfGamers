declare var require;

import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
var emojione = require('emojione');
import * as constants from "../utils/Constants";

export interface EmojiPopoverState {
    activeCategory: number;
}

export interface EmojiPopoverProps {
    onEmojiSelected: any;
    popoverClasses: any
}

export class EmojiPopover extends React.Component<EmojiPopoverProps, EmojiPopoverState> {

    common: Common;
    emojiLink: any;

    constructor() {
        super();

        this.state = {
            activeCategory: 0,
        };

        this.common = new Common();

        this.setCategory = this.setCategory.bind(this);
    }

    componentDidMount() {
    }

    setCategory(category) {
        this.setState(Update(this.state, {
            activeCategory: { $set: category }
        }));
    }

    render() {

        let body;

        if (this.state.activeCategory === 0) {
            body = constants.SMILEY_PEOPLE.map((val: string, idx: number) => {
                return (
                    <div className={'single-emoji'} key={`${idx}_${val}`}>
                        <a href="javascript:void(0);"
                            onClick={() => this.props.onEmojiSelected(val)}
                            dangerouslySetInnerHTML={{ __html: emojione.shortnameToImage(val) }}></a>
                    </div>
                );
            });
        } else if (this.state.activeCategory === 1) {
            body = constants.ANIMALS.map((val: string, idx: number) => {
                return (
                    <div className={'single-emoji'} key={`${idx}_${val}`}>
                        <a href="javascript:void(0);"
                            onClick={() => this.props.onEmojiSelected(val)}
                            dangerouslySetInnerHTML={{ __html: emojione.shortnameToImage(val) }}></a>
                    </div>
                );
            });
        } else if (this.state.activeCategory === 2) {
            body = constants.FOOD.map((val: string, idx: number) => {
                return (
                    <div className={'single-emoji'} key={`${idx}_${val}`}>
                        <a href="javascript:void(0);"
                            onClick={() => this.props.onEmojiSelected(val)}
                            dangerouslySetInnerHTML={{ __html: emojione.shortnameToImage(val) }}></a>
                    </div>
                );
            });
        } else if (this.state.activeCategory === 3) {
            body = constants.ACTIVITY.map((val: string, idx: number) => {
                return (
                    <div className={'single-emoji'} key={`${idx}_${val}`}>
                        <a href="javascript:void(0);"
                            onClick={() => this.props.onEmojiSelected(val)}
                            dangerouslySetInnerHTML={{ __html: emojione.shortnameToImage(val) }}></a>
                    </div>
                );
            });
        } else if (this.state.activeCategory === 4) {
            body = constants.TRAVEL_PLACES.map((val: string, idx: number) => {
                return (
                    <div className={'single-emoji'} key={`${idx}_${val}`}>
                        <a href="javascript:void(0);"
                            onClick={() => this.props.onEmojiSelected(val)}
                            dangerouslySetInnerHTML={{ __html: emojione.shortnameToImage(val) }}></a>
                    </div>
                );
            });
        } else if (this.state.activeCategory === 5) {
            body = constants.THINGS.map((val: string, idx: number) => {
                return (
                    <div className={'single-emoji'} key={`${idx}_${val}`}>
                        <a href="javascript:void(0);"
                            onClick={() => this.props.onEmojiSelected(val)}
                            dangerouslySetInnerHTML={{ __html: emojione.shortnameToImage(val) }}></a>
                    </div>
                );
            });
        } else if (this.state.activeCategory === 6) {
            body = constants.BULB.map((val: string, idx: number) => {
                return (
                    <div className={'single-emoji'} key={`${idx}_${val}`}>
                        <a href="javascript:void(0);"
                            onClick={() => this.props.onEmojiSelected(val)}
                            dangerouslySetInnerHTML={{ __html: emojione.shortnameToImage(val) }}></a>
                    </div>
                );
            });
        } else if (this.state.activeCategory === 7) {
            body = constants.FLAGS.map((val: string, idx: number) => {
                return (
                    <div className={'single-emoji'} key={`${idx}_${val}`}>
                        <a href="javascript:void(0);"
                            onClick={() => this.props.onEmojiSelected(val)}
                            dangerouslySetInnerHTML={{ __html: emojione.shortnameToImage(val) }}></a>
                    </div>
                );
            });
        }

        return (
            <div className={this.props.popoverClasses}>
                <div className={"panel panel-default emojipopover-panel"}>
                    <div className={"panel-heading"}>
                        <div className={"emoji-heading-category"}>
                            <a href="javascript:void(0);" onClick={() => this.setCategory(0)}>
                                <i className={`fa-hover fa fa-smile-o fa-lg ${this.state.activeCategory === 0 ? 'fa-active' : ''}`} aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className={"emoji-heading-category"}>
                            <a href="javascript:void(0);" onClick={() => this.setCategory(1)}>
                                <i className={`fa-hover fa fa-paw fa-lg ${this.state.activeCategory === 1 ? 'fa-active' : ''}`} aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className={"emoji-heading-category"}>
                            <a href="javascript:void(0);" onClick={() => this.setCategory(2)}>
                                <i className={`fa-hover fa fa-cutlery fa-lg ${this.state.activeCategory === 2 ? 'fa-active' : ''}`} aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className={"emoji-heading-category"}>
                            <a href="javascript:void(0);" onClick={() => this.setCategory(3)}>
                                <i className={`fa-hover fa fa-futbol-o fa-lg ${this.state.activeCategory === 3 ? 'fa-active' : ''}`} aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className={"emoji-heading-category"}>
                            <a href="javascript:void(0);" onClick={() => this.setCategory(4)}>
                                <i className={`fa-hover fa fa-car fa-lg ${this.state.activeCategory === 4 ? 'fa-active' : ''}`} aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className={"emoji-heading-category"}>
                            <a href="javascript:void(0);" onClick={() => this.setCategory(5)}>
                                <i className={`fa-hover fa fa-lightbulb-o fa-lg ${this.state.activeCategory === 5 ? 'fa-active' : ''}`} aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className={"emoji-heading-category"}>
                            <a href="javascript:void(0);" onClick={() => this.setCategory(6)}>
                                <i className={`fa-hover fa fa-percent fa-lg ${this.state.activeCategory === 6 ? 'fa-active' : ''}`} aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className={"emoji-heading-category"}>
                            <a href="javascript:void(0);" onClick={() => this.setCategory(7)}>
                                <i className={`fa-hover fa fa-flag fa-lg ${this.state.activeCategory === 7 ? 'fa-active' : ''}`} aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <div className={"panel-body emojipopover-panel-body scrollable"}>
                        {body}
                    </div>
                </div>
                <div className={"clearfix"}></div>
            </div>
        );
    }
}

export default EmojiPopover;