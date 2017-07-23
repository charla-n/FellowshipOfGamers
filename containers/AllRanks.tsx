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
import RankRequirement from '../components/RankRequirement';

export interface AllRanksProps {
    Loading: boolean;
    onMount: any;
    Authed: boolean;
    FetchResource: any;
    ResourceShouldUpdate: boolean;
    Resource: any;
}

export class AllRanks extends React.Component<AllRanksProps, {}> {

    constructor() {
        super();
    }

    componentDidMount() {
        let props = this.props as any;

        this.props.onMount();
        this.props.FetchResource();
    }

    componentWillReceiveProps(nextprops: AllRanksProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
    }

    getRank(rank) {
        return constants.RANK_NAMES[rank];
    }

    getTrend(rank) {
        return constants.RANK_TRENDS[rank];
    }

    render() {

        let allRanks = [];

        for (let i = 0; i < 7; i++) {
            allRanks.push(<div key={`allranks_${i}`} className={'rank-container'}>
                <div className={'row'}>
                    <div>
                        <div className={'col-xs-12 col-sm-8'}>
                            <div className={''}>
                                <h3 className={'small-margin-top'}><b>{this.getRank(i)}</b></h3>
                                <Trend
                                    smooth
                                    autoDraw
                                    autoDrawDuration={1500}
                                    autoDrawEasing="ease-in"
                                    data={this.getTrend(i)}
                                    gradient={['#0FF', '#F0F', '#FF0']} />
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={`col-xs-12 col-sm-4 `}>
                            <h4>
                                {this.props.Resource ? this.props.Resource.rankrequirement : ""}
                            </h4>
                            <RankRequirement Resource={this.props.Resource} ResourceShouldUpdate={this.props.ResourceShouldUpdate} Rank={i}/>
                        </div>
                    </div>
                </div>
                <div className={'clearfix'}></div>
            </div>
            );
        }

        return (
            <div>
                <div className={'title-separator'}>
                    <h3>
                        {this.props.Resource ? this.props.Resource.allrankstitle : ""}
                    </h3>
                </div>
                <br />
                {allRanks}
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchResource: () => dispatch(fetchRanksAndTitlesResource()),
        onMount: () => { },
    }
}

let allRanks = connect(mapStateToProps, mapDispatchToProps)(AllRanks); 

export default allRanks;