import {
  launchSingleEngineJob,
  postGraphQlQuery,
  checkingStatusQuery,
  engineResultsQuery,
} from './engine'

import MockResult from './result'

export const startEngine = async file => {
  const file_getUrl = file.getUrl
  const launchJobQuery = launchSingleEngineJob(file_getUrl)
  const response = await postGraphQlQuery(launchJobQuery)
  return response
}

export const jobStatus = async (tdoId, id) => {
  const jobStatusQuery = checkingStatusQuery(tdoId)
  const response = await postGraphQlQuery(jobStatusQuery)
  return response
}

export const jobResults = async (id, testData) => {
  if(testData) {
    console.log("------", JSON.parse(MockResult))
    return JSON.parse(MockResult)
  } else {
    const engineStatusQuery = engineResultsQuery(id)
    const data = await postGraphQlQuery(engineStatusQuery)
    console.log("Response getAudioJobResults ----", data)

    return data
  }

}

export const parseAudioJobResults = response => {
  const { series } = response.data.engineResults.records[0].jsondata
  const words = []
  series.forEach(word => {
    words.push(word?.words[0]?.word)
  })
  return words
}
