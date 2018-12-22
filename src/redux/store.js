import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import rootReducer from './reducers';
import rootSaga from './sagas';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

//run saga
const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(middleware, sagaMiddleware)));

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  console.log(store.getState());
})

export default store;