import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'tachyons';

import App from './Container/App';  // ← IMPORTANT: Add this!

import { Provider } from 'react-redux';  // only Provider needed
import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';         // ← correct: named import { thunk }
import { createLogger } from 'redux-logger';

import { searchRobots, requestRobots } from './reducers';  // your reducer

const logger = createLogger();  // optional - shows nice logs in console

const rootReducer = combineReducers({ searchRobots, requestRobots })
const store = 
  createStore(rootReducer, applyMiddleware(thunk, logger))

const root = createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();