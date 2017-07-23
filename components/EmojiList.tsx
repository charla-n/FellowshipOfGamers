import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import EmojiPopover from "./EmojiPopover";

export interface EmojiListStates {
    open: boolean;
}

export interface EmojiListProps {
    onEmojiSelected: any;
    popoverClasses: string;
}

export class EmojiList extends React.Component<EmojiListProps, EmojiListStates> {

    common: Common;
    emojiLink: any;

    constructor() {
        super();

        this.state = {
            open: false,
        };
        this.common = new Common();

        this.toggleEmojiList = this.toggleEmojiList.bind(this);
    }

    toggleEmojiList() {
        if (this.state.open) {
            this.setState(Update(this.state, {
                open: { $set: false }
            }));
        } else {
            this.setState(Update(this.state, {
                open: { $set: true }
            }));
        }
    }

    componentDidMount() {
    }

    render() {

        let emojiLinkContent;
        let emojiPopover;

        if (this.state.open) {
            emojiPopover = (
                <EmojiPopover popoverClasses={this.props.popoverClasses} onEmojiSelected={this.props.onEmojiSelected} />
            );
            emojiLinkContent = (
                <i className={"fa-hover fa fa-remove fa-lg"} aria-hidden="true"></i>
            );
        } else {
            emojiLinkContent = (
                <i className={"fa-hover fa fa-smile-o fa-lg"} aria-hidden="true"></i>
            );
        }

        return (
            <div>
                {emojiPopover}
                <div className={"emoji-list-container"}>
                    <a onClick={this.toggleEmojiList} className={"emoji-list-link pull-right"}
                        href="javascript:void(0);">
                        {emojiLinkContent}
                    </a>
                </div>
            </div>    
        );
    }
}

export default EmojiList;