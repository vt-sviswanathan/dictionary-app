import React, { FC } from "react"
import { Container} from '@mui/material'

type Props = {
    word: string
    dictionaryResponse: any
}

const Definition: FC<Props> = ({ word, dictionaryResponse}) => {
    const data = dictionaryResponse.length !== 0 ? dictionaryResponse.data : ''
    console.log("def. data. shortdef data", data)
    return(
        <div className="definitionContainer">
            <Container>
            <h1 className='title'>Definition of {word}</h1>
            {data.map((items, index) => (
                <div key={index}>
                    <h2 className="functionalLabel" style={{textTransform: 'capitalize'}}>{items.fl}</h2>
                    {items.shortdef.map((item, itemIndex) => (
                        <p key={itemIndex} className="di">{itemIndex + 1}. {item}</p>
                    ))
                    }
                </div>
            ))
            }
            </Container>
        </div>
    )
}

export default Definition
