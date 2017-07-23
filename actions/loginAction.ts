declare var require;

import * as constants from "../utils/Constants";
import * as types from "./actionTypes";
import API from "../utils/API";
import * as Moment from 'moment';
import Common from '../utils/Common';
var Notifications = require('react-notification-system-redux');

export function LoginCaptchaRequest() {
    return (dispatch, getState) => {
        return _CaptchaRequest(dispatch, getState);
    };
}

function _CaptchaRequest(dispatch, getState) {
    const values = getState().form.loginForm.values;

    if (!values || !values.email || values.email === "") {
        return $.when(null);
    } else {
        return API.Post(dispatch, getState, constants.ACCOUNT_NEED_CAPTCHA, {
            Email: values.email
        }, (data) => {
            dispatch({ type: types.LOGIN_CAPTCHA_REQUEST_SUCCESS, data });
        }, (data) => {
            dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
        });
    }
}

export function LoginRequest(captcha) {
    return (dispatch, getState) => {
        return _LoginRequest(dispatch, getState, captcha);
    };
}

function _LoginRequest(dispatch, getState, captcha) {
    const values = getState().form.loginForm.values;

    if (!values) {
        return $.when(null);
    } else {
        dispatch({ type: types.LOGIN_REQUEST_TOGGLE });
        return API.Post(dispatch, getState, constants.ACCOUNT_LOGIN,
            `grant_type=password&username=${values.email}&password=${values.password}&client_id=${constants.CLIENT}&captcha=${captcha}`,
            (data) => {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("expiry_date", Moment().add('s', data.expires_in).format());
                localStorage.setItem("authed", "true");

                window['signalRController'].Stop();
                window['signalRController'].Start();

            }, (data) => {
                dispatch({ type: types.LOGIN_REQUEST_FAILED, data });
                dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
            }, [], "application/x-www-form-urlencoded")
            .then((data) => {
                return _UserInfoRequest(dispatch, getState, data.access_token).done(() => {
                    dispatch({ type: types.LOGIN_REQUEST_SUCCESS, data });
                });
            }, (data) => {
                return _CaptchaRequest(dispatch, getState);
            })
            ;
    }
}

export function UserInfoRequest() {
    return (dispatch, getState) => {
        return _UserInfoRequest(dispatch, getState, getState().authReducer.access_token);
    };
}

function _UserInfoRequest(dispatch, getState, access_token) {
    return API.Post(dispatch, getState, constants.ACCOUNT_USERINFO, null, (data) => {
        dispatch({ type: types.LOGIN_USERINFO_SUCCESS, data });
        localStorage.setItem("role", data.role);
    }, (data) => {
        dispatch({ type: types.LOGIN_USERINFO_FAILED, data });
        return _RevokeTokens(dispatch, getState, true, true);
        }, [Common.buildAuthorizationHeader(access_token)]);
}

export function RefreshToken() {
    return (dispatch, getState) => {
        return _RefreshToken(dispatch, getState);
    };
}

export function _RefreshToken(dispatch, getState) {
    dispatch({ type: types.LOGIN_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.ACCOUNT_LOGIN, `grant_type=refresh_token&client_id=${constants.CLIENT}&refresh_token=${getState().authReducer.refresh_token}`, (data) => {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("expiry_date", Moment().add('s', data.expires_in).format());
        localStorage.setItem("authed", "true");

        window['signalRController'].Stop();
        window['signalRController'].Start();

    }, (data) => {
        }, [], "application/x-www-form-urlencoded")
        .then((data) => {
            return _UserInfoRequest(dispatch, getState, data.access_token)
                .done(() => {
                    dispatch({ type: types.LOGIN_REFRESHTOKEN_SUCCESS, data });
                });
        }, (data) => {
            if (Moment(localStorage.getItem('expiry_date')).diff(Moment().utc(), 'minutes') > 0) {
                return _UserInfoRequest(dispatch, getState, localStorage.getItem('access_token'))
                    .done(() => {
                        dispatch({
                            type: types.LOGIN_REFRESHTOKEN_SUCCESS, data: {
                                access_token: localStorage.getItem('access_token'),
                                refresh_token: localStorage.getItem('refresh_token'),
                                expiry_date: localStorage.getItem('expiry_date'),
                            }
                        });
                    });
            } else {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("expiry_date");
                localStorage.removeItem("authed");
                dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
            }
        })
        ;
}

export function RevokeAllToken() {
    return (dispatch, getState) => {
        return _RevokeTokens(dispatch, getState, true, true);
    }
}

export function _RevokeTokens(dispatch, getState, access_token, refresh_token) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("expiry_date");
    localStorage.removeItem("authed");
    localStorage.removeItem("refresh_token");
    //API.Post(dispatch, getState, constants.ACCOUNT_REVOKE, `token=${getState().authReducer.refresh_token}&token_type_hint=refresh_token&client_id=${constants.CLIENT}`, (data) => {
    //}, (data) => {
    //}, [], "application/x-www-form-urlencoded");
    API.Post(dispatch, getState, constants.ACCOUNT_LOGOUT, {}, (data) => {
        window['signalRController'].Stop();
    }, (data) => {
    }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
    //dispatch({ type: types.LOGIN_REVOKE_REFRESH_TOKEN });
    dispatch({ type: types.LOGIN_REVOKE_ACCESS_TOKEN });
}