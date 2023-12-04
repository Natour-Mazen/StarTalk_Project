import Base from "../../components/layout/Base";
import CitationCard from "./CitationCard";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Citations()
{
    const [allCitations, setAllCitations] = useState([]);

    useEffect(() =>
    {
        async function getCitations()
        {
            try {
                const response = await axios.get('startalk-api/citations', {
                    withCredentials: true,
                });

                if (response.status === 200) {
                    //console.log(response.data.citations);
                    const data = response.data.citations;
                    setAllCitations(data);
                }
            } catch (error) {
                // Handle error
            }
        }
        getCitations();
        return () => setAllCitations([]);
    }, []);

    return (
        <Base>
            <div className="Citations">

                <h1>Citations</h1>
                {
                    allCitations.map( (citation, index) =>
                        <CitationCard
                            key={index}
                            citation={citation}
                        />
                    )
                }

            </div>
        </Base>
    );
}