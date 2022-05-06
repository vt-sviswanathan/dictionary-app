// Thank you Mert and Tony!

declare global {
    interface Window {
        gql: any
    }
}

import { TOKEN, GRAPHQL_URL, CLUSTER_ID, ENGINE_ID } from "../../config"

export const launchSingleEngineJob = (file_getUrl) => {
    if (!file_getUrl) {
        throw new Error("Cannot launch job without getUrl")
    }
    return {
        queryString: `mutation launchJob {
        launchSingleEngineJob(
          input: {
            uploadUrl: "${file_getUrl}"
            engineId: "${ENGINE_ID}"
            clusterId: "${CLUSTER_ID}"
          }
        ) {
          id
          targetId
          status
        }
      }`,
        file_getUrl,
    }
}

export const postGraphQlQuery = async (query) => {
    console.log("query -------", query)
    try {
        const response = await window.gql(query.queryString)

        console.log("postGraphQlQuery  responce", response)
        return response
    } catch (err) {
        console.log(err)
    }
}


export const checkingStatusQuery = (targetId) => {
    console.log("11111111111, checkingStatusQuery ", targetId)
    return {
        queryString: `query tdoJobStatus {
        temporalDataObject(id: "${targetId}") {
          jobs {
            records {
              id
              status
            }
          }
        }
      }`,
        targetId,
    };
};

export const engineResultsQuery = (jobId) => {
    return {
        queryString: `query engineResultsFromTDOJobId {
            engineResults(jobId: "${jobId}") {
              records {
                engineId
                jsondata
                stopOffsetMs
              }
            }
          }`,
        jobId,
    };
};

