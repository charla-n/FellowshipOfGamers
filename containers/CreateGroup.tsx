declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import { Link } from 'react-router';
import renderField from "../components/Field";
import renderDropdown from "../components/Dropdown";
import renderMultiselect from "../components/Multiselect";
import renderValidation from "../components/Validation";
import Separator from "../components/Separator";
import CreateEditGroup from "../components/CreateEditGroup";
import {
    fetchGames,
    fetchLanguages,
    fetchAges,
    fetchCommunications,
    fetchPlayStyles
} from "../actions/dataAction";
import { fetchCreateGroupResource } from "../actions/resourceAction"
import {
    WhenDateChanged,
    GamesCreateTag,
    CreateGroupRequest
} from "../actions/groupAction";
import * as Moment from 'moment';
import * as DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Label from '../components/Label';
import {
    PlayerProfileReadRequest
} from '../actions/playerProfileAction';

var ReduxForm = require('redux-form');

export interface CreateGroupProps {
    Authed: boolean;
    FetchResource: any;
    ResourceShouldUpdate: boolean;
    Resource: any;
    onMount: any;
    loading: boolean;

    FetchGames: any;
    Games: any;
    CreateGameTag: any;
    WhenDateChanged: any;
    FetchLanguages: any;
    languages: any;
    ProfileRead: any;
    playerlanguages: any;
    FetchPlayStyles: any;
    FetchCommunications: any;
    FetchAges: any;
    playStyles: any;
    ages: any;
    communications: any;
    CreateGroupRequest: any;

    languageLoading: boolean;
    gamesLoading: boolean;
    communicationsLoading: boolean;
    agesLoading: boolean;
    playStylesLoading: boolean;
    when: Date;
    onGroupImageChange: any;
    image: any;
}

