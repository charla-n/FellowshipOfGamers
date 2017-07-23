import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const initialState = {
    loading: false,
    data: [],
};

function playerReputationReducer(state = initialState, action) {
    switch (action.type) {
        case types.REPUTATION_MOUNT:
            return {
                ...state,
                loading: false,
                errors: [],
                successMessage: [],
                data: [],
            };
        case types.REPUTATION_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            }
        case types.REPUTATION_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
                errors: [],
                successMessage: [],
            };
        default:
            return state;
    };
}

export default playerReputationReducer;