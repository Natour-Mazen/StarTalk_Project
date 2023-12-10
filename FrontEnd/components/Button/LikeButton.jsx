import {Button} from "primereact/button";
import axios from 'axios';
import React, {useState} from "react";

export default function LikeButton({citation, likes, setLikes}) {
    const [isLiked, setIsLiked] = useState(false);

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
        <Button label={likes} icon={isLiked ? "fa-solid fa-heart" : "pi pi-heart" } rounded text severity="secondary" title="like" onClick={handleLike} />
    );
}