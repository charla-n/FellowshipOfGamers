import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const createGroupInitialState = {
    loading: false,
    image: null,
};

const viewGroupInitialState = {
    loading: false,
    data: null,
    when: null,
    removed: false,
}

const searchGroupInitialState = {
    loading: false,
    data: [],
}

const searchGroupRefineInitialState = {
    fromDate: null,
    toDate: null,
}

const groupChatInitialState = {
    messages: [],
    hasMore: true,
}

const groupReviewState = {
    loading: false,
    data: null
}

export function groupReviewReducer(state = groupReviewState, action) {
    switch (action.type) {
        case types.GROUP_REVIEW_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            }
        case types.GROUP_REVIEW_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
            }
        case types.GROUP_REVIEW_CLEAR:
            return {
                ...state,
                data: null,
                loading: false,
            }
        case types.GROUP_REVIEW_SEND_SUCCESS:
            return {
                ...state,
                data: { ...state.data, active: false },
                loading: false,
            }
        default:
            return state;
    }
}

export function groupChatReducer(state = groupChatInitialState, action) {
    switch (action.type) {
        case types.GROUP_CHAT_SUCCESS:
            return {
                messages: [...state.messages, ...action.data],
                hasMore: action.data.length > 0,
            }
        case types.GROUP_CHAT_SIGNALR_SUCCESS:
            let ret = {
                messages: [...action.data, ...state.messages],
                hasMore: state.hasMore,
            }
            return ret;
        case types.GROUP_CHAT_CLEAR:
            return {
                messages: [],
                hasMore: true,
            }
        default:
            return state;
    }
}

export function searchGroupRefineReducer(state = searchGroupRefineInitialState, action) {
    switch (action.type) {
        case types.GROUP_FROMDATE_SET:
            return {
                ...state,
                fromDate: action.data,
            }
        case types.GROUP_TODATE_SET:
            return {
                ...state,
                toDate: action.data,
            }
        default:
            return state;
    }
}

export function searchGroupReducer(state = searchGroupInitialState, action) {
    switch (action.type) {
        case types.GROUP_SEARCH_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            }
        case types.GROUP_SEARCH_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
            }
        case types.GROUP_SEARCH_MOUNT:
            return {
                ...searchGroupInitialState,
            }
        default:
            return state;
    }
}

export function createGroupReducer(state = createGroupInitialState, action) {
    switch (action.type) {
        case types.GROUP_CREATE_MOUNT:
            return {
                ...createGroupInitialState
            };
        case types.GROUP_CREATE_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            };
        case types.GROUP_IMAGE_CHANGED:
            return {
                ...state,
                image: action.data,
            }
        default:
            return state;
    };
}

export function viewGroupReducer(state = viewGroupInitialState, action) {
    switch (action.type) {
        case types.GROUP_DELETE_SUCCESS:
            return {
                ...state,
                loading: false,
                removed: true,
            }
        case types.GROUP_SET_DATE:
            return {
                ...state,
                when: action.when,
            };
        case types.GROUP_BYID_MOUNT:
            return {
                ...viewGroupInitialState
            };
        case types.GROUP_BYID_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
                when: action.data.dateStart,
            };
        case types.GROUP_BYID_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            }
        default:
            return state;
    };
}
