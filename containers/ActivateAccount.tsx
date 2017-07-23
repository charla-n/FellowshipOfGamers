declare var require;

import * as React from 'react'
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import { ActivateAccountRequest } from '../actions/activateAccountAction';
import Loading from '../components/Loading';
var ReduxForm = require('redux-form');

export interface ActivateAccountProps {
    ActivateAccountErrors: any;
    ActivateAccountSuccess: any;
    onActivateAccountRequest: any;
    Loading: boolean;
    onMount: any;
    Authed: boolean;
    Success: boolean;
}

export class ActivateAccount extends React.Component<ActivateAccountProps, {}> {

    common: Common;

    constructor() {
        super();

        this.common = new Common();
    }

    componentDidMount() {
        this.common.shouldNotBeAuthed(this.props);
        this.props.onMount();

        let props = this.props as any;

        this.props.onActivateAccountRequest(props.params.email, props.params.token);
    }

    componentWillReceiveProps(nextprops: ActivateAccountProps) {
        if (!this.props.Success && nextprops.Success) {
            setTimeout(() => {
                let props = this.props as any;
                props.router.push('/Login');
            }, 4000);
        }
    }

    render() {

        var content;

        if (this.props.Loading) {
            content = (
                <Loading />
            );
        } else if (this.props.Success) {
            content = (
                <div className={'align-center'}>
                    <i className={"fa fa-check fa-4x"} aria-hidden="true"></i>
                    <div>
                        {
                            this.props.ActivateAccountSuccess.map((val, idx) => {
                                return (
                                    <div key={`success_${idx}`}>
                                        <h3 dangerouslySetInnerHTML={{ __html: val }}></h3>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            );
        } else {
            content = (
                <div className={'align-center'}>
                    <div>
                        <i className={"fa fa-times fa-4x"} aria-hidden="true"></i>
                        <div>
                            {
                                this.props.ActivateAccountErrors.map((val, idx) => {
                                    return (
                                        <div key={`error_${idx}`}>
                                            <h3 dangerouslySetInnerHTML={{ __html: val }}></h3>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ActivateAccountErrors: state.activateAccountReducer.errors,
        ActivateAccountSuccess: state.activateAccountReducer.successMessage,
        Loading: state.activateAccountReducer.loading,
        Authed: state.authReducer.authed,
        Success: state.activateAccountReducer.success,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onActivateAccountRequest: (email, token) => dispatch(ActivateAccountRequest(email, token)),
        onMount: () => dispatch({ type: types.ACTIVATE_ACCOUNT_MOUNT })
    }
}

let activateAccount = connect(mapStateToProps, mapDispatchToProps)(ActivateAccount); 

export default activateAccount;