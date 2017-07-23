declare var require;

import * as React from 'react'
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import { fetchLoginResource } from '../actions/resourceAction';
import { LoginCaptchaRequest, LoginRequest } from '../actions/loginAction';
import * as constants from "../utils/Constants";
import renderField from "../components/Field";
import * as types from "../actions/actionTypes";
import { Link } from 'react-router';
var ReduxForm = require('redux-form');

export interface LoginProps {
    LoginResource: any;
    ResourceShouldUpdate: boolean;
    FetchLoginResource: any;
    NeedCaptchaRequest: any;
    NeedCaptcha: boolean;
    onLoginRequest: any;
    Loading: boolean;
    onUnmount: any;
    Authed: boolean;
}

export interface LoginState {
    Captcha: string;
}

const validate = (values, props) => {
    const errors:any = {}
    if (!values.email || values.email === "") {
        errors.email = props.LoginResource ? props.LoginResource.FIELD_REQUIRED : '';
    }
    if (!values.password || values.password === "") {
        errors.password = props.LoginResource ? props.LoginResource.FIELD_REQUIRED : '';
    }
    return errors;
}

export class Login extends React.Component<LoginProps, LoginState> {

    common: Common;
    recaptchaInstance: any;

    constructor() {
        super();

        this.state = {
            Captcha: "",
        };

        this.common = new Common();

        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.needCaptcha = this.needCaptcha.bind(this);
        this.onLoginBlur = this.onLoginBlur.bind(this);
    }

    handleLoginChange(evt) {
        this.setState(Update(this.state, {
            Model: { Data: { Login: { $set: evt.target.value } } },
        }));
    }

    handlePasswordChange(evt) {
        this.setState(Update(this.state, {
            Model: { Data: { Password: { $set: evt.target.value } } },
        }));
    }

    onLoginClick() {
        this.props.onLoginRequest(this.state.Captcha);
        this.common.reloadCaptcha();
    }

    needCaptcha() {
        this.props.NeedCaptchaRequest();
    }

    onLoginBlur() {
        this.needCaptcha();
    }

    componentWillMount() {
        this.common.injectRecaptcha();
    }

    componentDidMount() {
        this.common.shouldNotBeAuthed(this.props);
        this.props.onUnmount();
        this.props.FetchLoginResource();
        this.common.initCaptcha(this.recaptchaInstance, (val) => {
            this.setState(Update(this.state, {
                Captcha: {
                    $set: val
                },
            }));
        });
    }

    componentWillUnmount() {
        this.props.onUnmount();
    }

    componentWillReceiveProps(nextprops: LoginProps) {
        this.common.shouldNotBeAuthed(nextprops);
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchLoginResource();
        }
    }

    render() {

        const { handleSubmit } = this.props as any;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onLoginClick)}>
                    <div className={"col-lg-6 col-lg-offset-3 col-md-8 col-md-offset-2"}>
                        <div className={"panel panel-default"}>
                            <div className={"panel-heading"}><h4>{this.props.LoginResource ? this.props.LoginResource.logintitle : ""}</h4></div>
                            <div className={"panel-body"}>
                                <div className={"form-group"}>
                                    <ReduxForm.Field name="email"
                                            id={"login"}
                                            type="email"
                                            label={this.props.LoginResource ? this.props.LoginResource.emailfield : ""}
                                            placeholder={this.props.LoginResource ? this.props.LoginResource.emailfieldplaceholder : ""}
                                            component={renderField}
                                            onBlur={this.onLoginBlur}
                                            />
                                </div>
                                <div className={"form-group"}>
                                    <ReduxForm.Field name="password"
                                        id={"password"}
                                        type="password"
                                        label={this.props.LoginResource ? this.props.LoginResource.passwordfield : ""}
                                        placeholder={this.props.LoginResource ? this.props.LoginResource.passwordfieldplaceholder : ""}
                                        component={renderField}
                                        />
                                </div>
                                <div>
                                    <div className={`g-recaptcha ${this.props.NeedCaptcha ? '' : 'collapse'}`}
                                        id={"loginCaptcha"} ref={(control) => this.recaptchaInstance = control}></div>
                                </div>
                                <div className={"default-inpanel-div-margin"}>
                                    <Link className={"btn-link pull-left btn-link-no-padding-left"} to="/ForgotPassword">
                                        {this.props.LoginResource ? this.props.LoginResource.forgotpassword : ""}
                                    </Link>
                                    <button className={"btn btn-primary pull-right"}
                                        type="submit"
                                        disabled={this.props.Loading}
                                        >
                                        <i className={"fa fa-sign-in"} aria-hidden="true"></i>
                                        <span> {this.props.LoginResource ? this.props.LoginResource.loginbtn : ""}</span>
                                    </button>
                                </div>
                            </div>
                            <div className={"panel-footer"}>
                                <span>Not a member yet?</span><br />
                                <Link className={"btn-link btn-link-no-padding-left"} to="/Register">
                                    {this.props.LoginResource ? this.props.LoginResource.registerbtn : ""}
                                </Link>
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
        LoginResource: state.resourceLoginReducer.LoginResource,
        ResourceShouldUpdate: state.resourceLoginReducer.LoginResourceShouldUpdate,
        NeedCaptcha: state.authReducer.needCaptcha,
        Loading: state.authReducer.loading,
        Authed: state.authReducer.authed,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchLoginResource: () => dispatch(fetchLoginResource()),
        NeedCaptchaRequest: () => dispatch(LoginCaptchaRequest()),
        onLoginRequest: (captcha) => dispatch(LoginRequest(captcha)),
        onUnmount: () => dispatch({ type: types.LOGIN_UNMOUNT }),
    }
}

let LoginInstance = ReduxForm.reduxForm({
    form: 'loginForm',
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    validate,
})(Login);
LoginInstance = connect(mapStateToProps, mapDispatchToProps)(LoginInstance); 

export default LoginInstance;