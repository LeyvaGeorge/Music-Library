import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ArtistView() {
    const { id } = useParams()
    const [artistData, setArtistData] = useState([])

    useEffect(() => {
        let fetchData = async () => {
            const response = await fetch(`https://itunes.apple.com/artist/${id}`);
            const resData = await response.json();
            setArtistData(resData);
            debugger;
        }
        fetchData();
    },[id])
    

    return(
        <div>
            <h2>The ID Passed was: { id }</h2>
            <p>ArtistData goes here</p>
        </div>
    )
}