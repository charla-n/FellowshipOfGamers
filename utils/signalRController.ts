import * as constants from './Constants';
import * as types from "../actions/actionTypes";
import { Store } from 'redux';
import API from "../utils/API";
import Common from '../utils/Common';
import { UnreadNotification, SyncGroupNotification } from '../actions/notificationAction';
import {
    GroupByIDRequest
} from "../actions/groupAction";

export class SignalRController {

    isReady: boolean;

    constructor(private store: Store<any>) {
        this.isReady = false;
    }

    UpdateLastSeen = () => {
        API.Post(this.store.dispatch, this.store.getState, constants.ACCOUNT_UPDATELASTSEEN, {},
            (data) => { },
            (data) => { },
            [Common.buildAuthorizationHeader(this.store.getState().authReducer.access_token)]);
    }

    RegisterGroupChat = () => {
        if ((<any>$.connection).chatHub) {
            (<any>$.connection).chatHub.client.onMessageReceived = (model) => {
                let page = this.store.getState().pageReducer;
                if (page.page === 'ViewGroup' && page.data && page.data.toString() === model.GroupID.toString()) {
                    this.store.dispatch({
                        type: types.GROUP_CHAT_SIGNALR_SUCCESS, data: [{
                            id: model.ID,
                            fromPlayerID: model.FromPlayerID,
                            displayName: model.DisplayName,
                            creationDate: model.CreationDate,
                            message: model.Message,
                            htmlMessage: model.HTMLMessage,
                            groupID: model.GroupID,
                        }]
                    });
                    this.store.dispatch(SyncGroupNotification(model.GroupID, 1));
                    this.UpdateLastSeen();
                } else {
                    this.store.dispatch(UnreadNotification());
                    this.UpdateLastSeen();
                }
            };
        }
    }

    RegisterGroupNewMessage = () => {
        if ((<any>$.connection).groupHub) {
            (<any>$.connection).groupHub.client.onGroupNotifReceived = (model) => {
                let page = this.store.getState().pageReducer;
                if (page.page === 'ViewGroup' && page.data && page.data.toString() === model.GroupID.toString()) {
                    this.store.dispatch(SyncGroupNotification(model.GroupID, 1));
                    this.UpdateLastSeen();
                } else {
                    this.store.dispatch(UnreadNotification());
                    this.UpdateLastSeen();
                }
            };
        }
    }

    RegisterJoinedGroup = () => {
        if ((<any>$.connection).groupHub) {
            (<any>$.connection).groupHub.client.onJoinGroupReceived = (model) => {
                let page = this.store.getState().pageReducer;
                if (page.page === 'ViewGroup' && page.data && page.data.toString() === model.ID.toString()) {
                    this.store.dispatch(SyncGroupNotification(model.ID, 0));
                    this.UpdateLastSeen();
                    this.store.dispatch(GroupByIDRequest(model.ID));
                } else {
                    this.store.dispatch(UnreadNotification());
                    this.UpdateLastSeen();
                }
            };
        }
    }

    RegisterAcceptedInGroup = () => {
        if ((<any>$.connection).groupHub) {
            (<any>$.connection).groupHub.client.onAcceptedInGroupReceived = (groupid) => {
                let page = this.store.getState().pageReducer;
                if (page.page === 'ViewGroup' && page.data && page.data.toString() === groupid.toString()) {
                    this.store.dispatch(SyncGroupNotification(groupid, 2));
                    this.UpdateLastSeen();
                    this.store.dispatch(GroupByIDRequest(groupid));
                } else {
                    this.store.dispatch(UnreadNotification());
                    this.UpdateLastSeen();
                }
            };
        }
    }

    RegisterKickOutFromGroup = () => {
        if ((<any>$.connection).groupHub) {
            (<any>$.connection).groupHub.client.onKickedOutFromGroup = (groupid) => {
                let page = this.store.getState().pageReducer;
                if (page.page === 'ViewGroup' && page.data && page.data.toString() === groupid.toString()) {
                    this.store.dispatch(SyncGroupNotification(groupid, 3));
                    this.UpdateLastSeen();
                    this.store.dispatch(GroupByIDRequest(groupid));
                } else {
                    this.store.dispatch(UnreadNotification());
                    this.UpdateLastSeen();
                }
            };
        }
    }

    Sync = () => {
        if ((<any>$.connection).notificationHub) {
            (<any>$.connection).notificationHub.client.sync = () => {
                this.store.dispatch(UnreadNotification());
                this.UpdateLastSeen();
            };
        }

    }

    Init = () => {
        $(() => {
            if ($.connection.hub) {
                this.onError();
                this.onDisconnection();
            }
        });
    }

    Start = () => {
        if ($.connection.hub) {
            $.connection.hub.logging = true;
            $.connection.hub.url = constants.SIGNALR;
            $.connection.hub.qs = { access_token: localStorage.getItem('access_token') };
            try {
                this.RegisterGroupChat();
                this.RegisterGroupNewMessage();
                this.RegisterJoinedGroup();
                this.RegisterAcceptedInGroup();
                this.RegisterKickOutFromGroup();
                this.Sync();
                $.connection.hub.start().done(() => {
                    this.isReady = true;
                });
            } catch (e) {
                //TODO log
                console.error(e);
            }
        }
    }

    Stop = () => {
        if ($.connection.hub.stop) {
            $.connection.hub.stop();
        }
    }

    onDisconnection = () => {
        if ($.connection.hub.disconnected) {
            $.connection.hub.disconnected(() => {
                this.isReady = false;
                setTimeout(() => {
                    this.Start();
                }, 5000);
            });
        }
    }

    onError = () => {
        if ($.connection.hub.error) {
            $.connection.hub.error((err) => {
                console.error(err);
            });
        }
    }
}