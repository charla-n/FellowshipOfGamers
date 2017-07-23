declare var require;

import * as React from "react";
import * as Cookie from "js-cookie";
import * as Update from 'immutability-helper';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as types from "../actions/actionTypes";
import Locale from '../utils/Locale';
import { shouldRefetchResource, fetchMenuResource } from '../actions/resourceAction';
import { RevokeAllToken } from '../actions/loginAction';
import { UnreadNotification, SyncNotification } from '../actions/notificationAction';
import Notification from '../containers/Notification';
import * as Moment from 'moment';
var momentLocalizer = require('react-widgets/lib/localizers/moment')

export interface IMenuProps {
    MenuResource: any;
    changeLocale: any,
    Authed: boolean;
    ResourceShouldUpdate: boolean;
    FetchMenuResource: any;
    DisplayName: string;
    RevokeAllToken: any;
    UnreadNotifications: any;
    NotificationData: any;
    SyncNotification: any;
    router: any;
}

export interface IMenuState {
    localeActive: any,
    notifOpen: boolean;
}

export class Menu extends React.Component<IMenuProps, IMenuState> {

    constructor() {
        super();

        const currentLocale = Cookie.get(Locale.localeKEY);

        let localeActive = this.createLocaleArray(currentLocale);

        this.onSignOutClick = this.onSignOutClick.bind(this);
        this.onNotifToggle = this.onNotifToggle.bind(this);

        this.state = {
            localeActive: localeActive,
            notifOpen: false,
        };
    }

    createLocaleArray = (locale) => {
        let localeActive = {
            "en-us": "",
            "en-gb": "",
            "fr-fr": ""
        };

        localeActive[locale] = "active";

        return localeActive;
    }

    onLocaleChangeClick = (locale) => {

        let localeActive = this.createLocaleArray(locale);

        this.setState(Update(this.state, {
            localeActive: { $set: localeActive },
        }));
        this.props.changeLocale(locale);
    }

    onSignOutClick() {
        this.props.RevokeAllToken();
        this.props.router.push('/Home');
    }

    componentDidMount() {
        this.props.FetchMenuResource();

        $(() => {
            $("body").on('hidden.bs.dropdown', '#notif-dropdown', () => {
                this.props.SyncNotification();
                this.setState(Update(this.state, {
                    notifOpen: { $set: false },
                }), () => {
                });
            });
            $("body").on('shown.bs.dropdown', '#notif-dropdown', () => {
                this.setState(Update(this.state, {
                    notifOpen: { $set: true },
                }), () => {
                });
            });
        })
    }

    componentWillReceiveProps(nextprops: IMenuProps) {
        if (nextprops.ResourceShouldUpdate && !this.props.ResourceShouldUpdate) {
            this.props.FetchMenuResource();
        }
        if (!this.props.Authed && nextprops.Authed) {
            this.props.UnreadNotifications();
        }
    }

    onNotifToggle() {
    }

