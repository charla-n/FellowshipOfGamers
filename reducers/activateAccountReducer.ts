import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const initialState = {
    loading: true,
    success: false,
};

function activateAccountReducer(state = initialState, action) {
    switch (action.type) {
        case types.ACTIVATE_ACCOUNT_MOUNT:
            return {
                ...initialState
            };
        case types.ACTIVATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                errors: [],
                successMessage: Common.buildSuccess(action.data),
            };
        case types.ACTIVATE_ACCOUNT_FAILED:
            return {
                ...state,
                loading: false,
                success: false,
                errors: Common.buildError(action.data),
                successMessage: [],
            }
        default:
            return state;
    };
}

export default activateAccountReducer;