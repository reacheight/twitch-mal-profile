import React, {useEffect, useState} from 'react'

import './App.css'
import Profile from "../Profile/Profile";
import {createTheme, ThemeProvider} from "@mui/material";

const App = () => {
    const twitch = window.Twitch ? window.Twitch.ext : null

    const [theme, setTheme] = useState('light')
    const [isVisible, setIsVisible] = useState(true)
    const [profileName, setProfileName] = useState(null)

    useEffect(() => {
        if (twitch) {
            twitch.onContext((context, delta) => {
                if (delta.includes('theme')) {
                    setTheme(context.theme)
                }
            })

            twitch.onVisibilityChanged((isVisible, _c) => {
                setIsVisible(isVisible)
            })

            twitch.configuration.onChanged(() => {
                let profileName = twitch.configuration.broadcaster ? twitch.configuration.broadcaster.content : null
                setProfileName(profileName)
            })
        }
    })

    const muiTheme = createTheme({
        palette: {
            mode: theme,
            primary: {
                main: theme === 'light' ? '#232127' : '#e5e3e8',
                light: '#e5e3e8',
                dark: '#232127',
            },
        },
    })

    if (!isVisible) return null

    return (
        <div className="App">
            <div className={theme === 'light' ? 'App-light' : 'App-dark'}>
                {!profileName && <p>Please configure your MyAnimeList username for extension.</p>}
                {profileName && <ThemeProvider theme={muiTheme}><Profile name={profileName} /></ThemeProvider>}
            </div>
        </div>
    )
}

export default App