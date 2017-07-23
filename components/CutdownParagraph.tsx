import * as React from "react";
import * as Update from 'immutability-helper';
import Common from '../utils/Common';
import Separator from "./Separator";

export interface CutdownParagraphProps {
    Value: any;
    Limit: number;
    Resource: any;
}

export interface CutdownParagraphState {
    State: string;
}

export class CutdownParagraph extends React.Component<CutdownParagraphProps, CutdownParagraphState> {

    static SHOW_MORE: string = "SHOW_MORE";
    static UNDER_LIMIT: string = "UNDER_LIMIT";
    static SHOW_LESS: string = "SHOW_LESS";

    constructor(props: CutdownParagraphProps) {
        super();

        this.state = {
            State: props.Value.length > props.Limit ? CutdownParagraph.SHOW_MORE : CutdownParagraph.UNDER_LIMIT,
        };

        this.showMoreClick = this.showMoreClick.bind(this);
        this.showLessClick = this.showLessClick.bind(this);
    }

    showMoreClick() {
        this.setState({ State: CutdownParagraph.SHOW_LESS });
    }

    showLessClick() {
        this.setState({ State: CutdownParagraph.SHOW_MORE });
    }

    render() {
        let ret;

        if (this.state.State === CutdownParagraph.UNDER_LIMIT || this.state.State === CutdownParagraph.SHOW_LESS) {
            ret = <div dangerouslySetInnerHTML={{ __html: this.props.Value }}></div>;
        } else if (this.state.State === CutdownParagraph.SHOW_MORE) {
            ret = <div dangerouslySetInnerHTML={{ __html: (this.props.Value.substring(0, this.props.Limit) + '...') }}></div>;
        } else {
            ret = <div></div>;
        }

        var showAction = (<div></div>);

        if (this.state.State === CutdownParagraph.SHOW_LESS) {
            showAction = (<div><a href="javascript:void(0);" className={"btn-link showLess"} onClick={this.showLessClick}>{this.props.Resource ? this.props.Resource.showless : ""}</a></div>);
        } else if (this.state.State === CutdownParagraph.SHOW_MORE) {
            showAction = (<div><a href="javascript:void(0);" className={"btn-link showMore"} onClick={this.showMoreClick}>{this.props.Resource ? this.props.Resource.showmore : ""}</a></div>);
        }

        return (
            <div>
                <div className={'preserve-newline'}>
                    {ret}
                </div>
                {showAction}
            </div>    
        );
    }
}

export default CutdownParagraph;