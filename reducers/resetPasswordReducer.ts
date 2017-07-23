import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const initialState = {
    loading: false,
};

function resetPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case types.RESET_PASSWORD_MOUNT:
            return {
                ...initialState
            };
        case types.RESET_PASSWORD_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            }
        default:
            return state;
    };
}

export default resetPasswordReducer;