import * as types from "../actions/actionTypes";
import Common from '../utils/Common';

const initialState = {
    loading: false,
    username: "",
    strength: 0,
    perception: 0,
    endurance: 0,
    charisma: 0,
    intelligence: 0,
    agility: 0,
    luck: 0,
    id: null,
    timezone: null,
    playerType: null,
    playerLanguages: [],
    description: "",
    htmlDescription: "",
    avatar: null,
    editing: false,
    averageReputation: 0,
    rank: null,
};

const alertConfigurationInitialState = {
    newMessageEmail: false,
    newMessageNotification: false,

    newsletterEmail: false,
    newsletterNotification: false,

    playerJoinedEmail: false,
    playerJoinedNotification: false,

    youveBeenKickedEmail: false,
    youveBeenKickedNotification: false,

    youveBeenAcceptedEmail: false,
    youveBeenAcceptedNotification: false,

    receivedAwardEmail: false,
    receivedAwardNotification: false,

    receivedRankEmail: false,
    receivedRankNotification: false,

    receivedReviewEmail: false,
    receivedReviewNotification: false,

    loading: false,
};

export function alertConfigurationReducer(state = alertConfigurationInitialState, action) {
    switch (action.type) {
        case types.PLAYER_CONFIGURATION_MOUNT:
            return {
                ...alertConfigurationInitialState
            }
        case types.PLAYER_CONFIGURATION_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            }
        case types.PLAYER_CONFIGURATION_SUCCESS:
            return {
                ...state,
                loading: false,
                ...action.data,
            }
        default:
            return state;
    }
}

export function playerProfileReducer(state = initialState, action) {
    switch (action.type) {
        case types.PLAYERPROFILE_MOUNT:
            return {
                ...state,
                loading: false,
                errors: [],
                successMessage: [],
                removeAccountErrors: [],
                editing: false,
            };
        case types.PLAYERPROFILE_REQUEST_TOGGLE:
            return {
                ...state,
                loading: !state.loading,
            }
        case types.PLAYERPROFILE_READ_SUCCESS:
            return {
                ...state,
                loading: false,
                username: action.data.displayName,
                strength: action.data.strengh,
                perception: action.data.perception,
                endurance: action.data.endurance,
                charisma: action.data.charisma,
                intelligence: action.data.intelligence,
                agility: action.data.agility,
                luck: action.data.luck,
                id: action.data.id,
                timezone: action.data.timezone,
                playerType: action.data.playerType,
                playerLanguages: action.data.playerLanguages,
                description: action.data.description,
                htmlDescription: action.data.htmlDescription,
                averageReputation: action.data.averageReputation,
                rank: action.data.rank,
                errors: [],
            };
        case types.PLAYERPROFILE_REQUEST_AVATAR_SUCCESS:
            return {
                ...state,
                avatar: action.data.picture,
            }
        case types.PLAYERPROFILE_PICTURE_CHANGED:
            return {
                ...state,
                avatar: action.data,
            }
        case types.PLAYERPROFILE_SAVE_SUCCESS:
            return {
                ...state,
                loading: false,
                editing: false,
                username: action.data.displayName,
                strength: action.data.strengh,
                perception: action.data.perception,
                endurance: action.data.endurance,
                charisma: action.data.charisma,
                intelligence: action.data.intelligence,
                agility: action.data.agility,
                luck: action.data.luck,
                id: action.data.id,
                timezone: action.data.timezone,
                playerType: action.data.playerType,
                playerLanguages: action.data.playerLanguages,
                description: action.data.description,
                htmlDescription: action.data.htmlDescription,
                errors: [],
            }
        case types.PLAYERPROFILE_EDITING_TOGGLE:
            return {
                ...state,
                editing: !state.editing,
            }
        default:
            return state;
    };
}