import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const initialLoadingBarData = {
    loading: 0,
};

export function showLoading() {
    return {
        type: types.SHOW,
    }
}

export function hideLoading() {
    return {
        type: types.HIDE,
    }
}

export function resetLoading() {
    return {
        type: types.RESET,
    }
}

export function loadingBarReducer(state = initialLoadingBarData, action) {
    switch (action.type) {
        case types.SHOW:
            return {
                ...state,
                loading: state.loading + 1,
            };
        case types.HIDE:
            return {
                ...state,
                loading: state.loading > 0 ? state.loading - 1 : 0,
            };
        case types.RESET:
            return {
                ...state,
                loading: 0,
            };
        default:
            return state;
    }
}