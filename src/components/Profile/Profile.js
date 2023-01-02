import React, {useEffect, useState} from "react";

import './Profile.css'
import Anime from "../Anime/Anime";

const Profile = (props) => {
    const [topRatedTitles, setTopRatedTitles] = useState(null)

    useEffect(() => {
        fetch(`https://reacheight.pythonanywhere.com/${props.name}/anime/top`)
            .then(response => response.json())
            .then(json => setTopRatedTitles(json))
    }, [])

    if (!topRatedTitles)
        return <p>Loading...</p>

    return (
        <div className={'container'}>
            <a className={'link'} href={'https://myanimelist.net/profile/' + props.name} target={'_blank'}><span className={'profile-name'}>{props.name}</span></a>
            <div>
                <ul className={'anime-list'}>{topRatedTitles.map(anime => <li key={anime.title}><Anime anime={anime} /></li>)}</ul>
            </div>
        </div>
    )
}

export default Profile