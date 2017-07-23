declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import { Link } from 'react-router';
import renderField from "../components/Field";
import renderDropdown from "../components/Dropdown";
import renderMultiselect from "../components/Multiselect";
import renderValidation from "../components/Validation";
import Separator from "../components/Separator";
import * as Moment from 'moment';
import Label from '../components/Label';
import ViewGroupDetails from '../components/ViewGroupDetails';
import ViewGroupPlayers from '../components/ViewGroupPlayers';
import {
    GroupByIDRequest,
    DeleteGroupRequest,
    AcceptPlayerRequest,
    KickPlayerRequest,
    LockRequest,
    UnlockRequest,
    ReportPlayerRequest,
    JoinGroup,
    IsCreator,
    CanEdit,
    CanAccept,
    IsSubscribed,
    IsSubscribedAndAccepted
} from "../actions/groupAction";
import {
    PlayerProfileAvatarRequest
} from '../actions/playerProfileAction';
import GroupChat from './GroupChat';
import * as lodash from 'lodash';
import { fetchViewGroupResource } from '../actions/resourceAction'

var ReduxForm = require('redux-form');
var emojione = require('emojione');

export interface ViewGroupProps {
    Authed: boolean;
    FetchResource: any;
    ResourceShouldUpdate: boolean;
    Resource: any;
    onMount: any;
    loading: boolean;

    data: any;
    FetchGroup: any;
    DeleteGroup: any;
    removed: boolean;
    AcceptPlayerRequest: any;
    KickPlayerRequest: any;
    LockGroup: any;
    UnlockGroup: any;
    ReportPlayerRequest: any;
    onUnmount: any;
    JoinGroup: any;
    CanEdit: boolean;
    IsCreator: boolean;
    CanAccept: boolean;
    IsSubscribed: boolean;
    IsSubscribedAndAccepted: boolean;
}

export class ViewGroup extends React.Component<ViewGroupProps, {}> {

    common: Common;
    userAvatarMapping: Array<any>;

    constructor() {
        super();

        this.userAvatarMapping = [];

        this.common = new Common();
        this.onAcceptPlayer = this.onAcceptPlayer.bind(this);
        this.onKickPlayer = this.onKickPlayer.bind(this);
        this.onLockGroup = this.onLockGroup.bind(this);
        this.onUnlockGroup = this.onUnlockGroup.bind(this);
        this.onReportPlayer = this.onReportPlayer.bind(this);
        this.onJoinGroup = this.onJoinGroup.bind(this);
    }

