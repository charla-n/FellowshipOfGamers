declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";
import * as types from "../actions/actionTypes";
import { Link } from 'react-router';
import renderField from "../components/Field";
import Separator from "../components/Separator";
import { fetchSearchGroupResource } from "../actions/resourceAction"
import {
    SearchGroupReadRequest
} from "../actions/groupAction";
import ListController from "../components/ListController";
import SearchGroupItem from '../components/SearchGroupItem';
import SearchGroupRefine from '../components/SearchGroupRefine';
var ReduxForm = require('redux-form');

export interface SearchGroupProps {
    Authed: boolean;
    FetchResource: any;
    ResourceShouldUpdate: boolean;
    Resource: any;
    onMount: any;
    Data: any;
    Loading: boolean;
    onRequestData: any;
}

export class SearchGroup extends React.Component<SearchGroupProps, {}> {

    common: Common;

    constructor() {
        super();

        this.common = new Common();
    }

    componentDidMount() {
        this.props.onMount();
        this.props.FetchResource();
    }

    componentWillReceiveProps(nextprops: SearchGroupProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchResource();
        }
    }

    buildCreateGroupContent() {
        let content;

        if (this.props.Authed) {
            content = (
                <Link className={"btn btn-primary pull-right"} to="/CreateGroup">
                    <i className={"fa fa-plus"} aria-hidden="true"></i>
                    <span> {this.props.Resource ? this.props.Resource.createagroupbtn : ''}</span>
                </Link>
            );
        }

        return content;
    }

    render() {

        return (
            <div>
                <div>
                    <h3 className={'title-separator'}>
                        {this.props.Resource ? this.props.Resource.searchgrouppaneltitle : ''}
                    </h3>
                    {this.buildCreateGroupContent()}
                </div>
                <br/>
                <ListController
                    Data={this.props.Data}
                    Loading={this.props.Loading}
                    Name={"searchgroup_list"}
                    Resource={this.props.Resource}
                    RequestData={this.props.onRequestData}
                    ResourceShouldUpdate={this.props.ResourceShouldUpdate}
                    GetParams={[]}
                    AdditionalData={{}}
                >
                    <SearchGroupRefine
                        onRefineChange={null}
                        Resource={null}
                        ResourceShouldUpdate={null}
                    >
                    </SearchGroupRefine>
                    <SearchGroupItem
                        Data={null}
                        Resource={this.props.Resource}
                    >
                    </SearchGroupItem>
                </ListController>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Resource: state.resourceSearchGroupReducer.Resource,
        ResourceShouldUpdate: state.resourceSearchGroupReducer.ResourceShouldUpdate,
        Authed: state.authReducer.authed,
        Data: state.searchGroupReducer.data,
        Loading: state.searchGroupReducer.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        FetchResource: () => dispatch(fetchSearchGroupResource()),
        onMount: () => {
            dispatch({ type: types.GROUP_SEARCH_MOUNT });
        },
        onRequestData: (data) => dispatch(SearchGroupReadRequest(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGroup);