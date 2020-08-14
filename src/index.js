import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from './redux/redux-store';
import * as serviceWorker from './serviceWorker';
import App from './App';

let rerenderEntireTree = () => {
    ReactDOM.render(
        <App />
        ,
        document.getElementById('root')
    );
};

rerenderEntireTree(store.getState());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();