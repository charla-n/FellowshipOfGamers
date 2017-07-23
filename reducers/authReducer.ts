import * as types from "../actions/actionTypes";
import Common from '../utils/Common';
import * as Moment from 'moment';

const initialState = {
    authed: false,
    access_token: null,
    refresh_token: null,
    expiry_date: null,
    needCaptcha: false,
    loading: false,
    roles: [],
    name: null,
};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_CAPTCHA_REQUEST_SUCCESS:
            return {
                ...state,
                ...action.data,
                loading: false,
            };
        case types.LOGIN_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            }
        case types.LOGIN_REQUEST_FAILED:
            return {
                ...state,
                loading: false,
                authed: false,
            };
        case types.LOGIN_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                authed: true,
                access_token: action.data.access_token,
                refresh_token: action.data.refresh_token,
                expiry_date: Moment().utc().add('s', action.data.expires_in).format(),
            };
        case types.LOGIN_UNMOUNT:
            return {
                ...state,
                loading: false,
                needCaptcha: false,
            };
        case types.LOGIN_USERINFO_SUCCESS:
            return {
                ...state,
                roles: [action.data.role],
                name: action.data.name,
            };
        case types.LOGIN_USERINFO_FAILED:
            return {
                ...state,
                loading: false,
                authed: false,
            };
        case types.LOGIN_REFRESHTOKEN_SUCCESS:
            return {
                ...state,
                authed: true,
                access_token: action.data.access_token,
                refresh_token: action.data.refresh_token,
                expiry_date: Moment().utc().add('s', action.data.expires_in).format(),
                loading: false,
            };
        case types.LOGIN_REFRESHTOKEN_FAILED:
            return {
                ...state,
                loading: false,
                authed: false,
            };
        case types.LOGIN_REVOKE_ACCESS_TOKEN:
            return {
                ...state,
                authed: false,
                access_token: null,
                expiry_date: null,
            };
        case types.LOGIN_REVOKE_REFRESH_TOKEN:
            return {
                ...state,
                refresh_token: null,
            };
        default:
            return state;
    };
}

export default authReducer;