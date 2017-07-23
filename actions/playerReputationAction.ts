declare var require;

import * as constants from "../utils/Constants";
import * as types from "./actionTypes";
import API from "../utils/API";
import Common from '../utils/Common';
var Notifications = require('react-notification-system-redux');

export function PlayerReputationReadRequest(getParams, data) {
    return (dispatch, getState) => {
        return _PlayerReputationReadRequest(dispatch, getState().authReducer.access_token, getParams, data, getState);
    };
}

function _PlayerReputationReadRequest(dispatch, access_token, getParams, data, getState) {
    dispatch({ type: types.REPUTATION_REQUEST_TOGGLE });

    const get = getParams.join('/')

    return API.Post(dispatch, getState, `${constants.REPUTATION_READ}/${get}`, data, (data) => {
        dispatch({ type: types.REPUTATION_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.REPUTATION_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function PlayerReputationReportRequest(playerReputationID) {
    return (dispatch, getState) => {
        return _PlayerReputationReportRequest(dispatch, getState().authReducer.access_token, playerReputationID, getState);
    };
}

function _PlayerReputationReportRequest(dispatch, access_token, playerReputationID, getState) {
    return API.Post(dispatch, getState, `${constants.REPURATION_REPORT}/${playerReputationID}`, {}, (data) => {
        dispatch(Notifications.success(Common.buildBaseNotification(null, Common.buildSuccess(data))));
    }, (data) => {
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}