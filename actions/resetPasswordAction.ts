declare var require;

import * as constants from "../utils/Constants";
import * as types from "./actionTypes";
import API from "../utils/API";
import Common from '../utils/Common';
var Notifications = require('react-notification-system-redux');

export function ResetPasswordRequest(email, token) {
    return (dispatch, getState) => {

        const values = getState().form.resetPasswordForm.values;

        return _ResetPasswordRequest(dispatch, values, email, token, getState);
    };
}

function _ResetPasswordRequest(dispatch, values, email, token, getState) {
    dispatch({ type: types.RESET_PASSWORD_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.ACCOUNT_RESET_PASSWORD, {
        Email: email,
        Token: token,
        Password: values.password,
        Repassword: values.repassword,
    }, (data) => {
        dispatch({ type: types.RESET_PASSWORD_REQUEST_TOGGLE });
        dispatch(Notifications.success(Common.buildBaseNotification(null, Common.buildSuccess(data))));
    }, (data) => {
        dispatch({ type: types.RESET_PASSWORD_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    });
}