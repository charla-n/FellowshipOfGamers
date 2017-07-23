import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import * as constants from "../utils/Constants";

export interface SortProps {
    Direction: string;
    title: string;
    onSortClick: any;
}

export class Sort extends React.Component<SortProps, {}> {

    constructor() {
        super();

        this.sortClick = this.sortClick.bind(this);
    }

    sortClick() {
        if (this.props.Direction === constants.SORT_ASC) {
            this.props.onSortClick(constants.SORT_DESC);
        } else if (this.props.Direction === constants.SORT_DESC) {
            this.props.onSortClick(constants.UNSORTED);
        } else if (this.props.Direction === constants.UNSORTED) {
            this.props.onSortClick(constants.SORT_ASC);
        }
    }

    render() {

        return (
            <a href={"javascript:void(0);"} onClick={this.sortClick}>
                <i className={"fa fa-" + this.props.Direction + " fa-2x fa-sort-icon"} aria-hidden="true">
                </i>
                <span className={"small-margin-left"}>{this.props.title}</span>
            </a>
        );
    }
}

export default Sort;