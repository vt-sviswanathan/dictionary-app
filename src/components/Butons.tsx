import {styled} from "@mui/material/styles";
import {Button} from "@mui/material";

 const UploadBtn = styled(Button)({
    height: '50px',
    border: '1px solid #42BCB6',
    margin: '20px auto',
    display: 'block',
    backgroundColor: '#59D4CE',
    '&:hover': {
        backgroundColor: '#35938E',
    },
})

 const TransBtn = styled(Button)({
    height: '50px',
    border: '1px solid #42BCB6',
    margin: '20px auto',
    display: 'block',
    backgroundColor: '#59D4CE',
    '&:hover': {
        backgroundColor: '#35938E',
    },
})

 const DefinitionBtn = styled(Button)({
    height: '50px',
    border: '1px solid #42BCB6',
    margin: '20px auto !important',
    display: 'block',
    backgroundColor: '#59D4CE',
    '&:hover': {
        backgroundColor: '#35938E',
    },
})

export { UploadBtn, TransBtn, DefinitionBtn }