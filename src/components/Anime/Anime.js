import React from "react";

import './Anime.css'

const Anime = ({ anime, showScore = true, showEpisodes = true }) => {
    const animeUrl = `https://myanimelist.net/anime/${anime.id}`
    const startYear = anime.start_date ? anime.start_date.substring(0, 4) : null

    return (
        <div className={'anime'}>
            <div className={'picture'}>
                <a href={animeUrl} target={"_blank"}><img alt={anime.title} src={anime.picture} width={90} /></a>
            </div>
            <div className={'description'}>
                <div className={'title'}>{anime.title}</div>
                <div className={'anime-details'}>
                    {startYear && <div className={'start-date'}>{startYear}</div>}
                    {anime.genres && <div className={'genres'}>{anime.genres.map(g => g.name).join(', ')}</div>}
                </div>
                <div className={'list-status-container'}>
                    {showEpisodes && <div className={'list-status'}>Episodes watched: {anime.episodes_watched}</div>}
                    {showScore && <div className={'list-status'}>Score: {anime.score}</div>}
                </div>
            </div>
        </div>
    )
}

export default Anime
