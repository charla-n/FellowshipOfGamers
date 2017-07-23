declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import { PlayerProfileReadRequest } from '../actions/playerProfileAction';
import { fetchRanksAndTitlesResource } from '../actions/resourceAction';
import renderField from "../components/Field";
var ReduxForm = require('redux-form');
import Trend from 'react-trend';
import { Link } from 'react-router';
import RankRequirement from '../components/RankRequirement';

export interface RanksAndTitlesProps {
    Loading: boolean;
    onMount: any;
    Authed: boolean;
    FetchResource: any;
    ResourceShouldUpdate: boolean;
    Resource: any;
    FetchProfile: any;
    Rank: number;
}

export interface RanksAndTitlesStates {
    userid: any;
}

export class RanksAndTitles extends React.Component<RanksAndTitlesProps, RanksAndTitlesStates> {

    constructor() {
        super();

        this.state = {
            userid: null,
        };
    }

    componentDidMount() {
        let props = this.props as any;

        this.props.onMount();
        this.props.FetchResource();
        this.props.FetchProfile(props.router.params.userid);

        this.setState(Update(this.state, {
            userid: { $set: props.router.params.userid },
        }));
    }

    componentWillReceiveProps(nextprops: RanksAndTitlesProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
    }

    getCurrentRank() {
        if (this.props.Rank === null || this.props.Rank === undefined) {
            return "-";
        }
        if (this.props.Rank === -1) {
            return "BANNED";
        }
        return constants.RANK_NAMES[this.props.Rank];
    }

    getNextRank() {
        if (this.props.Rank === null || this.props.Rank === undefined) {
            return "-";
        }
        if ((this.props.Rank + 1) === constants.RANK_NAMES.length ||
            (this.props.Rank + 1) === 7) {
            return constants.RANK_NAMES[this.props.Rank];
        }
        return constants.RANK_NAMES[this.props.Rank + 1];
    }

    getTrend() {
        if (this.props.Rank === null || this.props.Rank === undefined) {
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        if (this.props.Rank === -1) {
            return [0, 1];
        }
        return constants.RANK_TRENDS[this.props.Rank];
    }

    getNextTrend() {
        if (this.props.Rank === null || this.props.Rank === undefined) {
            return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        if ((this.props.Rank + 1) === constants.RANK_TRENDS.length ||
            (this.props.Rank + 1) === 7) {
            return constants.RANK_TRENDS[this.props.Rank];
        }
        return constants.RANK_TRENDS[this.props.Rank + 1];
    }

    render() {

        let rankContainer;

        if (this.state.userid) {
            rankContainer = (
                <div>
                    <div className={'col-xs-6'}>
                        <div className={''}>
                            <h3 className={'small-margin-top'}><b>{this.getCurrentRank()}</b></h3>
                            <Trend
                                smooth
                                autoDraw
                                autoDrawDuration={1500}
                                autoDrawEasing="ease-in"
                                data={this.getTrend()}
                                gradient={['#0FF', '#F0F', '#FF0']} />
                        </div>
                    </div>
                </div>
            );
        } else {
            rankContainer = (
                <div>
                    <div className={'col-xs-12 col-sm-4'}>
                        <div className={''}>
                            <h4>{this.props.Resource ? this.props.Resource.yourrank : ""}</h4>
                            <h3 className={'small-margin-top'}><b>{this.getCurrentRank()}</b></h3>
                            <Trend
                                smooth
                                autoDraw
                                autoDrawDuration={1500}
                                autoDrawEasing="ease-in"
                                data={this.getTrend()}
                                gradient={['#0FF', '#F0F', '#FF0']} />
                        </div>
                    </div>
                    <div className={'col-xs-12 col-sm-4'}>
                        <div className={''}>
                            <h4>{this.props.Resource ? this.props.Resource.nextrank : ""}</h4>
                            <h3 className={'small-margin-top'}><b>{this.getNextRank()}</b></h3>
                            <Trend
                                smooth
                                autoDraw
                                autoDrawDuration={1500}
                                autoDrawEasing="ease-in"
                                data={this.getNextTrend()}
                                gradient={['#0FF', '#F0F', '#FF0']} />
                        </div>
                    </div>
                    <div className={'col-xs-12 col-sm-4'}>
                        <h4>
                            {this.props.Resource ? this.props.Resource.gettingnextrank : ""}
                        </h4>
                        <RankRequirement Rank={this.props.Rank !== null && this.props.Rank !== undefined ? this.props.Rank + 1 : -42}
                            Resource={this.props.Resource}
                            ResourceShouldUpdate={this.props.ResourceShouldUpdate} />
                    </div>
                </div>
            );
        }

        return (
            <div>
                <div className={'title-separator'}>
                    <h3>
                        {this.props.Resource ? this.props.Resource.rank : ""}
                    </h3>
                </div>
                <br/>
                <div className={'rank-container'}>
                    <div className={'pull-right'}>
                        <Link className={"btn btn-primary pull-right"} to="/AllRanks">
                            <span>{this.props.Resource ? this.props.Resource.allranks : ""}</span>
                        </Link>
                    </div>
                    <div className={'clearfix'}></div>
                    <hr/>
                    <div className={'row'}>
                        {rankContainer}
                    </div>
                    <div className={'clearfix'}></div>
                </div>
                <div className={'title-separator'}>
                    <h3>
                        {this.props.Resource ? this.props.Resource.titlestitle : ""}
                    </h3>
                </div>
                <br />
                <div>
                    <h4>COMING SOON</h4>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Resource: state.resourceRanksAndTitlesReducer.Resource,
        ResourceShouldUpdate: state.resourceRanksAndTitlesReducer.ResourceShouldUpdate,
        Loading: state.playerProfileReducer.loading,
        Authed: state.authReducer.authed,
        Rank: state.playerProfileReducer.rank,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchResource: () => dispatch(fetchRanksAndTitlesResource()),
        onMount: () => dispatch({ type: types.PLAYERPROFILE_MOUNT }),
        FetchProfile: (userid) => dispatch(PlayerProfileReadRequest(!userid ? '' : userid))
    }
}

let ranksAndTitles = connect(mapStateToProps, mapDispatchToProps)(RanksAndTitles); 

export default ranksAndTitles;