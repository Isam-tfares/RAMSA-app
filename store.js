import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // For handling asynchronous actions

// Import your reducers
import userReducer from './reducers/userReducer';
import demandesReducer from './reducers/demandesReducer';

// Combine your reducers
const rootReducer = combineReducers({
    user: userReducer,
    demandes: demandesReducer,
});

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
