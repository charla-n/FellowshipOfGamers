declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import ListController from "../components/ListController";
import PlayerReputationItem from "../components/PlayerReputationItem";
import PlayerReputationRefine from "../components/PlayerReputationRefine";
import { fetchPlayerReputationResource } from '../actions/resourceAction';
import {
    PlayerReputationReadRequest,
    PlayerReputationReportRequest
} from '../actions/playerReputationAction';
import PlayerAverageReputation from "../components/PlayerAverageReputation";
import Separator from "../components/Separator";

export interface PlayerReputationProps {
    userid: any;
    Loading: boolean;
    onMount: any;
    Authed: boolean;
    FetchResource: any;
    ResourceShouldUpdate: boolean;
    Resource: any;
    onRequestData: any;
    Data: any;
    reportCommentRequest: any;
    AverageReputation: any;
}

export class PlayerReputation extends React.Component<PlayerReputationProps, {}> {

    common: Common;
    recaptchaInstance: any;

    constructor() {
        super();

        this.common = new Common();
    }

    componentDidMount() {
        this.props.onMount();
        this.props.FetchResource();

    }

    componentWillReceiveProps(nextprops: PlayerReputationProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
    }

    render() {

        return (
            <div>
                <div>
                    <h3 className={'title-separator'}>
                        {this.props.Resource ? this.props.Resource.reputationtitle : ""}
                    </h3>
                </div>
                <div>
                    <PlayerAverageReputation
                        AverageReputation={this.props.AverageReputation} />
                    <Separator />
                    <ListController
                        Data={this.props.Data}
                        Loading={this.props.Loading}
                        Name={"playerreputation_list"}
                        Resource={this.props.Resource}
                        RequestData={this.props.onRequestData}
                        ResourceShouldUpdate={this.props.ResourceShouldUpdate}
                        GetParams={[this.props.userid]}
                        AdditionalData={{}}
                    >
                        <PlayerReputationRefine loading={false} onRefineChange={null}
                            Resource={null} ResourceShouldUpdate={null} />
                        <PlayerReputationItem Resource={this.props.Resource}
                            onReportCommentClick={this.props.reportCommentRequest}
                            ResourceShouldUpdate={this.props.ResourceShouldUpdate}
                            Data={null} />
                    </ListController>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Resource: state.resourcePlayerReputationReducer.Resource,
        ResourceShouldUpdate: state.resourcePlayerReputationReducer.ResourceShouldUpdate,
        Loading: state.playerReputationReducer.loading,
        Authed: state.authReducer.authed,
        Data: state.playerReputationReducer.data,
        AverageReputation: state.playerProfileReducer.averageReputation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchResource: () => dispatch(fetchPlayerReputationResource()),
        onRequestData: (data, getParams) => dispatch(PlayerReputationReadRequest(getParams, data)),
        onMount: () => dispatch({ type: types.REPUTATION_MOUNT }),
        reportCommentRequest: (playerReputationID) => dispatch(PlayerReputationReportRequest(playerReputationID)),
    }
}

let playerReputation = connect(mapStateToProps, mapDispatchToProps)(PlayerReputation); 

export default playerReputation;