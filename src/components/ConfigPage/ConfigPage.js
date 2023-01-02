import React from 'react'
import Authentication from '../../util/Authentication/Authentication'

import './Config.css'

export default class ConfigPage extends React.Component {
    constructor(props) {
        super(props)
        this.Authentication = new Authentication()

        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state = {
            finishedLoading: false,
            theme: 'light',
            profileName: null,
        }
    }

    contextUpdate(context, delta) {
        if (delta.includes('theme')) {
            this.setState(() => {
                return {theme: context.theme}
            })
        }
    }

    componentDidMount() {
        if (this.twitch) {
            this.twitch.onAuthorized((auth) => {
                this.Authentication.setToken(auth.token, auth.userId)
                this.setState({finishedLoading: true})
            })

            this.twitch.onContext((context, delta) => {
                this.contextUpdate(context, delta)
            })
        }
    }

    handleInputChange(event) {
        this.setState({profileName: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault()
        this.twitch.configuration.set('broadcaster', '1.0', this.state.profileName)
    }

    render() {
        if (this.state.finishedLoading && this.Authentication.isModerator()) {
            return (
                <div className="Config">
                    <div className={this.state.theme === 'light' ? 'Config-light' : 'Config-dark'}>
                        <form onSubmit={e => this.onSubmit(e)}>
                            <label>
                                Enter your MyAnimeList profile name:
                                <input type="text" onChange={e => this.handleInputChange(e)} />
                            </label>
                            <button type={'submit'}>Ok</button>
                        </form>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="Config">
                    <div className={this.state.theme === 'light' ? 'Config-light' : 'Config-dark'}>
                        You should be a moderator to configure this extension.
                    </div>
                </div>
            )
        }
    }
}