import {Button} from "primereact/button";
import axios from 'axios';
import React, {useState} from "react";

export default function FavButton({citation}) {
    const [isFav, setIsFav] = useState(false);

    const handleFav = async () => {
        try {
            const url = `startalk-api/citations/${citation._id}/${isFav ? 'unfav' : 'fav'}`;
            const response = await axios.patch(url);
            setIsFav(!isFav);
        } catch (error) {
            if (error.response && error.response.status === 400) { // that's mean this citation has been already favorited by the user
                setIsFav(true);
            }
        }
    };

    return (
        <Button icon={isFav ? "fa-solid fa-star" : "fa-regular fa-star" } rounded text severity="secondary" title="fav" onClick={handleFav} />
    );
}