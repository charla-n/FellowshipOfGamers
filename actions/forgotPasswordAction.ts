declare var require;

import * as constants from "../utils/Constants";
import * as types from "./actionTypes";
import API from "../utils/API";
import Common from '../utils/Common';
var Notifications = require('react-notification-system-redux');

export function ForgotPasswordRequest(captcha) {
    return (dispatch, getState) => {

        const values = getState().form.forgotPasswordForm.values;

        return _ForgotPasswordRequest(dispatch, values, captcha, getState);
    };
}

function _ForgotPasswordRequest(dispatch, values, captcha, getState) {
    dispatch({ type: types.FORGOT_PASSWORD_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.ACCOUNT_FORGOT_PASSWORD, {
        Email: values.email,
        CaptchaResponse: captcha,
    }, (data) => {
        dispatch(Notifications.success(Common.buildBaseNotification(null, Common.buildSuccess(data))));
    }, (data) => {
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    });
}