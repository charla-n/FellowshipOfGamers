declare var require;

import * as constants from "../utils/Constants";
import * as types from "./actionTypes";
import API from "../utils/API";
import Common from '../utils/Common';
import * as lodash from 'lodash';
import * as Moment from 'moment';
var ReduxForm = require('redux-form');
var Notifications = require('react-notification-system-redux');

export function WhenDateChanged(date, form) {
    return (dispatch, getState) => {
        dispatch(ReduxForm.change(form, 'when', date));
        dispatch(ReduxForm.touch(form, ['when']));
        dispatch({ type: types.GROUP_SET_DATE, when: date });
    };
}

export function WhenFromDateChanged(date, form) {
    return (dispatch, getState) => {
        dispatch(ReduxForm.change(form, 'from', date));
        dispatch(ReduxForm.touch(form, ['from']));
        dispatch({ type: types.GROUP_FROMDATE_SET, data: date });
    };
}

export function WhenToDateChanged(date, form) {
    return (dispatch, getState) => {
        dispatch(ReduxForm.change(form, 'to', date));
        dispatch(ReduxForm.touch(form, ['to']));
        dispatch({ type: types.GROUP_TODATE_SET, data: date });
    };
}

export function ReviewStarClick(id, mark, form) {
    return (dispatch, getState) => {
        let data = getState().groupReviewReducer.data;

        if (data) {
            let newPlayers = data.players.map(p => p.id === id ? { ...p, mark } : p);
            dispatch({ type: types.GROUP_REVIEW_SUCCESS, data: { ...data, players: newPlayers } });
            //dispatch(ReduxForm.change(form, `${id}_mark`, mark));
            //dispatch(ReduxForm.touch(form, [`${id}_mark`]));
        }
    };
}

export function ReviewCommentUpdate(id, comment, form) {
    return (dispatch, getState) => {
        let data = getState().groupReviewReducer.data;

        if (data) {
            let newPlayers = data.players.map(p => p.id === id ? { ...p, comment } : p);
            dispatch({ type: types.GROUP_REVIEW_SUCCESS, data: { ...data, players: newPlayers } });
            //dispatch(ReduxForm.change(form, `${id}_comment`, comment));
            //dispatch(ReduxForm.touch(form, [`${id}_comment`]));
        }
    };
}

export function GamesCreateTag(tag, formName) {
    return (dispatch, getState) => {

        const form = getState().form[formName];
        const data = form.values && form.values.games ? form.values.games : [];
        let min = lodash.min(data.map((val, idx) => {
            return val.id;
        })) as number;
        if (!min || min === 0) {
            min = -1;
        } else {
            min = min - 1;
        }
        dispatch(ReduxForm.change(formName, 'games', [...data, { id: min, text: tag }]));
    }
}

export function JoinGroup(id) {
    return (dispatch, getState) => {
        return _JoinGroup(dispatch, getState, id);
    }
}

function _JoinGroup(dispatch, getState, id) {
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, `${constants.GROUP_JOIN}/${id}`, {
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_SUCCESS, data });
        if ((<any>$.connection).groupHub) {
            (<any>$.connection).groupHub.server.joinedGroup(data);
        }
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
}

export function GroupByIDRequest(id) {
    return (dispatch, getState) => {

        return _GroupByIDRequest(dispatch, getState, id);
    };
}

function _GroupByIDRequest(dispatch, getState, id) {
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Get(dispatch, getState, `${constants.GROUP_BY_ID}/${id}`, {
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(getState().authReducer.access_token)]);
}

export function KickPlayerRequest(groupid, playerid) {
    return (dispatch, getState) => {

        return _KickPlayerRequest(dispatch, getState, getState().authReducer.access_token, groupid, playerid);
    };
}

function _KickPlayerRequest(dispatch, getState, access_token, groupid, playerid) {
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.GROUP_KICK_PLAYER, {
        GroupID: groupid,
        PlayerID: playerid,
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_SUCCESS, data });
        if ((<any>$.connection).groupHub) {
            (<any>$.connection).groupHub.server.kickedOutFromGroup(playerid, groupid);
        }
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function ReportPlayerRequest(groupid, playerid) {
    return (dispatch, getState) => {

        return _ReportPlayerRequest(dispatch, getState, getState().authReducer.access_token, groupid, playerid, 'viewGroupPlayersForm');
    };
}

