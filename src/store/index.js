import { createStore, applyMiddleware } from 'redux';
import main_reducer from '../reducers';
import thunk from 'redux-thunk';

export default function() {

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') { //https://stackoverflow.com/a/35470995

        return createStore(
            main_reducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
            applyMiddleware(thunk)
        );
    } 
    else {
        return createStore(
            main_reducer,
            applyMiddleware(thunk)
        );
    }
}