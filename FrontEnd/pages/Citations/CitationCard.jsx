import { Card } from 'primereact/card';
import '../../assets/css/pages/Citations/CitationsCard.css';
import { Divider } from 'primereact/divider';
import {Button} from "primereact/button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faClock} from "@fortawesome/free-solid-svg-icons";

export default function CitationCard({citation})
{
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
            <div className="infoCard">
                <p><FontAwesomeIcon icon={faAt} /> {citation.writerName} </p>
                <Button label={citation.numberLike} icon="pi pi-heart" rounded text severity="secondary"  />
                <Button icon="fa-regular fa-star" rounded text severity="secondary"  />
                <p><FontAwesomeIcon icon={faClock} /> {formattedDate}</p>
            </div>
        </Card>
    );
}