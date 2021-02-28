import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { configure } from 'mobx';
import { Provider } from "mobx-react";
import stores from "./store";

// configure({ 'enforceActions': 'always' });
ReactDOM.render(
    <Provider {...stores} >
        <App />
    </Provider>,
    document.getElementById('root')
);

