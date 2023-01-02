import React, {useEffect, useState} from "react";

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
        <div>
            <p>MyAnimeListProfile is: {props.name}</p>
            <p>Top rated anime is {topRatedTitles[0].title}</p>
        </div>
    )
}

export default Profile