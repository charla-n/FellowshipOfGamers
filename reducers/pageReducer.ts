import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const initialState = {
    page: null,
    data: null,
};

export function pageReducer(state = initialState, action) {
    switch (action.type) {
        case types.PAGE_CHANGE:
            return {
                ...state,
                page: action.data.page,
                data: action.data.data,
            };
        default:
            return state;
    };
}