// import React, { useEffect, useState } from 'react'
// import Axios from 'axios'
// import { Container, Stack } from '@mui/material'
// import Navbar from '../components/Navbar'
// import Modal from '../components/Modal'
// import { UploadBtn, TransBtn, DefinitionBtn } from '../components/Butons'
// import {
//     startEngine,
//     jobStatus,
//     generateAudioJobResults,
//     parseAudioJobResults,
// } from '../api'
// import { TOKEN, GRAPHQL_URL } from '../../config'
//
// declare global {
//     interface Window {
//         aiware: any
//     }
// }
//
// const Index: React.FC = () => {
//     window.aiware = window.aiware || {}
//     const [file, setFile] = useState(null)
//     const [dictionaryResponse, setDictionaryResponse] = useState(null)
//     const [word, setWord] = useState('mask')
//     const [modalOpen, setModalOpen] = useState(false)
//     const [isFinished, setIsFinished] = useState(false)
//     const [transcribeDuration, setTranscribeDuration] = useState(0)
//     const timer = 3500
//
//     useEffect(() => {
//         window.aiware.init(
//             {
//                 baseUrl: GRAPHQL_URL,
//                 applicationId: 'app-123',
//                 withAuth: true,
//                 authToken: TOKEN,
//             },
//             function () {
//                 window.aiware.mountWidget({
//                     name: 'APP_BAR',
//                     elementId: 'app-bar',
//                     config: {
//                         title: 'Transcribe',
//                         backgroundColor: '#1f2937',
//                     },
//                 })
//
//                 window.aiware.on('fileUpload', (error: any, file: any) => {
//                     if (error) {
//                         alert('Error during the file upload!')
//                         throw error
//                     }
//
//                     console.log(file)
//                     setTimeout(() => {
//                         setFile(file)
//                         console.log('1111111', file)
//                         // const cancel =  document.querySelector(`[data-test="data-center-importer-cancel-btn"]`) as HTMLButtonElement | null
//                         // if( cancel != null) {
//                         //   console.log(cancel.innerText)
//                         //   cancel.click()
//                         // }
//                         // const confirmCancel = document.querySelector(`[data-test="data-center-importer-dialog-confirm-close-btn"]`) as HTMLButtonElement | null
//                         // if( confirmCancel !== null) {
//                         //   console.log("Confirm")
//                         //   confirmCancel.click()
//                         // }
//                         console.log('Closing Importer panel')
//                     }, 500)
//                 })
//                 window.aiware.on(
//                     'fileUploadProgress',
//                     function (error: any, file: any) {
//                         if (error) {
//                             alert('Error during the file upload!')
//                             throw error
//                         }
//                         console.log('Progress: ', file)
//                     }
//                 )
//             }
//         )
//     }, [])
//
//     const handleUpload = () => {
//         const microFrontend = {
//             name: 'DATA_CENTER_IMPORTER',
//             config: {
//                 name: 'Local Importer',
//             },
//         }
//
//         const panelConfig = {
//             type: 'APP_BAR_PANEL_TEMPLATE',
//             marginTop: 55,
//             marginStart: 0,
//             size: 'large',
//             zIndex: 1000,
//             dimmed: 0,
//         }
//         setTimeout(() => {
//             window.aiware.mountPanel({
//                 panelId: 'DATA_CENTER_IMPORTER',
//                 microFrontend: microFrontend,
//                 panelConfig: panelConfig,
//             })
//         }, 0)
//         setTimeout(() => {
//             console.log('Click browse button')
//             // document.querySelector(`[data-test="data-center-importer-local-upload-button"]`).click()
//         }, 1)
//     }
//
//     console.log('File', file)
//
//     const handleTranscribe = () => {
//         startEngine(file).then(response => {
//             console.log('response =====', response)
//             const jobId = response.data.launchSingleEngineJob.id
//             const targetId = response.data.launchSingleEngineJob.targetId
//             pollStatus(targetId, jobId)
//         })
//     }
//     const pollStatus = (targetId, jobId) => {
//         let counter = 0;
//         const poll = setInterval(() => {
//             counter += timer
//             jobStatus(targetId, jobId).then(res => {
//                 const { status } = res.data.temporalDataObject.jobs.records[0]
//                 console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', {status})
//
//                 if (status === 'complete') {
//                     clearInterval(poll)
//                     jobStatus(targetId, jobId).then(res => {
//                         console.log('))))))))))))))))))))))))))))))))))))')
//                         const parsedResults = generateAudioJobResults(
//                             parseAudioJobResults(res)
//                         )
//                         setIsFinished(true)
//                         // setTranscribeDuration(counter);
//                         // setResults({
//                         //   ...parsedResults,
//                         //   tdoIdQuery,
//                         //   jobIdQuery,
//                         //   transcribeDuration: counter,
//                         // });
//                         // setObject(parsedResults.found);
//                         console.log('parsedResults ----', parsedResults)
//                     })
//                     // } else if (counter >= API_TIMEOUT_DURATION) {
//                     //   clearInterval(poll);
//                     //   console.log(
//                     //       "The API engine did not finish before timeout. Displaying error."
//                     //   );
//                     //   setIsReqTimedOut(true);
//                     //   setIsRunning(false);
//                     //   setIsFinished(false);
//                     // }
//                 } else if (counter >= timer) {
//                     clearInterval(poll)
//                     console.log('Testing if the job status is done', {counter, timer})
//                 }
//             })
//         }, timer)
//     }
//
//     const wordSubmit = () => {
//         Axios.get(
//             `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=851546ba-e972-4cc3-89f2-71ffc1ecfbe3`
//         ).then(response => {
//             if (response.status === 200) {
//                 setDictionaryResponse(response)
//                 setModalOpen(true)
//             } else {
//                 console.log('Something went wrong')
//             }
//         })
//     }
//
//     const closeModal = () => {
//         console.log('I am in close modal', modalOpen)
//         setModalOpen(!modalOpen)
//     }
//
//     return (
//         <div id={'home'}>
//             <div className={!dictionaryResponse && 'backgroundImage'}>
//                 <Container>
//                     <Navbar />
//                     <div className="btnWrapper">
//                         <Stack direction="column" spacing={2}>
//                             {!dictionaryResponse ? (
//                                 <>
//                                     <UploadBtn onClick={handleUpload} variant="outlined">
//                                         upload file
//                                     </UploadBtn>
//                                     <TransBtn onClick={handleTranscribe} variant={'outlined'}>
//                                         Transcribe audio to text
//                                     </TransBtn>
//                                     {word && (
//                                         <DefinitionBtn onClick={wordSubmit} variant="outlined">
//                                             Click to see the definition of the {word}
//                                         </DefinitionBtn>
//                                     )}
//                                 </>
//                             ) : (
//                                 <Modal
//                                     word={word}
//                                     dictionaryResponse={dictionaryResponse}
//                                     modalOpen={modalOpen}
//                                     closeModal={closeModal}
//                                 />
//                             )}
//                         </Stack>
//                     </div>
//                     {/*{ file && file.getUrl ?*/}
//                     {/*    <audio*/}
//                     {/*        className="audio-player"*/}
//                     {/*        data-test-id="audio-player"*/}
//                     {/*        controls*/}
//                     {/*        src={file.getUrl}*/}
//                     {/*    >*/}
//                     {/*      Your browser does not support the*/}
//                     {/*      <code>audio</code> element.*/}
//                     {/*    </audio>*/}
//                     {/*    : null}*/}
//                 </Container>
//             </div>
//         </div>
//     )
// }
// export default Index
