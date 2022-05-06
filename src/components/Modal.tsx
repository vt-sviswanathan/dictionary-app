import React, { FC } from 'react'
import { Container, Dialog, DialogContent } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  word: string
  dictionaryResponse: any
  modalOpen: boolean
  closeModal: any
}

const Modal: FC<Props> = ({
  word,
  dictionaryResponse,
  modalOpen,
  closeModal,
}) => {
  console.log("Modal    ---")
  console.log("Modal    --- word", {word, dictionaryResponse})

  // const data = dictionaryResponse.length !== 0 ? dictionaryResponse.data : ''
  const data = dictionaryResponse

  console.log('def. data. shortdef data', data)

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
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
              <h1 className="title">Definition of {word}</h1>
              {data.map((items, index) => (
                <div key={index}>
                  <h2
                    className="functionalLabel"
                    style={{ textTransform: 'capitalize' }}
                  >
                    {items.fl}
                  </h2>
                  {items.shortdef.map((item, itemIndex) => (
                    <p key={itemIndex} className="di">
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