function _ReportPlayerRequest(dispatch, getState, access_token, groupid, playerid, formname) {
    const form = getState().form[formname];

    if (!form.values) {
        return $.when(null);
    }
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.GROUP_REPORT, {
        GroupID: groupid,
        PlayerID: playerid,
        Description: form.values.description,
    }, (data) => {
        dispatch(ReduxForm.reset(formname));
        dispatch({ type: types.GROUP_BYID_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function LockRequest(groupid) {
    return (dispatch, getState) => {

        return _LockRequest(dispatch, getState, getState().authReducer.access_token, groupid);
    };
}

function _LockRequest(dispatch, getState, access_token, groupid) {
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, `${constants.GROUP_LOCK}/${groupid}`, {
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function UnlockRequest(groupid) {
    return (dispatch, getState) => {

        return _UnlockRequest(dispatch, getState, getState().authReducer.access_token, groupid);
    };
}

function _UnlockRequest(dispatch, getState, access_token, groupid) {
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, `${constants.GROUP_UNLOCK}/${groupid}`, {
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function AcceptPlayerRequest(groupid, playerid) {
    return (dispatch, getState) => {

        return _AcceptPlayerRequest(dispatch, getState, getState().authReducer.access_token, groupid, playerid);
    };
}

function _AcceptPlayerRequest(dispatch, getState, access_token, groupid, playerid) {
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.GROUP_ACCEPT_PLAYER, {
        GroupID: groupid,
        PlayerID: playerid,
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_SUCCESS, data });
        if ((<any>$.connection).groupHub) {
            (<any>$.connection).groupHub.server.acceptedInGroup(playerid, groupid);
        }
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function ChatLoadMore(groupid, page) {
    return (dispatch, getState) => {
        return _ChatLoadMore(dispatch, getState, getState().authReducer.access_token, groupid, page);
    }
}

function _ChatLoadMore(dispatch, getState, access_token, groupid, page) {
    if (!getState().groupChatReducer.hasMore) {
        return $.when(null);
    }
    return API.Post(dispatch, getState, `${constants.GROUP_READ_CHAT}/${groupid}/${page}`,
        {}, (data) => {
            dispatch({ type: types.GROUP_CHAT_SUCCESS, data });
        }, (data) => {
            dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
        }, [Common.buildAuthorizationHeader(access_token)]);
}

export function SendReviewRequest(id) {
    return (dispatch, getState) => {

        const values = getState().form.reviewForm.values;

        return _SendReviewRequest(dispatch, values, getState, getState().authReducer.access_token, id);
    };
}

export function CreateGroupRequest() {
    return (dispatch, getState) => {

        const values = getState().form.createGroupForm.values;

        return _CreateGroupRequest(dispatch, values, getState, getState().authReducer.access_token);
    };
}

export function EditGroupRequest() {
    return (dispatch, getState) => {

        const values = getState().form.editGroupForm.values;

        return _EditGroupRequest(dispatch, values, getState, getState().authReducer.access_token);
    };
}

function _CreateGroupRequest(dispatch, values, getState, access_token) {
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.GROUP_CREATE, {
        Duration: (values.hours.id * 60) + values.minutes.id,
        DateStart: Moment(values.when).utc().format(),
        Description: values.description,
        Games: values.games,
        Language: values.language,
        Need: values.need.id,
        Communications: values.communications,
        Playstyles: values.playstyles,
        Ages: values.ages,
        Image: getState().createGroupReducer.image
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE, data });
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

function _SendReviewRequest(dispatch, values, getState, access_token, id) {
    dispatch({ type: types.GROUP_REVIEW_REQUEST_TOGGLE });
    let reducer = getState().groupReviewReducer.data;
    return API.Post(dispatch, getState, constants.GROUP_SENDREVIEW, {
        ID: id,
        Players: reducer.players,
    }, (data) => {
        dispatch({ type: types.GROUP_REVIEW_SEND_SUCCESS });
        dispatch(Notifications.success(Common.buildBaseNotification(null, Common.buildSuccess(data))));
    }, (data) => {
        dispatch({ type: types.GROUP_REVIEW_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

function _EditGroupRequest(dispatch, values, getState, access_token) {
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.GROUP_UPDATE, {
        ID: values.ID,
        Duration: (values.hours.id * 60) + values.minutes.id,
        DateStart: Moment(values.when).utc().format(),
        Description: values.description,
        Games: values.games,
        Language: values.language,
        Need: values.need.id,
        Communications: values.communications,
        Playstyles: values.playstyles,
        Ages: values.ages,
        Image: getState().createGroupReducer.image
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE, data });
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function DeleteGroupRequest(id) {
    return (dispatch, getState) => {

        return _DeleteGroupRequest(dispatch, id, getState, getState().authReducer.access_token);
    };
}

function _DeleteGroupRequest(dispatch, id, getState, access_token) {
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, `${constants.GROUP_DELETE}/${id}`, {
    }, (data) => {
        dispatch({ type: types.GROUP_DELETE_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function SearchGroupReadRequest(data) {
    return (dispatch, getState) => {
       return _SearchGroupReadRequest(dispatch, getState, data, getState().authReducer.access_token);
    }
}

function _SearchGroupReadRequest(dispatch, getState, data, access_token) {
    dispatch({ type: types.GROUP_SEARCH_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.GROUP_READ, data,
        (data) => {
            dispatch({ type: types.GROUP_SEARCH_SUCCESS, data });
        }, (data) => {
            dispatch({ type: types.GROUP_SEARCH_REQUEST_TOGGLE });
            dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
        }, [Common.buildAuthorizationHeader(access_token)]);
}

export function GetReviewGroup(reviewid) {
    return (dispatch, getState) => {
        return _GetReviewGroup(dispatch, getState, getState().authReducer.access_token, reviewid);
    }
}

function _GetReviewGroup(dispatch, getState, access_token, reviewid) {
    dispatch({ type: types.GROUP_REVIEW_REQUEST_TOGGLE });
    return API.Get(dispatch, getState, `${constants.GROUP_REVIEW}/${reviewid}`, null, (data) => {
        dispatch({ type: types.GROUP_REVIEW_SUCCESS, data });
    }, (data) => {
        dispatch({ type: types.GROUP_REVIEW_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function GroupSendMessage(groupid) {
    return (dispatch, getState) => {
        return _GroupSendMessage(dispatch, getState, getState().authReducer.access_token, groupid);
    }
}

function _GroupSendMessage(dispatch, getState, access_token, groupid) {
    let form = getState().form.groupChatForm;

    if (form == null || form === undefined) {
        return $.when(null);
    }
    if (form.values.message === null || form.values.message === undefined || form.values.message === '') {
        return $.when(null);
    }
    dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
    return API.Post(dispatch, getState, constants.GROUP_SEND_MSG, {
        GroupID: groupid,
        Message: form.values.message,
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(ReduxForm.change('groupChatForm', 'message', ''));
        if ((<any>$.connection).groupHub) {
            (<any>$.connection).groupHub.server.notif(data.fromPlayerID, groupid);
        }
        if ((<any>$.connection).chatHub) {
            (<any>$.connection).chatHub.server.sendMessage(data);
        }
    }, (data) => {
        dispatch({ type: types.GROUP_BYID_REQUEST_TOGGLE });
        dispatch(Notifications.error(Common.buildBaseNotification(null, Common.buildError(data))));
    }, [Common.buildAuthorizationHeader(access_token)]);
}

export function BuildFilter() {
    return (dispatch, getState) => {
        let refine = { Filters: {}, Sorts: {} };

        let form = getState().form.searchGroupRefineForm;

        if (form === undefined || form === null) {
            return;
        }

        refine.Filters['From'] = Moment(getState().searchGroupRefineReducer.fromDate).format();
        refine.Filters['To'] = Moment(getState().searchGroupRefineReducer.toDate).format();
        refine.Filters['Languages'] = form.values.languages;
        refine.Filters['Duration'] = form.values.duration;
        refine.Filters['Need'] = form.values.need;
        refine.Filters['Communications'] = form.values.communication;
        refine.Filters['PlayStyles'] = form.values.playstyles;
        refine.Filters['Ages'] = form.values.ages;
        refine.Filters['Games'] = form.values.games;

        return refine;
    }
}

export function IsCreator(data) {
    var ret = lodash.filter(data.subscriptions, (o) => {
        return o.playerID === data.me && o.isCreator === true;
    });
    return ret.length > 0;
}

export function CanEdit(data) {
    var ret = lodash.filter(data.subscriptions, (o) => {
        return !o.isCreator;
    });
    return ret.length === 0;
}

export function CanAccept(data) {
    return !data.locked && data.have < data.need;
}

export function IsSubscribed(data) {
    var ret = lodash.filter(data.subscriptions, (o) => {
        return o.playerID === data.me;
    });
    return ret.length > 0;
}

export function IsSubscribedAndAccepted(data) {
    var ret = lodash.filter(data.subscriptions, (o) => {
        return o.waitingCreatorApproval === false && o.playerID === data.me;
    });
    return ret.length > 0;
}

