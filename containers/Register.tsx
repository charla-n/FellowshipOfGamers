declare var require;

import * as React from 'react'
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import { fetchRegisterResource } from '../actions/resourceAction';
import * as constants from "../utils/Constants";
import renderField from "../components/Field";
import renderCheckbox from "../components/Checkbox";
import * as types from "../actions/actionTypes";
import { UsernameInUseRequest, RegisterRequest } from '../actions/registerAction';
var ReduxForm = require('redux-form');

export interface RegisterProps {
    RegisterResource: any;
    ResourceShouldUpdate: boolean;
    FetchRegisterResource: any;
    onRegisterRequest: any;
    Loading: boolean;
    onMount: any;
    Authed: boolean;
}

export interface RegisterState {
    Captcha: string;
}

const rgx = new RegExp(constants.PWD_REGEX);

const validate = (values, props) => {
    const errors: any = {};
    if (!values.email || values.email === "") {
        errors.email = props.RegisterResource ? props.RegisterResource.FIELD_REQUIRED : '';
    }
    if (values.reemail !== values.email) {
        errors.reemail = props.RegisterResource ? props.RegisterResource.EMAILS_DO_NOT_MATCH : '';
    }
    if (!values.reemail || values.reemail === "") {
        errors.reemail = props.RegisterResource ? props.RegisterResource.FIELD_REQUIRED : '';
    }
    if (!values.password || values.password === "") {
        errors.password = props.RegisterResource ? props.RegisterResource.FIELD_REQUIRED : '';
    }
    if (!values.repassword || values.repassword === "") {
        errors.repassword = props.RegisterResource ? props.RegisterResource.FIELD_REQUIRED : '';
    }
    if (values.repassword !== values.password) {
        errors.repassword = props.RegisterResource ? props.RegisterResource.PASSWORDS_DO_NOT_MATCH : '';
    }
    if (!values.username || values.username === "") {
        errors.username = props.RegisterResource ? props.RegisterResource.FIELD_REQUIRED : '';
    }
    if (!values.agelimit) {
        errors.agelimit = props.RegisterResource ? props.RegisterResource.FIELD_REQUIRED : '';
    }
    if (!values.acceptpolicy) {
        errors.acceptpolicy = props.RegisterResource ? props.RegisterResource.FIELD_REQUIRED : '';
    }
    if (values.username && values.username.length > 20) {
        errors.username = props.RegisterResource ? props.RegisterResource._20_CHAR_MAX : '';
    }
    if (values.password) {
        if (!rgx.test(values.password)) {
            errors.password = props.RegisterResource ? props.RegisterResource.PASSWORD_TOO_WEAK : '';
        }
    }
    return errors;
}

const asyncValidate = (values, dispatch, props) => {
    return dispatch(UsernameInUseRequest("registerForm", false)).then((data) => {
        if (data && data.inUse) {
            throw { username: props.RegisterResource ? props.RegisterResource.USERNAME_ALREADY_IN_USE : '' };
        }
    });
}

export class Register extends React.Component<RegisterProps, RegisterState> {

    common: Common;
    recaptchaInstance: any;

    constructor() {
        super();

        this.state = {
            Captcha: "",
        };

        this.common = new Common();

        this.onRegisterClick = this.onRegisterClick.bind(this);
    }

    onRegisterClick() {
        this.props.onRegisterRequest(this.state.Captcha);
        this.common.reloadCaptcha();
    }

    componentWillMount() {
        this.common.injectRecaptcha();
    }

    componentDidMount() {
        this.common.shouldNotBeAuthed(this.props);
        this.props.onMount();
        this.props.FetchRegisterResource();
        this.common.initCaptcha(this.recaptchaInstance, (val) => {
            this.setState(Update(this.state, {
                Captcha: {
                    $set: val
                },
            }));
        });
    }

    componentWillUnmount() {
        this.props.onMount();
    }

