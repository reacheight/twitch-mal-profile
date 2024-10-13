import React, {useEffect, useState} from "react";

import './Profile.css'
import Anime from "../Anime/Anime";

import {Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";

const Profile = (props) => {
    const [topRatedTitles, setTopRatedTitles] = useState(null)
    const [newFinishedTitles, setNewFinishedTitles] = useState(null)
    const [watchingTitles, setWatchingTitles] = useState(null)
    const [userProfile, setUserProfile] = useState(null)
    const [tabIndex, setTabIndex] = useState('1');

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    useEffect(() => {
        // Fetch user profile information
        fetch(`${process.env.MAL_PROXY_HOST}/${props.name}`)
            .then(response => response.json())
            .then(json => setUserProfile(json))

        fetch(`${process.env.MAL_PROXY_HOST}/${props.name}/anime/top?limit=5`)
            .then(response => response.json())
            .then(json => setTopRatedTitles(json))

        fetch(`${process.env.MAL_PROXY_HOST}/${props.name}/anime/recently-finished?limit=5`)
            .then(response => response.json())
            .then(json => setNewFinishedTitles(json))

        fetch(`${process.env.MAL_PROXY_HOST}/${props.name}/anime/watching?limit=5`)
            .then(response => response.json())
            .then(json => setWatchingTitles(json))
    }, [])

    if (!topRatedTitles || !newFinishedTitles || !watchingTitles || !userProfile)
        return <p>Loading...</p>

    const tabStyle = {fontSize: '12px', minHeight: '30px', minWidth: '50px', padding: '0px 0px'}
    const panelStyle = {padding: '0', height: '410px', width: '300px', scrollbarWidth: 'thin'}

    return (
        <div className={'container'}>
            {userProfile && (
                <div className={'user-info'}>
                    <img src={userProfile.pic} alt={`${props.name}'s profile picture`} className={'user-avatar'} />
                    <div className={'user-details'}>
                        <a className={'profile-link'} href={'https://myanimelist.net/profile/' + props.name} target={'_blank'}>
                            <span className={'profile-name'}>{props.name}</span>
                        </a>
                        <p className={'joined-date'}><span className={'joined-word'}>joined</span> <span className={'date'}>{userProfile.joined}</span></p>
                    </div>
                </div>
            )}
            <div className={'tabs'}>
                <TabContext value={tabIndex}>
                    <TabList sx={{minHeight: '30px', padding: '0'}} variant="fullWidth" onChange={handleChange}>
                        <Tab sx={tabStyle} label="Top rated" value="1" />
                        <Tab sx={tabStyle} label="New finished" value="2" />
                        <Tab sx={tabStyle} label="Watching" value="3" />
                    </TabList>
                    <TabPanel sx={panelStyle} value="1">
                        <ul className={'anime-list'}>{topRatedTitles.map(anime => <li key={anime.title}><Anime anime={anime} showEpisodes={false} /></li>)}</ul>
                    </TabPanel>
                    <TabPanel sx={panelStyle} value="2">
                        <ul className={'anime-list'}>{newFinishedTitles.map(anime => <li key={anime.title}><Anime anime={anime} showEpisodes={false} /></li>)}</ul>
                    </TabPanel>
                    <TabPanel sx={panelStyle} value="3">
                        <ul className={'anime-list'}>{watchingTitles.map(anime => <li key={anime.title}><Anime anime={anime} showScore={false} /></li>)}</ul>
                    </TabPanel>
                </TabContext>
            </div>
        </div>
    )
}

export default Profile
