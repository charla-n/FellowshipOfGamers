declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import renderField from "../components/Field";
import Separator from "../components/Separator";
import PlayerProfileRead from "../components/PlayerProfileRead";
import PlayerProfileEdit from "../components/PlayerProfileEdit";
import { fetchPlayerProfileResource } from '../actions/resourceAction';
import { fetchPlayerTypes, fetchLanguages, fetchTimezones } from '../actions/dataAction';
import {
    PlayerProfileReadRequest,
    PlayerProfileRemoveAccount,
    PlayerProfileAvatarRequest,
    PlayerProfileSaveRequest
} from '../actions/playerProfileAction';
import { UsernameInUseRequest } from '../actions/registerAction';
var ReduxForm = require('redux-form');

export interface PlayerProfileProps {
    userid: any;
    onSubmitRequest: any;
    Loading: boolean;
    onMount: any;
    Authed: boolean;
    FetchResource: any;
    ResourceShouldUpdate: boolean;
    Resource: any;
    ProfileRead: any;
    AvatarRead: any;

    avatar: any;
    onProfilePictureChange: any;

    initialValues: any;

    onRemoveAccountClick: any;

    FetchPlayerTypes: any;
    FetchLanguages: any;
    playerTypes: any;
    playerTypesLoading: boolean;
    languages: any;
    languageLoading: boolean;

    playerTypesErrors: any;
    languagesErrors: any;

    startEditing: any;
    stopEditing: any;
    editing: boolean;
    FetchTimezones: any;
    timezones: any;
    timezonesLoading: boolean;
    htmlDescription: any;
}

export interface PlayerProfileState {
}

