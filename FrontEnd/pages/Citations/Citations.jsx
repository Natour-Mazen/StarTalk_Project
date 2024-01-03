import Base from "../../components/layout/Base";
import CitationCard from "../../components/ForPages/Citations/CitationCard";
import axios from "axios";
import {useEffect, useRef, useState} from "react";
import { ProgressSpinner } from 'primereact/progressspinner';
import Steve from '../../assets/images/SteveMC.png';
import '../../assets/css/pages/Citations/Citations.css'
import InfiniteScroll from "react-infinite-scroll-component";


export default function Citations() {
    const [allCitations, setAllCitations] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);
    const [hasMore, setHasMore] = useState(true);

    async function fetchMoreData()
    {
        if(totalPages === null || page <= totalPages) {
            const response = await axios.get(`/startalk-api/citations?page=${page}`)
                .then(data => data.data)
                .then(data => {
                    setTotalPages(data.totalPages);
                    const citations = data.citations;

                    setAllCitations((prev) => {
                        if(page === 1){
                            setPage(2);
                            return citations;
                        }
                        else{
                            setPage((old) => old + 1);
                            return [...prev, ...citations];
                        }

                    });
                });
        }
        else{
            setHasMore(false);
        }
    }

    useEffect( () => {
        fetchMoreData();
    }, []);

    /*
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
        if (page <= totalPages) {
            getCitations();
        }
    }, [page]);

    useEffect(() => {
        if (page === totalPages) {
            setReachedEnd(true);
        }
    }, [page, totalPages]);

    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting) {
            setPage((prev) => prev + 1);
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
    }*/

    return (
        <Base>
            <div className="Citations">
                <InfiniteScroll
                    dataLength={allCitations.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    scrollThreshold={0.5}
                    pullDownToRefreshThreshold={0}
                    scrollableTarget={"Main"}
                    loader={
                        <div className="ProgressSpinner">
                            <ProgressSpinner
                                pt={{
                                    spinner: {style: {animationDuration: '0.8s'}},
                                    circle: {style: {stroke: '#5a67f6', strokeWidth: 4, animation: '-moz-initial'}}
                            }}
                            />
                        </div>
                    }
                    endMessage={
                        <div className="end-of-content">
                            <img src={Steve} alt="Steve" className="steve-image"
                            title="Credit to DALLE.E-3 for generating the initial photo and Mazen for correcting some small errors in the image"/>
                        </div>

                    }
                >
                    {
                        allCitations.map((cit, key) =>
                            <CitationCard
                                citation={cit} key={key}
                            />
                        )
                    }
                </InfiniteScroll>
            </div>
        </Base>
    );
}
