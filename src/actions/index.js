import * as types from './action_types';

export function build_twitter_stream(state) {
    return {
        type: types.BUILD_TWITTER_STREAM,
        payload: state
    };
}

export function start_twitter_stream(state) {
    return {
        type: types.START_TWITTER_STREAM,
        payload: state
    };
}

export function stop_twitter_stream(state) {
    return {
        type: types.STOP_TWITTER_STREAM,
        payload: state
    };

}

export function update_person_data(state) {
    return {
        type: types.UPDATE_PERSON_DATA,
        payload: state
    };

}

export function set_keyword_field(state) {
    return {
        type: types.SET_KEYWORD_FIELD,
        payload: state
    };

}

