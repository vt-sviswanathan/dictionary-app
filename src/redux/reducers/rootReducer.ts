import { combineReducers } from 'redux'
import definitions from './definitions'
import addword from './addWord'

const rootReducer = combineReducers({
  definitions: definitions,
  addword: addword
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
