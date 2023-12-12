import {Button} from "primereact/button";
import axios from 'axios';
import React, {useContext, useState} from "react";
import {UserContext} from "../../utils/UserAuthContext";

export default function LikeButton({citation, likes, setLikes}) {
    const { id } = useContext(UserContext);
    const [isLiked, setIsLiked] = useState(citation.likes.includes(id));

    const handleLike = async () => {
        try {
            const url = `startalk-api/citations/${citation._id}/${isLiked ? 'unlike' : 'like'}`;
            const response = await axios.patch(url);
            setLikes(response.data.likes.length);
            setIsLiked(!isLiked);
        } catch (error) {
            if (error.response && error.response.status === 400) { // that's mean this citation has been already liked by the user
                setIsLiked(true);
            }
        }
    };

    return (
        <Button
            label={likes}
            icon={isLiked ? "fa-solid fa-heart" : "pi pi-heart" }
            rounded
            text
            className="StartalkButtonSpec"
            title="like"
            onClick={handleLike}
        />
    );
}