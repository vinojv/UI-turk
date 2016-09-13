import { call, put } from 'redux-saga/effects'
import createSagaMiddleware, { takeLatest, takeEvery, delay } from 'redux-saga'

/*Not used currently,
we can use this as a template for saga*/

function* addAsync (...params) {
  // yield delay(2000);
  let x = yield call(fetch, "http://localhost:8065", { method: 'GET' })
  console.log(JSON.stringify(params), x)
  yield put( { ...params[0], type: "ADD_ASYNC" })
}
/*FOLLOWING IS A SAGA*/
function* watchAsync (){
  yield* takeLatest('ADD_ASYNC_SAGA', addAsync)
}

export default function* rootSaga() {
  yield [
    watchAsync()
  ]
}