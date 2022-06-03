import { all } from 'redux-saga/effects'
import wordsDefinitions from './wordsDefinitions'

export default function* rootSaga() {
  yield all([wordsDefinitions()])
}
