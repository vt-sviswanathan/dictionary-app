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

  // const data = dictionaryResponse.length !== 0 ? dictionaryResponse.data : ''
  const data = dictionaryResponse

  return (
    <>
      <Dialog
        // fullWidth
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
              <h3 className="title">Definition of {word}</h3>
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
