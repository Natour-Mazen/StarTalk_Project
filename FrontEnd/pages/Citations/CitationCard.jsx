import { Card } from 'primereact/card';
import '../../assets/css/pages/Citations/CitationsCard.css';
import { Divider } from 'primereact/divider';
import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRightToBracket, faAt, faClock} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";
import {UserContext} from "../../utils/UserAuthContext";
import axios from 'axios';

export default function CitationCard({citation})
{
    const { isAuthenticated } = useContext(UserContext);
    const [likes, setLikes] = useState(citation.numberLike);
    const [isLiked, setIsLiked] = useState(false);

    // Fonction pour formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0 en JS
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const formattedDate = formatDate(citation.creationDate);

    const handleLike = async () => {
        try {
            const response = await axios.post(`/api/citations/${citation._id}/like`);
            setLikes(response.data.numberLike);
            setIsLiked(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card title={citation.title} className="MyCitationCardCss">
            <Divider/>
            <p>{citation.description}</p>
            <Divider/>
            {isAuthenticated ? (
                <div className="infoCard">
                    <p><FontAwesomeIcon icon={faAt} /> {citation.writerName} </p>
                    <Button icon="fa-regular fa-eye" rounded text severity="secondary" title="See details"  />
                    <Button label={likes} icon={isLiked ? "fa-solid fa-heart" : "pi pi-heart" } rounded text severity="secondary" title="like" onClick={handleLike} />
                    <Button icon="fa-regular fa-star" rounded text severity="secondary" title="fav" />
                    <p><FontAwesomeIcon icon={faClock} /> {formattedDate}</p>
                </div>
            ) : (
                <></>
            )}

        </Card>
    );
}
