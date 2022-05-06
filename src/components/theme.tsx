import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: '#59D4CE'
        },
        secondary: {
            main: '#35938E'
        },
        // background: {
        //     default: "#FFFF"
        // }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    color: '#FFFF',
                    fontSize: '18px',
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                },
            },
        },
    },
});

export default theme;