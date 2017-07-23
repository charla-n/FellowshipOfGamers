declare var require;

import * as constants from "../utils/Constants";
import * as types from "./actionTypes";
import API from "../utils/API";
import Common from '../utils/Common';
import { _RevokeTokens } from '../actions/loginAction';
var Notifications = require('react-notification-system-redux');

export function PlayerProfileReadRequest(userid) {
    return (dispatch, getState) => {
        return _PlayerProfileReadRequest(dispatch, getState().authReducer.access_token, userid, getState);
    };
}

function _PlayerProfileReadRequest(dispatch, access_token, userid, getState) {
    dispatch({ type: types.PLAYERPROFILE_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, `${constants.PROFILE_READ}/${userid}`, {
    }, (data) => {
        dispatch({ type: types.PLAYERPROFILE_READ_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.PLAYERPROFILE_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function PlayerProfileRemoveAccount(password) {
    return (dispatch, getState) => {
        return _PlayerProfileRemoveAccount(dispatch, getState().authReducer.access_token, getState, password);
    };
}

function _PlayerProfileRemoveAccount(dispatch, access_token, getState, password) {
    dispatch({ type: types.PLAYERPROFILE_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, `${constants.ACCOUNT_DELETE}`, {
        Password: password,
    }, (data) => {
        dispatch({ type: types.PLAYERPROFILE_REQUEST_TOGGLE });
    }, (data) => {
        dispatch({ type: types.PLAYERPROFILE_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)])
        .then((data) => {
            return _RevokeTokens(dispatch, getState, true, true);
        })
        ;
}

export function PlayerProfileAvatarRequest(userid) {
    return (dispatch, getState) => {
        return _PlayerProfileAvatarRequest(dispatch, getState().authReducer.access_token, userid, getState);
    };
}

function _PlayerProfileAvatarRequest(dispatch, access_token, userid, getState) {
    dispatch({ type: types.PLAYERPROFILE_REQUEST_AVATAR });
    return API.Get(dispatch, getState, `${constants.PROFILE_AVATAR}/${userid}`, {
    }, (data) => {
        dispatch({ type: types.PLAYERPROFILE_REQUEST_AVATAR_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.PLAYERPROFILE_REQUEST_AVATAR_FAILED, data });
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function PlayerProfileSaveRequest() {
    return (dispatch, getState) => {
        let profileForm = getState().form.profileForm;
        return _PlayerProfileSaveRequest(dispatch, getState().authReducer.access_token,
            {
                Avatar: getState().playerProfileReducer.avatar,
                Description: profileForm.values.description,
                Strength: profileForm.values.strength,
                Perception: profileForm.values.perception,
                Endurance: profileForm.values.endurance,
                Charisma: profileForm.values.charisma,
                Intelligence: profileForm.values.intelligence,
                Agility: profileForm.values.agility,
                Luck: profileForm.values.luck,
                PlayerType: profileForm.values.playerType,
                PlayerLanguages: profileForm.values.playerlanguages,
                DisplayName: profileForm.values.username,
                Timezone: profileForm.values.playerTimezone ? profileForm.values.playerTimezone.text : null,
            }, getState);
    }
}

export function PlayerProfileReadConfiguration() {
    return (dispatch, getState) => {
        let alertConfigurationForm = getState().form.alertConfigurationForm;
        return _PlayerProfileReadConfiguration(dispatch, getState().authReducer.access_token, getState);
    }
}

function _PlayerProfileReadConfiguration(dispatch, access_token, getState) {
    dispatch({ type: types.PLAYER_CONFIGURATION_REQUEST_TOGGLE });
    return API.Get(dispatch, getState, constants.PROFILE_ALERT_CONFIG, {}, (data) => {
        dispatch({ type: types.PLAYER_CONFIGURATION_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.PLAYERPROFILE_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function PlayerProfileSaveConfiguration() {
    return (dispatch, getState) => {
        let alertConfigurationForm = getState().form.alertConfigurationForm;
        return _PlayerProfileSaveConfiguration(dispatch, getState().authReducer.access_token, getState);
    }
}

function _PlayerProfileSaveConfiguration(dispatch, access_token, getState) {
    dispatch({ type: types.PLAYER_CONFIGURATION_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.PROFILE_ALERT_CONFIG, {
        ...getState().alertConfigurationReducer,
    }, (data) => {
        dispatch({ type: types.PLAYER_CONFIGURATION_REQUEST_TOGGLE });
        dispatch(Notifications.success(Common.buildBaseNotification(null, Common.buildSuccess(data))));
    }, (data) => {
        dispatch({ type: types.PLAYERPROFILE_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

function _PlayerProfileSaveRequest(dispatch, access_token, data, getState) {
    dispatch({ type: types.PLAYERPROFILE_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, `${constants.PROFILE_SAVE}`, data, (data) => {
        dispatch({ type: types.PLAYERPROFILE_SAVE_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.PLAYERPROFILE_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)])
        .then((data) => {
            return _PlayerProfileAvatarRequest(dispatch, access_token, "", getState);
        })
        ;
}