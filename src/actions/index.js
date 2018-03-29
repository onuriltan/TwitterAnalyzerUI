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