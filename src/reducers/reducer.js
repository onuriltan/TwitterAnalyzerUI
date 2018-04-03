import update from 'immutability-helper';

import {
    BUILD_TWITTER_STREAM,
    START_TWITTER_STREAM,
    STOP_TWITTER_STREAM,
    UPDATE_PERSON_DATA,
    UPDATE_LOCATION_DATA,
    UPDATE_ORGANIZATION_DATA,
    SET_KEYWORD_FIELD
} from '../actions/action_types';

import initialState from './initial_state';


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case BUILD_TWITTER_STREAM:
            return update(
                state, {
                    socketConnection: { $set: action.payload.data.socketConnection }
                }
            );

        case START_TWITTER_STREAM:
            return update(
                state, {
                    socketConnection: { $set: action.payload.data.socketConnection }
                }
            );

        case STOP_TWITTER_STREAM:
            return update(
                state, {
                    socketConnection: { $set: action.payload.data.socketConnection }
                }
            );

        case SET_KEYWORD_FIELD:
            return update(
                state, {
                    keyword: { $set: action.payload.data.keyword }
                }
            );

        case UPDATE_PERSON_DATA:
            return update(
                state, {
                    person: { $merge: action.payload.data.person }
                }
            );
         
        case UPDATE_LOCATION_DATA:
            return update(
                state, {
                    location: { $merge: action.payload.data.location }
                }
            );

        case UPDATE_ORGANIZATION_DATA:
            return update(
                state, {
                    organization: { $merge: action.payload.data.organization }
                }
            );

        default:
            return state;
    }

}