import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faClock} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";
import {UserContext} from "../../../utils/UserAuthContext";
import LikeButton from '../../Button/LikeButton';
import FavButton from '../../Button/FavButton';
import '../../../assets/css/components/ForPages/Citaitons/CitationsCard.css'
import {useNavigate} from "react-router-dom";
import LookButton from "../../Button/LookButton";

export default function CitationCard({citation})
{
    const { isAuthenticated } = useContext(UserContext);
    const [likes, setLikes] = useState(citation.numberLike);

    const navigate = useNavigate();
    const handleClick = () =>
    {
        navigate(`/citation/${citation._id}`);
    };

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

    return (
        <Card title={citation.title} className="MyCitationCardCss">
            <Divider/>
            <p>{citation.description}</p>
            <Divider/>
            {isAuthenticated ? (
                <div className="infoCard">
                    <p><FontAwesomeIcon icon={faAt} /> {citation.writerName} </p>
                    <LookButton citation={citation}/>
                    <LikeButton citation={citation} likes={likes} setLikes={setLikes} />
                    <FavButton citation={citation} />
                    <p><FontAwesomeIcon icon={faClock} /> {formattedDate}</p>
                </div>
            ) : (
                <></>
            )}

        </Card>
    );
}
