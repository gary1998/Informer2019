import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './Store';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux';
import {setEnv} from './Actions';

store.dispatch(setEnv());

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
document.getElementById('root'));