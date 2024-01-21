import {Button} from "primereact/button";
import axios from 'axios';
import React, {useContext, useState} from "react";
import {UserContext} from "../../utils/UserAuthContext";

export default function FavButton({citation}) {
    const { id } = useContext(UserContext);
    //const [isFav, setIsFav] = useState(citation.favs.includes(id));
    const [isFav, setIsFav] = useState(citation.favs && citation.favs.some(
        fav => fav.userId && fav.userId === id));

    const handleFav = async () => {
        try {
            const url = `/startalk-api/citations/${citation._id}/${isFav ? 'unfav' : 'fav'}`;
            const response = await axios.patch(url);
            setIsFav(!isFav);
        } catch (error) {
            if (error.response && error.response.status === 400) { // that's mean this citation has been already favorited by the user
                setIsFav(true);
            }
        }
    };

    return (
        <Button
            icon={isFav ? "fa-solid fa-star" : "fa-regular fa-star" }
            rounded
            text
            className="StartalkButtonSpec"
            title="Favorite"
            onClick={handleFav}
        />
    );
}