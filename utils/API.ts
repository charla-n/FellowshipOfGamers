import { AppInsights } from "applicationinsights-js";
import * as constants from "./Constants";
import { _RefreshToken } from '../actions/loginAction';
import * as types from "../actions/actionTypes";
import Common from '../utils/Common';
import { showLoading, hideLoading } from '../reducers/loadingBarReducer';

export class API {

    static refreshTokenPromise: JQueryPromise<any> = null;

    private static HandleUnauthorized(firstCall: boolean,
        dispatch: any,
        getState: any,
        ret: any,
        apiCall: any) {
        if (firstCall === true && ret.status === 401) {
            if (API.IsResolved()) {
                API.refreshTokenPromise = _RefreshToken(dispatch, getState);
            }
            API.refreshTokenPromise.done(() => {
                apiCall();
            });
        } else if (firstCall === false && ret.status === 401) {
            if (window.location.href !== `${constants.API_BASENAME}#/Login`) {
                window.location.href = `${constants.API_BASENAME}#/Login`;
            }
        }
    }

    private static IsResolved() {
        if (API.refreshTokenPromise === null ||
            API.refreshTokenPromise.state() === 'resolved' ||
            API.refreshTokenPromise.state() === 'rejected') {
            return true;
        }
        return false;
    }

    public static Post(
        dispatch,
        getState,
        action: string,
        data: any,
        onFullfiled: any,
        onRejected: any,
        headers: Array<any> = [],
        contentType: string = "application/json",
        firstCall = true,
    ) {
        dispatch(showLoading());
        return $.ajax({
            type: "POST",
            url: constants.API_BASENAME + action,
            data: contentType === "application/json" ? JSON.stringify(data) : data,
            beforeSend: (xhr) => {
                for (let val of headers) {
                    xhr.setRequestHeader(val.name, val.value);
                }
            },
            contentType: contentType,
            success: (ret) => {
                onFullfiled(ret);
                dispatch(hideLoading());
            },
        }).fail((ret) => {
            dispatch(hideLoading());
            API.HandleUnauthorized(firstCall, dispatch, getState, ret, () => {
                API.Post(dispatch, getState, action, data, onFullfiled, onRejected,
                    [Common.buildAuthorizationHeader(getState().authReducer.access_token)], contentType, false);
            });
            console.error(ret);
            AppInsights.trackTrace(JSON.stringify(ret));
            if (onRejected) {
                onRejected(ret);
            }
        });
    }

    public static Get(
        dispatch,
        getState,
        action: string,
        data: any,
        onFullfiled: any,
        onRejected: any,
        headers: Array<any> = [],
        firstCall = true,
        ) {
        dispatch(showLoading());
        return $.ajax({
            dataType: "json",
            url: `${constants.API_BASENAME}${action}`,
            data: data,
            beforeSend: (xhr) => {
                for (let val of headers) {
                    xhr.setRequestHeader(val.name, val.value);
                }
            },
            success: (ret) => {
                onFullfiled(ret);
                dispatch(hideLoading());
            },
        }).fail((ret) => {
            dispatch(hideLoading());
            API.HandleUnauthorized(firstCall, dispatch, getState, ret, () => {
                API.Get(dispatch, getState, action, data, onFullfiled, onRejected,
                    [Common.buildAuthorizationHeader(getState().authReducer.access_token)], false);
            });
            console.error(ret);
            AppInsights.trackTrace(JSON.stringify(ret));
            if (onRejected) {
                onRejected(ret);
            }
        });
    }
}

export default API;