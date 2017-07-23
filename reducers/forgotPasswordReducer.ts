import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const initialState = {
    loading: false,
};

function forgotPasswordReducer(state = initialState, action) {
    switch (action.type) {
        case types.FORGOT_PASSWORD_MOUNT:
            return {
                ...initialState
            };
        case types.FORGOT_PASSWORD_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            }
        default:
            return state;
    };
}

export default forgotPasswordReducer;