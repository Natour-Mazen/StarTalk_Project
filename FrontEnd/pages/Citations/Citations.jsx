import Base from "../../components/layout/Base";
import CitationCard from "../../components/ForPages/Citations/CitationCard";
import axios from "axios";
import {useEffect, useRef, useState} from "react";


export default function Citations() {
    let [allCitations, setAllCitations] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const loader = useRef(null);

    useEffect(() => {
        var options = {
            root: null,
            rootMargin: "20px",
            threshold: 1.0
        };

        const observer = new IntersectionObserver(handleObserver, options);
        if (loader.current) {
            observer.observe(loader.current)
        }


    }, []);


    useEffect(() => {
        if (totalPages === null || page <= totalPages) {
            getCitations();
        }
    }, [page]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 0.5);
        }
    }

    async function getCitations() {
        try {
            const response = await axios.get(`/startalk-api/citations?page=${page}`);

            if (response.status === 200) {
                const data = response.data.citations;

                // Vérifier si la page actuelle est la première page
                const isFirstPage = page === 1;

                setTotalPages(response.data.totalPages);

                setAllCitations((prev) => {
                    if (isFirstPage) {
                        // Remplacer les anciennes citations par les nouvelles pour la première page car 2 appels
                        return data;
                    } else {
                        // Ajouter les nouvelles citations à la liste existante pour les pages suivantes
                        return [...prev, ...data];
                    }
                });
            }
        } catch (error) {
            // Handle error
        }
    }


    return (
        <Base>
            <div className="Citations">
                {
                    allCitations.map((citation) =>
                        <CitationCard
                            citation={citation}
                        />
                    )
                }
                <div ref={loader} />
            </div>
        </Base>
    );
}
