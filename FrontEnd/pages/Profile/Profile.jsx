import React, { useContext, useEffect, useState } from "react";
import Base from "../../components/layout/Base";
import { Card } from 'primereact/card';
import axios from 'axios';
import CitationCard from '../Citations/CitationCard';
import {UserContext} from "../../utils/UserAuthContext";
import {TabMenu} from "primereact/tabmenu";

export default function Profile() {
    const { name, role} = useContext(UserContext);
    const [citations, setCitations] = useState([]);
    const [likes, setLikes] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const fetchCitations = async () => {
            const response = await axios.get('startalk-api/users/profile/allcitations');
            setCitations(response.data);
        };

        const fetchLikes = async () => {
            const response = await axios.get('startalk-api/users/profile/alllikes');
            setLikes(response.data);
        };

        fetchCitations();
        fetchLikes();
    }, []);

    const items = [
        {label: 'My Citations', icon: 'pi pi-fw pi-calendar'},
        {label: 'My Likes', icon: 'pi pi-fw pi-heart'}
    ];

    return (
        <Base>
            <Card title="User Profile" style={{ marginBottom: '2em' }}>
                <p>Name: {name}</p>
                <p>Role: {role}</p>
            </Card>
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
            {activeIndex === 0 && citations.map(citation => (
                <CitationCard key={citation._id} citation={citation} />
            ))}
            {activeIndex === 1 && likes.map(like => (
                <CitationCard key={like._id} citation={like} />
            ))}
        </Base>
    );
}
