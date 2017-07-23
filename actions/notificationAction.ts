declare var require;

import API from "../utils/API";
import * as types from "./actionTypes";
import * as constants from "../utils/Constants";
import Common from '../utils/Common';
import * as lodash from 'lodash';
var Notifications = require('react-notification-system-redux');

export function UnreadNotification() {
    return (dispatch, getState) => {
        return _UnreadNotification(dispatch, getState);
    }
}

function _UnreadNotification(dispatch, getState) {
    return API.Get(dispatch, getState, constants.NOTIFICATION_UNREAD, {}, (data) => {
        dispatch({ type: types.NOTIFICATION_UNREAD, data });
    }, (data) => {
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)])
}

export function ReadNotifications(page) {
    return (dispatch, getState) => {
        return _ReadNotifications(dispatch, getState, page);
    }
}

function _ReadNotifications(dispatch, getState, page) {
    if (!getState().notificationReducer.hasMore) {
        return $.when(null);
    }
    dispatch({ type: types.NOTIFICATION_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, `${constants.NOTIFICATION_READ}/${page}`, {}, (data) => {
        dispatch({ type: types.NOTIFICATION_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.NOTIFICATION_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)])
}

var syncPromise :JQueryPromise<any> = $.when(null);

export function SyncNotification() {
    return (dispatch, getState) => {
        return _SyncNotification(dispatch, getState);
    }
}

function _SyncNotification(dispatch, getState) {
    return syncPromise.done(() => {
        syncPromise = API.Get(dispatch, getState, `${constants.NOTIFICATION_SYNC}`, {}, (data) => {
            return _UnreadNotification(dispatch, getState);
        }, (data) => {
        }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
        return syncPromise;
    });
}

export function SyncGroupNotification(groupid, type) {
    return (dispatch, getState) => {
        return _SyncGroupNotification(dispatch, getState, groupid, type);
    }
}

function _SyncGroupNotification(dispatch, getState, groupid, type) {
    return syncPromise.done(() => {
        syncPromise = API.Get(dispatch, getState, `${constants.NOTIFICATION_GROUPSYNC}/${groupid}/${type}`, {}, (data) => {
            (<any>$.connection).notificationHub.server.sync();
            return _UnreadNotification(dispatch, getState);
        }, (data) => {
        }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
        return syncPromise;
    });
}