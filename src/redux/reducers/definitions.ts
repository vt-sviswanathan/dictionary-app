import { actiontypes } from '../actiontypes'
import {DefinitionActions, defnitionState} from '../types'

const initialState: defnitionState = {
  pending: false,
  result: [],
  error: null
}

export default (state = initialState, action: DefinitionActions) => {
  switch (action.type) {
    case actiontypes.FETCH_DEFINITIONS_REQUESTED:
      return {
        ...state,
        pending: true
      }
    case actiontypes.FETCH_DEFINITIONS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        error: null,
      }
    case actiontypes.FETCH_DEFINITIONS_FAILURE:
      return {
        ...state,
        pending: false,
        posts: [],
        error: action.payload.error,
      }
    default:
      return {
        ...state,
      }
  }
}
