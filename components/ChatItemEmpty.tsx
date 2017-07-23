declare var require;

import * as React from "react";
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import renderField from "../components/Field";
var ReduxForm = require('redux-form');

export interface ChatItemEmptyProps {
}

export class ChatItemEmpty extends React.Component<ChatItemEmptyProps, {}> {

    constructor() {
        super();
    }

    render() {
        return (
            <div key={'chat_empty'} className={'align-center chat-empty-title'}>
                It's a bit empty in here.
            </div>    
        );
    }
}

export default ChatItemEmpty;