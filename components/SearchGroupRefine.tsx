declare var require;

import * as React from 'react'
import { connect } from 'react-redux';
import * as lodash from 'lodash';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import { fetchRegisterResource } from '../actions/resourceAction';
import * as constants from "../utils/Constants";
import renderField from "../components/Field";
import * as types from "../actions/actionTypes";
import {
    PlayerProfileReadRequest
} from '../actions/playerProfileAction';
import {
    WhenFromDateChanged,
    WhenToDateChanged,
    GamesCreateTag
} from '../actions/groupAction';
import { browserHistory } from 'react-router';
import Separator from "./Separator";
import Stars from "./Stars";
import { Link } from 'react-router';
import Toggle from 'react-toggle';
import Sort from "./Sort";
import renderMultiselect from "../components/Multiselect";
import * as DateTimePicker from 'react-widgets/lib/DateTimePicker';
import Label from '../components/Label';
import * as Moment from 'moment';
import RefineFilterTitle from '../components/RefineFilterTitle';
import RefineSortTitle from '../components/RefineSortTitle';
import RefineButton from '../components/RefineButton';
import { BuildFilter } from '../actions/groupAction';
import {
    fetchGames,
    fetchLanguages,
    fetchAges,
    fetchCommunications,
    fetchPlayStyles
} from "../actions/dataAction";
var ReduxForm = require('redux-form');

export interface SearchGroupRefineProps {
    Resource: any;
    ResourceShouldUpdate: boolean;
    onRefineChange: any;
    onPlayerProfileRead: any;
    Authed: boolean;
    WhenFromDateChanged: any;
    WhenToDateChanged: any;
    from: any;
    to: any;
    loading: boolean;
    FetchLanguages: any;
    languages: any;
    FetchPlayStyles: any;
    FetchCommunications: any;
    FetchAges: any;
    playStyles: any;
    ages: any;
    communications: any;
    buildFilter: any;
    FetchGames: any;
    Games: any;
    CreateGameTag: any;
}

export interface SearchGroupRefineState {
    whenSort: string;
    durationSort: string;
}

export class SearchGroupRefine extends React.Component<SearchGroupRefineProps, SearchGroupRefineState> {

    fromDate: any;
    toDate: any;

    constructor() {
        super();

        this.fromDate = Moment().add('minute', 30 - Moment().minute() % 30).toDate();
        this.toDate = Moment(this.fromDate).add(24, 'hours').toDate();
        this.state = {
            whenSort: constants.SORT_ASC,
            durationSort: constants.UNSORTED,
        };
        this.buildRefine = this.buildRefine.bind(this);
        this.onWhenSort = this.onWhenSort.bind(this);
        this.onDurationSort = this.onDurationSort.bind(this);
    }

    componentDidMount() {
        this.props.WhenFromDateChanged(this.fromDate);
        this.props.WhenToDateChanged(this.toDate);
        if (this.props.Authed) {
            this.requestPlayerData().done(() => {
                this.buildRefine();
            });
        } else {
            this.buildRefine();
        }
    }

    componentWillReceiveProps(nextprops: SearchGroupRefineProps) {
        if (!this.props.Authed && nextprops.Authed) {
            this.requestPlayerData().done(() => {
                this.buildRefine();
            });
        }
    }

    onWhenSort(newSort) {
        this.setState(Update(this.state, {
            whenSort: { $set: newSort }
        }));
    }

    onDurationSort(newSort) {
        this.setState(Update(this.state, {
            durationSort: { $set: newSort }
        }));
    }

    requestPlayerData() {
        return this.props.onPlayerProfileRead();
    }

    buildRefine() {
        let refine = this.props.buildFilter();

        refine.Sorts["DateStart"] = constants.SORT_MAPPING[this.state.whenSort];
        refine.Sorts["Duration"] = constants.SORT_MAPPING[this.state.durationSort];

        this.props.onRefineChange(refine);
    }

