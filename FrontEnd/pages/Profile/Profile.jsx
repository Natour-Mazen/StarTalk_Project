import React, { useContext, useEffect, useState } from "react";
import Base from "../../components/layout/Base";
import { Card } from 'primereact/card';
import axios from 'axios';
import CitationCard from '../../components/ForPages/Citations/CitationCard';
import {UserContext} from "../../utils/UserAuthContext";
import {TabMenu} from "primereact/tabmenu";

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

    const items = [
        {label: 'My Citations', icon: 'pi pi-fw pi-calendar'},
        {label: 'My Likes', icon: 'pi pi-fw pi-heart'},
        {label: 'My Favorites', icon: 'pi pi-fw pi-star'}
    ];

    return (
        <Base>
            <Card title="User Profile" style={{ marginBottom: '2em' }}>
                <p>Name: {name}</p>
            </Card>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            {activeIndex === 0 && citations.map(citation => (
                <CitationCard key={citation._id} citation={citation} />
            ))}
            {activeIndex === 1 && likes.map(like => (
                <CitationCard key={like._id} citation={like} />
            ))}
            {activeIndex === 2 && (favorites.length > 0 ? favorites.map(favorite => (
                <CitationCard key={favorite._id} citation={favorite} />
            )) : (
                <p>No favorites yet. Start exploring and favoriting citations!</p>
            ))}
        </Base>
    );
}
