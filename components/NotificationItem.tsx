declare var require;

import * as React from "react";
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import renderField from "../components/Field";
import { Link } from 'react-router';
import * as Moment from 'moment';
var ReduxForm = require('redux-form');

export interface NotificationItemProps {
    item: any;
}

export class NotificationItem extends React.Component<NotificationItemProps, {}> {

    constructor() {
        super();
    }

    buildImage() {
        if (this.props.item.type === 0 || this.props.item.type === 1 || this.props.item.type === 2 || this.props.item.type === 3) {
            return (
                <img className={"profile-picture-small"}
                    src={`${constants.GROUP_IMAGE + '/' + this.props.item.groupID}`} />
            );
        } else {
            return <div></div>;
        }
    }

    render() {

        let action;

        if (this.props.item.type === 0 || this.props.item.type === 1 || this.props.item.type === 2 || this.props.item.type === 3) {
            action = (
                <Link to={`/ViewGroup/${this.props.item.groupID}`} className={''}>Go to group</Link>    
            );
        }
        let date = Moment.utc(this.props.item.creationDate).local().format('L LT');

        return (
            <div>
                <div className={`row ${(this.props.item.read ? '' : 'notif-unread')}`}>
                    <div className={'col-xs-3 align-right'}>
                        {this.buildImage()}
                    </div>
                    <div className={'col-xs-9'}>
                        <p dangerouslySetInnerHTML={{ __html: this.props.item.message }}>
                        </p>
                        {action}
                        <div className={'pull-right small-size'}>
                            {date}
                        </div>
                    </div>
                </div>
                <div className={'clearfix'}></div>
                <Separator/>
            </div>    
        );
    }
}

export default NotificationItem;