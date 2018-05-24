import update from 'immutability-helper';

import {
    BUILD_TWITTER_STREAM,
    START_TWITTER_STREAM,
    STOP_TWITTER_STREAM,
    UPDATE_INITIAL_LOAD,
    UPDATE_TWEETS_DATA,
    UPDATE_PERSON_DATA,
    UPDATE_LOCATION_DATA,
    UPDATE_ORGANIZATION_DATA,
    UPDATE_OTHERS_DATA,
    UPDATE_TWEETSLOCATION_DATA,
    RESET_DATA,
    SET_KEYWORD_FIELD,
    UPDATE_TRENDS_INAREA,
    UPDATE_TRENDS_INWORLDWIDE,
    UPDATE_LOADING_SCREEN

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

        case UPDATE_INITIAL_LOAD:
            return update(
                state, {
                    initialload: { $set: action.payload.data.initialload }
                }
            );

        case UPDATE_TWEETS_DATA:
            return update(
                state, {
                    tweets: { $merge: action.payload.data.tweets }
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

        case UPDATE_OTHERS_DATA:
            return update(
                state, {
                    others: { $merge: action.payload.data.others }
                }
            );

        case UPDATE_TWEETSLOCATION_DATA:
            return update(
                state, {
                    tweetslocation: { $merge: action.payload.data.tweetslocation }
                }
            );

        case UPDATE_TRENDS_INAREA:
            return update(
                state, {
                    trendTopicDataInArea: { $set: action.payload.data.trendTopicDataInArea }
                }
            );

        case UPDATE_TRENDS_INWORLDWIDE:
            return update(
                state, {
                    trendTopicDataInWorldWide: { $set: action.payload.data.trendTopicDataInWorldWide }
                }
            );

        case UPDATE_LOADING_SCREEN:
            return update(
                state, {
                    loading: { $set: action.payload.data.loading }
                }
            );

        case RESET_DATA:
            return update(
                state, {
                    $merge: action.payload.data
                }
            );

        default:
            return state;
    }

}