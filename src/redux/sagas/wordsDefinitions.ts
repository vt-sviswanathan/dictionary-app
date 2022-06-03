import axios from 'axios'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { fetchDefinitions } from '../actions'
import { actiontypes } from '../actiontypes'
import { DICTIONARY_KEY } from '../../../config'

const getDefinitions = () =>
  axios.get<[]>(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/text?key=${DICTIONARY_KEY}`)

function* fetchDefinitionSaga() {
  // try {
  //   const response = yield call(getDefinitions)
  //   yield put(
  //     fetchPostsSuccess({
  //       posts: response.data,
  //     })
  //   )
  // } catch (e) {
  //   yield put(
  //     fetchPostsFailure({
  //       error: e.message,
  //     })
  //   )
  // }
    try {
        const result = yield call(getDefinitions)
        yield put({ type: 'GET_DEFINITIONS_SUCCESS', result: result })
    } catch (err) {
        yield put({ type: 'GET_DEFINITIONS_FAILED', message: err.message })
    }
}

function* postsSaga() {
  yield all([takeLatest(actiontypes.FETCH_DEFINITIONS_REQUESTED, fetchDefinitionSaga)])
}

export default postsSaga
