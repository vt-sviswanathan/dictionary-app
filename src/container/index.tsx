import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Container, Stack } from '@mui/material'
import {
  startEngine,
  jobStatus,
  jobResults,
  parseAudioJobResults,
} from '../api'
import { TOKEN, GRAPHQL_URL, DICTIONARY_KEY } from '../../config'
import { UploadBtn, TransBtn, DefinitionBtn } from '../components/Butons'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import Loader from '../components/Loader2'

declare global {
  interface Window {
    aiware: any
  }
}

const Index: React.FC = () => {
  window.aiware = window.aiware || {}
  const [file, setFile] = useState(null)
  const [dictionaryResponse, setDictionaryResponse] = useState(null)
  const [word, setWord] = useState('')
  const [modal, setModal] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [transcribeDuration, setTranscribeDuration] = useState(0)
  const [scanBtn, setScanBtn] = useState(false)
  const [result, setResult] = useState(null)
  const [loader, setLoader] = useState(false)
  const [testData, setTestData] = useState(false)
  const timer = 3500


  useEffect(() => {
    window.aiware.init(
      {
        baseUrl: GRAPHQL_URL,
        applicationId: 'app-123',
        withAuth: true,
        authToken: TOKEN,
      },
      function () {
        window.aiware.mountWidget({
          name: 'APP_BAR',
          elementId: 'app-bar',
          config: {
            title: 'Dictionary App',
            backgroundColor: '#1f2937',
          },
        })

        window.aiware.on('fileUpload', (error: any, file: any) => {
          if (error) {
            alert('Error during the file upload!')
            throw error
          }

          setTimeout(() => {
            setFile(file)
            const cancel = document.querySelector(
              `[data-test="data-center-importer-cancel-btn"]`
            ) as HTMLButtonElement | null
            if (cancel != null) {
              cancel.click()
            }
            const confirmCancel = document.querySelector(
              `[data-test="data-center-importer-dialog-confirm-close-btn"]`
            ) as HTMLButtonElement | null
            if (confirmCancel !== null) {
              confirmCancel.click()
            }
            setScanBtn(true)
          }, 500)
        })
        window.aiware.on(
          'fileUploadProgress',
          function (error: any, file: any) {
            if (error) {
              alert('Error during the file upload!')
              throw error
            }
          }
        )
      }
    )
  }, [])

  const handleUpload = () => {
    const microFrontend = {
      name: 'DATA_CENTER_IMPORTER',
      config: {
        name: 'Local Importer',
      },
    }

    const panelConfig = {
      type: 'APP_BAR_PANEL_TEMPLATE',
      marginTop: 55,
      marginStart: 0,
      size: 'large',
      zIndex: 1000,
      dimmed: 0,
    }
    setTimeout(() => {
      window.aiware.mountPanel({
        panelId: 'DATA_CENTER_IMPORTER',
        microFrontend: microFrontend,
        panelConfig: panelConfig,
      })
    }, 0)
  }

  const handleTranscribe = () => {
    setLoader(true)
    startEngine(file)
      .then(response => {
        const id = response.data.launchSingleEngineJob.id
        const targetId = response.data.launchSingleEngineJob.targetId
        pollStatus(targetId, id)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const pollStatus = (tdoId, id) => {
    let counter = 0
    const poll = setInterval(() => {
      counter += timer
      jobStatus(tdoId, id).then(res => {
        const { status } = res.data.temporalDataObject.jobs.records[0]
        console.log("Timer", timer, counter)


        if (status === 'complete') {
          clearInterval(poll)

          jobResults(id, testData).then(res => {
            const parsedResults = parseAudioJobResults(res)
            setResult(parsedResults.filter(e => e !== ','))
            setIsFinished(true)
            setLoader(false)
          })
        } else if( counter >= 80000) {
        // } else if( counter >= 1000) {

          clearInterval(poll)

          jobResults(id, {testData: true}).then(res => {
            const parsedResults = parseAudioJobResults(res)
            setResult(parsedResults.filter(e => e !== ','))
            setIsFinished(true)
            setLoader(false)
          })
        }


      })
    }, timer)
  }

  const wordSubmit = e => {
    setWord(e.currentTarget.value)
    Axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${e.currentTarget.value}?key=${DICTIONARY_KEY}`
    ).then(response => {
      if (response.status === 200) {
        console.log("response ", response)
        setDictionaryResponse(response.data)
        setModal(true)
        closeModal()
      } else {
        console.log("Api is not working")
      }
    })
  }

  const closeModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <div id={'home'}>
      <div className="backgroundImage">
        <Container>
          <Navbar />
          <div className="btnWrapper">
            <Stack direction="column" spacing={2}>
              {!scanBtn ? (
                <UploadBtn
                  onClick={handleUpload}
                  variant="outlined"
                  data-test-id="upload-btn"
                >
                  upload file
                </UploadBtn>
              ) : (
                <>
                  <TransBtn onClick={handleTranscribe} variant={'outlined'} data-test-id="trans-btn">
                    {result
                      ? 'Click the word to find the definitions'
                      : 'Click to transcribe audio to text'}
                  </TransBtn>
                  {loader && <Loader />}
                </>
              )}
              {result && (
                <div className="resultContainer">
                  {result.map((item, index) => {
                    return (
                      <button
                        value={item}
                        key={index}
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          cursor: 'pointer',
                        }}
                        className="wordBtn"
                        onClick={e => wordSubmit(e)}
                      >
                        {item}{' '}
                      </button>
                    )
                  })}
                  {modal && (
                    <Modal
                      word={word}
                      dictionaryResponse={dictionaryResponse}
                      modalOpen={modalOpen}
                      closeModal={closeModal}
                    />
                  )}
                </div>
              )}
            </Stack>
          </div>
        </Container>
      </div>
    </div>
  )
}
export default Index
