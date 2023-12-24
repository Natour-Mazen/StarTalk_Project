import Base from "../../components/layout/Base";
import CitationCard from "../../components/ForPages/Citations/CitationCard";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import { ProgressSpinner } from 'primereact/progressspinner';



export default function Citations() {
    let [allCitations, setAllCitations] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(null);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);

        try {
            const response = await axios.get(`/startalk-api/citations?page=${page}`);

            if (response.status === 200) {
                const data = response.data.citations;

                // Vérifier si la page actuelle est la première page
                const isFirstPage = page === 0;

                setTotalPages(response.data.totalPages);

                setAllCitations((prev) => {
                    if (isFirstPage) {
                        // On remplace les anciennes citations par les nouvelles pour la première page car 2 appels
                        return data;
                    } else {
                        // On ajoute les nouvelles citations à la liste existante pour les pages suivantes
                        return [...prev, ...data];
                    }
                });
            }
        } catch (error) {
            // Handle error
        }
        await new Promise(resolve => setTimeout(resolve, 800)); // on met un sleep histoire de voir le spinner
        setLoading(false);
    }

    return (
        <Base>
            <div className="Citations">
                {
                    allCitations.map((citation, key) =>
                        <CitationCard
                            citation={citation} key={key}
                        />
                    )
                }
                <div ref={loader}/>
                {loading &&
                    <ProgressSpinner style={{
                        width: '50px',
                        height: '50px',
                        top: '50%',
                        left: '45%',
                    }}
                     pt={{
                         spinner: {style: {animationDuration: '0.8s'}},
                         circle: {style: {stroke: '#5a67f6', strokeWidth: 4, animation: '-moz-initial'}}
                     }}
                    />
                }
            </div>
        </Base>
    );
}
