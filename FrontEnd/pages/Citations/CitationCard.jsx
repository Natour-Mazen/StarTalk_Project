import { Card } from 'primereact/card';

export default function CitationCard({citation})
{
    return (
        <Card  title={citation.title}>
            <p>{citation.description}</p>
            <p>Like : {citation.numberLike}</p>
            <p>Date de création : {citation.creationDate}</p>
            <p>Auteur : {citation.writerName}</p>
        </Card>
    );
}