declare var require;

import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import EmojiPopover from "./EmojiPopover";
import Separator from "../components/Separator";
import * as Moment from 'moment';
import * as constants from "../utils/Constants";
import * as lodash from 'lodash';
import { Link } from 'react-router';
import AreYouSureModal from '../components/AreYouSureModal';
import GroupReportModal from '../components/GroupReportModal';
var ReduxForm = require('redux-form');

export interface ViewGroupPlayersProps {
    data: any;
    Authed: boolean;
    loading: boolean;
    onKickPlayer: any;
    onAcceptPlayer: any;
    onLockGroup: any;
    onUnlockGroup: any;
    onReportPlayer: any;
    CanEdit: boolean;
    IsCreator: boolean;
    CanAccept: boolean;
    IsSubscribed: boolean;
    IsSubscribedAndAccepted: boolean;
    Resource: any;
    ResourceShouldUpdate: boolean;
}

export interface ViewGroupPlayersState {
    showKickPlayer: boolean;
    kickPlayerID: string;
    showAcceptPlayer: boolean;
    acceptPlayerID: string;
    showReportPlayer: boolean;
    reportPlayerID: string;
}

export const validate = (values, props) => {
    const errors: any = {}

    if (!values.description) {
        errors.description = 'This field is required';
    }
    if (values.description && values.description.length > 1000) {
        errors.description = 'Length exceeded';
    }
    return errors;
}

export class ViewGroupPlayers extends React.Component<ViewGroupPlayersProps, ViewGroupPlayersState> {

    constructor() {
        super();

        this.state = {
            showKickPlayer: false,
            kickPlayerID: null,
            showAcceptPlayer: false,
            acceptPlayerID: null,
            showReportPlayer: false,
            reportPlayerID: null,
        };

        this.onKickClick = this.onKickClick.bind(this);
        this.NoKick = this.NoKick.bind(this);
        this.YesKick = this.YesKick.bind(this);
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.YesAccept = this.YesAccept.bind(this);
        this.NoAccept = this.NoAccept.bind(this);
        this.ReportPlayerClick = this.ReportPlayerClick.bind(this);
        this.ReportPlayerSend = this.ReportPlayerSend.bind(this);
        this.ReportPlayerCancel = this.ReportPlayerCancel.bind(this);
    }

    componentDidMount() {
    }

    YesKick() {

        let kickPlayerID = this.state.kickPlayerID;

        this.props.onKickPlayer(kickPlayerID);
        this.setState({ showKickPlayer: false, kickPlayerID: null });
    }

    NoKick() {
        this.setState({ showKickPlayer: false, kickPlayerID: null });
    }

    onKickClick(playerID: any) {
        this.setState({ showKickPlayer: true, kickPlayerID: playerID });
    }

    onAcceptClick(playerID: any) {
        this.setState({ showAcceptPlayer: true, acceptPlayerID: playerID });
    }

    YesAccept() {
        let acceptPlayerID = this.state.acceptPlayerID;
        this.props.onAcceptPlayer(acceptPlayerID);
        this.setState({ showAcceptPlayer: false, acceptPlayerID: null });
    }

    NoAccept() {
        this.setState({ showAcceptPlayer: false, acceptPlayerID: null });
    }

    ReportPlayerClick(playerID: any) {
        this.setState({ showReportPlayer: true, reportPlayerID: playerID });
    }

    ReportPlayerSend() {
        let reportPlayerID = this.state.reportPlayerID;
        this.props.onReportPlayer(reportPlayerID);
        this.setState({ showReportPlayer: false, reportPlayerID: null });
    }

    ReportPlayerCancel() {
        this.setState({ showReportPlayer: false, reportPlayerID: null });
    }

    buildPlayersActionsContent(subscription) {

        let content;
        let kickContent;
        let reportContent;

        if (this.props.data && this.props.IsCreator && !this.props.data.locked && this.props.Authed) {
            kickContent = (
                <button title={this.props.Resource ? this.props.Resource.kickthisplayerout : ""}
                    disabled={this.props.loading}
                    onClick={() => { this.onKickClick(subscription.playerID) }} className={'btn btn-danger'}>
                    <i className={"fa fa-remove"} aria-hidden="true"></i>
                </button>
            );
        }
        if (this.props.data && (this.props.IsSubscribedAndAccepted || this.props.IsCreator) && !subscription.hasReport && this.props.Authed) {
            reportContent = (
                <button title={this.props.Resource ? this.props.Resource.reportthisplayer : ""}
                    onClick={() => { this.ReportPlayerClick(subscription.playerID) }}
                    disabled={this.props.loading}
                    className={'btn btn-warning small-margin-left'}>
                    <i className={"fa fa-exclamation-triangle"} aria-hidden="true"></i>
                </button>
            );
        }

        content = (
            <div>
                {kickContent}
                {reportContent}
            </div>    
        );

        return content;
    }

