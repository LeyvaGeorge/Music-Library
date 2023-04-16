import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

export default function AlbumView() {
    const { id } = useParams();
    const [albumData,setAlbumData] = useState([])

    return (
        <div>
            <h2>the ID for the Album is { id } </h2>
            <p>Album Data Goes Here !</p>
        </div>
    )


}