    componentDidMount() {

        let props = this.props as any;

        this.props.onMount(props.router.params.id);
        this.props.FetchResource();
        this.props.FetchGroup(props.router.params.id);
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    componentWillReceiveProps(nextprops: ViewGroupProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
        if (nextprops.removed) {
            let props = this.props as any;

            props.router.push(`/`);
        }
    }

    onAcceptPlayer(playerID) {
        let props = this.props as any;
        this.props.AcceptPlayerRequest(props.router.params.id, playerID);
    }

    onKickPlayer(playerID) {
        let props = this.props as any;
        this.props.KickPlayerRequest(props.router.params.id, playerID);
    }

    onLockGroup() {
        let props = this.props as any;
        this.props.LockGroup(props.router.params.id);
    }

    onUnlockGroup() {
        let props = this.props as any;
        this.props.UnlockGroup(props.router.params.id);
    }

    onReportPlayer(playerID) {
        let props = this.props as any;
        this.props.ReportPlayerRequest(props.router.params.id, playerID);
    }

    onJoinGroup() {
        let props = this.props as any;
        this.props.JoinGroup(props.router.params.id);
    }

    render() {

        let props = this.props as any;
        let groupChatContent;
        let myself = null;

        if (this.props.data) {
            myself = lodash.filter(this.props.data.subscriptions, (item: any) => {
                return item.playerID === this.props.data.me;
            });
        }

        if (myself && myself.length > 0 && !myself[0].waitingCreatorApproval && this.props.Authed) {
            groupChatContent = (
                <div>
                    <Separator />
                    <GroupChat resources={this.props.Resource} groupid={props.router.params.id}/>
                </div>
            );
        }

        return (
            <div>
                <div className={""}>
                    <div className={""}>
                        <ViewGroupDetails
                            onGroupJoin={this.onJoinGroup}
                            loading={this.props.loading}
                            onGroupDelete={this.props.DeleteGroup}
                            CanEdit={this.props.CanEdit}
                            IsCreator={this.props.IsCreator}
                            CanAccept={this.props.CanAccept}
                            IsSubscribed={this.props.IsSubscribed}
                            Authed={this.props.Authed}
                            Resource={this.props.Resource}
                            ResourceShouldUpdate={this.props.ResourceShouldUpdate}
                            data={this.props.data} />
                        <Separator />
                        <ViewGroupPlayers loading={this.props.loading}
                            Authed={this.props.Authed}
                            CanEdit={this.props.CanEdit}
                            IsCreator={this.props.IsCreator}
                            CanAccept={this.props.CanAccept}
                            IsSubscribed={this.props.IsSubscribed}
                            IsSubscribedAndAccepted={this.props.IsSubscribedAndAccepted}
                            onReportPlayer={this.onReportPlayer}
                            onLockGroup={this.onLockGroup}
                            onUnlockGroup={this.onUnlockGroup}
                            onKickPlayer={this.onKickPlayer}
                            onAcceptPlayer={this.onAcceptPlayer}
                            Resource={this.props.Resource}
                            ResourceShouldUpdate={this.props.ResourceShouldUpdate}
                            data={this.props.data} />
                        {groupChatContent}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Resource: state.resourceViewGroupReducer.Resource,
        ResourceShouldUpdate: state.resourceViewGroupReducer.ResourceShouldUpdate,
        Authed: state.authReducer.authed,
        CanEdit: state.viewGroupReducer.data ? CanEdit(state.viewGroupReducer.data) : false,
        IsCreator: state.viewGroupReducer.data ? IsCreator(state.viewGroupReducer.data) : false,
        CanAccept: state.viewGroupReducer.data ? CanAccept(state.viewGroupReducer.data) : false,
        IsSubscribed: state.viewGroupReducer.data ? IsSubscribed(state.viewGroupReducer.data) : false,
        IsSubscribedAndAccepted: state.viewGroupReducer.data ? IsSubscribedAndAccepted(state.viewGroupReducer.data) : false,

        data: state.viewGroupReducer.data,
        loading: state.viewGroupReducer.loading,
        removed: state.viewGroupReducer.removed,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchResource: () => dispatch(fetchViewGroupResource()),
        onMount: (groupid) => {
            dispatch({ type: types.GROUP_BYID_MOUNT });
            dispatch({ type: types.PAGE_CHANGE, data: {
                page: 'ViewGroup',
                data: groupid,
            }});
        },
        onUnmount: () => {
            dispatch({
                type: types.PAGE_CHANGE, data: {
                    page: null,
                    data: null,
                }
            });
        },
        FetchGroup: (id) => dispatch(GroupByIDRequest(id)),
        DeleteGroup: (id) => dispatch(DeleteGroupRequest(id)),
        LockGroup: (id) => dispatch(LockRequest(id)),
        UnlockGroup: (id) => dispatch(UnlockRequest(id)),
        AcceptPlayerRequest: (groupid, playerid) => dispatch(AcceptPlayerRequest(groupid, playerid)),
        KickPlayerRequest: (groupid, playerid) => dispatch(KickPlayerRequest(groupid, playerid)),
        ReportPlayerRequest: (groupid, playerid) => dispatch(ReportPlayerRequest(groupid, playerid)),
        JoinGroup: (groupid) => dispatch(JoinGroup(groupid)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewGroup);