declare var require;

import * as React from "react";
import * as lodash from 'lodash';
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import YoureSpecial from "../components/YoureSpecial";
import DeleteAccount from "../components/DeleteAccount";
import { Link } from 'react-router';
var emojione = require('emojione');

export interface PlayerProfileReadProps {

    isOwnAccount: boolean;

    Resource: any;

    username: string;
    playerType: any;
    timezone: string;
    playerLanguages: any;
    description: string;

    strength: any;
    perception: any;
    endurance: any;
    charisma: any;
    intelligence: any;
    agility: any;
    luck: any;

    avatarB64: string;

    loading: boolean;

    onRemoveAccountClick: any;
    onEditClick: any;
    userid: any;
}

export class PlayerProfileRead extends React.Component<PlayerProfileReadProps, {}> {

    constructor() {
        super();
    }

    render() {

        let playerType;
        let languages;
        let description;
        let timezone;
        let ranksAndTitlesTo = this.props.userid ? '/RanksTitles/' + this.props.userid : '/RanksTitles';

        if (this.props.playerType === null || this.props.playerType === "") {
            playerType = this.props.Resource ? this.props.Resource.notconfigured : "";
        } else {
            playerType = this.props.playerType.text;
        }
        if (this.props.playerLanguages === null || this.props.playerLanguages.length === 0) {
            languages = this.props.Resource ? this.props.Resource.notconfigured : "";
        } else {
            languages = lodash.map(this.props.playerLanguages, 'text').join(', ');
        }
        if (this.props.description === null || this.props.description === "") {
            description = this.props.Resource ? this.props.Resource.playerdescriptionempty : "";
        } else {
            description = emojione.shortnameToImage(this.props.description);
        }
        if (this.props.timezone) {
            timezone = this.props.timezone;
        }

        let editbtn;

        if (this.props.isOwnAccount) {
            editbtn = (
                <button disabled={this.props.loading}
                    onClick={this.props.onEditClick}
                    className={"btn btn-primary full-width"}>
                    <i className={"fa fa-pencil"} aria-hidden="true"></i>
                    <span> {this.props.Resource ? this.props.Resource.edit : ""}</span>
                </button>
            );
        }

        let deleteAccountContent;

        if (this.props.isOwnAccount) {
            deleteAccountContent = (
                <div>
                    <Separator />
                    <DeleteAccount
                        loading={this.props.loading}
                        onRemoveClick={this.props.onRemoveAccountClick}
                        Resource={this.props.Resource}
                        />
                </div>
            );
        }

        return (
            <div>
                <div className={"row"}>
                    <div className={"col-xs-12 col-md-2 picture-col"}>
                        <div className={"inline-div"}>
                            <img className={"profile-picture"} id={"profile-picture"}
                                src={`${this.props.avatarB64}`} />
                        </div>
                    </div>
                    <div className={"clearfix visible-xs"}></div>
                    <div className={"col-xs-12 col-md-7 displayname-col"}>
                        <div className={"profile-displayName"}>
                            <h4>
                                {this.props.username}
                            </h4>
                        </div>
                    </div>
                    <div className={"col-xs-12 col-md-3 displayname-col"}>
                        <div className={'row'}>
                            <div className={'col-xs-12 small-margin-top'}>
                                {editbtn}
                            </div>
                            <div className={'clearfix'}></div>
                            <div className={'col-xs-12 small-margin-top'}>
                                <Link className={"btn btn-primary full-width"} to={ranksAndTitlesTo}>
                                    <i className={"fa fa-trophy"} aria-hidden="true"></i>
                                    <span> {this.props.Resource ? this.props.Resource.ranksandtitles : ""}</span>
                                </Link>
                            </div>
                            <div className={'clearfix'}></div>
                        </div>
                        <div className={'clearfix'}></div>
                    </div>
                </div>
                <div className={"clearfix"}></div>
                <Separator />
                <div className={"row"}>
                    <div className={"col-lg-6 col-md-12"}>
                        <div className={"form-group"}>
                            <label className={"control-label"}>
                                {this.props.Resource ? this.props.Resource.playertype : ""}
                            </label>
                            <div>
                                <span>{playerType}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"clearfix visible-md"}></div>
                    <div className={"col-lg-6 col-md-12"}>
                        <div className={"form-group"}>
                            <label className={"control-label"}>
                                {this.props.Resource ? this.props.Resource.timezone : ""}
                            </label>
                            <div>
                                <span>{timezone}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"clearfix"}></div>
                    <div className={"col-lg-12"}>
                        <div className={"form-group"}>
                            <label className={"control-label"}>
                                {this.props.Resource ? this.props.Resource.languagesfield : ""}
                            </label>
                            <div>
                                <span>{languages}</span>
                            </div>
                        </div>
                    </div>
                    <div className={"clearfix"}></div>
                    <div className={"col-lg-12"}>
                        <div className={"form-group"}>
                            <label className={"control-label"}>
                                {this.props.Resource ? this.props.Resource.profiledescriptionfield : ""}
                            </label>
                            <div className={'force-break'}>
                                <div className={'preserve-newline'} dangerouslySetInnerHTML={{ __html: description }}></div>
                            </div>
                        </div>
                    </div>
                    <div className={"clearfix"}></div>
                </div>
                <div className={"clearfix"}></div>
                <Separator />
                <YoureSpecial
                    editing={false}
                    Resource={this.props.Resource}
                    />
                {deleteAccountContent}
            </div>    
        );
    }
}

export default PlayerProfileRead;