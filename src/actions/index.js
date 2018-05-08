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
    UPDATE_TRENDS_INAREA,
    UPDATE_TRENDS_INWORLDWIDE,
    RESET_DATA,
    SET_KEYWORD_FIELD,

} from '../actions/action_types';

export function build_twitter_stream(state) {
    return {
        type: BUILD_TWITTER_STREAM,
        payload: state
    };
}

export function start_twitter_stream(state) {
    return {
        type: START_TWITTER_STREAM,
        payload: state
    };
}

export function stop_twitter_stream(state) {
    return {
        type: STOP_TWITTER_STREAM,
        payload: state
    };

}

export function update_inital_load(state) {
    return {
        type: UPDATE_INITIAL_LOAD,
        payload: state
    };

}

export function update_tweets_data(state) {
    return {
        type: UPDATE_TWEETS_DATA,
        payload: state
    };

}

export function update_person_data(state) {
    return {
        type: UPDATE_PERSON_DATA,
        payload: state
    };

}


export function update_location_data(state) {
    return {
        type: UPDATE_LOCATION_DATA,
        payload: state
    };

}


export function update_organization_data(state) {
    return {
        type: UPDATE_ORGANIZATION_DATA,
        payload: state
    };

}

export function update_others_data(state) {
    return {
        type: UPDATE_OTHERS_DATA,
        payload: state
    };

}

export function update_tweetslocation_data(state) {
    return {
        type: UPDATE_TWEETSLOCATION_DATA,
        payload: state
    };

}

export function update_trendtopics_inarea(state) {
    return {
        type: UPDATE_TRENDS_INAREA,
        payload: state
    };

}

export function update_trendtopics_inworldwide(state) {
    return {
        type: UPDATE_TRENDS_INWORLDWIDE,
        payload: state
    };

}

export function reset_data(state) {
    return {
        type: RESET_DATA,
        payload: state
    };

}

export function set_keyword_field(state) {
    return {
        type: SET_KEYWORD_FIELD,
        payload: state
    };

}