export const validate = (values, props) => {
    const errors: any = {}

    if (!values.games || values.games.length === 0) {
        errors.games = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    if (values.games && values.games.length > 10) {
        errors.games = props.Resource ? props.Resource.GROUP_MAX_GAMES : '';
    }
    if (!values.need) {
        errors.need = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    if (values.need && (values.need.id < 1 || values.need.id > 42)) {
        errors.need = props.Resource ? props.Resource.WRONG_DATA : '';
    }
    if (!values.description || values.description === "") {
        errors.description = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    if (values.description && values.description.length > 3000) {
        errors.description = props.Resource ? props.Resource.LENGTH_EXCEDEED : '';
    }
    if (!values.when) {
        errors.when = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    if (!values.hours) {
        errors.hours = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    if (values.hours && (values.hours.id < 1 || values.hours.id > 84)) {
        errors.hours = props.Resource ? props.Resource.WRONG_DATA : '';
    }
    if (!values.minutes) {
        errors.minutes = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    if (values.minutes && values.minutes.id !== 0 && values.minutes.id !== 30) {
        errors.minutes = props.Resource ? props.Resource.WRONG_DATA : '';
    }
    if (!values.language) {
        errors.language = props.Resource ? props.Resource.FIELD_REQUIRED : '';
    }
    if (values.when) {
        let dateStart = Moment(values.when).utc();
        let utcDate = Moment().utc();

        if (dateStart.diff(utcDate, 'minutes') < 0) {
            errors.when = props.Resource ? props.Resource.GROUP_DATE_START_WRONG : '';
        }
        else if (dateStart.diff(utcDate, 'days') > 90) {
            errors.when = props.Resource ? props.Resource.GROUP_DATE_START_WRONG : '';
        }
    }
    if (values.games) {
        for (let val of values.games) {
            if (val.text.length > 100) {
                errors.games = props.Resource ? val.text + ': ' + props.Resource.LENGTH_EXCEDEED : '';
            }
        }
    }
    return errors;
}

export class CreateGroup extends React.Component<CreateGroupProps, {}> {

    common: Common;

    constructor() {
        super();

        this.common = new Common();

        this.onSubmit = this.onSubmit.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onGroupImageChange = this.onGroupImageChange.bind(this);
    }

    componentDidMount() {
        this.props.onMount();
        this.props.FetchResource();
        this.props.ProfileRead("");
        this.props.WhenDateChanged(Moment().add('hour', 1).startOf('hour').toDate());
    }

    componentWillReceiveProps(nextprops: CreateGroupProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
    }

    onEditorChange(e) {
        let props = this.props as any;

        props.change('description', e);
    }

    onSubmit() {
        let ret = this.props.CreateGroupRequest();

        ret.then((data) => {
            let props = this.props as any;

            props.router.push(`/ViewGroup/${data}`);
        });
    }

    onGroupImageChange(canvas) {
        let props = this.props as any;

        this.props.onGroupImageChange(canvas.toDataURL());
    }

    render() {

        const { handleSubmit } = this.props as any;

        return (
            <div>
                <h3 className={'title-separator'}>
                    {this.props.Resource ? this.props.Resource.createagroupbtn : ''}
                </h3>
                <br/>
                <div className={"alert alert-dismissible alert-info"}>
                    <p>{this.props.Resource ? this.props.Resource.creategrouplimitgroupinfo : ''}</p>
                </div>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div>
                        <div>
                            <CreateEditGroup
                                ages={this.props.ages}
                                agesLoading={this.props.agesLoading}
                                communications={this.props.communications}
                                communicationsLoading={this.props.communicationsLoading}
                                CreateGameTag={this.props.CreateGameTag}
                                FetchAges={this.props.FetchAges}
                                FetchCommunications={this.props.FetchCommunications}
                                FetchGames={this.props.FetchGames}
                                FetchLanguages={this.props.FetchLanguages}
                                FetchPlayStyles={this.props.FetchPlayStyles}
                                Games={this.props.Games}
                                gamesLoading={this.props.gamesLoading}
                                isCreate={true}
                                languageLoading={this.props.languageLoading}
                                languages={this.props.languages}
                                loading={this.props.loading}
                                onEditorChange={this.onEditorChange}
                                playStyles={this.props.playStyles}
                                playStylesLoading={this.props.playStylesLoading}
                                Resource={this.props.Resource}
                                WhenDateChanged={this.props.WhenDateChanged}
                                description={''}
                                when={this.props.when}
                                ID={0}
                                onCropClick={this.onGroupImageChange}
                                image={this.props.image}
                            />
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Resource: state.resourceCreateGroupReducer.Resource,
        ResourceShouldUpdate: state.resourceCreateGroupReducer.ResourceShouldUpdate,
        Authed: state.authReducer.authed,
        Games: state.dataGamesReducer.data,
        languages: state.dataLanguagesReducer.languages,
        playStyles: state.dataPlayStylesReducer.data,
        ages: state.dataAgesReducer.data,
        communications: state.dataCommunicationsReducer.data,
        loading: state.createGroupReducer.loading,
        languageLoading: state.dataLanguagesReducer.loading,
        gamesLoading: state.dataGamesReducer.loading,
        communicationsLoading: state.dataCommunicationsReducer.loading,
        agesLoading: state.dataAgesReducer.loading,
        playStylesLoading: state.dataPlayStylesReducer.loading,
        when: state.viewGroupReducer.when,
        image: state.createGroupReducer.image,

        initialValues: {
            when: Moment().add('hour', 1).startOf('hour').toDate(),
            hours: { id: 1, text: '1' },
            minutes: { id: 0, text: '00' },
            language: state.playerProfileReducer.playerLanguages.length > 0 ? state.playerProfileReducer.playerLanguages[0] : undefined,
        },
    }
}

const mapDispatchToProps = (dispatch) => {

    let gameTimeout = null;
    let languageTimeout = null;

    return {
        WhenDateChanged: (date) => dispatch(WhenDateChanged(date, 'createGroupForm')),
        CreateGameTag: (tag) => dispatch(GamesCreateTag(tag, 'createGroupForm')),
        FetchPlayStyles: () => dispatch(fetchPlayStyles()),
        FetchCommunications: () => dispatch(fetchCommunications()),
        FetchAges: () => dispatch(fetchAges()),
        FetchGames: (term) => {
            if (gameTimeout !== null) {
                clearTimeout(gameTimeout);
            }
            gameTimeout = setTimeout(() => {
                dispatch(fetchGames(term));
            }, constants.SEARCH_DELAY);
        },
        FetchResource: () => dispatch(fetchCreateGroupResource()),
        FetchLanguages: (term) => {
            if (languageTimeout !== null) {
                clearTimeout(languageTimeout);
            }
            languageTimeout = setTimeout(() => {
                dispatch(fetchLanguages(term));
            }, constants.SEARCH_DELAY);
        },
        onMount: () => {
            dispatch({ type: types.DATA_LANGUAGES_CLEAR });
            dispatch({ type: types.DATA_COMMUNICATIONS_CLEAR });
            dispatch({ type: types.DATA_PLAYSTYLES_CLEAR });
            dispatch({ type: types.DATA_AGES_CLEAR });
            dispatch({ type: types.GROUP_CREATE_MOUNT });
        },
        ProfileRead: (userid) => dispatch(PlayerProfileReadRequest(userid)),
        CreateGroupRequest: () => dispatch(CreateGroupRequest()),
        onGroupImageChange: (data) => dispatch({ type: types.GROUP_IMAGE_CHANGED, data }),
    }
}

let createGroup = ReduxForm.reduxForm({
    form: 'createGroupForm',
    enableReinitialize: true,
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    validate,
})(CreateGroup);

export default connect(mapStateToProps, mapDispatchToProps)(createGroup);