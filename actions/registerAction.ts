declare var require;

import * as constants from "../utils/Constants";
import * as types from "./actionTypes";
import API from "../utils/API";
import * as Moment from 'moment';
import Common from '../utils/Common';
var ReduxForm = require('redux-form');
var MT = require('moment-timezone');
var Notifications = require('react-notification-system-redux');

export function UsernameInUseRequest(registerName, authed) {
    return (dispatch, getState) => {
        const values = getState().form[registerName].values;

        if (!values || !values.username || values.username === "") {
            return $.when(null);
        } else {
            return _UsernameInUseRequest(dispatch, getState, values, authed);
        }
    };
}

function _UsernameInUseRequest(dispatch, getState, values, authed) {
    dispatch({ type: types.REGISTER_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, authed ? constants.ACCOUNT_USERNAME_INUSE_AUTHED : constants.ACCOUNT_USERNAME_INUSE, {
        Username: values.username
    }, (data) => {
        dispatch({ type: types.REGISTER_USERNAME_IN_USE_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.REGISTER_REQUEST_TOGGLE });
    }, authed ? [Common.buildAuthorizationHeader(getState().authReducer.access_token)] : []);
}

export function RegisterRequest(captcha) {
    return (dispatch, getState) => {
        const values = getState().form.registerForm.values;

        return _RegisterRequest(dispatch, captcha, values, getState);
    };
}

function _RegisterRequest(dispatch, captcha, values, getState) {
    dispatch({ type: types.REGISTER_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.ACCOUNT_REGISTER, {
        Email: values.email,
        ReEmail: values.reemail,
        Password: values.password,
        RePassword: values.repassword,
        CaptchaResponse: captcha,
        AcceptTerms: values.acceptpolicy,
        DisplayName: values.username,
        Timezone: (<any>MT).tz.guess(),
    }, (data) => {
        dispatch({ type: types.REGISTER_REQUEST_TOGGLE });
        dispatch(Notifications.success(Common.buildBaseNotification(null, Common.buildSuccess(data))));
    }, (data) => {
        dispatch({ type: types.REGISTER_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    });
}