    render() {

        var locales = (
            <li className={"dropdown"}>
                <a href="#" id="language-dropdown" className={"dropdown-toggle"} data-toggle="dropdown">
                    <i className={"fa fa-globe fa-lg"} aria-hidden="true"></i>
                </a>
                <ul className={"dropdown-menu"} role="menu">
                    <li className={this.state.localeActive["en-us"]}>
                        <a onClick={() => this.onLocaleChangeClick("en-us")}
                            href="javascript:void(0);" className={"changeLang"} id="locale-en-us">English (U.S.)</a>
                    </li>
                    <li className={this.state.localeActive["en-gb"]}>
                        <a onClick={() => this.onLocaleChangeClick("en-gb")}
                            href="javascript:void(0);" className={"changeLang"} id="locale-en-gb">English (UK)</a>
                    </li>
                    <li className={this.state.localeActive["fr-fr"]}>
                        <a onClick={() => this.onLocaleChangeClick("fr-fr")}
                            href="javascript:void(0);" className={"changeLang"} id="locale-fr-fr">Français</a>
                    </li>
                </ul>
            </li>
        );

        var rightSide;
        var leftSide;

        if (!this.props.Authed) {

            rightSide = (
                <ul className={"nav navbar-nav navbar-right"}>
                    <ul className={"nav navbar-nav"}>
                        <li>
                            <Link to="/Login">{this.props.MenuResource ? this.props.MenuResource.menusignin : ""}</Link>
                        </li>
                        <li>
                            <Link to="/Register">{this.props.MenuResource ? this.props.MenuResource.menusignup : ""}</Link>
                        </li>
                        {locales}
                    </ul>
                </ul>
            );

            leftSide = (
                <ul className={"nav navbar-nav"}>
                </ul>
            );
        } else {

            rightSide = (
                <ul className={"nav navbar-nav navbar-right"}>
                    <ul className={"nav navbar-nav"}>
                        <li className={"dropdown fsg-dropdown-menu"} id={'notif-dropdown'}>
                            <a href="#" id="notifications-dropdown" className={"dropdown-toggle"} data-toggle="dropdown"
                                onClick={this.onNotifToggle}
                            >
                                <i className={`fa fa-lg ${(this.props.NotificationData.unread > 0 ? 'fa-bell' : 'fa-bell-o')}`} aria-hidden="true">
                                    <span className={'badge fsg-badge-menu'}>
                                        {this.props.NotificationData.unread}
                                    </span>
                                </i>
                            </a>
                            <ul className={"dropdown-menu fsg-dropdown-lg"} role="menu">
                                <Notification isOpen={this.state.notifOpen}/>
                            </ul>
                        </li>
                        <li className={"dropdown"}>
                            <a href="#" id="profile-dropdown" className={"dropdown-toggle"} data-toggle="dropdown">
                                <i className={"fa fa-user fa-lg"} aria-hidden="true"></i>
                            </a>
                            <ul className={"dropdown-menu"} role="menu">
                                <li className={"dropdown-header"}>{this.props.DisplayName}</li>
                                <li>
                                    <Link to="/Profile">{this.props.MenuResource ? this.props.MenuResource.menuprofile : ""}</Link>
                                </li>
                                <li>
                                    <Link to="/Configuration">{this.props.MenuResource ? this.props.MenuResource.settings : ""}</Link>
                                </li>
                                <li>
                                    <Link to="/RanksTitles">{this.props.MenuResource ? this.props.MenuResource.ranksandtitles : ""}</Link>
                                </li>
                                <li className={"divider"}></li>
                                <li>
                                    <a href="javascript:void(0);" id="profile-signout" onClick={this.onSignOutClick}>
                                        {this.props.MenuResource ? this.props.MenuResource.menusignout : ""}
                                    </a>
                                </li>
                            </ul>
                        </li>
                        {locales}
                    </ul>
                </ul>
            );

            leftSide = (
                <ul className={"nav navbar-nav"}>
                </ul>
            );
        }

        return (
        <div>
            <nav className={"navbar navbar-default navbar-fixed-top"}>
                <div className={"container-fluid"}>
                    <div className={"navbar-header"}>
                        <button type="button" className={"navbar-toggle collapsed"} data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                            <span className={"sr-only"}>Toggle navigation</span>
                            <span className={"icon-bar"}></span>
                            <span className={"icon-bar"}></span>
                            <span className={"icon-bar"}></span>
                        </button>
                        <Link className={"navbar-brand"} to="/Home" id={'brand'}>Fellowship of Gamers</Link>
                    </div>
                    {leftSide}
                    {rightSide}
                </div>
            </nav>
        </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        Authed: state.authReducer.authed,
        ResourceShouldUpdate: state.resourceLayoutReducer.MenuResourceShouldUpdate,
        MenuResource: state.resourceLayoutReducer.MenuResource,
        DisplayName: state.authReducer.name,
        NotificationData: state.notificationReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeLocale: (locale) => {
            Moment.locale(locale);
            momentLocalizer(Moment);
            Cookie.set(Locale.localeKEY, locale);
            shouldRefetchResource(dispatch);
        },
        FetchMenuResource: () => dispatch(fetchMenuResource()),
        RevokeAllToken: () => dispatch(RevokeAllToken()),
        UnreadNotifications: () => dispatch(UnreadNotification()),
        SyncNotification: () => dispatch(SyncNotification()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);