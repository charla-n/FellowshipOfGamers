import * as types from "../actions/actionTypes";

const initialStateLayout = {

    FooterResource: null,
    FooterResourceShouldUpdate: true,

    MenuResource: null,
    MenuResourceShouldUpdate: true,
};

const initialStateLogin = {
    LoginResource: null,
    LoginResourceShouldUpdate: true,
};

const initialStateRegister = {
    RegisterResource: null,
    RegisterResourceShouldUpdate: true,
};

const initialStateForgotPassword = {
    ForgotPasswordResource: null,
    ForgotPasswordResourceShouldUpdate: true,
};

const initialStateResetPassword = {
    ResetPasswordResource: null,
    ResetPasswordResourceShouldUpdate: true,
};

const initialResource = {
    Resource: null,
    ResourceShouldUpdate: true,
};

export function resourceLayoutReducer(state = initialStateLayout, action) {
    switch (action.type) {
        case types.FETCH_FOOTER_SUCCESS:
            return {
                ...state,
                FooterResource: action.data,
                FooterResourceShouldUpdate: false,
            };
        case types.FETCH_MENU_RESOURCE_SUCCESS:
            return {
                ...state,
                MenuResource: action.data,
                MenuResourceShouldUpdate: false,
            };
        case types.REFETCH_LAYOUT_RESOURCES:
            return {
                ...state,
                FooterResourceShouldUpdate: true,
                MenuResourceShouldUpdate: true,
            };
        default:
            return state;
    };
}

export function resourceLoginReducer(state = initialStateLogin, action) {
    switch (action.type) {
        case types.REFETCH_LOGIN_RESOURCES:
            return {
                ...state,
                LoginResourceShouldUpdate: true,
            };
        case types.FETCH_LOGIN_RESOURCE_SUCCESS:
            return {
                ...state,
                LoginResource: action.data,
                LoginResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourceRegisterReducer(state = initialStateRegister, action) {
    switch (action.type) {
        case types.REFETCH_REGISTER_RESOURCES:
            return {
                ...state,
                RegisterResourceShouldUpdate: true,
            };
        case types.FETCH_REGISTER_RESOURCE_SUCCESS:
            return {
                ...state,
                RegisterResource: action.data,
                RegisterResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourceForgotPasswordReducer(state = initialStateForgotPassword, action) {
    switch (action.type) {
        case types.REFETCH_FORGOTPASSWORD_RESOURCES:
            return {
                ...state,
                ForgotPasswordResourceShouldUpdate: true,
            };
        case types.FETCH_FORGOTPASSWORD_RESOURCE_SUCCESS:
            return {
                ...state,
                ForgotPasswordResource: action.data,
                ForgotPasswordResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourceResetPasswordReducer(state = initialStateResetPassword, action) {
    switch (action.type) {
        case types.REFETCH_RESETPASSWORD_RESOURCES:
            return {
                ...state,
                ResetPasswordResourceShouldUpdate: true,
            };
        case types.FETCH_RESETPASSWORD_RESOURCE_SUCCESS:
            return {
                ...state,
                ResetPasswordResource: action.data,
                ResetPasswordResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourcePlayerProfileReducer(state = initialResource, action) {
    switch (action.type) {
        case types.REFETCH_PLAYERPROFILE_RESOURCES:
            return {
                ...state,
                ResourceShouldUpdate: true,
            };
        case types.FETCH_PLAYERPROFILE_RESOURCE_SUCCESS:
            return {
                ...state,
                Resource: action.data,
                ResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourcePlayerReputationReducer(state = initialResource, action) {
    switch (action.type) {
        case types.REFETCH_PLAYERREPUTATION_RESOURCES:
            return {
                ...state,
                ResourceShouldUpdate: true,
            };
        case types.FETCH_PLAYERREPUTATION_RESOURCE_SUCCESS:
            return {
                ...state,
                Resource: action.data,
                ResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourceSearchGroupReducer(state = initialResource, action) {
    switch (action.type) {
        case types.REFETCH_SEARCHGROUP_RESOURCES:
            return {
                ...state,
                ResourceShouldUpdate: true,
            };
        case types.FETCH_SEARCHGROUP_RESOURCE_SUCCESS:
            return {
                ...state,
                Resource: action.data,
                ResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourceCreateGroupReducer(state = initialResource, action) {
    switch (action.type) {
        case types.REFETCH_CREATEGROUP_RESOURCES:
            return {
                ...state,
                ResourceShouldUpdate: true,
            };
        case types.FETCH_CREATEGROUP_RESOURCE_SUCCESS:
            return {
                ...state,
                Resource: action.data,
                ResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourceViewGroupReducer(state = initialResource, action) {
    switch (action.type) {
        case types.REFETCH_VIEWGROUP_RESOURCES:
            return {
                ...state,
                ResourceShouldUpdate: true,
            };
        case types.FETCH_VIEWGROUP_RESOURCE_SUCCESS:
            return {
                ...state,
                Resource: action.data,
                ResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourceSettingsReducer(state = initialResource, action) {
    switch (action.type) {
        case types.REFETCH_SETTINGS_RESOURCES:
            return {
                ...state,
                ResourceShouldUpdate: true,
            };
        case types.FETCH_SETTINGS_RESOURCE_SUCCESS:
            return {
                ...state,
                Resource: action.data,
                ResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourceRanksAndTitlesReducer(state = initialResource, action) {
    switch (action.type) {
        case types.REFETCH_RANKSANDTITLES_RESOURCES:
            return {
                ...state,
                ResourceShouldUpdate: true,
            };
        case types.FETCH_RANKSANDTITLES_RESOURCE_SUCCESS:
            return {
                ...state,
                Resource: action.data,
                ResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourceReviewReducer(state = initialResource, action) {
    switch (action.type) {
        case types.REFETCH_REVIEW_RESOURCES:
            return {
                ...state,
                ResourceShouldUpdate: true,
            };
        case types.FETCH_REVIEW_RESOURCE_SUCCESS:
            return {
                ...state,
                Resource: action.data,
                ResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}

export function resourceShowcaseReducer(state = initialResource, action) {
    switch (action.type) {
        case types.REFETCH_SHOWCASE_RESOURCES:
            return {
                ...state,
                ResourceShouldUpdate: true,
            };
        case types.FETCH_SHOWCASE_RESOURCE_SUCCESS:
            return {
                ...state,
                Resource: action.data,
                ResourceShouldUpdate: false,
            };
        default:
            return state;
    };
}