import reducer from '';
import createSagaMiddleware from 'redux-saga'

var sagaMiddleWare = createSagaMiddleware();

export store = createStore(
  todoAppReducer,
  applyMiddleware(sagaMiddleWare)
  );