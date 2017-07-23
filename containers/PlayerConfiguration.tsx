declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import renderField from "../components/Field";
import Toggle from 'react-toggle';
import {
    PlayerProfileReadConfiguration,
    PlayerProfileSaveConfiguration
} from '../actions/playerProfileAction';
import { fetchSettingsResource } from '../actions/resourceAction'
var ReduxForm = require('redux-form');

export interface PlayerConfigurationProps {
    Loading: boolean;
    onMount: any;
    Authed: boolean;
    data: any;
    readAlertConfiguration: any;
    saveAlertConfiguration: any;
    changeConfiguration: any;
    ResourceShouldUpdate: boolean;
    Resource: any;
    FetchResource: any;
}

export class ForgotPassword extends React.Component<PlayerConfigurationProps, {}> {

    constructor() {
        super();

        this.changeConfiguration = this.changeConfiguration.bind(this);
    }

    componentDidMount() {
        this.props.onMount();
        this.props.readAlertConfiguration();
        this.props.FetchResource();
    }

    componentWillReceiveProps(nextprops: PlayerConfigurationProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
    }


    changeConfiguration(e, id) {
        let data = { ...this.props.data };

        data[id] = e.target.checked;
        this.props.changeConfiguration(data);
    }

    render() {

        return (
            <div>
                <div className={'title-separator'}>
                    <h3>
                        {this.props.Resource ? this.props.Resource.configurealerttitle : ""}
                    </h3>
                </div>
                <br/>
                <div>
                    <div className={'row'}>
                        <div className={'col-sm-6 col-xs-12'}>
                            <h5>{this.props.Resource ? this.props.Resource.settingsemail : ""}</h5>
                            <div className={'form-group'}>
                                <Toggle
                                    id={'newsletter-email'}
                                    onChange={(e) => this.changeConfiguration(e, 'newsletterEmail')}
                                    checked={this.props.data.newsletterEmail}
                                />
                                <label className={'control-label small-margin-left'}>
                                    {this.props.Resource ? this.props.Resource.settingsnewsletter : ""}
                                    </label>
                            </div>
                            <div className={'form-group'}>
                                <Toggle
                                    id={'newmessage-email'}
                                    onChange={(e) => this.changeConfiguration(e, 'newMessageEmail')}
                                    checked={this.props.data.newMessageEmail}
                                />
                                <label className={'control-label small-margin-left'}>
                                    {this.props.Resource ? this.props.Resource.settingsrecmsg : ""}
                                    </label>
                            </div>
                            <div className={'form-group'}>
                                <Toggle
                                    id={'receivedreview-email'}
                                    onChange={(e) => this.changeConfiguration(e, 'receivedReviewEmail')}
                                    checked={this.props.data.receivedReviewEmail}
                                />
                                <label className={'control-label small-margin-left'}>
                                    {this.props.Resource ? this.props.Resource.settingsrecreview : ""}
                                    </label>
                            </div>
                            <div className={'form-group'}>
                                <Toggle
                                    id={'playerjoinedgroup-email'}
                                    onChange={(e) => this.changeConfiguration(e, 'playerJoinedEmail')}
                                    checked={this.props.data.playerJoinedEmail}
                                />
                                <label className={'control-label small-margin-left'}>
                                    {this.props.Resource ? this.props.Resource.settingsplayerjoinedgrp : ""}
                                    </label>
                            </div>
                            <div className={'form-group'}>
                                <Toggle
                                    id={'acceptedingroup-email'}
                                    onChange={(e) => this.changeConfiguration(e, 'youveBeenAcceptedEmail')}
                                    checked={this.props.data.youveBeenAcceptedEmail}
                                />
                                <label className={'control-label small-margin-left'}>
                                    {this.props.Resource ? this.props.Resource.settingsacceptedingrp : ""}
                                    </label>
                            </div>
                            <div className={'form-group'}>
                                <Toggle
                                    id={'removedfromgroup-email'}
                                    onChange={(e) => this.changeConfiguration(e, 'youveBeenKickedEmail')}
                                    checked={this.props.data.youveBeenKickedEmail}
                                />
                                <label className={'control-label small-margin-left'}>
                                    {this.props.Resource ? this.props.Resource.settingsremovedfromgrp : ""}
                                    </label>
                            </div>
                            <div className={'form-group'}>
                                <Toggle
                                    id={'receivedaward-email'}
                                    onChange={(e) => this.changeConfiguration(e, 'receivedAwardEmail')}
                                    checked={this.props.data.receivedAwardEmail}
                                />
                                <label className={'control-label small-margin-left'}>
                                    {this.props.Resource ? this.props.Resource.settingsreceivedaward : ""}
                                    </label>
                            </div>
                            <div className={'form-group'}>
                                <Toggle
                                    id={'receivedrank-email'}
                                    onChange={(e) => this.changeConfiguration(e, 'receivedRankEmail')}
                                    checked={this.props.data.receivedRankEmail}
                                />
                                <label className={'control-label small-margin-left'}>
                                    {this.props.Resource ? this.props.Resource.settingsreceivedrank : ""}
                                    </label>
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-sm-6 col-xs-12'}>
                            <h5>{this.props.Resource ? this.props.Resource.settingsnotification : ""}</h5>
                            <div className={'form-group'}>
                                <Toggle
                                    id={'newsletter-notif'}
                                    onChange={(e) => this.changeConfiguration(e, 'newsletterNotification')}
                                    checked={this.props.data.newsletterNotification}
                                />
                                <label className={'control-label small-margin-left'}>
                                    {this.props.Resource ? this.props.Resource.settingsnewsletter : ""}
                                    </label>
                            </div>
                        </div>
                        <div className={'clearfix'}></div>
                        <div className={'col-xs-12'}>
                            <button className={'btn btn-primary pull-right'}
                                onClick={this.props.saveAlertConfiguration}
                            >
                                <i className={"fa fa-save"} aria-hidden="true"></i>
                                <span> {this.props.Resource ? this.props.Resource.save : ""}</span>
                            </button>
                        </div>
                        <div className={'clearfix'}></div>
                    </div>
                    <div className={'clearfix'}></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Resource: state.resourceSettingsReducer.Resource,
        ResourceShouldUpdate: state.resourceSettingsReducer.ResourceShouldUpdate,
        Loading: state.alertConfigurationReducer.loading,
        Authed: state.authReducer.authed,
        data: state.alertConfigurationReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => dispatch({ type: types.PLAYER_CONFIGURATION_MOUNT }),
        readAlertConfiguration: () => dispatch(PlayerProfileReadConfiguration()),
        saveAlertConfiguration: () => dispatch(PlayerProfileSaveConfiguration()),
        changeConfiguration: (data) => dispatch({ type: types.PLAYER_CONFIGURATION_SUCCESS, data }),
        FetchResource: () => dispatch(fetchSettingsResource()),
    }
}

let forgotPassword = connect(mapStateToProps, mapDispatchToProps)(ForgotPassword); 

export default forgotPassword;