import React, {useEffect, useState} from 'react'

import './Config.css'
import {Button, TextField, ThemeProvider} from "@mui/material";
import getMuiTheme from "../../util/theme";

const ConfigPage = () => {
    const twitch = window.Twitch ? window.Twitch.ext : null

    const [theme, setTheme] = useState('light')
    const [profileName, setProfileName] = useState(null)
    const [isButtonPressed, setIsButtonPressed] = useState(false)
    const [isUserNotFound, setIsUserNotFound] = useState(false)

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

        fetch(`${process.env.MAL_PROXY_HOST}/${profileName}/anime/top?limit=5`)
            .then(response => {
                setIsUserNotFound(response.status !== 200)
                twitch.configuration.set('broadcaster', '1.0', profileName)
                setIsButtonPressed(true)
            })
    }

    return (
        <div className="Config">
            <div className={theme === 'light' ? 'Config-light' : 'Config-dark'}>
                <ThemeProvider theme={getMuiTheme(theme)}>
                    <TextField label={'MyAnimeList username'} variant={'outlined'} onChange={handleInputChange} error={isUserNotFound} helperText={isUserNotFound ? 'User not found' : null} />
                    <br />
                    <Button sx={{marginTop: "10px"}} variant={'contained'} color="success" onClick={onSave}>{isButtonPressed && !isUserNotFound ? 'Saved' : 'Save'}</Button>
                </ThemeProvider>
            </div>
        </div>
    )
}

export default ConfigPage