import API from "../utils/API";
import * as types from "./actionTypes";
import * as constants from "../utils/Constants";

export function fetchFooterResource() {
    return (dispatch, getState) => {
        if (getState().resourceLayoutReducer.FooterResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_FOOTER, null, (data) => {
                dispatch({ type: types.FETCH_FOOTER_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    };
}

export function fetchLoginResource() {
    return (dispatch, getState) => {
        if (getState().resourceLoginReducer.LoginResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_LOGIN, null, (data) => {
                dispatch({ type: types.FETCH_LOGIN_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchRegisterResource() {
    return (dispatch, getState) => {
        if (getState().resourceRegisterReducer.RegisterResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_REGISTER, null, (data) => {
                dispatch({ type: types.FETCH_REGISTER_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchMenuResource() {
    return (dispatch, getState) => {
        if (getState().resourceLayoutReducer.MenuResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_MENU, null, (data) => {
                dispatch({ type: types.FETCH_MENU_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchForgotPasswordResource() {
    return (dispatch, getState) => {
        if (getState().resourceForgotPasswordReducer.ForgotPasswordResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_FORGOTPASSWORD, null, (data) => {
                dispatch({ type: types.FETCH_FORGOTPASSWORD_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchResetPasswordResource() {
    return (dispatch, getState) => {
        if (getState().resourceResetPasswordReducer.ResetPasswordResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_RESETPASSWORD, null, (data) => {
                dispatch({ type: types.FETCH_RESETPASSWORD_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchPlayerProfileResource() {
    return (dispatch, getState) => {
        if (getState().resourcePlayerProfileReducer.ResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_PLAYERPROFILE, null, (data) => {
                dispatch({ type: types.FETCH_PLAYERPROFILE_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchPlayerReputationResource() {
    return (dispatch, getState) => {
        if (getState().resourcePlayerReputationReducer.ResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_PLAYERREPUTATION, null, (data) => {
                dispatch({ type: types.FETCH_PLAYERREPUTATION_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchSearchGroupResource() {
    return (dispatch, getState) => {
        if (getState().resourceSearchGroupReducer.ResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_SEARCHGROUP, null, (data) => {
                dispatch({ type: types.FETCH_SEARCHGROUP_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchCreateGroupResource() {
    return (dispatch, getState) => {
        if (getState().resourceCreateGroupReducer.ResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_CREATEGROUP, null, (data) => {
                dispatch({ type: types.FETCH_CREATEGROUP_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchViewGroupResource() {
    return (dispatch, getState) => {
        if (getState().resourceViewGroupReducer.ResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_VIEWGROUP, null, (data) => {
                dispatch({ type: types.FETCH_VIEWGROUP_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchSettingsResource() {
    return (dispatch, getState) => {
        if (getState().resourceSettingsReducer.ResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_SETTINGS, null, (data) => {
                dispatch({ type: types.FETCH_SETTINGS_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchRanksAndTitlesResource() {
    return (dispatch, getState) => {
        if (getState().resourceRanksAndTitlesReducer.ResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_RANKSANDTITLES, null, (data) => {
                dispatch({ type: types.FETCH_RANKSANDTITLES_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchReviewResource() {
    return (dispatch, getState) => {
        if (getState().resourceReviewReducer.ResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_REVIEW, null, (data) => {
                dispatch({ type: types.FETCH_REVIEW_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function fetchShowcaseResource() {
    return (dispatch, getState) => {
        if (getState().resourceShowcaseReducer.ResourceShouldUpdate) {
            return API.Get(dispatch, getState, constants.RESOURCE_SHOWCASE, null, (data) => {
                dispatch({ type: types.FETCH_SHOWCASE_RESOURCE_SUCCESS, data });
            }, null);
        } else {
            return $.when(null);
        }
    }
}

export function shouldRefetchResource(dispatch) {
    dispatch({ type: types.REFETCH_LAYOUT_RESOURCES });
    dispatch({ type: types.REFETCH_LOGIN_RESOURCES });
    dispatch({ type: types.REFETCH_REGISTER_RESOURCES });
    dispatch({ type: types.REFETCH_FORGOTPASSWORD_RESOURCES });
    dispatch({ type: types.REFETCH_RESETPASSWORD_RESOURCES });
    dispatch({ type: types.REFETCH_PLAYERPROFILE_RESOURCES });
    dispatch({ type: types.REFETCH_PLAYERREPUTATION_RESOURCES });
    dispatch({ type: types.REFETCH_SEARCHGROUP_RESOURCES });
    dispatch({ type: types.REFETCH_CREATEGROUP_RESOURCES });
    dispatch({ type: types.REFETCH_VIEWGROUP_RESOURCES });
    dispatch({ type: types.REFETCH_SETTINGS_RESOURCES });
    dispatch({ type: types.REFETCH_RANKSANDTITLES_RESOURCES });
    dispatch({ type: types.REFETCH_REVIEW_RESOURCES });
    dispatch({ type: types.REFETCH_SHOWCASE_RESOURCES });
    dispatch({ type: types.DATA_PLAYERTYPES_REFETCH });
    dispatch({ type: types.DATA_PLAYSTYLES_REFETCH });
    dispatch({ type: types.DATA_AGES_REFETCH });
    dispatch({ type: types.DATA_COMMUNICATIONS_REFETCH });
    dispatch({ type: types.DATA_TIMEZONES_REFETCH });
}