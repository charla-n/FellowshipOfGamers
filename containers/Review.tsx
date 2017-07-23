declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import renderField from "../components/Field";
import {
    GetReviewGroup,
    ReviewStarClick,
    ReviewCommentUpdate,
    SendReviewRequest,
    GroupByIDRequest
} from "../actions/groupAction";
var ReduxForm = require('redux-form');
import ReviewItem from '../components/ReviewItem';
import AreYouSureModal from '../components/AreYouSureModal';
import ViewGroupDetails from '../components/ViewGroupDetails';
import Separator from '../components/Separator';
import { fetchReviewResource } from '../actions/resourceAction';

export interface ReviewProps {
    Data: any;
    Loading: boolean;
    Authed: boolean;
    GetReview: any;
    ReviewStarClick: any;
    Form: any;
    ReviewCommentUpdate: any;
    Resource: any;
    ResourceShouldUpdate: boolean;
    SendReviewRequest: any;
    onMount: any;
    GroupData: any;
    GroupByID: any;
    FetchResource: any;
}

export interface ReviewState {
    showMissingReviewModal: boolean;
}

const validate = (values, props) => {
    const errors: any = {}

    //for (var property in values) {
    //    if (values.hasOwnProperty(property)) {
    //        if (property.indexOf("comment") !== -1) {
    //            if (values[property] && values[property].length > 3000) {
    //                errors[property] = "Maximum length is 3000."
    //            }
    //        }
    //    }
    //}

    return errors;
}

export class Review extends React.Component<ReviewProps, ReviewState> {

    common: Common;

    constructor() {
        super();

        this.onStarClick = this.onStarClick.bind(this);
        this.onCommentUpdate = this.onCommentUpdate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.noMissingReviewsClick = this.noMissingReviewsClick.bind(this);
        this.yesMissingReviewClick = this.yesMissingReviewClick.bind(this);

        this.state = {
            showMissingReviewModal: false,
        };
    }

    componentWillMount() {
    }

    componentDidMount() {
        let props = this.props as any;

        this.props.onMount();
        this.props.GetReview(props.router.params.id);
        this.props.FetchResource();
    }

    componentWillReceiveProps(nextprops: ReviewProps) {
        if (nextprops.Data && nextprops.Data.groupID) {
            this.props.GroupByID(nextprops.Data.groupID);
        }
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
    }

    onStarClick(ID, val) {
        this.props.ReviewStarClick(ID, val);
    }

    onCommentUpdate(ID, val) {
        this.props.ReviewCommentUpdate(ID, val);
    }

    onSubmit() {
        for (let val of this.props.Data.players) {
            if (!val.mark) {
                this.setState(Update(this.state, {
                    showMissingReviewModal: { $set: true },
                }));
                return;
            }
        }
        let props = this.props as any;

        this.props.SendReviewRequest(props.router.params.id);
    }

    noMissingReviewsClick() {
        this.setState(Update(this.state, {
            showMissingReviewModal: { $set: false },
        }));
    }

    yesMissingReviewClick() {
        let props = this.props as any;

        this.setState(Update(this.state, {
            showMissingReviewModal: { $set: false },
        }));
        this.props.SendReviewRequest(props.router.params.id);
    }

    render() {

        const { handleSubmit } = this.props as any;

        let reviewItems = [];
        let submitContent;

        if (this.props.Data && this.props.Data.players) {
            let i = 0;
            for (let val of this.props.Data.players) {
                reviewItems.push(<ReviewItem key={`${i}_${val.ID}`}
                    Resource={this.props.Resource}
                    ResourceShouldUpdate={this.props.ResourceShouldUpdate}
                    active={this.props.Data.active}
                    item={val}
                    onStarClick={this.onStarClick}
                    onCommentUpdate={this.onCommentUpdate} />);
                i++;
            }
        }
        if (this.props.Data) {
            submitContent = (
                <button type={'submit'} disabled={this.props.Loading || !this.props.Data.active} className={'btn btn-primary'}>{this.props.Resource ? this.props.Resource.save : ""}</button>
            );
        }

        return (
            <div>
                <AreYouSureModal text={this.props.Resource ? this.props.Resource.reviewmodalmissingreview : ""}
                    yes={this.props.Resource ? this.props.Resource.yes : "Yes"}
                    no={this.props.Resource ? this.props.Resource.no : "No"}
                    show={this.state.showMissingReviewModal}
                    noClick={this.noMissingReviewsClick}
                    yesClick={this.yesMissingReviewClick} />
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className={'title-separator'}>
                        <h3>
                            {this.props.Resource ? this.props.Resource.groupreviewtitle : ""}
                        </h3>
                    </div>
                    <br />
                    <div>
                        <ViewGroupDetails
                            Authed={this.props.Authed}
                            CanAccept={false}
                            CanEdit={false}
                            data={this.props.GroupData}
                            IsCreator={false}
                            IsSubscribed={false}
                            loading={this.props.Loading}
                            onGroupDelete={null}
                            onGroupJoin={null}
                            Resource={this.props.Resource}
                            ResourceShouldUpdate={this.props.ResourceShouldUpdate}
                        />
                    </div>
                    <Separator/>
                    <div>
                        <h3>
                            {this.props.Resource ? this.props.Resource.players : ""}
                        </h3>
                    </div>
                    <div>
                        {reviewItems}
                    </div>
                    <div className={'pull-right'}>
                        {submitContent}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Authed: state.authReducer.authed,
        Data: state.groupReviewReducer.data,
        Loading: state.groupReviewReducer.loading,
        Form: state.form,
        GroupData: state.viewGroupReducer.data,
        Resource: state.resourceReviewReducer.Resource,
        ResourceShouldUpdate: state.resourceReviewReducer.ResourceShouldUpdate,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GroupByID: (id) => dispatch(GroupByIDRequest(id)),
        onMount: () => dispatch({ type: types.GROUP_REVIEW_CLEAR }),
        GetReview: (reviewid) => dispatch(GetReviewGroup(reviewid)),
        ReviewStarClick: (id, val) => dispatch(ReviewStarClick(id, val, 'reviewForm')),
        ReviewCommentUpdate: (id, val) => dispatch(ReviewCommentUpdate(id, val, 'reviewForm')),
        SendReviewRequest: (id) => dispatch(SendReviewRequest(id)),
        FetchResource: () => dispatch(fetchReviewResource()),
    }
}

let review = ReduxForm.reduxForm({
    form: 'reviewForm',
    validate,
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    shouldAsyncValidate: constants.defaultShouldAsyncValidate,
})(Review);

review = connect(mapStateToProps, mapDispatchToProps)(review); 

export default review;