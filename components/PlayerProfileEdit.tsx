declare var require;

import * as React from "react";
import * as lodash from 'lodash';
import * as constants from "../utils/Constants";
import Separator from "../components/Separator";
import YoureSpecial from "../components/YoureSpecial";
import DeleteAccount from "../components/DeleteAccount";
import renderField from "../components/Field";
import renderDropdown from "../components/Dropdown";
import renderMultiselect from "../components/Multiselect";
import MarkdownEditor from "../components/MarkdownEditor";
import CropperModal from "../components/CropperModal";
import * as DropdownList from 'react-widgets/lib/DropdownList';
import * as Multiselect from 'react-widgets/lib/Multiselect';
var ReduxForm = require('redux-form');
import * as Update from 'immutability-helper';

export interface PlayerProfileEditProps {
    Resource: any;

    avatarB64: string;

    description: string;

    loading: boolean;

    onRemoveAccountClick: any;
    onCancelClick: any;

    fetchPlayerTypes: any;
    playerTypes: any;
    playerTypesLoading: boolean;

    fetchLanguages: any;
    languages: any;
    languagesLoading: boolean;

    onEditorChange: any;
    onCropClick: any;
    timezones: any;
    fetchTimezones: any;
    timezonesLoading: boolean;
}

export interface PlayerProfileEditState {
    pictureProfile: any;

    showCropperModal: boolean;
}

export class PlayerProfileEdit extends React.Component<PlayerProfileEditProps, PlayerProfileEditState> {

    inputProfilePicture: HTMLInputElement;

    constructor() {
        super();

        this.state = {
            pictureProfile: null,
            showCropperModal: false,
        };

        this.onProfilePictureEditClick = this.onProfilePictureEditClick.bind(this);
        this.onInputProfilePictureChange = this.onInputProfilePictureChange.bind(this);
        this.onCropperCancel = this.onCropperCancel.bind(this);
        this.onCropClick = this.onCropClick.bind(this);
    }

    onProfilePictureEditClick() {
        this.inputProfilePicture.click();
    }

