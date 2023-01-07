import React, {useEffect, useState} from 'react'

import './Config.css'

const ConfigPage = () => {
    const twitch = window.Twitch ? window.Twitch.ext : null

    const [theme, setTheme] = useState('light')
    const [profileName, setProfileName] = useState(null)

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

    const onSubmit = e => {
        e.preventDefault()
        twitch.configuration.set('broadcaster', '1.0', profileName)
    }

    return (
        <div className="Config">
            <div className={theme === 'light' ? 'Config-light' : 'Config-dark'}>
                <form onSubmit={onSubmit}>
                    <label>
                        new Enter your MyAnimeList profile name:
                        <input type="text" onChange={handleInputChange} />
                    </label>
                    <button type={'submit'}>Ok</button>
                </form>
            </div>
        </div>
    )
}

export default ConfigPage