import 'babel-polyfill';
import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';

// import the root reducer
import rootReducer from './reducers/index';
import comments from './data/comments';
import posts from './data/posts';
import { helloSaga } from './sagas/sagas';

// create an object for the default data
const defaultState = {
    posts,
    comments
}

const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
)
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, defaultState,applyMiddleware(sagaMiddleware), enhancers);

export const history = syncHistoryWithStore(browserHistory, store);

sagaMiddleware.run(helloSaga);
const action = type => store.dispatch({type})

if(module.hot){
    module.hot.accept('./reducers/', ()=>{
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    });
}

export default store;