declare var require;

import { combineReducers } from 'redux';
var ReduxForm = require('redux-form');
import {
    resourceLayoutReducer,
    resourceLoginReducer,
    resourceRegisterReducer,
    resourceForgotPasswordReducer,
    resourceResetPasswordReducer,
    resourcePlayerProfileReducer,
    resourcePlayerReputationReducer,
    resourceSearchGroupReducer,
    resourceCreateGroupReducer,
    resourceSettingsReducer,
    resourceViewGroupReducer,
    resourceRanksAndTitlesReducer,
    resourceReviewReducer,
    resourceShowcaseReducer
} from './resourceReducer';
import {
    dataPlayerTypesReducer,
    dataLanguagesReducer,
    dataGamesReducer,
    dataPlayStylesReducer,
    dataAgesReducer,
    dataCommunicationsReducer,
    dataTimezonesReducer
} from './dataReducer';
import authReducer from './authReducer';
import registerReducer from './registerReducer';
import activateAccountReducer from './activateAccountReducer';
import forgotPasswordReducer from './forgotPasswordReducer';
import resetPasswordReducer from './resetPasswordReducer';
import {
    playerProfileReducer,
    alertConfigurationReducer
} from './playerProfileReducer';
import playerReputationReducer from './playerReputationReducer';
import {
    createGroupReducer,
    viewGroupReducer,
    searchGroupReducer,
    searchGroupRefineReducer,
    groupChatReducer,
    groupReviewReducer
} from './groupReducer';
import { loadingBarReducer } from './loadingBarReducer';
import { pageReducer } from './pageReducer';
import { notificationReducer } from './notificationReducer';
var notifications = require('react-notification-system-redux');

const RootReducer = combineReducers({
    loadingBarReducer,
    resourceLayoutReducer,
    resourceLoginReducer,
    resourceRegisterReducer,
    resourceForgotPasswordReducer,
    resourceResetPasswordReducer,
    resourcePlayerProfileReducer,
    resourcePlayerReputationReducer,
    resourceSearchGroupReducer,
    resourceCreateGroupReducer,
    resourceSettingsReducer,
    resourceViewGroupReducer,
    resourceRanksAndTitlesReducer,
    resourceReviewReducer,
    resourceShowcaseReducer,
    dataPlayerTypesReducer,
    dataLanguagesReducer,
    dataGamesReducer,
    dataPlayStylesReducer,
    dataAgesReducer,
    dataTimezonesReducer,
    dataCommunicationsReducer,
    createGroupReducer,
    viewGroupReducer,
    searchGroupReducer,
    searchGroupRefineReducer,
    groupChatReducer,
    authReducer,
    registerReducer,
    activateAccountReducer,
    forgotPasswordReducer,
    resetPasswordReducer,
    playerProfileReducer,
    playerReputationReducer,
    alertConfigurationReducer,
    groupReviewReducer,
    pageReducer,
    notificationReducer,
    notifications: notifications.reducer,
    form: ReduxForm.reducer,
});

export default RootReducer;