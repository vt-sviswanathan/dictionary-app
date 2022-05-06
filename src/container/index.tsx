import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Container, Stack } from '@mui/material'
import Navbar from '../components/Navbar'
import Modal from '../components/Modal'
import { UploadBtn, TransBtn, DefinitionBtn } from '../components/Butons'
import {
  startEngine,
  jobStatus,
  jobResults,
  generateAudioJobResults,
  parseAudioJobResults,
} from '../api'
import { TOKEN, GRAPHQL_URL } from '../../config'

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
  const timer = 3500

  // const result = 'Testing PlayStation PlayStation,  PlayStation PlayStation test one two three'


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
            title: 'Transcribe',
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
    const poll = setInterval(() => {
      jobStatus(tdoId, id).then(res => {
        const { status } = res.data.temporalDataObject.jobs.records[0]
        if (status === 'complete') {
          clearInterval(poll)

          jobResults(id).then(res => {
            const parsedResults = generateAudioJobResults(
              parseAudioJobResults(res)
            )

            console.log('REsult REsult Result', parsedResults)
            // needed this
            // console.log('remove comaa 1111', parsedResults.replaceAll(',', ''))
            //
            // console.log('remove comaa', parsedResults.replace(/,/g, ''))
            setResult(parsedResults.filter(e => e !== ','))
            setIsFinished(true)
          })
        }
      })
    }, 3500)
  }

  const wordSubmit = e => {
    console.log('e.target.value', e.target.value)
    setWord(e.currentTarget.value)
    Axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${e.currentTarget.value}?key=851546ba-e972-4cc3-89f2-71ffc1ecfbe3`
    ).then(response => {
      if (response.status === 200) {
        setDictionaryResponse(response.data)
        setModal(true)
        closeModal()
      } else {
        console.log('Something went wrong')
      }
    })
  }

  const closeModal = () => {
    setModalOpen(!modalOpen)
  }

  console.log('results', result)
  return (
    <div id={'home'}>
      <div className={!dictionaryResponse && 'backgroundImage'}>
        <Container>
          <Navbar />
          <div className="btnWrapper">
            <Stack direction="column" spacing={2}>
              {!scanBtn ? (
                <UploadBtn onClick={handleUpload} variant="outlined">
                  upload file
                </UploadBtn>
              ) : (
                <TransBtn onClick={handleTranscribe} variant={'outlined'}>
                  {result ? 'Click the word to find the definitions' : 'Click to transcribe audio to text'}
                </TransBtn>
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
