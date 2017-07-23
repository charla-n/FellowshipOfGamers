declare var require;

import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import Separator from "./Separator";
import CutdownParagraph from "./CutdownParagraph";
import Stars from "./Stars";
import * as Moment from 'moment';
import { Link } from 'react-router';
import * as constants from "../utils/Constants";
var emojione = require('emojione');

export interface SearchGroupItemProps {
    Data: any;
    Resource: any;
}

export class SearchGroupItem extends React.Component<SearchGroupItemProps, {}> {

    constructor() {
        super();
    }

    componentDidMount() {
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
        let locked;

        if (this.props.Data) {
            games = this.props.Data.games.map((val, idx) => {
                return val.text;
            }).join(', ');
            dateStart = Moment.utc(this.props.Data.dateStart).local().format('L LT');
            duration = `${this.props.Data.hours} hours ${this.props.Data.minutes} minutes`;
            need = this.props.Data.need;
            have = this.props.Data.have;
            language = this.props.Data.language.text;
            communications = this.props.Data.communications.map((val, idx) => {
                return val.text;
            }).join(', ');
            playStyles = this.props.Data.playStyles.map((val, idx) => {
                return val.text;
            }).join(', ');
            ages = this.props.Data.ages.map((val, idx) => {
                return val.text;
            }).join(', ');
            description = emojione.shortnameToImage(this.props.Data.description);
            if (this.props.Data.locked) {
                locked = <i className={"fa fa-lock"} aria-hidden="true"></i>;
            }
        }

        return (
            <div>
                <h4>
                    {locked}
                    <u className={'small-margin-left'}>
                        {games}
                    </u>
                </h4>
                <div className={'row'}>
                    <div className={'col-xs-12 col-md-2 align-center'}>
                        <img className={"profile-picture"} id={"profile-picture"}
                            src={`${constants.GROUP_IMAGE + '/' + this.props.Data.id}`} />
                    </div>
                    <div className={'clearfix visible-xs'}></div>
                    <div className={'col-xs-12 col-md-8 separator-right-container'}>
                        <div className={'row'}>
                            <div className={'col-xs-12 col-md-3'}>
                                <div className={'form-group'}>
                                    <label className={"control-label"}>{this.props.Resource ? this.props.Resource.when : ''}</label>
                                    <div>
                                        {dateStart}
                                    </div>
                                </div>
                            </div>
                            <div className={'clearfix visible-xs'}></div>
                            <div className={'col-xs-12 col-md-3'}>
                                <div className={'form-group'}>
                                    <label className={"control-label"}>{this.props.Resource ? this.props.Resource.duration : ''}</label>
                                    <div>
                                        {duration}
                                    </div>
                                </div>
                            </div>
                            <div className={'clearfix visible-xs'}></div>
                            <div className={'col-xs-12 col-md-3'}>
                                <div className={'form-group'}>
                                    <label className={"control-label"}>{this.props.Resource ? this.props.Resource.need : ''}</label>
                                    <div>
                                        {need}
                                    </div>
                                </div>
                            </div>
                            <div className={'clearfix visible-xs'}></div>
                            <div className={'col-xs-12 col-md-3'}>
                                <div className={'form-group'}>
                                    <label className={"control-label"}>{this.props.Resource ? this.props.Resource.have : ''}</label>
                                    <div>
                                        {have}
                                    </div>
                                </div>
                            </div>
                            <div className={'clearfix'}></div>
                            <div className={'col-xs-12 col-md-3'}>
                                <div className={'form-group'}>
                                    <label className={"control-label"}>{this.props.Resource ? this.props.Resource.Languages : ''}</label>
                                    <div>
                                        {language}
                                    </div>
                                </div>
                            </div>
                            <div className={'clearfix visible-xs'}></div>
                            <div className={'col-xs-12 col-md-3'}>
                                <div className={'form-group'}>
                                    <label className={"control-label"}>{this.props.Resource ? this.props.Resource.communication : ''}</label>
                                    <div>
                                        {communications}
                                    </div>
                                </div>
                            </div>
                            <div className={'clearfix visible-xs'}></div>
                            <div className={'col-xs-12 col-md-3'}>
                                <div className={'form-group'}>
                                    <label className={"control-label"}>{this.props.Resource ? this.props.Resource.playstyles : ''}</label>
                                    <div>
                                        {playStyles}
                                    </div>
                                </div>
                            </div>
                            <div className={'clearfix visible-xs'}></div>
                            <div className={'col-xs-12 col-md-3'}>
                                <div className={'form-group'}>
                                    <label className={"control-label"}>{this.props.Resource ? this.props.Resource.ages : ''}</label>
                                    <div>
                                        {ages}
                                    </div>
                                </div>
                            </div>
                            <div className={'clearfix'}></div>
                            <div className={'col-lg-12'}>
                                <div className={'form-group'}>
                                    <label className={"control-label"}>{this.props.Resource ? this.props.Resource.description : ''}</label>
                                    <div>
                                        <CutdownParagraph Limit={0} Resource={this.props.Resource} Value={description}/>
                                    </div>
                                </div>
                            </div>
                            <div className={'clearfix'}></div>
                        </div>
                        <div className={'clearfix'}></div>
                    </div>
                    <div className={'col-xs-12 col-md-2'}>
                        <Link to={`/ViewGroup/${this.props.Data.id}`} className={'btn btn-primary full-width'}>
                            <i className={"fa fa-list"} aria-hidden="true"></i>
                            <span> {this.props.Resource ? this.props.Resource.view : ''}</span>
                        </Link>
                    </div>
                </div>
                <div className={'clearfix'}></div>
                <Separator/>
            </div>
        );
    }
}

export default SearchGroupItem;