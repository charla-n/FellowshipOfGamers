declare var require;

import * as React from 'react'
import { connect } from 'react-redux';
import { fetchFooterResource } from '../actions/resourceAction';
import Footer from "../components/Footer";
import Menu from "./Menu";
import * as lodash from 'lodash';
import LoadingBar from '../components/loading_bar';
import InformCookies from '../components/InformCookies';
var Notifications = require('react-notification-system-redux');

export interface LayoutProps {
    FooterResource: any,
    FooterResourceShouldUpdate: boolean,
    fetchFooterResources: any,
    notifications: any;
}

export class Layout extends React.Component<LayoutProps, {}> {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.fetchFooterResources();
    }

    componentWillReceiveProps(nextprops) {
        if (nextprops.FooterResourceShouldUpdate && !this.props.FooterResourceShouldUpdate) {
            this.props.fetchFooterResources();
        }
    }

    render() {
        var notif = this.props.notifications;
        return (
            <div className={'site-layout'}>
                <LoadingBar />
                <Notifications
                    allowHTML={true}
                    notifications={notif}
                />
                <Menu router={(this.props as any).router}/>
                <div className={"container"}>
                    <div className={"row"}>
                        {this.props.children}
                    </div>
                    <div className={"clearfix"}></div>
                </div>
                <Footer Resource={this.props.FooterResource} />
                <InformCookies ResourceShouldUpdate={this.props.FooterResourceShouldUpdate} Resource={this.props.FooterResource}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        FooterResource: state.resourceLayoutReducer.FooterResource,
        FooterResourceShouldUpdate: state.resourceLayoutReducer.FooterResourceShouldUpdate,
        notifications: state.notifications,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFooterResources: () => dispatch(fetchFooterResource()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);