declare var require;

import * as React from "react";
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import renderField from "../components/Field";
var ReduxForm = require('redux-form');
import { Link } from 'react-router';
import Stars from '../components/Stars'

export interface ReviewItemProps {
    item: any;
    onStarClick: any;
    onCommentUpdate: any;
    active: boolean;
    Resource: any;
    ResourceShouldUpdate: boolean;
}

export class ReviewItem extends React.Component<ReviewItemProps, {}> {

    constructor() {
        super();

        this.onStarClick = this.onStarClick.bind(this);
        this.onCommentUpdate = this.onCommentUpdate.bind(this);
    }

    onStarClick(val) {
        this.props.onStarClick(this.props.item.id, val);
    }

    onCommentUpdate(val) {
        this.props.onCommentUpdate(this.props.item.id, val.target.value);
    }

    render() {

        let mark = 0;

        if (this.props.item.mark) {
            mark = this.props.item.mark;
        }

        let starContent;
        let commentContent;

        if (this.props.active) {
            starContent = (
                <Stars Classes={'star-review player-reputation-star'} Size={'fa-2x'} Value={mark} onClick={this.onStarClick} />
            );
            commentContent = (
                <textarea onBlur={this.onCommentUpdate} rows={3} cols={5} className={'form-control'}></textarea>
            );
        } else {
            starContent = (
                <Stars Classes={'star-review player-reputation-star'} Size={'fa-2x'} Value={mark}/>
            );
            commentContent = (
                <textarea onBlur={this.onCommentUpdate} rows={3} cols={5} disabled={true} className={'form-control'}></textarea>    
            );
        }

        return (
            <div>
                <div className={'large-margin-top'}>
                    <div className={'row'}>
                        <div className={'col-sm-12 col-md-2 align-center'}>
                            <img className={"profile-picture review-picture"}
                                src={`${constants.PROFILE_AVATAR_2}/${this.props.item.id}`} />
                            <div>
                                <Link to={`/Profile/${this.props.item.id}`} className={"btn-link"}>{this.props.item.name}</Link>
                            </div>
                        </div>
                        <div className={'col-md-3'}>
                            <label className={'control-label'}>{this.props.Resource ? this.props.Resource.giveamark : ""}</label>
                            {starContent}
                        </div>
                        <div className={'col-md-4'}>
                            <label className={'control-label'}>{this.props.Resource ? this.props.Resource.reviewcomment : ""}</label>
                            {commentContent}
                        </div>
                    </div>
                    <div className={'clearfix'}></div>
                </div>
            </div>
        );
    }
}

export default ReviewItem;