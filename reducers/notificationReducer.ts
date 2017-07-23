import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const initialState = {
    loading: false,
    data: [],
    unread: 0,
    hasMore: true,
};

export function notificationReducer(state = initialState, action) {
    switch (action.type) {
        case types.NOTIFICATION_MOUNT:
            return {
                ...initialState
            };
        case types.NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, ...action.data],
                hasMore: action.data.length > 0,
            };
        case types.NOTIFICATION_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            }
        case types.NOTIFICATION_UNREAD:
            return {
                ...state,
                loading: false,
                unread: action.data.number,
            }
        case types.NOTIFICATION_CLEAR:
            return {
                ...state,
                data: [],
                hasMore: true,
            }
        default:
            return state;
    };
}