    buildWaitingListActionsContent(subscription) {

        let content;
        let acceptContent;
        let reportContent;

        if (this.props.data && this.props.IsCreator && !this.props.data.locked && this.props.CanAccept && this.props.Authed) {
            acceptContent = (
                <button title={this.props.Resource ? this.props.Resource.acceptthisplayeringrp : ""}
                    disabled={this.props.loading}
                    onClick={() => { this.onAcceptClick(subscription.playerID) }} className={'btn btn-success'}>
                    <i className={"fa fa-check"} aria-hidden="true"></i>
                </button>
            );
        }
        if (this.props.data && this.props.IsCreator && !this.props.data.locked && this.props.CanAccept && !subscription.hasReport && this.props.Authed) {
            reportContent = (
                <button title={this.props.Resource ? this.props.Resource.reportthisplayer : ""}
                    onClick={() => { this.ReportPlayerClick(subscription.playerID) }}
                    disabled={this.props.loading}
                    className={'btn btn-warning small-margin-left'}>
                    <i className={"fa fa-exclamation-triangle"} aria-hidden="true"></i>
                </button>
            );
        }

        content = (
            <div>
                {acceptContent}
                {reportContent}
            </div>
        );

        return content;
    }

    buildLockUnlockContent() {

        let content;

        if (this.props.data) {
            if (!this.props.data.locked && this.props.IsCreator && this.props.Authed) {
                content = (
                    <div className={'pull-right'}>
                        <button
                            onClick={this.props.onLockGroup}
                            className={'btn btn-primary'}>
                            <i className={"fa fa-lock"} aria-hidden="true"></i>
                            <span> {this.props.Resource ? this.props.Resource.lockgrp : ""}</span>
                        </button>
                    </div>
                );
            } else if (this.props.data.locked && this.props.IsCreator && this.props.Authed) {
                content = (
                    <div className={'pull-right'}>
                        <button
                            onClick={this.props.onUnlockGroup}
                            className={'btn btn-primary'}>
                            <i className={"fa fa-unlock"} aria-hidden="true"></i>
                            <span> {this.props.Resource ? this.props.Resource.unlockgrp : ""}</span>
                        </button>
                    </div>
                );
            }
        }

        return content;
    }

