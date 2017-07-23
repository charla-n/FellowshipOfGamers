declare var require;

import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import EmojiPopover from "./EmojiPopover";
import Separator from "../components/Separator";
import * as Moment from 'moment';
var emojione = require('emojione');
import { browserHistory, Link } from 'react-router';
import AreYouSureModal from '../components/AreYouSureModal';
import * as constants from "../utils/Constants";

export interface ViewGroupDetailsProps {
    data: any;
    Authed: boolean;
    onGroupDelete: any;
    onGroupJoin: any;
    loading: boolean;
    CanEdit: boolean;
    IsCreator: boolean;
    CanAccept: boolean;
    IsSubscribed: boolean;
    Resource: any;
    ResourceShouldUpdate: boolean;
}

export interface ViewGroupDetailsState {
    show: boolean;
}

export class ViewGroupDetails extends React.Component<ViewGroupDetailsProps, ViewGroupDetailsState> {

    constructor() {
        super();

        this.state = {
            show: false,
        };

        this.YesClickDelete = this.YesClickDelete.bind(this);
        this.NoClickDelete = this.NoClickDelete.bind(this);
        this.DeleteClick = this.DeleteClick.bind(this);
    }

    componentDidMount() {
    }

    YesClickDelete() {
        this.setState({ show: false });
        this.props.onGroupDelete(this.props.data.id);
    }

    NoClickDelete() {
        this.setState({ show: false });
    }

    DeleteClick() {
        this.setState({ show: true });
    }

    buildActionsRow() {
        if (this.props.data && this.props.IsCreator && this.props.CanEdit && !this.props.data.locked && this.props.Authed) {
            return (
                <div>
                    <div className={'row'}>
                        <div className={'col-xs-12'}>
                            <button className={'btn btn-danger pull-right small-margin-left'}
                                disabled={this.props.loading}
                                onClick={this.DeleteClick}>
                                <i className={"fa fa-remove"} aria-hidden="true"></i>
                                <span> Delete</span>
                            </button>
                            <Link to={`/EditGroup/${this.props.data.id}`}
                                disabled={this.props.loading}
                                className={"btn btn-primary pull-right"}>
                                <i className={"fa fa-pencil"} aria-hidden="true"></i>
                                <span> Edit</span>
                            </Link>
                        </div>
                    </div>
                    <div className={'pull-right'}></div>
                </div>
            );
        } else if (this.props.data && this.props.CanAccept && !this.props.IsSubscribed && this.props.Authed) {
            return (
                <div>
                    <div className={'row'}>
                        <div className={'col-xs-12'}>
                            <button className={'btn btn-primary pull-right small-margin-left'}
                                disabled={this.props.loading}
                                onClick={this.props.onGroupJoin}>
                                <i className={"fa fa-sign-in"} aria-hidden="true"></i>
                                <span> Join</span>
                            </button>
                        </div>
                    </div>
                    <div className={'pull-right'}></div>
                </div>
            );
        }
        return <div></div>;
    }

    render() {

        let games;
        let dateStart;
        let duration;
        let need;
        let have;
        let language;
        let communications;
        let playStyles;
        let ages;
        let description;
        let image;

        if (this.props.data) {
            games = this.props.data.games.map((val, idx) => {
                return val.text;
            }).join(', ');
            dateStart = Moment.utc(this.props.data.dateStart).local().format('L LT');
            duration = `${this.props.data.hours} hours ${this.props.data.minutes} minutes`;
            need = this.props.data.need;
            have = this.props.data.have;
            language = this.props.data.language.text;
            communications = this.props.data.communications.map((val, idx) => {
                return val.text;
            }).join(', ');
            playStyles = this.props.data.playStyles.map((val, idx) => {
                return val.text;
            }).join(', ');
            ages = this.props.data.ages.map((val, idx) => {
                return val.text;
            }).join(', ');
            description = emojione.shortnameToImage(this.props.data.htmlDescription ? this.props.data.htmlDescription : this.props.data.description);
            image = <img className={"profile-picture"}
                src={`${constants.GROUP_IMAGE + '/' + this.props.data.id}`} />
        }

        return (
            <div>
                <AreYouSureModal text={this.props.Resource ? this.props.Resource.areyousure : ""}
                    yes={this.props.Resource ? this.props.Resource.yes : ""}
                    no={this.props.Resource ? this.props.Resource.no : ""}
                    show={this.state.show}
                    noClick={this.NoClickDelete}
                    yesClick={this.YesClickDelete} />
                {this.buildActionsRow()}
                <div className={"align-center"}>
                    <h2>{games}</h2>
                    <div>
                        {image}
                    </div>
                    <div className={"row"}>
                        <div className={"col-md-3"}></div>
                        <div className={"col-md-3 col-xs-6"}>
                            <h3>
                                {this.props.Resource ? this.props.Resource.when : ""}
                            </h3>
                            <span>
                                {dateStart}
                            </span>
                        </div>
                        <div className={"col-md-3 col-xs-6"}>
                            <h3>
                                {this.props.Resource ? this.props.Resource.duration : ""}
                            </h3>
                            <span>
                                {duration}
                            </span>
                        </div>
                        <div className={"col-md-3"}></div>
                    </div>
                    <div className={"clearfix"}></div>
                    <div className={"row"}>
                        <div className={"col-md-3"}></div>
                        <div className={"col-md-3 col-xs-6"}>
                            <h3>
                                {this.props.Resource ? this.props.Resource.need : ""}
                            </h3>
                            <span>
                                {need}
                            </span>
                        </div>
                        <div className={"col-md-3 col-xs-6"}>
                            <h3>
                                {this.props.Resource ? this.props.Resource.have : ""}
                            </h3>
                            <span>
                                {have}
                            </span>
                        </div>
                        <div className={"col-md-3"}></div>
                    </div>
                    <div className={"clearfix"}></div>
                    <div className={"row"}>
                        <div className={"col-md-3 col-xs-12"}>
                            <h3>
                                {this.props.Resource ? this.props.Resource.language : ""}
                            </h3>
                            <span>
                                {language}
                            </span>
                        </div>
                        <div className={"clearfix visible-xs"}></div>
                        <div className={"col-md-3 col-xs-12"}>
                            <h3>
                                {this.props.Resource ? this.props.Resource.communication : ""}
                            </h3>
                            <span>
                                {communications}
                            </span>
                        </div>
                        <div className={"clearfix visible-xs"}></div>
                        <div className={"col-md-3 col-xs-12"}>
                            <h3>
                                {this.props.Resource ? this.props.Resource.playstyles : ""}
                            </h3>
                            <span>
                                {playStyles}
                            </span>
                        </div>
                        <div className={"col-md-3 col-xs-12"}>
                            <h3>
                                {this.props.Resource ? this.props.Resource.ages : ""}
                            </h3>
                            <span>
                                {ages}
                            </span>
                        </div>
                        <div className={"clearfix visible-xs"}></div>
                    </div>
                    <div className={"clearfix"}></div>
                </div>
                <Separator />
                <div className={"row"}>
                    <div className={"col-xs-12"}>
                        <h3>
                            {this.props.Resource ? this.props.Resource.description : ""}
                        </h3>
                        <div className={'preserve-newline'} dangerouslySetInnerHTML={{ __html: description }}>
                        </div>
                    </div>
                </div>
                <div className={"clearfix"}></div>
            </div>
        );
    }
}

export default ViewGroupDetails;