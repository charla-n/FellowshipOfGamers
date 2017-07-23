declare var require;

import * as constants from "../utils/Constants";
import * as types from "./actionTypes";
import API from "../utils/API";
import Common from '../utils/Common';

export function ActivateAccountRequest(email, token) {
    return (dispatch, getState) => {
        return _ActivateAccountRequest(dispatch, email, token, getState);
    };
}

function _ActivateAccountRequest(dispatch, email, token, getState) {
    return API.Post(dispatch, getState, constants.ACCOUNT_ACTIVATE, {
        Email: email,
        Token: token,
    }, (data) => {
        dispatch({ type: types.ACTIVATE_ACCOUNT_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.ACTIVATE_ACCOUNT_FAILED, data });
    });
}