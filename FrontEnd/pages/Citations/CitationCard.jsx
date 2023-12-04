import { Card } from 'primereact/card';

export default function CitationCard({citation})
{
    console.log(citation);
    return (
        <Card  title={citation.title}>
            <p>{citation.citation}</p>
            <p>{citation.numberLike}</p>
            <p>{citation.creationDate}</p>
            <p>{citation.writerName}</p>
        </Card>
    );
}