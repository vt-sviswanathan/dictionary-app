import { actiontypes } from './actiontypes'

import {
  FetchDefinitions,
  FetchDefinitionsSuccess,
  FetchDefinitionsFailure,
  SetDefinitionWord,
  GetDefinitionWord,
  FetchDefinitionsSuccessPayload,
  FetchDefinitionsFailurePayload,
} from './types'

export const fetchDefinitions = (): FetchDefinitions => ({
  type: actiontypes.FETCH_DEFINITIONS_REQUESTED,
})

// export const fetchDefinitionsSuccess = (
//   payload: FetchDefinitionsSuccessPayload
// ): FetchDefinitionsSuccess => ({
//   type: actiontypes.FETCH_DEFINITIONS_SUCCESS,
//   payload,
// })
//
// export const fetchDefinitionsFailure = (
//   payload: FetchDefinitionsFailurePayload
// ): FetchDefinitionsFailure => ({
//   type: actiontypes.FETCH_DEFINITIONS_FAILURE,
//   payload,
// })

export const setDefinitionWord = (defWord: string) =>
  ({
    type: 'SET_WORD',
    defWord,
  } as const)

export const getDefinitionWord = () => {
  return {
    type: 'GET_WORD',
  }
}
