declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import { ForgotPasswordRequest } from '../actions/forgotPasswordAction';
import { fetchForgotPasswordResource } from '../actions/resourceAction';
import renderField from "../components/Field";
var ReduxForm = require('redux-form');

export interface ForgotPasswordProps {
    onForgotPasswordRequest: any;
    Loading: boolean;
    onMount: any;
    Authed: boolean;
    FetchForgotPasswordResource: any;
    ResourceShouldUpdate: boolean;
    ForgotPasswordResource: any;
}

export interface ForgotPasswordState {
    Captcha: string;
}

const validate = (values, props) => {
    const errors: any = {};
    if (!values.email || values.email === "") {
        errors.email = props.ForgotPasswordResource ? props.ForgotPasswordResource.FIELD_REQUIRED : '';
    }
    return errors;
}

export class ForgotPassword extends React.Component<ForgotPasswordProps, ForgotPasswordState> {

    common: Common;
    recaptchaInstance: any;

    constructor() {
        super();

        this.state = {
            Captcha: "",
        };

        this.common = new Common();

        this.onForgotPasswordClick = this.onForgotPasswordClick.bind(this);
    }

    componentWillMount() {
        this.common.injectRecaptcha();
    }

    componentDidMount() {
        this.common.shouldNotBeAuthed(this.props);
        this.props.onMount();
        this.props.FetchForgotPasswordResource();
        this.common.initCaptcha(this.recaptchaInstance, (val) => {
            this.setState(Update(this.state, {
                Captcha: {
                    $set: val
                },
            }));
        });
    }

    componentWillReceiveProps(nextprops: ForgotPasswordProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchForgotPasswordResource();
        }
    }

    onForgotPasswordClick() {
        this.props.onForgotPasswordRequest(this.state.Captcha);
        this.common.reloadCaptcha();
    }

    render() {

        const { handleSubmit } = this.props as any;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onForgotPasswordClick)}>
                    <div className={"col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2"}>
                        <div className={"panel panel-default"}>
                            <div className={"panel-heading"}>
                                <h4>
                                    {this.props.ForgotPasswordResource ? this.props.ForgotPasswordResource.forgotpasswordtitle : ""}
                                </h4>
                            </div>
                            <div className={"panel-body"}>
                                <div className={"row"}>
                                    <div className={"col-md-12"}>
                                        <div className={"form-group"}>
                                            <ReduxForm.Field name="email"
                                                id={"email"}
                                                type="email"
                                                label={this.props.ForgotPasswordResource ? this.props.ForgotPasswordResource.emailfield : ""}
                                                placeholder={this.props.ForgotPasswordResource ? this.props.ForgotPasswordResource.emailfieldplaceholder : ""}
                                                component={renderField}
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className={"clearfix"}></div>
                                <div className={'row'}>
                                    <div className={"col-md-12"}>
                                        <div className={`g-recaptcha`}
                                            id={"forgotPasswordCaptcha"} ref={(control) => this.recaptchaInstance = control}></div>
                                    </div>
                                </div>
                                <div className={"clearfix"}></div>
                                <br/>
                                <div className={"default-inpanel-div-margin"}>
                                    <button className={"btn btn-primary pull-right"}
                                        type="submit"
                                        disabled={this.props.Loading}
                                        >
                                        <span> {this.props.ForgotPasswordResource ? this.props.ForgotPasswordResource.resetpasswordbtn : ""}</span>
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
        ForgotPasswordResource: state.resourceForgotPasswordReducer.ForgotPasswordResource,
        ResourceShouldUpdate: state.resourceForgotPasswordReducer.ForgotPasswordResourceShouldUpdate,
        Loading: state.forgotPasswordReducer.loading,
        Authed: state.authReducer.authed,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchForgotPasswordResource: () => dispatch(fetchForgotPasswordResource()),
        onForgotPasswordRequest: (captcha) => dispatch(ForgotPasswordRequest(captcha)),
        onMount: () => dispatch({ type: types.FORGOT_PASSWORD_MOUNT })
    }
}

let forgotPassword = ReduxForm.reduxForm({
    form: 'forgotPasswordForm',
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    shouldAsyncValidate: constants.defaultShouldAsyncValidate,
    validate,
})(ForgotPassword);

forgotPassword = connect(mapStateToProps, mapDispatchToProps)(forgotPassword); 

export default forgotPassword;