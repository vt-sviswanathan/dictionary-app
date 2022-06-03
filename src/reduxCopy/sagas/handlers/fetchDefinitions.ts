import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import fetchGetDefinitions from '../request/fetchDefinitions'

function* handleGetDefinitions() {
  try {
    const result = yield call(fetchGetDefinitions)
    yield put({ type: 'GET_DEFINITIONS_SUCCESS', result: result })
  } catch (err) {
    yield put({ type: 'GET_DEFINITIONS_FAILED', message: err.message })
  }
}

function* watcherDefinitionsSaga() {
  yield takeLatest('GET_DEFINITIONS_REQUESTED', handleGetDefinitions)
}

export default watcherDefinitionsSaga
