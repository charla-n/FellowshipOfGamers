declare var require;

import API from "../utils/API";
import * as types from "./actionTypes";
import * as constants from "../utils/Constants";
import Common from '../utils/Common';
import * as lodash from 'lodash';
var Notifications = require('react-notification-system-redux');

export function fetchPlayerTypes() {
    return (dispatch, getState) => {
        if (getState().dataPlayerTypesReducer.shouldUpdate) {
            dispatch({ type: types.DATA_PLAYERTYPES_REQUEST_TOGGLE });
            return API.Post(dispatch, getState, constants.DATA_PLAYERTYPES, {}, (data) => {
                dispatch({ type: types.DATA_PLAYERTYPES_SUCCESS, data });
            }, (data) => {
                dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
            }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
        } else {
            return $.when(null);
        }
    };
}

export function fetchTimezones() {
    return (dispatch, getState) => {
        if (getState().dataTimezonesReducer.shouldUpdate) {
            dispatch({ type: types.DATA_TIMEZONES_REQUEST_TOGGLE });
            return API.Post(dispatch, getState, constants.DATA_TIMEZONES, {}, (data) => {
                dispatch({ type: types.DATA_TIMEZONES_SUCCESS, data });
            }, (data) => {
                dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
            }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
        } else {
            return $.when(null);
        }
    };
}

export function fetchLanguages(term) {
    return (dispatch, getState) => {
        if (term && term.length >= 3) {
            dispatch({ type: types.DATA_LANGUAGES_REQUEST_TOGGLE });
            return API.Post(dispatch, getState, constants.DATA_LANGUAGES, {
                Term: term
            }, (data) => {
                dispatch({ type: types.DATA_LANGUAGES_SUCCESS, data });
            }, (data) => {
                dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
            }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
        } else {
            return $.when(null);
        }
    };
}

export function fetchGames(term) {
    return (dispatch, getState) => {
        if (term && term.length >= 3) {
            dispatch({ type: types.DATA_GAMES_REQUEST_TOGGLE });
            return API.Post(dispatch, getState, constants.DATA_GAMES, {
                Term: term
            }, (data) => {
                dispatch({ type: types.DATA_GAMES_SUCCESS, data });
            }, (data) => {
                dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
            }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
        } else {
            return $.when(null);
        }
    };
}

export function fetchPlayStyles() {
    return (dispatch, getState) => {
        if (getState().dataPlayStylesReducer.shouldUpdate) {
            dispatch({ type: types.DATA_PLAYSTYLES_REQUEST_TOGGLE });
            return API.Post(dispatch, getState, constants.DATA_PLAYSTYLES, {}, (data) => {
                dispatch({ type: types.DATA_PLAYSTYLES_SUCCESS, data });
            }, (data) => {
                dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
            }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
        } else {
            return $.when(null);
        }
    };
}

export function fetchCommunications() {
    return (dispatch, getState) => {
        if (getState().dataCommunicationsReducer.shouldUpdate) {
            dispatch({ type: types.DATA_COMMUNICATIONS_REQUEST_TOGGLE });
            return API.Post(dispatch, getState, constants.DATA_COMMUNICATIONS, {}, (data) => {
                dispatch({ type: types.DATA_COMMUNICATIONS_SUCCESS, data });
            }, (data) => {
                dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
            }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
        } else {
            return $.when(null);
        }
    };
}

export function fetchAges() {
    return (dispatch, getState) => {
        if (getState().dataAgesReducer.shouldUpdate) {
            dispatch({ type: types.DATA_AGES_REQUEST_TOGGLE });
            return API.Post(dispatch, getState, constants.DATA_AGES, {}, (data) => {
                dispatch({ type: types.DATA_AGES_SUCCESS, data });
            }, (data) => {
                dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
            }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
        } else {
            return $.when(null);
        }
    };
}

