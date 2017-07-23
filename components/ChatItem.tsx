declare var require;

import * as React from "react";
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import renderField from "../components/Field";
import { Link } from 'react-router';
import * as Moment from 'moment';
var ReduxForm = require('redux-form');
var emojione = require('emojione');

export interface ChatItemProps {
    item: any;
}

export class ChatItem extends React.Component<ChatItemProps, {}> {

    constructor() {
        super();
    }

    render() {

        let creationDate = Moment.utc(this.props.item.creationDate).local().format('L LT');

        return (
            <div>
                <div className={'medium-margin-top row'}>
                    <div className={'chat-item-avatar col-xs-1'}>
                        <img className={"profile-picture profile-picture-chat"}
                            src={`api/profile/avatar2/${this.props.item.fromPlayerID}`} />
                    </div>
                    <div className={'chat-item-message-content col-xs-10'}>
                        <div className={'chat-item-playername'}>
                            <Link to={`/Profile/${this.props.item.fromPlayerID}`} className={"btn-link"}>{this.props.item.displayName}</Link>
                            <span className={'chat-item-time'}> {creationDate}</span>
                        </div>
                        <div className={'chat-item-message preserve-newline'}
                            dangerouslySetInnerHTML={{ __html: emojione.shortnameToImage(this.props.item.htmlMessage ? this.props.item.htmlMessage : this.props.item.message) }}>
                        </div>
                    </div>
                </div>
                <div className={'clearfix'}></div>
            </div>    
        );
    }
}

export default ChatItem;