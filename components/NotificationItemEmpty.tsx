declare var require;

import * as React from "react";
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import renderField from "../components/Field";
var ReduxForm = require('redux-form');

export class NotificationItemEmpty extends React.Component<{}, {}> {

    constructor() {
        super();
    }

    render() {
        return (
            <div key={'notif_empty'} className={'align-center chat-empty-title'}>
                You don't have any notifications.
            </div>    
        );
    }
}

export default NotificationItemEmpty;