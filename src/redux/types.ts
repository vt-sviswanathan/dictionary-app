import { actiontypes } from './actiontypes'
import result from '../api/result'

export interface defnitionState {
  pending: boolean
  result: string[]
  error: string | null
}

export interface FetchDefinitionsSuccessPayload {
  result: result[]
}

export interface FetchDefinitionsFailurePayload {
  error: string
}

export interface FetchDefinitions {
  type: typeof actiontypes.FETCH_DEFINITIONS_REQUESTED
}

export interface FetchDefinitionsSuccess {
  type: typeof actiontypes.FETCH_DEFINITIONS_SUCCESS
}

export interface FetchDefinitionsFailure {
  type: typeof actiontypes.FETCH_DEFINITIONS_FAILURE
}

// export type SetDefinitionWord = {
//   type: typeof actiontypes.SET_WORD
//   payload: FetchDefinitionsSuccessPayload
// }
//
// export type GetDefinitionWord = {
//   type: typeof actiontypes.GET_WORD
//   payload: FetchDefinitionsFailurePayload
// }

export type DefinitionActions = FetchDefinitions
// | FetchDefinitionsSuccess
// | FetchDefinitionsFailure
// | SetDefinitionWord
// | GetDefinitionWord
