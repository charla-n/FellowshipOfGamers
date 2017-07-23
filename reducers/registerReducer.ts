import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const initialState = {
    loading: false,
    usernameInUse: false,
};

function registerReducer(state = initialState, action) {
    switch (action.type) {
        case types.REGISTER_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            };
        case types.REGISTER_MOUNT:
            return {
                ...initialState,
            };
        case types.REGISTER_USERNAME_IN_USE_SUCCESS:
            return {
                ...state,
                usernameInUse: action.data.inUse,
                loading: false,
            }
        default:
            return state;
    };
}

export default registerReducer;