    componentWillReceiveProps(nextprops: RegisterProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchRegisterResource();
        }
    }

    render() {

        const { handleSubmit } = this.props as any;

        return (
            <div>
                <form onSubmit={handleSubmit(this.onRegisterClick)}>
                    <div className={"col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1"}>
                        <div className={"panel panel-default"}>
                            <div className={"panel-heading"}>
                                <h4>
                                    {this.props.RegisterResource ? this.props.RegisterResource.registertitle : ""}
                                </h4>
                            </div>
                            <div className={"panel-body"}>
                                <div className={"align-center"}>
                                    <h4>
                                        {this.props.RegisterResource ? this.props.RegisterResource.welcometofsg : ""}
                                    </h4>
                                    <br/>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-md-6"}>
                                        <div className={"form-group"}>
                                            <ReduxForm.Field name="email"
                                                id={"email"}
                                                type="email"
                                                label={this.props.RegisterResource ? this.props.RegisterResource.emailfield : ""}
                                                placeholder={this.props.RegisterResource ? this.props.RegisterResource.emailfieldplaceholder : ""}
                                                component={renderField}
                                                />
                                        </div>
                                    </div>
                                    <div className={"col-md-6"}>
                                        <div className={"form-group"}>
                                            <ReduxForm.Field name="reemail"
                                                id={"reemail"}
                                                type="text"
                                                label={this.props.RegisterResource ? this.props.RegisterResource.reemailfield : ""}
                                                component={renderField}
                                                disableCP={true}
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className={"clearfix"}></div>
                                <div className={"row"}>
                                    <div className={"col-md-6"}>
                                        <div className={"form-group"}>
                                            <ReduxForm.Field name="password"
                                                id={"password"}
                                                type="password"
                                                label={this.props.RegisterResource ? this.props.RegisterResource.passwordfield : ""}
                                                placeholder={this.props.RegisterResource ? this.props.RegisterResource.passwordfieldplaceholder : ""}
                                                component={renderField}
                                                />
                                        </div>
                                    </div>
                                    <div className={"col-md-6"}>
                                        <div className={"form-group"}>
                                            <ReduxForm.Field name="repassword"
                                                id={"repassword"}
                                                type="password"
                                                label={this.props.RegisterResource ? this.props.RegisterResource.repasswordfield : ""}
                                                component={renderField}
                                                disableCP={true}
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className={"clearfix"}></div>
                                <div className={'row'}>
                                    <div className={"col-md-12"}>
                                        <div className={"form-group"}>
                                            <ReduxForm.Field name="username"
                                                id={"username"}
                                                type="text"
                                                label={this.props.RegisterResource ? this.props.RegisterResource.username : ""}
                                                component={renderField}
                                                hasHelp={true}
                                                hasRightGroup={true}
                                                rightGroupHtml={
                                                    <a className={'btn-link'} href="javascript:void(0);">
                                                        {this.props.RegisterResource ? this.props.RegisterResource.usernameverify : ""}
                                                    </a>
                                                }
                                                help={this.props.RegisterResource ? this.props.RegisterResource.usernamehelp : ""}
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className={"clearfix"}></div>
                                <div className={'row'}>
                                    <div className={"col-md-12"}>
                                        <div className={`g-recaptcha`}
                                            id={"registerCaptcha"} ref={(control) => this.recaptchaInstance = control}></div>
                                    </div>
                                </div>
                                <div className={"clearfix"}></div>
                                <br />
                                <div className={'row'}>
                                    <div className={"col-md-12"}>
                                        <div>
                                            <ReduxForm.Field name="acceptpolicy"
                                                id={"acceptpolicy"}
                                                type="checkbox"
                                                label={this.props.RegisterResource ? this.props.RegisterResource.acceptpolicy : ""}
                                                component={renderCheckbox}
                                                />
                                        </div>
                                    </div>
                                </div>
                                <div className={"clearfix"}></div>
                                <div className={"default-inpanel-div-margin"}>
                                    <button className={"btn btn-primary pull-right"}
                                        type="submit"
                                        disabled={this.props.Loading}
                                        >
                                        <span> {this.props.RegisterResource ? this.props.RegisterResource.doregisterbtn : ""}</span>
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
        RegisterResource: state.resourceRegisterReducer.RegisterResource,
        ResourceShouldUpdate: state.resourceRegisterReducer.RegisterResourceShouldUpdate,
        Loading: state.registerReducer.loading,
        Authed: state.authReducer.authed,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchRegisterResource: () => dispatch(fetchRegisterResource()),
        onRegisterRequest: (captcha) => dispatch(RegisterRequest(captcha)),
        onMount: () => dispatch({ type: types.REGISTER_MOUNT })
    }
}

let RegisterInstance = ReduxForm.reduxForm({
    form: 'registerForm',
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    shouldAsyncValidate: constants.defaultShouldAsyncValidate,
    validate,
    asyncValidate,
    asyncBlurFields: ['username']
})(Register);
RegisterInstance = connect(mapStateToProps, mapDispatchToProps)(RegisterInstance); 

export default RegisterInstance;