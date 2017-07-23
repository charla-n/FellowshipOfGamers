import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const initialPlayerTypesState = {
    loading: false,
    playerTypes: [],
    shouldUpdate: true,
};

const initialLanguagesState = {
    loading: false,
    languages: [],
};

const initialDataState = {
    loading: false,
    data: [],
    shouldUpdate: true,
};

export function dataPlayerTypesReducer(state = initialPlayerTypesState, action) {
    switch (action.type) {
        case types.DATA_PLAYERTYPES_REFETCH:
            return {
                ...state,
                shouldUpdate: true,
            };
        case types.DATA_PLAYERTYPES_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
                playerTypes: [],
            };
        case types.DATA_PLAYERTYPES_SUCCESS:
            return {
                ...state,
                loading: false,
                playerTypes: action.data,
                errors: [],
                shouldUpdate: false,
            };
        case types.DATA_PLAYERTYPES_CLEAR:
            return {
                ...initialPlayerTypesState
            };
        default:
            return state;
    };
}

export function dataTimezonesReducer(state = initialDataState, action) {
    switch (action.type) {
        case types.DATA_TIMEZONES_REFETCH:
            return {
                ...state,
                shouldUpdate: true,
            };
        case types.DATA_TIMEZONES_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
                data: [],
            };
        case types.DATA_TIMEZONES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
                shouldUpdate: false,
            };
        case types.DATA_TIMEZONES_CLEAR:
            return {
                ...initialDataState
            };
        default:
            return state;
    };
}

export function dataLanguagesReducer(state = initialLanguagesState, action) {
    switch (action.type) {
        case types.DATA_LANGUAGES_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
                languages: [],
            };
        case types.DATA_LANGUAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                languages: action.data,
                errors: [],
            };
        case types.DATA_LANGUAGES_CLEAR:
            return {
                ...initialLanguagesState,
            }
        default:
            return state;
    };
}

export function dataGamesReducer(state = initialDataState, action) {
    switch (action.type) {
        case types.DATA_GAMES_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
                data: [],
            };
        case types.DATA_GAMES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
            };
        case types.DATA_GAMES_CLEAR:
            return {
                ...initialLanguagesState,
            }
        default:
            return state;
    };
}

export function dataCommunicationsReducer(state = initialDataState, action) {
    switch (action.type) {
        case types.DATA_COMMUNICATIONS_REFETCH:
            return {
                ...state,
                shouldUpdate: true,
            };
        case types.DATA_COMMUNICATIONS_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
                data: [],
            };
        case types.DATA_COMMUNICATIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
                shouldUpdate: false,
            };
        case types.DATA_COMMUNICATIONS_CLEAR:
            return {
                ...initialDataState
            };
        default:
            return state;
    };
}

export function dataAgesReducer(state = initialDataState, action) {
    switch (action.type) {
        case types.DATA_AGES_REFETCH:
            return {
                ...state,
                shouldUpdate: true,
            };
        case types.DATA_AGES_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
                data: [],
            };
        case types.DATA_AGES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
                shouldUpdate: false,
            };
        case types.DATA_AGES_CLEAR:
            return {
                ...initialDataState
            };
        default:
            return state;
    };
}

export function dataPlayStylesReducer(state = initialDataState, action) {
    switch (action.type) {
        case types.DATA_PLAYSTYLES_REFETCH:
            return {
                ...state,
                shouldUpdate: true,
            };
        case types.DATA_PLAYSTYLES_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
                data: [],
            };
        case types.DATA_PLAYSTYLES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
                shouldUpdate: false,
            };
        case types.DATA_PLAYSTYLES_CLEAR:
            return {
                ...initialDataState
            };
        default:
            return state;
    };
}