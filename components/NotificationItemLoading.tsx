declare var require;

import * as React from "react";
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import renderField from "../components/Field";
import Loading from './Loading'
var ReduxForm = require('redux-form');

export class NotificationItemLoading extends React.Component<{}, {}> {

    constructor() {
        super();
    }

    render() {
        return (
            <div key={'notif_empty'}>
                <Loading/>
            </div>    
        );
    }
}

export default NotificationItemLoading;