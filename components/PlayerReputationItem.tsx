import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import Separator from "./Separator";
import CutdownParagraph from "./CutdownParagraph";
import Stars from "./Stars";
import * as Moment from 'moment';
import { Link } from 'react-router';

export interface PlayerReputationItemProps {
    Data: any;
    Resource: any;
    ResourceShouldUpdate: boolean;
    onReportCommentClick: any;
}

export interface PlayerReputationItemState {
    Reported: boolean;
}

export class PlayerReputationItem extends React.Component<PlayerReputationItemProps, PlayerReputationItemState> {

    constructor() {
        super();

        this.state = {
            Reported: false,
        };

        this.onReportClick = this.onReportClick.bind(this);
    }

    onReportClick() {
        this.setState(Update(this.state, {
            Reported: { $set: true },
        }));
        this.props.onReportCommentClick(this.props.Data.id);
    }

    componentDidMount() {
    }

    render() {
        let reportContent;

        if (!this.state.Reported && this.props.Data.canReport) {
            reportContent = (
                <div>
                    <a className={"btn-link"}
                        onClick={this.onReportClick}
                        href={"javascript:void(0);"}>Report this comment</a>
                </div>
            );
        }

        return (
            <div>
                <h5>
                    <Link to={`/Profile/${this.props.Data.fromUserID}`} className={"btn-link"}>{this.props.Data.fromDisplayName}</Link>
                    <span> {this.props.Resource ? this.props.Resource.ondate : ""} </span>
                    <span>{Moment.utc(this.props.Data.creationDate).local().format('L')}</span>
                </h5>
                <div>
                    <Stars Value={this.props.Data.mark}
                        Classes={"player-reputation-star inline-div"}
                        />
                </div>
                {reportContent}
                <CutdownParagraph Limit={200}
                    Resource={this.props.Resource}
                    Value={this.props.Data.text}
                    />
                <Separator/>
            </div>
        );
    }
}

export default PlayerReputationItem;