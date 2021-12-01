import React from 'react';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk';
import global from './store/reducers/BackOffices/global'
import user from './store/reducers/auth/User'



const composeEnhancers = process.env.NODE_ENV==="development"?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :compose;
const rootReducer = combineReducers({
    global: global,
    user:user,
});
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
//const store = createStore(rootReducer,applyMiddleware(thunk));
ReactDOM.render(
   //<React.StrictMode>
    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>,
   //</React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

