declare var require;

import * as React from 'react'
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import { ActivateAccountRequest } from '../actions/activateAccountAction';
import Loading from '../components/Loading';
import { ReadNotifications } from '../actions/notificationAction';
import NotificationItem from '../components/NotificationItem';
import NotificationItemEmpty from '../components/NotificationItemEmpty';
import NotificationItemLoading from '../components/NotificationItemLoading';
var ChatView = require('../components/react-chatview').default;
var ReduxForm = require('redux-form');

export interface NotificationProps {
    onMount: any;
    NotificationData: any;
    isOpen: boolean;
    ReadNotifications: any;
    ClearNotifications: any;
}

export interface NotificationState {
    page: number;
}

export class Notification extends React.Component<NotificationProps, NotificationState> {

    common: Common;

    constructor() {
        super();

        this.common = new Common();

        this.state = {
            page: 0,
        };
        this.infiniteScrollLoading = this.infiniteScrollLoading.bind(this);
    }

    componentDidMount() {
        this.props.onMount();
    }

    componentWillReceiveProps(nextprops: NotificationProps) {
        if (!this.props.isOpen && nextprops.isOpen) {
            this.setState(Update(this.state, {
                page: { $set: 0 },
            }));
            this.props.ReadNotifications(0);
        }
        else if (this.props.isOpen && !nextprops.isOpen) {
            this.props.ClearNotifications();
        }
    }

    infiniteScrollLoading() {
        let page = this.state.page + 1;
        this.setState(Update(this.state, {
            page: { $set: page },
        }));
        return this.props.ReadNotifications(page);
    }

    render() {

        let notificationContent;

        if (this.props.NotificationData && this.props.NotificationData.data.length > 0) {
            notificationContent = this.props.NotificationData.data.map((item, idx) => {
                return <NotificationItem key={`notif_p_item_${idx}`} item={item} />
            });
            if (this.props.NotificationData.loading) {
                notificationContent.unshift(<NotificationItemLoading key={'notif_p_loading'}/>);
            }
        } else {
            if (this.props.NotificationData.loading) {
                notificationContent = [<NotificationItemLoading key={'notif_p_loading'}/>];
            } else {
                notificationContent = [<NotificationItemEmpty key={'notif_p_empty'}/>];
            }
        }

        return (
            <div>
                <ChatView
                    className="notification-container-content scrollable"
                    flipped={false}
                    scrollLoadThreshold={50}
                    onInfiniteLoad={this.infiniteScrollLoading}
                >
                    {notificationContent}
                </ChatView>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        NotificationData: state.notificationReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => dispatch({ type: types.NOTIFICATION_MOUNT }),
        ReadNotifications: (page) => dispatch(ReadNotifications(page)),
        ClearNotifications: () => dispatch({ type: types.NOTIFICATION_CLEAR }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);