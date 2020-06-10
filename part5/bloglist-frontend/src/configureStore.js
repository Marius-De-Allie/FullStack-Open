import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from './middleware';
// Import reducer
import reducer from './reducers';

export default createStore(reducer, applyMiddleware(thunk));