    buildGuestsContent() {
        let guests = [];

        if (this.props.data) {
            let ret = lodash.filter(this.props.data.subscriptions, (item: any) => {
                return item.isCreator;
            });

            if (ret.length > 0) {
                guests.push(
                    <div key={'masterplayer'} className={'large-margin-top'}>
                        <img className={"profile-picture profile-picture-master"} id={"profile-picture"}
                            src={`${constants.PROFILE_AVATAR_2}/${ret[0].playerID}`} />
                        <div>
                            <Link to={`/Profile/${ret[0].playerID}`} className={"btn-link"}>{ret[0].username}</Link>
                        </div>
                    </div>
                );
            }

            ret = lodash.filter(this.props.data.subscriptions, (item: any) => {
                return !item.isCreator && !item.waitingCreatorApproval;
            });
            let missingsNb = this.props.data.need - this.props.data.have;
            let missings = [];

            for (; missingsNb > 0; missingsNb--) {
                missings.push({ playerID: null });
            }

            ret = [...ret, ...missings];
            guests.push(ret.map((val, idx) => {
                let clearfix;
                if (idx !== 0 && !(idx % 3)) {
                    clearfix = (<div className={'clearfix'}></div>);
                }
                if (val.playerID !== null) {
                    return (
                        <div key={`${val.playerID}_${idx}`}>
                            {clearfix}
                            <div className={'col-md-4 col-xs-12'}>
                                <div className={'large-margin-top'}>
                                    <img className={"profile-picture"}
                                        src={`${constants.PROFILE_AVATAR_2}/${val.playerID}`} />
                                    <div>
                                        <Link to={`/Profile/${val.playerID}`} className={"btn-link"}>{val.username}</Link>
                                    </div>
                                    {this.buildPlayersActionsContent(val)}
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div key={`empty_${idx}`}>
                            {clearfix}
                            <div className={'col-md-4 col-xs-12'}>
                                <div className={'large-margin-top'}>
                                    <div className={'profile-picture profile-picture-empty'}></div>
                                    <div>
                                        <span>{this.props.Resource ? this.props.Resource.waiting : ""}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }));
        }

        return guests;
    }

    buildWaitingListContent() {
        let waitingList;
        let waitingListBlock;

        if (this.props.data) {
            if (!this.props.data.Locked) {
                let waitingListArray = lodash.filter(this.props.data.subscriptions, (item: any) => {
                    return !item.isCreator && item.waitingCreatorApproval;
                });
                waitingList = waitingListArray.map((val, idx) => {
                    let clearfix;
                    if (idx !== 0 && !(idx % 6)) {
                        clearfix = (<div className={'clearfix'}></div>);
                    }
                    return (
                        <div key={`${val.playerID}_${idx}`}>
                            {clearfix}
                            <div className={'col-md-4 col-xs-12'}>
                                <div className={'large-margin-top'}>
                                    <img className={"profile-picture"}
                                        src={`${constants.PROFILE_AVATAR_2}/${val.playerID}`} />
                                    <div>
                                        <Link to={`/Profile/${val.playerID}`} className={"btn-link"}>{val.username}</Link>
                                    </div>
                                    {this.buildWaitingListActionsContent(val)}
                                </div>
                            </div>
                        </div>
                    );
                });

                if (waitingListArray && waitingListArray.length === 0) {
                    waitingList = (
                        <div>
                            <h4>{this.props.Resource ? this.props.Resource.nothinghere : ""}</h4>
                        </div>
                    );
                }

                waitingListBlock = (
                    <div>
                        <div>
                            <h3>
                                {this.props.Resource ? this.props.Resource.waitinglist : ""}
                            </h3>
                            <div className={'align-center'}>
                                <div className={'row player-list'}>
                                    {waitingList}
                                </div>
                                <div className={'clearfix'}></div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
        return waitingListBlock;
    }

    render() {

        return (
            <div>
                <AreYouSureModal text={this.props.Resource ? this.props.Resource.areyousure : ""}
                    yes={this.props.Resource ? this.props.Resource.yes : ""}
                    no={this.props.Resource ? this.props.Resource.no : ""}
                    show={this.state.showKickPlayer}
                    noClick={this.NoKick}
                    yesClick={this.YesKick} />
                <AreYouSureModal text={this.props.Resource ? this.props.Resource.areyousure : ""}
                    yes={this.props.Resource ? this.props.Resource.yes : ""}
                    no={this.props.Resource ? this.props.Resource.no : ""}
                    show={this.state.showAcceptPlayer}
                    noClick={this.NoAccept}
                    yesClick={this.YesAccept} />
                <GroupReportModal text={this.props.Resource ? this.props.Resource.whyreportplayer : ""}
                    send={this.props.Resource ? this.props.Resource.send : ""}
                    cancel={this.props.Resource ? this.props.Resource.cancel : ""}
                    cancelClick={this.ReportPlayerCancel}
                    show={this.state.showReportPlayer}
                    sendClick={this.ReportPlayerSend}
                />
                <div className={'row'}>
                    <div className={'col-lg-12'}>
                        {this.buildLockUnlockContent()}
                    </div>
                    <div className={'clearfix'}></div>
                    <div className={'col-lg-6'}>
                        <div>
                            <h3>
                                {this.props.Resource ? this.props.Resource.players : ""}
                            </h3>
                        </div>
                        <div className={'align-center'}>
                        </div>
                        <div className={'align-center'}>
                            <div className={'row player-list'}>
                                {this.buildGuestsContent()}
                            </div>
                            <div className={'clearfix'}></div>
                        </div>
                    </div>
                    <div className={'col-lg-6'}>
                        {this.buildWaitingListContent()}
                    </div>
                </div>
                <div className={'clearfix'}></div>
            </div>
        );
    }
}

let viewGroupPlayers = ReduxForm.reduxForm({
    form: 'viewGroupPlayersForm',
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    validate,
})(ViewGroupPlayers);

export default viewGroupPlayers;