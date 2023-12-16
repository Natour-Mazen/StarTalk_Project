import React, { useContext, useEffect, useState } from "react";
import Base from "../../components/layout/Base";
import { Card } from 'primereact/card';
import axios from 'axios';
import CitationCard from '../../components/ForPages/Citations/CitationCard';
import {UserContext} from "../../utils/UserAuthContext";
import '../../assets/css/pages/Profile/Profile.css'
import {TabPanel, TabView} from "primereact/tabview";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBookBookmark, faHeart, faStar} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/pages/Profile/Profile.css"
import ScrollToTop from "../../components/Button/ScrollToTopButton";

export default function Profile() {
    const { name, role} = useContext(UserContext);
    const [citations, setCitations] = useState([]);
    const [likes, setLikes] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [visited, setVisited] = useState([false, false, false]);

    useEffect(() => {
        if (!visited[activeIndex]) {
            const fetchItems = async () => {
                let url;
                if (activeIndex === 0) url = '/startalk-api/users/profile/allcitations';
                else if (activeIndex === 1) url = '/startalk-api/users/profile/alllikes';
                else url = '/startalk-api/users/profile/allfavorites';

                const response = await axios.get(url);
                if (activeIndex === 0) setCitations(response.data);
                else if (activeIndex === 1) setLikes(response.data);
                else setFavorites(response.data);

                const newVisited = [...visited];
                newVisited[activeIndex] = true;
                setVisited(newVisited);
            };
            fetchItems();
        }
    }, [activeIndex]);


    return (
        <Base>

            <Card title={<p>User Profile</p>} className="userProfile">
                    <p>Name: {name}</p>
                <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel header={<>
                                        <FontAwesomeIcon icon={faBookBookmark} /> My Citations
                                      </>}
                              style={{marginLeft: 'auto'}}
                    >
                        {citations.map(citation => (
                            <CitationCard key={citation._id} citation={citation}/>
                        ))}
                    </TabPanel>
                    <TabPanel header={<>
                                        <FontAwesomeIcon icon={faHeart} /> My Likes
                                      </>}
                    >
                        {likes.map(like => (
                            <CitationCard key={like._id} citation={like}/>
                        ))}
                    </TabPanel>
                    <TabPanel header={<>
                                        <FontAwesomeIcon icon={faStar} /> My Favorites
                                      </>}
                              style={{marginRight: 'auto'}}>
                        {favorites.length > 0 ? favorites.map(favorite => (
                            <CitationCard key={favorite._id} citation={favorite}/>
                        )) : (
                            <p>No favorites yet. Start exploring and favoriting citations!</p>
                        )}
                    </TabPanel>
                </TabView>
            </Card>

        </Base>
    );
}