    onInputProfilePictureChange(e) {
        if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();

            reader.onload = (e: any) => {
                this.setState(Update(this.state, {
                    pictureProfile: { $set: e.target.result }
                }), () => {
                    this.setState(Update(this.state, {
                        showCropperModal: { $set: true }
                    }));
                });
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    onCropClick(ret) {
        this.inputProfilePicture.value = null;
        this.setState(Update(this.state, {
            showCropperModal: { $set: false }
        }));
        this.props.onCropClick(ret);
    }

    onCropperCancel() {
        this.inputProfilePicture.value = null;
        this.setState(Update(this.state, {
            showCropperModal: { $set: false }
        }));
    }

    render() {

        return (
            <div>
                <CropperModal Resource={null} img={this.state.pictureProfile}
                    show={this.state.showCropperModal}
                    cancelClick={this.onCropperCancel}
                    okClick={this.onCropClick} />
                <div className={"row"}>
                    <div className={"col-xs-12 col-md-2 picture-col"}>
                        <div className={"inline-div picture-container"}>
                            <img className={"profile-picture picture"} id={"profile-picture"}
                                src={`${this.props.avatarB64}`} />
                            <div className={'picture-info'}>
                                <button type={'button'} onClick={this.onProfilePictureEditClick} className={'btn-link btn-link-picture'}>
                                    <i className={"fa fa-pencil-square-o fa-2x"} aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <input id={"profile-upload"}
                            ref={(control) => this.inputProfilePicture = control}
                            onChange={this.onInputProfilePictureChange}
                            type="file" name="file" accept="image/*" />
                    </div>
                    <div className={"clearfix visible-xs"}></div>
                    <div className={"col-xs-12 col-md-4 displayname-col"}>
                        <div className={"profile-displayName"}>
                            <ReduxForm.Field name="username"
                                id={"username"}
                                type="text"
                                component={renderField}
                                hasRightGroup={true}
                                rightGroupHtml={
                                    <a className={'btn-link'} href="javascript:void(0);">
                                        {this.props.Resource ? this.props.Resource.usernameverify : ""}
                                    </a>
                                }
                                />
                        </div>
                    </div>
                    <div className={"col-xs-12 col-md-6 displayname-col"}>
                        <div>
                            <button disabled={this.props.loading}
                                type={"submit"}
                                className={"btn btn-success pull-right small-margin-left"}>
                                <i className={"fa fa-save"} aria-hidden="true"></i>
                                <span> {this.props.Resource ? this.props.Resource.save : ""}</span>
                            </button>
                            <button disabled={this.props.loading}
                                onClick={this.props.onCancelClick}
                                className={"btn btn-danger pull-right"}>
                                <i className={"fa fa-remove"} aria-hidden="true"></i>
                                <span> {this.props.Resource ? this.props.Resource.cancel : ""}</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={"clearfix"}></div>
                <Separator />
                <div className={"row"}>
                    <div className={"col-lg-6 col-md-12"}>
                        <div className={"form-group"}>
                            <ReduxForm.Field name="playerType"
                                id={"playerType"}
                                label={this.props.Resource ? this.props.Resource.playertype : ""}
                                component={renderDropdown}
                                data={this.props.playerTypes}
                                onToggle={this.props.fetchPlayerTypes}
                                valueField={'id'}
                                textField={'text'}
                                emptyMessage={this.props.Resource ? this.props.Resource.noitems : ""}
                                busy={this.props.playerTypesLoading}
                            />
                        </div>
                    </div>
                    <div className={"clearfix visible-md"}></div>
                    <div className={"col-lg-6 col-md-12"}>
                        <div className={"form-group"}>
                            <ReduxForm.Field name="playerTimezone"
                                id={"playerTimezone"}
                                label={this.props.Resource ? this.props.Resource.timezone : ""}
                                component={renderDropdown}
                                data={this.props.timezones}
                                onToggle={this.props.fetchTimezones}
                                valueField={'id'}
                                textField={'text'}
                                emptyMessage={this.props.Resource ? this.props.Resource.noitems : ""}
                                busy={this.props.timezonesLoading}
                            />
                        </div>
                    </div>
                    <div className={"clearfix"}></div>
                    <div className={"col-lg-12 col-md-12"}>
                        <div className={"form-group"}>
                            <div>
                                <ReduxForm.Field name="playerlanguages"
                                    id={"playerlanguages"}
                                    label={this.props.Resource ? this.props.Resource.languagesfield : ""}
                                    component={renderMultiselect}
                                    onSearch={this.props.fetchLanguages}
                                    data={this.props.languages}
                                    valueField={'id'}
                                    textField={'text'}
                                    emptyMessage={this.props.Resource ? this.props.Resource.searchlanguage3char : ""}
                                    busy={this.props.languagesLoading}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className={"clearfix"}></div>
                    <div className={"col-lg-12"}>
                        <div className={"form-group"}>
                            <label className={"control-label"}>
                                {this.props.Resource ? this.props.Resource.profiledescriptionfield : ""}
                            </label>
                            <MarkdownEditor
                                resources={this.props.Resource}
                                emojiClasses={'emoji-popover'}
                                onChange={this.props.onEditorChange}
                                send={null}
                                value={this.props.description}
                                EditorID={'profile_markdown'} />
                        </div>
                    </div>
                    <div className={"clearfix"}></div>
                </div>
                <div className={"clearfix"}></div>
                <Separator />
                <YoureSpecial
                    editing={true}
                    Resource={this.props.Resource}
                    />
                <Separator />
                <DeleteAccount
                    loading={this.props.loading}
                    onRemoveClick={this.props.onRemoveAccountClick}
                    Resource={this.props.Resource}
                    />
            </div>    
        );
    }
}

export default PlayerProfileEdit;