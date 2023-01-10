import {createTheme} from "@mui/material";

const getMuiTheme = (theme) => createTheme({
    palette: {
        mode: theme,
        primary: {
            main: theme === 'light' ? '#232127' : '#e5e3e8',
            light: '#232127',
            dark: '#e5e3e8',
        },
    },
})

export default getMuiTheme