    render() {
        return (
            <div>
                <div>
                    <RefineFilterTitle Resource={this.props.Resource}/>
                    <div className={'row'}>
                        <div className={'col-md-4 col-xs-12'}>
                            <div className={'form-group'}>
                                <ReduxForm.Field name="games"
                                    id={"games"}
                                    label={this.props.Resource ? this.props.Resource.games : ''}
                                    component={renderMultiselect}
                                    valueField={'id'}
                                    textField={'text'}
                                    data={this.props.Games}
                                    onSearch={this.props.FetchGames}
                                    onCreate={this.props.CreateGameTag}
                                    emptyMessage={this.props.Resource ? this.props.Resource.searchlanguage3char : ""}
                                />
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-4 col-xs-12'}>
                            <div className={'form-group'}>
                                <Label
                                    hasHelp={false}
                                    help={null}
                                    id={'from'}
                                    label={this.props.Resource ? this.props.Resource.from : ''} />
                                <DateTimePicker
                                    value={this.props.from}
                                    onChange={this.props.WhenFromDateChanged}
                                    step={30}
                                />
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-4 col-xs-12'}>
                            <div className={'form-group'}>
                                <Label
                                    hasHelp={false}
                                    help={null}
                                    id={'to'}
                                    label={this.props.Resource ? this.props.Resource.to : ''} />
                                <DateTimePicker
                                    value={this.props.to}
                                    onChange={this.props.WhenToDateChanged}
                                    step={30}
                                />
                            </div>
                        </div>
                        <div className={'clearfix'}></div>
                        <div className={'col-md-4 col-xs-12'}>
                            <div className={'form-group'}>
                                <ReduxForm.Field name="duration"
                                    id={"duration"}
                                    label={this.props.Resource ? this.props.Resource.duration : ''}
                                    component={renderField}
                                    hasRightGroup={true}
                                    type={'number'}
                                    rightGroupHtml={"hours"}
                                />
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-4 col-xs-12'}>
                            <div className={'form-group'}>
                                <ReduxForm.Field name="need"
                                    id={"need"}
                                    label={this.props.Resource ? this.props.Resource.need : ''}
                                    component={renderField}
                                    type={'number'}
                                />
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-4 col-xs-12'}>
                            <div className={'form-group'}>
                                <ReduxForm.Field name="languages"
                                    id={"languages"}
                                    label={this.props.Resource ? this.props.Resource.Languages : ''}
                                    component={renderMultiselect}
                                    valueField={'id'}
                                    textField={'text'}
                                    data={this.props.languages}
                                    onSearch={this.props.FetchLanguages}
                                    busy={this.props.loading}
                                    emptyMessage={this.props.Resource ? this.props.Resource.searchlanguage3char : ""}
                                />
                            </div>
                        </div>
                        <div className={'clearfix'}></div>
                        <div className={'col-md-4 col-xs-12'}>
                            <div className={'form-group'}>
                                <ReduxForm.Field name="communications"
                                    id={"communications"}
                                    label={this.props.Resource ? this.props.Resource.communication : ''}
                                    component={renderMultiselect}
                                    valueField={'id'}
                                    textField={'text'}
                                    data={this.props.communications}
                                    onToggle={this.props.FetchCommunications}
                                    emptyMessage={""}
                                    busy={this.props.loading}
                                />
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-4 col-xs-12'}>
                            <div className={'form-group'}>
                                <ReduxForm.Field name="playstyles"
                                    id={"playstyles"}
                                    label={this.props.Resource ? this.props.Resource.playstyles : ''}
                                    component={renderMultiselect}
                                    valueField={'id'}
                                    textField={'text'}
                                    data={this.props.playStyles}
                                    onToggle={this.props.FetchPlayStyles}
                                    emptyMessage={""}
                                    busy={this.props.loading}
                                />
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-4 col-xs-12'}>
                            <div className={'form-group'}>
                                <ReduxForm.Field name="ages"
                                    id={"ages"}
                                    label={this.props.Resource ? this.props.Resource.ages : ''}
                                    component={renderMultiselect}
                                    valueField={'id'}
                                    textField={'text'}
                                    data={this.props.ages}
                                    onToggle={this.props.FetchAges}
                                    emptyMessage={""}
                                    busy={this.props.loading}
                                />
                            </div>
                        </div>
                        <div className={'clearfix'}></div>
                    </div>
                    <div className={'clearfix'}></div>
                </div>
                <div>
                    <RefineSortTitle Resource={this.props.Resource} />
                    <div className={'row'}>
                        <div className={'col-md-6 col-xs-12'}>
                            <Sort
                                Direction={this.state.whenSort}
                                title={this.props.Resource ? this.props.Resource.when : ''}
                                onSortClick={this.onWhenSort}
                            />
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-6 col-xs-12'}>
                            <Sort
                                Direction={this.state.durationSort}
                                title={this.props.Resource ? this.props.Resource.duration : ''}
                                onSortClick={this.onDurationSort}
                            />
                        </div>
                    </div>
                    <div className={'clearfix'}></div>
                    <div className={'clearfix'}></div>
                </div>
                <RefineButton Resource={this.props.Resource} loading={this.props.loading} onFilterClick={this.buildRefine}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Authed: state.authReducer.authed,
        from: state.searchGroupRefineReducer.fromDate,
        to: state.searchGroupRefineReducer.toDate,
        languages: state.dataLanguagesReducer.languages,
        playStyles: state.dataPlayStylesReducer.data,
        ages: state.dataAgesReducer.data,
        communications: state.dataCommunicationsReducer.data,
        Games: state.dataGamesReducer.data,

        initialValues: {
            languages: state.playerProfileReducer.playerLanguages,
        },
    }
}

const mapDispatchToProps = (dispatch) => {

    let languageTimeout = null;
    let gameTimeout = null;

    return {
        CreateGameTag: (tag) => dispatch(GamesCreateTag(tag, 'searchGroupRefineForm')),
        WhenFromDateChanged: (date) => dispatch(WhenFromDateChanged(date, 'searchGroupRefineForm')),
        WhenToDateChanged: (date) => dispatch(WhenToDateChanged(date, 'searchGroupRefineForm')),
        onPlayerProfileRead: () => dispatch(PlayerProfileReadRequest('')),
        FetchLanguages: (term) => {
            if (languageTimeout !== null) {
                clearTimeout(languageTimeout);
            }
            languageTimeout = setTimeout(() => {
                dispatch(fetchLanguages(term));
            }, constants.SEARCH_DELAY);
        },
        FetchGames: (term) => {
            if (gameTimeout !== null) {
                clearTimeout(gameTimeout);
            }
            gameTimeout = setTimeout(() => {
                dispatch(fetchGames(term));
            }, constants.SEARCH_DELAY);
        },
        FetchPlayStyles: () => dispatch(fetchPlayStyles()),
        FetchCommunications: () => dispatch(fetchCommunications()),
        FetchAges: () => dispatch(fetchAges()),
        buildFilter: () => dispatch(BuildFilter()),
    }
}

let searchGroupRefine = ReduxForm.reduxForm({
    form: 'searchGroupRefineForm',
    enableReinitialize: true,
    touchOnChange: constants.touchOnChange,
    touchOnBlur: constants.touchOnBlur,
    shouldValidate: constants.defaultShouldValidate,
    shouldAsyncValidate: constants.defaultShouldAsyncValidate,
})(SearchGroupRefine);
searchGroupRefine = connect(mapStateToProps, mapDispatchToProps)(searchGroupRefine); 

export default searchGroupRefine;