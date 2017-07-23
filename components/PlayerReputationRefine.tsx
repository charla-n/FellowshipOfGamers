import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import Separator from "./Separator";
import Stars from "./Stars";
import { Link } from 'react-router';
import Toggle from 'react-toggle';
import * as constants from "../utils/Constants";
import Sort from "./Sort";
import RefineFilterTitle from '../components/RefineFilterTitle';
import RefineSortTitle from '../components/RefineSortTitle';
import RefineButton from '../components/RefineButton';

export interface PlayerReputationRefineProps {
    onRefineChange: any;
    loading: boolean;
    Resource: any;
    ResourceShouldUpdate: boolean;
}

export interface PlayerReputationRefineState {
    zeroStar: boolean;
    oneStar: boolean;
    twoStar: boolean;
    threeStar: boolean;
    fourStar: boolean;
    fiveStar: boolean;
    markSort: string;
    creationDateSort: string;
}

export class PlayerReputationRefine extends React.Component<PlayerReputationRefineProps, PlayerReputationRefineState> {

    constructor() {
        super();

        this.state = {
            zeroStar: true,
            oneStar: true,
            twoStar: true,
            threeStar: true,
            fourStar: true,
            fiveStar: true,
            markSort: constants.UNSORTED,
            creationDateSort: constants.SORT_DESC,
        };

        this.toggleZeroStar = this.toggleZeroStar.bind(this);
        this.toggleOneStar = this.toggleOneStar.bind(this);
        this.toggleFiveStar = this.toggleFiveStar.bind(this);
        this.toggleFourStar = this.toggleFourStar.bind(this);
        this.toggleThreeStar = this.toggleThreeStar.bind(this);
        this.toggleTwoStar = this.toggleTwoStar.bind(this);
        this.onMarkSort = this.onMarkSort.bind(this);
        this.onCreationDateSort = this.onCreationDateSort.bind(this);
        this.buildRefine = this.buildRefine.bind(this);
    }

    componentDidMount() {
        this.buildRefine();
    }

    buildRefine() {
        let refine = { Filters: {}, Sorts: {} };
        let enabledMarks = [];

        if (this.state.zeroStar) {
            enabledMarks.push(0);
        }
        if (this.state.oneStar) {
            enabledMarks.push(1);
        }
        if (this.state.twoStar) {
            enabledMarks.push(2);
        }
        if (this.state.threeStar) {
            enabledMarks.push(3);
        }
        if (this.state.fourStar) {
            enabledMarks.push(4);
        }
        if (this.state.fiveStar) {
            enabledMarks.push(5);
        }

        refine.Sorts["Mark"] = constants.SORT_MAPPING[this.state.markSort];
        refine.Sorts["CreationDate"] = constants.SORT_MAPPING[this.state.creationDateSort];

        refine.Filters["Marks"] = enabledMarks;

        this.props.onRefineChange(refine);
    }

    toggleZeroStar(evt) {
        this.setState(Update(this.state, {
            zeroStar: { $set: evt.target.checked }
        }));
    }

    toggleOneStar(evt) {
        this.setState(Update(this.state, {
            oneStar: { $set: evt.target.checked }
        }));
    }

    toggleTwoStar(evt) {
        this.setState(Update(this.state, {
            twoStar: { $set: evt.target.checked }
        }));
    }

    toggleThreeStar(evt) {
        this.setState(Update(this.state, {
            threeStar: { $set: evt.target.checked }
        }));
    }

    toggleFourStar(evt) {
        this.setState(Update(this.state, {
            fourStar: { $set: evt.target.checked }
        }));
    }

    toggleFiveStar(evt) {
        this.setState(Update(this.state, {
            fiveStar: { $set: evt.target.checked }
        }));
    }

    onMarkSort(newSort) {
        this.setState(Update(this.state, {
            markSort: { $set: newSort }
        }));
    }

    onCreationDateSort(newSort) {
        this.setState(Update(this.state, {
            creationDateSort: { $set: newSort }
        }));
    }

    render() {
        return (
            <div>
                <div>
                    <RefineFilterTitle Resource={this.props.Resource}/>
                    <div className={'row'}>
                        <div className={'col-md-6 col-xs-12'}>
                            <div className={'medium-margin-bottom'}>
                                <Toggle
                                    onChange={this.toggleZeroStar}
                                    id={'star-0'}
                                    defaultChecked={true}
                                />
                                <Stars
                                    Classes={'player-reputation-star inline-div'}
                                    Value={0}
                                />
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-6 col-xs-12'}>
                            <div className={'medium-margin-bottom'}>
                                <Toggle
                                    id={'star-1'}
                                    onChange={this.toggleOneStar}
                                    defaultChecked={true}
                                />
                                <Stars
                                    Classes={'player-reputation-star inline-div'}
                                    Value={1}
                                />
                            </div>
                        </div>
                        <div className={'clearfix'}></div>
                        <div className={'col-md-6 col-xs-12'}>
                            <div className={'medium-margin-bottom'}>
                                <Toggle
                                    onChange={this.toggleTwoStar}
                                    id={'star-2'}
                                    defaultChecked={true}
                                />
                                <Stars
                                    Classes={'player-reputation-star inline-div'}
                                    Value={2}
                                />
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-6 col-xs-12'}>
                            <div className={'medium-margin-bottom'}>
                                <Toggle
                                    onChange={this.toggleThreeStar}
                                    id={'star-3'}
                                    defaultChecked={true}
                                />
                                <Stars
                                    Classes={'player-reputation-star inline-div'}
                                    Value={3}
                                />
                            </div>
                        </div>
                        <div className={'clearfix'}></div>
                        <div className={'col-md-6 col-xs-12'}>
                            <div className={'medium-margin-bottom'}>
                                <Toggle
                                    onChange={this.toggleFourStar}
                                    id={'star-4'}
                                    defaultChecked={true}
                                />
                                <Stars
                                    Classes={'player-reputation-star inline-div'}
                                    Value={4}
                                />
                            </div>
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-6 col-xs-12'}>
                            <div className={'medium-margin-bottom'}>
                                <Toggle
                                    onChange={this.toggleFiveStar}
                                    id={'star-5'}
                                    defaultChecked={true}
                                />
                                <Stars
                                    Classes={'player-reputation-star inline-div'}
                                    Value={5}
                                />
                            </div>
                        </div>
                        <div className={'clearfix'}></div>
                    </div>
                    <div className={'clearfix'}></div>
                </div>
                <div>
                    <RefineSortTitle Resource={this.props.Resource}/>
                    <div className={'row'}>
                        <div className={'col-md-6 col-xs-12'}>
                            <Sort
                                Direction={this.state.markSort}
                                title={'Rating'}
                                onSortClick={this.onMarkSort}
                            />
                        </div>
                        <div className={'clearfix visible-xs'}></div>
                        <div className={'col-md-6 col-xs-12'}>
                            <Sort
                                Direction={this.state.creationDateSort}
                                title={'Date'}
                                onSortClick={this.onCreationDateSort}
                            />
                        </div>
                    </div>
                    <div className={'clearfix'}></div>
                </div>
                <RefineButton Resource={this.props.Resource} loading={this.props.loading} onFilterClick={this.buildRefine} />
            </div>
        );
    }
}

export default PlayerReputationRefine;