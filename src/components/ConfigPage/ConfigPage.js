import React from 'react'
import Authentication from '../../util/Authentication/Authentication'

import './Config.css'

export default class ConfigPage extends React.Component {
    constructor(props) {
        super(props)
        this.Authentication = new Authentication()

        //if the extension is running on twitch or dev rig, set the shorthand here. otherwise, set to null. 
        this.twitch = window.Twitch ? window.Twitch.ext : null
        this.state = {
            finishedLoading: false,
            theme: 'light',
            profileName: '',
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
        // do config page setup as needed here
        if (this.twitch) {
            this.twitch.onAuthorized((auth) => {
                this.Authentication.setToken(auth.token, auth.userId)
                if (!this.state.finishedLoading) {
                    // if the component hasn't finished loading (as in we've not set up after getting a token), let's set it up now.

                    // now we've done the setup for the component, let's set the state to true to force a rerender with the correct data.
                    this.setState(() => {
                        return {finishedLoading: true}
                    })
                }
            })

            this.twitch.onContext((context, delta) => {
                this.contextUpdate(context, delta)
            })
        }
    }

    handleInputChange(event) {
        const target = event.target;
        this.setState({
            profileName: target.value
        });
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
                        <form onSubmit={(e) => this.onSubmit(e)}>
                            <label>
                                Enter your MyAnimeList profile name:
                                <input
                                    type="text"
                                    onChange={(e) => this.handleInputChange(e)}
                                />
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
                        Loading...
                    </div>
                </div>
            )
        }
    }
}