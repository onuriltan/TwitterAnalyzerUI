import * as TYPES from '../actions/action_types';
import initialState from './initial_state';


export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {

        case TYPES.BUILD_TWITTER_STREAM:
            newState = action.payload;
            return {...state, newState};

        case TYPES.START_TWITTER_STREAM:
            newState = action.payload;    
            return {...state, newState};

        case TYPES.STOP_TWITTER_STREAM:
            newState = action.payload;
            return {...state, newState};

        default:
            return state;
    }

}