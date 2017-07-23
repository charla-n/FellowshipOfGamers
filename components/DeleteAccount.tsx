import * as React from "react";
import * as lodash from 'lodash';
import * as Update from 'immutability-helper';
import * as constants from "../utils/Constants";
import Common from '../utils/Common';
import Separator from "../components/Separator";
import Modal from './Modal';

export interface DeleteAccountProps {
    Resource: any;

    onRemoveClick: any;
    loading: boolean;
}

export interface DeleteAccountState {
    showDeleteAccount: boolean;
}

export interface DeleteAccountModalState {
    password: string;
}

export interface DeleteAccountModalProps {
    loading: boolean;
    Resource: any;
    okClick: any;
    cancelClick: any;
    show: boolean;
}

export class DeleteAccountModal extends React.Component<DeleteAccountModalProps, DeleteAccountModalState> {

    constructor() {
        super();

        this.state = {
            password: '',
        };

        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.okClick = this.okClick.bind(this);
    }

    onPasswordChange(evt) {
        this.setState(Update(this.state, {
            password: { $set: evt.target.value }
        }));
    }

    okClick() {
        this.props.okClick(this.state.password);
        this.setState(Update(this.state, {
            password: { $set: '' }
        }));
    }

    render() {

        let content = (
            <div>
                <div>
                    {this.props.Resource ? this.props.Resource.deleteaccountconfirm : ""}
                </div>
                <br />
                <div className={"form-group"}>
                    <label className={"control-label"}>
                        {this.props.Resource ? this.props.Resource.removeaccountpasswordfield : ""}
                    </label>
                    <input type={"password"}
                        className={"form-control"}
                        id={"removeAccountPasswordInput"}
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                    />
                </div>
                <div className={'pull-right'}>
                    <button type="button" className={"btn btn-default"} onClick={this.props.cancelClick} disabled={this.props.loading}>
                        {this.props.Resource ? this.props.Resource.close : ""}
                    </button>
                    <button type="button" onClick={this.okClick} className={"btn btn-primary small-margin-left"} disabled={this.props.loading}>
                        {this.props.Resource ? this.props.Resource.save : ""}
                    </button>
                </div>
            </div>
        );

        return (
            <div>
                <Modal content={content} show={this.props.show} />
            </div>
        );
    }
}

export class DeleteAccount extends React.Component<DeleteAccountProps, DeleteAccountState> {

    common: Common;

    constructor() {
        super();

        this.state = {
            showDeleteAccount: false,
        };

        this.common = new Common();

        this.removeClick = this.removeClick.bind(this);
        this.CancelClick = this.CancelClick.bind(this);
    }

    removeClick() {
        this.setState(Update(this.state, {
            showDeleteAccount: { $set: true }
        }));
    }

    CancelClick() {
        this.setState(Update(this.state, {
            showDeleteAccount: { $set: false }
        }));
    }

    render() {
        return (
            <div>
                <DeleteAccountModal
                    cancelClick={this.CancelClick}
                    loading={this.props.loading}
                    okClick={this.props.onRemoveClick}
                    Resource={this.props.Resource}
                    show={this.state.showDeleteAccount}
                />
                <div className={"panel panel-danger"}>
                    <div className={"panel-heading"}>
                        <h5>{this.props.Resource ? this.props.Resource.profiledangerzone : ""}</h5>
                    </div>
                    <div className={"panel-body"}>
                        <button id={"deleteAccountBtn"}
                            className={"btn btn-danger pull-right"}
                            onClick={this.removeClick}
                            disabled={this.props.loading}
                            type="button"
                            >
                            <i className={"fa fa-remove"} aria-hidden="true"></i>
                            <span> {this.props.Resource ? this.props.Resource.removeaccount : ""}</span>
                        </button>
                    </div>
                </div>
            </div>    
        );
    }
}



export default DeleteAccount;