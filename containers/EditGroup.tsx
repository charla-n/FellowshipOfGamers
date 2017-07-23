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
    EditGroupRequest
} from "../actions/groupAction";
import * as Moment from 'moment';
import * as DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Label from '../components/Label';
import { validate } from './CreateGroup';
import {
    PlayerProfileReadRequest
} from '../actions/playerProfileAction';
import {
    GroupByIDRequest,
} from "../actions/groupAction";

var ReduxForm = require('redux-form');

export interface EditGroupProps {
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
    EditGroupRequest: any;
    FetchGroup;

    languageLoading: boolean;
    gamesLoading: boolean;
    communicationsLoading: boolean;
    agesLoading: boolean;
    playStylesLoading: boolean;

    initialValues: any;
    description: any;
    when: any;
    ID: number;
    onGroupImageChange: any;
    image: any;
}

export class EditGroup extends React.Component<EditGroupProps, {}> {

    common: Common;

    constructor() {
        super();

        this.common = new Common();

        this.onSubmit = this.onSubmit.bind(this);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onGroupImageChange = this.onGroupImageChange.bind(this);
    }

    componentDidMount() {
        let props = this.props as any;

        this.props.onMount();
        this.props.FetchResource();
        this.props.FetchGroup(props.router.params.id);
    }

    componentWillReceiveProps(nextprops: EditGroupProps) {
        let props = this.props as any;

        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
        if (this.props.when === undefined && nextprops.when !== undefined) {
            this.props.WhenDateChanged(nextprops.when);
        }
    }

    onEditorChange(e) {
        let props = this.props as any;

        props.change('description', e);
    }

    onSubmit() {
        let ret = this.props.EditGroupRequest();

        ret.then((data) => {
            let props = this.props as any;

            props.router.push(`/ViewGroup/${props.router.params.id}`);
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
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className={"panel panel-default"}>
                        <div className={"panel-body"}>
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
                                isCreate={false}
                                languageLoading={this.props.languageLoading}
                                languages={this.props.languages}
                                loading={this.props.loading}
                                onEditorChange={this.onEditorChange}
                                playStyles={this.props.playStyles}
                                playStylesLoading={this.props.playStylesLoading}
                                Resource={this.props.Resource}
                                WhenDateChanged={this.props.WhenDateChanged}
                                description={this.props.description}
                                when={this.props.when}
                                ID={this.props.ID}
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
    if (state.viewGroupReducer.when) {
        //debugger;
    }
    return {
        Resource: state.resourceCreateGroupReducer.Resource,
        ResourceShouldUpdate: state.resourceCreateGroupReducer.ResourceShouldUpdate,
        Authed: state.authReducer.authed,
        loading: state.createGroupReducer.loading,
        description: state.viewGroupReducer.data ? state.viewGroupReducer.data.description : undefined,
        when: state.viewGroupReducer.when ? Moment.utc(state.viewGroupReducer.when).local().toDate() : undefined,
        Games: state.dataGamesReducer.data,
        languages: state.dataLanguagesReducer.languages,
        playStyles: state.dataPlayStylesReducer.data,
        ages: state.dataAgesReducer.data,
        communications: state.dataCommunicationsReducer.data,
        languageLoading: state.dataLanguagesReducer.loading,
        gamesLoading: state.dataGamesReducer.loading,
        communicationsLoading: state.dataCommunicationsReducer.loading,
        agesLoading: state.dataAgesReducer.loading,
        playStylesLoading: state.dataPlayStylesReducer.loading,
        ID: state.viewGroupReducer.data ? state.viewGroupReducer.data.id : 0,
        image: state.createGroupReducer.image,

        initialValues: {
            when: state.viewGroupReducer.when ? Moment.utc(state.viewGroupReducer.when).local().toDate() : undefined,
            ID: state.viewGroupReducer.data ? state.viewGroupReducer.data.id : undefined,
            description: state.viewGroupReducer.data ? state.viewGroupReducer.data.description : undefined,
            ages: state.viewGroupReducer.data ? state.viewGroupReducer.data.ages : undefined,
            hours: state.viewGroupReducer.data ? { id: state.viewGroupReducer.data.hours, text: state.viewGroupReducer.data.hours } : undefined,
            games: state.viewGroupReducer.data ? state.viewGroupReducer.data.games : undefined,
            need: state.viewGroupReducer.data ? { id: state.viewGroupReducer.data.need, text: state.viewGroupReducer.data.need } : undefined,
            minutes: state.viewGroupReducer.data ? { id: state.viewGroupReducer.data.minutes, text: state.viewGroupReducer.data.minutes } : undefined,
            language: state.viewGroupReducer.data ? state.viewGroupReducer.data.language : undefined,
            communications: state.viewGroupReducer.data ? state.viewGroupReducer.data.communications : undefined,
            playstyles: state.viewGroupReducer.data ? state.viewGroupReducer.data.playStyles : undefined,
        },
    }
}

const mapDispatchToProps = (dispatch) => {

    let gameTimeout = null;
    let languageTimeout = null;

    return {
        WhenDateChanged: (date) => dispatch(WhenDateChanged(date, 'editGroupForm')),
        CreateGameTag: (tag) => dispatch(GamesCreateTag(tag, 'editGroupForm')),
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
        },
        ProfileRead: (userid) => dispatch(PlayerProfileReadRequest(userid)),
        EditGroupRequest: () => dispatch(EditGroupRequest()),
        FetchGroup: (id) => dispatch(GroupByIDRequest(id)),
        onGroupImageChange: (data) => dispatch({ type: types.GROUP_IMAGE_CHANGED, data }),
    }
}

let editGroup = ReduxForm.reduxForm({
    form: 'editGroupForm',
    enableReinitialize: true,
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    validate,
})(EditGroup);

export default connect(mapStateToProps, mapDispatchToProps)(editGroup);