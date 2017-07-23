declare var require;

import * as React from 'react';
import { connect } from 'react-redux';
import * as lodash from 'lodash';
import * as Update from 'immutability-helper';
import Loading from "../components/Loading";
import ListEmpty from "../components/ListEmpty";
import Separator from "../components/Separator";

export interface ListControllerProps {
    AdditionalData: any;
    GetParams: Array<string>;
    Resource: any;
    Loading: boolean;
    Data: Array<any>;
    Name: string;
    RequestData: any;
    ResourceShouldUpdate: boolean;
}

export interface ListControllerState {
    Pagination: any;
    Refine: any;
    ShowRefine: boolean;
}

export class ListController extends React.Component<ListControllerProps, ListControllerState> {

    constructor() {
        super();

        this.state = {
            Pagination: {
                Pagesize: 5,
                CurrentPage: 1,
            },
            Refine: null,
            ShowRefine: false,
        };

        this.renderChildren = this.renderChildren.bind(this);
        this.doRequest = this.doRequest.bind(this);
        this.onPageNumberChange = this.onPageNumberChange.bind(this);
        this.prevClick = this.prevClick.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.onPageSizeChange = this.onPageSizeChange.bind(this);
        this.onRefineChange = this.onRefineChange.bind(this);
        this.toggleRefinePanel = this.toggleRefinePanel.bind(this);
    }

    renderChildren(data, idx) {
        return React.Children.map(this.props.children[1], (child:any) => {
            return React.cloneElement(child, {
                Data: data,
                Resource: this.props.Resource,
                idx: idx,
            });
        })
    }

    renderRefine() {
        return React.Children.map(this.props.children[0], (child:any) => {
            return React.cloneElement(child, {
                onRefineChange: this.onRefineChange,
                loading: this.props.Loading,
                Resource: this.props.Resource,
                ResourceShouldUpdate: this.props.ResourceShouldUpdate,
            });
        });
    }

    onRefineChange(filter) {
        this.setState(Update(this.state, {
            Refine: { $set: filter }
        }), () => {
            this.doRequest(this.props.AdditionalData, this.props.GetParams);
        });
    }

    componentDidMount() {
    }

    doRequest(additionalData, getParams) {
        if (!isNaN(this.state.Pagination.CurrentPage) && !isNaN(this.state.Pagination.Pagesize) &&
            this.state.Pagination.CurrentPage && this.state.Pagination.Pagesize) {
            this.props.RequestData({
                ...additionalData,
                Refine: this.state.Refine,
                Pagination: this.state.Pagination,
            }, getParams);
        }
    }

    onPageNumberChange(event) {
        this.setState(Update(this.state, {
            Pagination: {
                CurrentPage: { $set: parseInt(event.target.value) }
            }
        }), () => {
            this.doRequest(this.props.AdditionalData, this.props.GetParams);
        });
    }

    prevClick() {
        if (parseInt(this.state.Pagination.CurrentPage) > 1) {

            this.onPageNumberChange({
                target: {
                    value: parseInt(this.state.Pagination.CurrentPage) - 1,
                }
            });
        }
    }

    nextClick() {
        this.onPageNumberChange({
            target: {
                value: parseInt(this.state.Pagination.CurrentPage) + 1,
            }
        });
    }

    onPageSizeChange(event) {
        this.setState(Update(this.state, {
            Pagination: {
                Pagesize: { $set: parseInt(event.target.value) }
            }
        }), () => {
            this.doRequest(this.props.AdditionalData, this.props.GetParams);
        });
    }

    toggleRefinePanel() {
        this.setState(Update(this.state, {
            ShowRefine: { $set: !this.state.ShowRefine }
        }));
    }

    componentWillReceiveProps(nextprops: ListControllerProps) {
        if (!lodash.isEqual(nextprops.AdditionalData, this.props.AdditionalData) ||
            !lodash.isEqual(nextprops.GetParams, this.props.GetParams)) {
            this.doRequest(nextprops.AdditionalData, nextprops.GetParams);
        }
    }

    render() {

        let content;
        let data;
        let refine;

        refine = (
            <div className={this.state.ShowRefine ? '' : 'collapse'}>
                {this.renderRefine()}
            </div>
        );
        if (this.props.Data.length > 0) {
            data = this.props.Data.map((val, idx) => {
                return (
                    <div key={`${this.props.Name}_${idx}`}>
                        {this.renderChildren(val, idx)}
                    </div>
                );
            });
        } else {
            data = (
                <ListEmpty Message={this.props.Resource ? this.props.Resource.noitems : ""}/>
            );
        }
        if (this.props.Loading) {
            data = (
                <Loading />
            );
        }
        content = (
            <div>
                <div>
                    <div>
                        <a onClick={this.toggleRefinePanel}
                            className={'btn-link'}
                            href={'javascript:void(0);'}>{this.props.Resource ? this.props.Resource.refine : ""}</a>
                    </div>
                    <div>
                        {refine}
                    </div>
                </div>
                <Separator/>
                <div>
                    {data}
                </div>
                <div>
                    <div className={"row"}>
                        <div className={"col-xs-12"}>
                            <ul className={"pager"}>
                                <li>
                                    <a href="javascript:void(0);" onClick={this.prevClick}>
                                        <i className={"fa fa-chevron-circle-left fa-lg"}></i>
                                    </a>
                                </li>
                                <li>
                                    <input className={"input-page-number"} type="number"
                                        value={this.state.Pagination.CurrentPage}
                                        onChange={this.onPageNumberChange}
                                        />
                                </li>
                                <li>
                                    <select className={"input-page-size"}
                                        defaultValue={this.state.Pagination.Pagesize}
                                        onChange={this.onPageSizeChange}
                                        >
                                        <option value={"5"}>5</option>
                                        <option value={"10"}>10</option>
                                        <option value={"20"}>20</option>
                                    </select>
                                </li>
                                <li>
                                    <a href="javascript:void(0);" onClick={this.nextClick}>
                                        <i className={"fa fa-chevron-circle-right fa-lg"}></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={"clearfix"}></div>
                </div>
            </div>    
            );
        return (
            <div id={this.props.Name}>
                {content}
            </div>
        );
    }
}

export default ListController;