import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import axios from 'axios';
import Base from "../../components/layout/Base";

export default function Citation({ match }) {
    const { id } = useParams();
    const [citation, setCitation] = useState(null);

    useEffect(() => {
        axios.get(`/startalk-api/citations/${id}`)
            .then(response => {
                setCitation(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [id]);

    return citation ? (
        <Base>
            <div className="Citation">
                <h1>Citation : {id}</h1>
                <Panel header={citation.title}>
                    <p><strong>Description:</strong> {citation.description}</p>
                    <p><strong>Likes:</strong> {citation.numberLike}</p>
                    <p><strong>Creation Date:</strong> {new Date(citation.creationDate).toString()}</p>
                    <p><strong>Writer:</strong> {citation.writerName}</p>
                    <p><strong>Humor ID:</strong> {citation.humor}</p>
                </Panel>
            </div>
        </Base>
    ) : (
        <Base>
        <div>Loading...</div>
        </Base>
    );
}
