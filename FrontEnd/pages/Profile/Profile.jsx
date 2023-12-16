import React, { useContext, useEffect, useState } from "react";
import Base from "../../components/layout/Base";
import { Card } from 'primereact/card';
import axios from 'axios';
import CitationCard from '../../components/ForPages/Citations/CitationCard';
import {UserContext} from "../../utils/UserAuthContext";
import {TabMenu} from "primereact/tabmenu";
import '../../assets/css/pages/Profile/Profile.css'
import {TabPanel, TabView} from "primereact/tabview";
import {ScrollPanel} from "primereact/scrollpanel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt} from "@fortawesome/free-solid-svg-icons";

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
            <Card title="User Profile" style={{marginBottom: '2em'}}>
                <p>Name: {name}</p>
            </Card>
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                <TabPanel header={<><i className="fa-regular fa-book-bookmark"/> My Citations </>}
                          style={{marginLeft: 'auto'}}>
                    {citations.map(citation => (
                        <CitationCard key={citation._id} citation={citation}/>
                    ))}
                </TabPanel>
                <TabPanel header={<><i className="pi pi-heart"/> My Likes </>}>
                    {likes.map(like => (
                        <CitationCard key={like._id} citation={like}/>
                    ))}
                </TabPanel>
                <TabPanel header={<><i className="pi pi-star"/> My Favorites </>}
                          style={{marginRight: 'auto'}}>
                    {favorites.length > 0 ? favorites.map(favorite => (
                        <CitationCard key={favorite._id} citation={favorite}/>
                    )) : (
                        <p>No favorites yet. Start exploring and favoriting citations!</p>
                    )}
                </TabPanel>
            </TabView>
        </Base>
    );
}
