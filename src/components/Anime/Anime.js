import React from "react";

import './Anime.css'

const Anime = ({ anime }) => {
    return (
        <div className={'anime'}>
            <div className={'picture'}>
                <img alt={anime.title} src={anime.picture} width={90} />
            </div>
            <div className={'description'}>
                <div className={'title'}>{anime.title}</div>
                <div className={'score'}>Score: {anime.score}</div>
            </div>
        </div>
    )
}

export default Anime