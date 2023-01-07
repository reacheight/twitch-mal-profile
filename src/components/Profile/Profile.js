import React, {useEffect, useState} from "react";

import './Profile.css'
import Anime from "../Anime/Anime";

import {Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";

const Profile = (props) => {
    const [topRatedTitles, setTopRatedTitles] = useState(null)
    const [newFinishedTitles, setNewFinishedTitles] = useState(null)
    const [watchingTitles, setWatchingTitles] = useState(null)
    const [tabIndex, setTabIndex] = useState('1');

    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    useEffect(() => {
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

    if (!topRatedTitles || !newFinishedTitles || !watchingTitles)
        return <p>Loading...</p>

    const tabStyle = {fontSize: '12px', minHeight: '30px', minWidth: '50px', padding: '0px 0px'}
    const panelStyle = {padding: '0', overflowBlock: 'scroll', height: '360px', width: '300px'}

    return (
        <div className={'container'}>
            <div className={'profile'}>
                <a className={'profile-link'} href={'https://myanimelist.net/profile/' + props.name} target={'_blank'}>
                    <span className={'profile-name'}>{props.name}</span>
                </a>
            </div>
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