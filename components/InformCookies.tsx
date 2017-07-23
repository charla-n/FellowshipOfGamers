import * as React from 'react'
import * as Moment from "moment";
import * as Cookie from "js-cookie";

export interface InformCookiesProps {
    Resource: any;
    ResourceShouldUpdate: boolean;
}

export interface InformCookiesState {
    show: boolean;
}

export class InformCookies extends React.Component<InformCookiesProps, InformCookiesState> {

    static KEY: string = "INFORM_COOKIE";

    constructor() {
        super();

        this.acceptCookies = this.acceptCookies.bind(this);

        let informCookie = Cookie.get(InformCookies.KEY);

        this.state = {
            show: informCookie ? false : true,
        };
    }

    acceptCookies() {
        Cookie.set(InformCookies.KEY, true, {
            expires: 365,
        });
        this.setState({
            show: false,
        });
    }

    render() {

        let content;

        if (this.state.show) {
            content = (
                <div className={'inform-cookie'}>
                    <div className={'row'}>
                        <div className={'col-xs-11'}>
                            {this.props.Resource ? this.props.Resource.informcookiestext : ''}
                    </div>
                        <div className={'col-xs-1'}>
                            <a className={'link-button-white'} href={'javascript:void(0)'} onClick={this.acceptCookies}>
                                <i className={"fa fa-times-circle fa-2x"} aria-hidden="true"></i>
                            </a>
                        </div>
                        <div className={'clearfix'}></div>
                    </div>
                </div>
            );
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

export default InformCookies;