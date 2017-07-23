import API from "./utils/API";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import NotFound from "./components/NotFound";

import Locale from "./utils/Locale";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import { Router, Route, hashHistory } from 'react-router';
import RootReducer from './reducers/rootReducer';
import Layout from "./containers/Layout";
import ActivateAccount from "./containers/ActivateAccount";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";
import Profile from "./containers/Profile";
import CreateGroup from "./containers/CreateGroup";
import EditGroup from "./containers/EditGroup";
import ViewGroup from "./containers/ViewGroup";
import PlayerConfiguration from "./containers/PlayerConfiguration";
import Review from './containers/Review';
import * as Moment from 'moment';
import * as types from "./actions/actionTypes";
import { RefreshToken, UserInfoRequest } from './actions/loginAction';
import { SignalRController } from './utils/signalRController';
import { UnreadNotification } from './actions/notificationAction';
import RanksAndTitles from './containers/RanksAndTitles';
import AllRanks from './containers/AllRanks';
import Showcase from './containers/Showcase';

var localInstance = new Locale();

var access_token = localStorage.getItem('access_token');
var refresh_token = localStorage.getItem('refresh_token');
var role = localStorage.getItem('role');
var expiry_date = localStorage.getItem('expiry_date');
var authed = false;
var shouldRefreshToken = false;

if (access_token && refresh_token && role && expiry_date) {
    if (Moment(expiry_date).diff(Moment().utc(), 'minutes') <= 0) {
        shouldRefreshToken = true;
    } else {
        authed = true;
    }
}

var store = createStore<any>(
    RootReducer,
    {
        authReducer: {
            access_token: access_token,
            refresh_token: refresh_token,
            role: role,
            expiry_date: expiry_date,
            authed: authed,
        }
    },
    applyMiddleware(thunkMiddleware),
)

let signalRController = new SignalRController(store);

signalRController.Init();

window['signalRController'] = signalRController;

if (shouldRefreshToken) {
    API.refreshTokenPromise = store.dispatch(RefreshToken());
}
if (access_token && refresh_token && role && expiry_date && authed) {
    signalRController.Start();
    store.dispatch(UserInfoRequest());
    store.dispatch(UnreadNotification());
}

render(
    <div>
        <Provider store={store}>
            <Router history={hashHistory} onUpdate={() => {
                    window.scroll(0, 0);
                }
            }>
                <Route path='/' component={Showcase} />
                <Route component={Layout}>
                    <Route path='/Home' component={Home} />
                    <Route path='/Login' component={Login} />
                    <Route path='/Register' component={Register} />
                    <Route path='/ActivateAccount/:email/:token' component={ActivateAccount} />
                    <Route path='/ForgotPassword' component={ForgotPassword} />
                    <Route path='/ResetPassword/:email/:token' component={ResetPassword} />
                    <Route path='/Profile(/:userid)' component={Profile} />
                    <Route path='/CreateGroup' component={CreateGroup} />
                    <Route path='/EditGroup/:id' component={EditGroup} />
                    <Route path='/ViewGroup/:id' component={ViewGroup} />
                    <Route path='/ReviewGroup/:id' component={Review} />
                    <Route path='/Configuration' component={PlayerConfiguration} />
                    <Route path='/RanksTitles(/:userid)' component={RanksAndTitles} />
                    <Route path='/AllRanks' component={AllRanks} />
                    <Route path='*' component={NotFound} />
                </Route>
            </Router>
        </Provider>
    </div>,
    document.getElementById("app")
);

$(document).on('DOMMouseScroll mousewheel', '.scrollable', function (ev) {
    var $this = $(this),
        scrollTop = this.scrollTop,
        scrollHeight = this.scrollHeight,
        height = $this.innerHeight(),
        delta = (ev.type == 'DOMMouseScroll' ?
            (ev.originalEvent as any).detail * -40 :
            (ev.originalEvent as any).wheelDelta),
        up = delta > 0;

    var prevent = function () {
        ev.stopPropagation();
        ev.preventDefault();
        ev.returnValue = false;
        return false;
    }

    if (!up && -delta > scrollHeight - height - scrollTop) {
        // Scrolling down, but this will take us past the bottom.
        $this.scrollTop(scrollHeight);
        return prevent();
    } else if (up && delta > scrollTop) {
        // Scrolling up, but this will take us past the top.
        $this.scrollTop(0);
        return prevent();
    }
});