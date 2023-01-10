import React, {useEffect, useState} from 'react'

import './App.css'
import Profile from "../Profile/Profile";

import {ThemeProvider} from "@mui/material";
import getMuiTheme from "../../util/theme";

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

    if (!isVisible) return null

    return (
        <div className="App">
            <div className={theme === 'light' ? 'App-light' : 'App-dark'}>
                {!profileName && <p>Please configure your MyAnimeList username for extension.</p>}
                {profileName && <ThemeProvider theme={getMuiTheme(theme)}><Profile name={profileName} /></ThemeProvider>}
            </div>
        </div>
    )
}

export default App