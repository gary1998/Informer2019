import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {reducer} from './Reducer';

const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const store = createStore(reducer, {
    name: '',
    email: '',
    phone: '',
    lat: 0,
    lon: 0,
    hosps: [],
    pol: [],
    fs: []
}, enhancer);

export default store;