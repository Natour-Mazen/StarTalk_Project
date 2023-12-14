import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import axios from 'axios';
import Base from "../../components/layout/Base";

export default function Citation({ match }) {
    const { id } = useParams();
    const [citation, setCitation] = useState(null);
    const [humorcitatio, setHumor] = useState(null);

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url, { withCredentials: true });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    useEffect(() => {
        fetchData(`/startalk-api/citations/${id}`).then(data => setCitation(data));
    }, [id]);

    useEffect(() => {
        if(citation){
            fetchData(`/startalk-api/citations/possiblehumor/${citation.humor}`).then(data => setHumor(data));
        }
    }, [citation?.humor]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Les mois commencent à 0 en JS
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    const formattedDate = formatDate(citation?.creationDate);

    return citation ? (
        <Base>
            <div className="Citation">
                <h1>Citation : {id}</h1>
                <Panel header={citation.title}>
                    <p><strong>Description:</strong> {citation.description}</p>
                    <p><strong>Likes:</strong> {citation.numberLike}</p>
                    <p><strong>Creation Date:</strong> {formattedDate}</p>
                    <p><strong>Writer:</strong> {citation.writerName}</p>
                    <p><strong>Humor:</strong> {humorcitatio?.name}</p>
                </Panel>
            </div>
        </Base>
    ) : (
        <Base>
            <div>Loading...</div>
        </Base>
    );
}
