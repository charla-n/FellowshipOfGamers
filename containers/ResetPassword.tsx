declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import { ResetPasswordRequest } from '../actions/resetPasswordAction';
import { fetchResetPasswordResource } from '../actions/resourceAction';
import renderField from "../components/Field";
var ReduxForm = require('redux-form');

export interface ResetPasswordProps {
    onSubmitRequest: any;
    Loading: boolean;
    onMount: any;
    Authed: boolean;
    FetchResource: any;
    ResourceShouldUpdate: boolean;
    Resource: any;
}

const rgx = new RegExp(constants.PWD_REGEX);

const validate = (values, props) => {
    const errors: any = {};
    if (!values.password || values.password === "") {
        errors.password = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    if (!values.repassword || values.repassword === "") {
        errors.repassword = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    if (values.repassword !== values.password) {
        errors.repassword = props.Resource ? props.Resource.PASSWORDS_DO_NOT_MATCH : '';
    }
    if (values.password) {
        if (!rgx.test(values.password)) {
            errors.password = props.Resource ? props.Resource.PASSWORD_TOO_WEAK : '';
        }
    }
    return errors;
}
export class ResetPassword extends React.Component<ResetPasswordProps, {}> {

    common: Common;

    constructor() {
        super();

        this.common = new Common();

        this.onSubmitClick = this.onSubmitClick.bind(this);
    }

    componentDidMount() {
        this.common.shouldNotBeAuthed(this.props);
        this.props.onMount();
        this.props.FetchResource();
    }

    componentWillReceiveProps(nextprops: ResetPasswordProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
    }

    onSubmitClick() {

        let props = this.props as any;

        this.props.onSubmitRequest(props.params.email, props.params.token).done(() => {
            props.router.push('/Login');
        });
    }

    render() {

        const { handleSubmit } = this.props as any;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmitClick)}>
                    <div className={"col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2"}>
                        <div className={"panel panel-default"}>
                            <div className={"panel-heading"}>
                                <h4>
                                    {this.props.Resource ? this.props.Resource.resetpasswordtitle : ""}
                                </h4>
                            </div>
                            <div className={"panel-body"}>
                                <div className={"row"}>
                                    <div className={"col-xs-12"}>
                                        <div className={"form-group"}>
                                            <ReduxForm.Field name="password"
                                                id={"password"}
                                                type="password"
                                                label={this.props.Resource ? this.props.Resource.passwordfield : ""}
                                                placeholder={this.props.Resource ? this.props.Resource.passwordfieldplaceholder : ""}
                                                component={renderField}
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className={"clearfix"}></div>
                                <div className={"row"}>
                                    <div className={"col-xs-12"}>
                                        <div className={"form-group"}>
                                            <ReduxForm.Field name="repassword"
                                                id={"repassword"}
                                                type="password"
                                                label={this.props.Resource ? this.props.Resource.repasswordfield : ""}
                                                component={renderField}
                                                disableCP={true}
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className={"clearfix"}></div>
                                <br/>
                                <div className={"default-inpanel-div-margin"}>
                                    <button className={"btn btn-primary pull-right"}
                                        type="submit"
                                        disabled={this.props.Loading}
                                        >
                                        <span> {this.props.Resource ? this.props.Resource.resetpasswordbtn : ""}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Resource: state.resourceResetPasswordReducer.ResetPasswordResource,
        ResourceShouldUpdate: state.resourceResetPasswordReducer.ResetPasswordResourceShouldUpdate,
        Loading: state.resetPasswordReducer.loading,
        Authed: state.authReducer.authed,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchResource: () => dispatch(fetchResetPasswordResource()),
        onSubmitRequest: (email, token) => dispatch(ResetPasswordRequest(email, token)),
        onMount: () => dispatch({ type: types.RESET_PASSWORD_MOUNT })
    }
}

let resetPassword = ReduxForm.reduxForm({
    form: 'resetPasswordForm',
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    shouldAsyncValidate: constants.defaultShouldAsyncValidate,
    validate,
})(ResetPassword);

resetPassword = connect(mapStateToProps, mapDispatchToProps)(resetPassword); 

export default resetPassword;