import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import { Container, Dialog, DialogContent } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { SPANISH_KEY } from '../../config'


type Props = {
  word: string
  dictionaryResponse: any
  modalOpen: boolean
  closeModal: any
}

const Modal: React.FC<Props> = ({
  word,
  dictionaryResponse,
  modalOpen,
  closeModal,
}) => {
  const[spanishDictionaryResponse, setSpanishDictionaryResponse] = useState(null)
const [spanishWord, setSpanishWord] = useState('')
  useEffect(() =>{
    if(word) {
      Axios.get(`https://www.dictionaryapi.com/api/v3/references/spanish/json/${word}?key=${SPANISH_KEY}`).then(res => {
        if (res.status === 200) {
          setSpanishDictionaryResponse(res.data)
        } else {
          console.log("Api is not working")
        }
      })
    }
  }, [word])

  // const data = dictionaryResponse.length !== 0 ? dictionaryResponse.data : ''
  const data = dictionaryResponse || ''
  const spanishData = spanishDictionaryResponse || ''

  const newData = spanishData && (spanishData[0].shortdef)

  console.log('spanishWord', newData && newData)
  return (
    <>
      <Dialog
        maxWidth="xs"
        open={modalOpen}
        scroll="paper"
        onClose={closeModal}
      >
        <DialogContent sx={{position:'relative'}}>
          <IconButton
              size="small"
              className="closeIcon"
              onClick={closeModal}
              sx={{position:'absolute', top: '20px', right:'20px'}}
          >
            <CloseIcon />
          </IconButton>
          <div className="definitionContainer">
            <Container>
              <h3 className="word"> Word is : <span className="defWord"> "{word}"</span></h3>
              <h3 className="title">In Spanish:-</h3>
              {newData && newData.map((data, index) => (
                    <p key={index} className="spanish">{data}</p>
              ))}
              <h3 className="title">Definition is:-</h3>
              {data.map((items, index) => (
                <div key={index}>
                  <h4
                    className="functionalLabel"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {items.fl}
                  </h4>
                  {items.shortdef.map((item, itemIndex) => (
                    <p key={itemIndex} className="itemDefinition">
                      {itemIndex + 1}. {item}
                    </p>
                  ))}
                </div>
              ))}
            </Container>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default Modal
