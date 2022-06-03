
import definitions from './definitions'
import addWord from './addWord'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  addWord,
  definitions
})

export default reducers
