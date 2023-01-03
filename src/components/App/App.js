import React from 'react'
import Authentication from '../../util/Authentication/Authentication'

import './App.css'
import Profile from "../Profile/Profile";
import {createTheme, ThemeProvider} from "@mui/material";

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.Authentication = new Authentication()

        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state = {
            finishedLoading: false,
            theme: 'light',
            isVisible: true,
            profileName: null,
        }
    }

    contextUpdate(context, delta) {
        if (delta.includes('theme')) {
            this.setState({theme: context.theme})
        }
    }

    visibilityChanged(isVisible) {
        this.setState({isVisible})
    }

    componentDidMount() {
        if (this.twitch) {
            this.twitch.onAuthorized((auth) => {
                this.Authentication.setToken(auth.token, auth.userId)
                this.setState({finishedLoading: true})
            })

            this.twitch.onVisibilityChanged((isVisible, _c) => {
                this.visibilityChanged(isVisible)
            })

            this.twitch.onContext((context, delta) => {
                this.contextUpdate(context, delta)
            })

            this.twitch.configuration.onChanged(() => {
                let profileName = this.twitch.configuration.broadcaster ? this.twitch.configuration.broadcaster.content : null
                this.setState({profileName})
            })
        }
    }

    render() {
        const theme = createTheme({
            palette: {
                mode: this.state.theme,
                primary: {
                    main: this.state.theme === 'light' ? '#232127' : '#e5e3e8',
                    light: '#e5e3e8',
                    dark: '#232127',
                },
            },
        })

        if (this.state.finishedLoading && this.state.isVisible) {
            return (
                <div className="App">
                    <div className={this.state.theme === 'light' ? 'App-light' : 'App-dark'}>
                        {!this.state.profileName && <p>Please configure your MyAnimeList username for extension.</p>}
                        {this.state.profileName && <ThemeProvider theme={theme}><Profile name={this.state.profileName} /></ThemeProvider>}
                    </div>
                </div>
            )
        } else {
            return (
                <div className="App">
                    Something went wrong.
                </div>
            )
        }

    }
}