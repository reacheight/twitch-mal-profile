import React from "react";

import './Anime.css'

const Anime = ({ anime }) => {
    const animeUrl = `https://myanimelist.net/anime/${anime.id}`

    return (
        <div className={'anime'}>
            <div className={'picture'}>
                <a href={animeUrl} target={"_blank"}><img alt={anime.title} src={anime.picture} width={90} /></a>
            </div>
            <div className={'description'}>
                <div className={'title'}>{anime.title}</div>
                <div className={'score'}>Score: {anime.score}</div>
            </div>
        </div>
    )
}

export default Anime