const validate = (values, props) => {
    const errors: any = {};

    if (values.playerlanguages && values.playerlanguages.length > 25) {
        errors.playerlanguages = props.Resource ? props.Resource.PROFILE_MAX_LANGUAGES_REACHED : '';
    }
    if (!values.username || values.username === "") {
        errors.username = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    if (values.username && values.username.length > 20) {
        errors.username = props.Resource ? props.Resource._20_CHAR_MAX : '';
    }
    if (values.description && values.description.length > 3000) {
        errors.description = props.Resource ? props.Resource._3000_CHAR_MAX : '';
    }
    if (values.strength && (values.strength < 0 || values.strength > 10)) {
        errors.strength = props.Resource ? props.Resource.WRONG_DATA : '';
    }
    if (values.perception && (values.perception < 0 || values.perception > 10)) {
        errors.perception = props.Resource ? props.Resource.WRONG_DATA : '';
    }
    if (values.endurance && (values.endurance < 0 || values.endurance > 10)) {
        errors.endurance = props.Resource ? props.Resource.WRONG_DATA : '';
    }
    if (values.charisma && (values.charisma < 0 || values.charisma > 10)) {
        errors.charisma = props.Resource ? props.Resource.WRONG_DATA : '';
    }
    if (values.intelligence && (values.intelligence < 0 || values.intelligence > 10)) {
        errors.intelligence = props.Resource ? props.Resource.WRONG_DATA : '';
    }
    if (values.agility && (values.agility < 0 || values.agility > 10)) {
        errors.agility = props.Resource ? props.Resource.WRONG_DATA : '';
    }
    if (values.luck && (values.luck < 0 || values.luck > 10)) {
        errors.luck = props.Resource ? props.Resource.WRONG_DATA : '';
    }
    return errors;
}

const asyncValidate = (values, dispatch, props) => {
    return dispatch(UsernameInUseRequest("profileForm", true)).then((data) => {
        if (data && data.inUse) {
            throw { username: props.Resource ? props.Resource.USERNAME_ALREADY_IN_USE : '' };
        }
    });
}

export class PlayerProfile extends React.Component<PlayerProfileProps, PlayerProfileState> {

    common: Common;

    constructor() {
        super();

        this.common = new Common();

        this.state = {
        };

        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onProfilePictureChange = this.onProfilePictureChange.bind(this);
        this.doRequests = this.doRequests.bind(this);
    }

    componentDidMount() {
        this.doRequests(this.props.userid);
    }

    doRequests(userid) {

        if (userid === undefined || userid === null) {
            userid = "";
        }

        this.props.onMount();
        this.props.FetchResource();
        this.props.ProfileRead(userid);
        this.props.AvatarRead(userid);
    }

    componentWillReceiveProps(nextprops: PlayerProfileProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
        if (nextprops.userid != this.props.userid) {
            this.doRequests(nextprops.userid);
        }
    }

    onSubmitClick() {

        let props = this.props as any;

        this.props.onSubmitRequest();
    }

    onEditClick() {
        this.props.startEditing();
    }

    onCancelClick() {
        this.props.stopEditing();
        let props = this.props as any;

        props.reset();
    }

    onEditorChange(e) {
        let props = this.props as any;

        props.change('description', e);
    }

    onProfilePictureChange(canvas) {
        let props = this.props as any;

        this.props.onProfilePictureChange(canvas.toDataURL());
    }

    render() {

        const { handleSubmit } = this.props as any;

        let profileContent;

        if (this.props.editing) {
            profileContent = (
                <PlayerProfileEdit description={this.props.initialValues.description}
                    Resource={this.props.Resource}
                    loading={this.props.Loading}
                    onRemoveAccountClick={this.props.onRemoveAccountClick}
                    avatarB64={this.props.avatar}
                    onCancelClick={this.onCancelClick}
                    fetchPlayerTypes={this.props.FetchPlayerTypes}
                    playerTypes={this.props.playerTypes}
                    fetchLanguages={this.props.FetchLanguages}
                    languages={this.props.languages}
                    onEditorChange={this.onEditorChange}
                    onCropClick={this.onProfilePictureChange}
                    languagesLoading={this.props.languageLoading}
                    playerTypesLoading={this.props.playerTypesLoading}
                    fetchTimezones={this.props.FetchTimezones}
                    timezones={this.props.timezones}
                    timezonesLoading={this.props.timezonesLoading}
                    />
            );
        } else {
            profileContent = (
                <PlayerProfileRead description={this.props.htmlDescription}
                    username={this.props.initialValues.username}
                    playerLanguages={this.props.initialValues.playerlanguages}
                    playerType={this.props.initialValues.playerType}
                    Resource={this.props.Resource}
                    timezone={this.props.initialValues.playerTimezone}
                    agility={this.props.initialValues.agility}
                    charisma={this.props.initialValues.charisma}
                    endurance={this.props.initialValues.endurance}
                    intelligence={this.props.initialValues.intelligence}
                    luck={this.props.initialValues.luck}
                    perception={this.props.initialValues.perception}
                    strength={this.props.initialValues.strength}
                    loading={this.props.Loading}
                    onRemoveAccountClick={this.props.onRemoveAccountClick}
                    avatarB64={this.props.avatar}
                    onEditClick={this.onEditClick}
                    isOwnAccount={!this.props.userid}
                    userid={this.props.userid}
                    />
            );
        }

        return (
            <div>
                <form onSubmit={handleSubmit(this.onSubmitClick)}>
                    <div>
                        <h3 className={'title-separator'}>
                            {this.props.Resource ? this.props.Resource.profiletitle : ""}
                        </h3>
                    </div>
                    <br/>
                    <div>
                        {profileContent}
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Resource: state.resourcePlayerProfileReducer.Resource,
        ResourceShouldUpdate: state.resourcePlayerProfileReducer.ResourceShouldUpdate,
        Loading: state.playerProfileReducer.loading,
        Authed: state.authReducer.authed,
        editing: state.playerProfileReducer.editing,
        htmlDescription: state.playerProfileReducer.htmlDescription,

        initialValues: {
            strength: state.playerProfileReducer.strength,
            perception: state.playerProfileReducer.perception,
            username: state.playerProfileReducer.username,
            playerType: state.playerProfileReducer.playerType,
            playerlanguages: state.playerProfileReducer.playerLanguages,
            endurance: state.playerProfileReducer.endurance,
            charisma: state.playerProfileReducer.charisma,
            intelligence: state.playerProfileReducer.intelligence,
            agility: state.playerProfileReducer.agility,
            luck: state.playerProfileReducer.luck,
            description: state.playerProfileReducer.description,
            playerTimezone: state.playerProfileReducer.timezone,
        },

        avatar: state.playerProfileReducer.avatar,

        playerTypes: state.dataPlayerTypesReducer.playerTypes,
        playerTypesErrors: state.dataPlayerTypesReducer.errors,
        playerTypesLoading: state.dataPlayerTypesReducer.loading,
        languages: state.dataLanguagesReducer.languages,
        languagesErrors: state.dataLanguagesReducer.errors,
        languageLoading: state.dataLanguagesReducer.loading,

        timezones: state.dataTimezonesReducer.data,
        timezonesLoading: state.dataTimezonesReducer.loading,
    }
}

const mapDispatchToProps = (dispatch) => {

    let languageTimeout = null;

    return {
        FetchResource: () => dispatch(fetchPlayerProfileResource()),
        ProfileRead: (userid) => dispatch(PlayerProfileReadRequest(userid)),
        AvatarRead: (userid) => dispatch(PlayerProfileAvatarRequest(userid)),
        FetchPlayerTypes: () => dispatch(fetchPlayerTypes()),
        FetchTimezones: () => {
            dispatch(fetchTimezones())
        },
        FetchLanguages: (term) => {
            if (languageTimeout !== null) {
                clearTimeout(languageTimeout);
            }
            languageTimeout = setTimeout(() => {
                dispatch(fetchLanguages(term));
            }, constants.SEARCH_DELAY);
        },
        onSubmitRequest: () => dispatch(PlayerProfileSaveRequest()),
        onMount: () => {
            dispatch({ type: types.PLAYERPROFILE_MOUNT });
            dispatch({ type: types.DATA_LANGUAGES_CLEAR });
            dispatch({ type: types.DATA_PLAYERTYPES_CLEAR });
        },
        onRemoveAccountClick: (password) => dispatch(PlayerProfileRemoveAccount(password)),
        onProfilePictureChange: (data) => dispatch({ type: types.PLAYERPROFILE_PICTURE_CHANGED, data }),
        startEditing: () => dispatch({ type: types.PLAYERPROFILE_EDITING_TOGGLE }),
        stopEditing: () => dispatch({ type: types.PLAYERPROFILE_EDITING_TOGGLE }),
    }
}

let playerProfile = ReduxForm.reduxForm({
    form: 'profileForm',
    enableReinitialize: true,
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    shouldAsyncValidate: constants.defaultShouldAsyncValidate,
    validate,
    asyncValidate,
    asyncBlurFields: ['username']
})(PlayerProfile);

playerProfile = connect(mapStateToProps, mapDispatchToProps)(playerProfile); 

export default playerProfile;