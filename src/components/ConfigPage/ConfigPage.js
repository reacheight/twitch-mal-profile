import React, {useEffect, useState} from 'react'

import './Config.css'
import {Button, createTheme, TextField, ThemeProvider} from "@mui/material";

const ConfigPage = () => {
    const twitch = window.Twitch ? window.Twitch.ext : null

    const [theme, setTheme] = useState('light')
    const [profileName, setProfileName] = useState(null)
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        if (twitch) {
            twitch.onContext((context, delta) => {
                if (delta.includes('theme')) {
                    setTheme(context.theme)
                }
            })
        }
    })

    const handleInputChange = e => setProfileName(e.target.value)

    const onSave = e => {
        e.preventDefault()
        twitch.configuration.set('broadcaster', '1.0', profileName)
        setIsSaved(true)
    }

    const muiTheme = createTheme({
        palette: {
            mode: theme,
            primary: {
                main: theme === 'light' ? '#232127' : '#e5e3e8',
                light: '#232127',
                dark: '#e5e3e8',
            },
        },
    })

    return (
        <div className="Config">
            <div className={theme === 'light' ? 'Config-light' : 'Config-dark'}>
                <ThemeProvider theme={muiTheme}>
                    <TextField label={'MyAnimeList username'} variant={'outlined'} onChange={handleInputChange} />
                    <br />
                    <Button sx={{marginTop: "10px"}} variant={'contained'} color="success" onClick={onSave}>{isSaved ? 'Saved!' : 'Save'}</Button>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default ConfigPage