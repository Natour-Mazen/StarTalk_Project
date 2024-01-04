import React, { useContext, useEffect, useState } from "react";
import Base from "../../components/layout/Base";
import axios from 'axios';
import CitationCard from '../../components/ForPages/Citations/CitationCard';
import {UserContext} from "../../utils/UserAuthContext";
import '../../assets/css/pages/Profile/Profile.css'
import {TabPanel, TabView} from "primereact/tabview";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faBookBookmark, faHeart, faStar} from "@fortawesome/free-solid-svg-icons";
import "../../assets/css/pages/Profile/Profile.css"
import {Fieldset} from "primereact/fieldset";

export default function Profile() {
    const { name, handleDisconnectErrResponse} = useContext(UserContext);
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

                try {
                    const response = await axios.get(url,{
                        withCredentials:true,
                    });
                    if (activeIndex === 0) setCitations(response.data);
                    else if (activeIndex === 1) setLikes(response.data);
                    else setFavorites(response.data);

                    const newVisited = [...visited];
                    newVisited[activeIndex] = true;
                    setVisited(newVisited);

                } catch (error) {
                    // Handle error
                    handleDisconnectErrResponse(error)
                }

            };
            fetchItems();
        }
    }, [activeIndex]);

    const legendTemplate = (
        <div className="flex align-items-center">
            <span className="pi pi-user mr-2"></span>
            <span className="font-bold text-lg">Profile</span>
        </div>
    );
    return (
        <Base>
            <Fieldset legend={legendTemplate} className="userProfile">
                    <p><FontAwesomeIcon icon={faAt} title="Name"/> {name}</p>
                <TabView activeIndex={activeIndex}
                         onTabChange={(e) => setActiveIndex(e.index)}
                >
                    <TabPanel header={<>
                                        <FontAwesomeIcon icon={faBookBookmark} /> My Citations
                                      </>}
                              style={{marginLeft: 'auto'}}
                    >
                        {citations.length > 0 ? citations.map(citation => (
                            <CitationCard key={citation._id} citation={citation}/>
                        )) : (
                            <p className="noneThingPara">No citations yet. Time to get inspired! 🚀</p>
                        )}
                    </TabPanel>
                    <TabPanel header={<>
                                        <FontAwesomeIcon icon={faHeart} /> My Likes
                                      </>}
                    >
                        {likes.length > 0 ? likes.map(like => (
                            <CitationCard key={like._id} citation={like}/>
                        )) : (
                            <p className="noneThingPara">No likes yet. Why not spread some love? 💖</p>
                        )}
                    </TabPanel>
                    <TabPanel header={<>
                                        <FontAwesomeIcon icon={faStar} /> My Favorites
                                      </>}
                              style={{marginRight: 'auto'}}
                    >
                        {favorites.length > 0 ? favorites.map(favorite => (
                            <CitationCard key={favorite._id} citation={favorite}/>
                        )) : (
                            <p className="noneThingPara">No favorites yet. Start exploring and favoriting citations! ⭐</p>
                        )}
                    </TabPanel>
                </TabView>
            </Fieldset>
        </Base>
    );
}
