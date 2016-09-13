import React, {Component} from 'React';
import {render} from 'react-dom';
import {App} from './App';
import reducer from './reducer/reducer';

var store = createStore(
  reducer,
  applyMiddleware(sagaMiddleWare)
);

sagaMiddleWare.run(rootSaga)

render(<Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'))