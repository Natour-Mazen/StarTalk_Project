import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { Panel } from 'primereact/panel';
import axios from 'axios';
import Base from "../../components/layout/Base";
import {TabPanel, TabView} from "primereact/tabview";
import {faAt, faClock, faMasksTheater} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ScrollPanel} from "primereact/scrollpanel";
import '../../assets/css/pages/Citation/Citation.css'
import { Divider } from 'primereact/divider';
import DateField from "../../components/Utils/DateField";
import {Card} from "primereact/card";
import FavButton from "../../components/Button/FavButton";
import LikeButton from "../../components/Button/LikeButton";
import {UserContext} from "../../utils/UserAuthContext";


export default function Citation({ match }) {
    const { handleDisconnectErrResponse} = useContext(UserContext);
    const { id } = useParams();
    const [citation, setCitation] = useState(null);
    const [humorcitation, setHumor] = useState(null);
    const [likes, setLikes] = useState(null);

    const fetchData = async (url) => {
        try {
            const response = await axios.get(url, { withCredentials: true });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            handleDisconnectErrResponse(error)
        }
    }

    useEffect(() => {
        fetchData(`/startalk-api/citations/${id}`).then(data => {
            setCitation(data);
            setLikes(data.numberLike);
        });
    }, [id]);

    useEffect(() => {
        if(citation){
            fetchData(`/startalk-api/citations/possiblehumor/${citation.humor}`).then(data => setHumor(data));
        }
    }, [citation?.humor]);



    return citation ? (
        <Base>
            <Panel header={<strong><p className="myPanelHeader">{citation.title}  </p></strong>}
                   className="principalPanel">
                <Card className="descCitation" footer={
                    <div className="infoCitaiton">
                        <p></p>
                        <LikeButton citation={citation} likes={likes} setLikes={setLikes}/>
                        <p></p>
                        <FavButton citation={citation}/>
                        <p></p>
                    </div>
                }
                >
                    <p> {citation.description} </p>
                </Card>
                <div className="infoCitaiton">
                    <p><FontAwesomeIcon icon={faAt} title="writerName"/> {citation.writerName} </p>
                    <p><FontAwesomeIcon icon={faMasksTheater} title="Humor"/> {humorcitation?.name} </p>
                    <DateField dateString={citation.creationDate}/>
                </div>
                <TabView>
                    <TabPanel header={<><i className="pi pi-heart"/> Likes <small>( {citation.numberLike} )</small></>}
                              style={{marginLeft: 'auto'}}>
                        <ScrollPanel className='scrollPanelStyle'>
                            {citation.likes.length > 0 ? (
                                <ul className="ulStyleCitation">
                                    {citation.likes.map((like, index) => (
                                        <li key={index}><p><FontAwesomeIcon icon={faAt}/> {like.userName}</p></li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='noneFavsLikePara'>
                                    Looks like this citation is a hidden gem waiting to be discovered. More likes coming
                                    soon ! 😊
                                </p>
                            )}
                        </ScrollPanel>
                    </TabPanel>
                    <TabPanel header={<><i className="pi pi-star"/> Favs <small>( {citation.favs.length} )</small> </>}
                              style={{marginRight: 'auto'}}>
                        <ScrollPanel className='scrollPanelStyle'>
                            {citation.favs.length > 0 ? (
                                <ul className="ulStyleCitation">
                                    {citation.favs.map((fav, index) => (
                                        <li key={index}><p><FontAwesomeIcon icon={faAt}/> {fav.userName}</p></li>
                                    ))}
                                </ul>
                            ) : (
                                <p className='noneFavsLikePara'>
                                    This citation is like a secret treasure. More favorites on the horizon ! 🌅
                                </p>
                            )}
                        </ScrollPanel>
                    </TabPanel>
                </TabView>
            </Panel>
        </Base>
    ) : (
        <Base>
            <div>Loading...</div>
        </Base>
    );
}
