import reducer from './reducers/reducer';
import createSagaMiddleware, { takeLatest, takeEvery, delay } from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';
import rootSaga from './sagas/saga';

var sagaMiddleWare = createSagaMiddleware();

export default createStore(
  reducer,
  applyMiddleware(sagaMiddleWare)
  );

sagaMiddleWare.run(rootSaga);