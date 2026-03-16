import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Named import for newer versions
import { createLogger } from 'redux-logger';
import 'tachyons';

import App from './Container/App';
import { searchAvatars, requestAvatars } from './reducers';
import './index.css';

const logger = createLogger();
const rootReducer = combineReducers({ searchAvatars, requestAvatars });
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);