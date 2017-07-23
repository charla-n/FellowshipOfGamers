declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import renderField from "../components/Field";
import PlayerProfile from "./PlayerProfile";
import PlayerReputation from "./PlayerReputation";

export interface ProfileProps {
    Authed: boolean;
}

export interface ProfileState {
    UserID: string;
}

export class Profile extends React.Component<ProfileProps, ProfileState> {

    common: Common;

    constructor(props) {
        super();

        this.state = {
            UserID: props.router.params.userid,
        };

        this.common = new Common();
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextprops) {
        let props = this.props as any;

        if (props.router.params.userid !== this.state.UserID) {
            this.setState(Update(this.state, {
                UserID: { $set: props.router.params.userid }
            }));
        }
    }

    render() {

        let content;
        content = (
            <div className={"row"}>
                <div className={"col-lg-7 col-md-12"}>
                    <PlayerProfile userid={this.state.UserID} />
                </div>
                <div className={"col-lg-5 col-md-12"}>
                    <PlayerReputation userid={this.state.UserID} />
                </div>
            </div>
        );

        return (
            <div>
                {content}
                <div className={"clearfix"}></div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Authed: state.authReducer.authed,
    }
}

let playerProfile = connect(mapStateToProps)(Profile);

export default playerProfile;
