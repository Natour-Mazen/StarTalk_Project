import '../../assets/css/components/layout/RightSideBar.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";
import React, {useContext, useEffect, useRef, useState} from "react";
import {ScrollPanel} from "primereact/scrollpanel";
import axios from "axios";
import {UserContext} from "../../utils/UserAuthContext";
import MiniCitationCard from "../ForPages/Citations/MiniCitationCard";
import {Divider} from "primereact/divider";

export default function RightSideBar()
{
    const { isAuthenticated , handleDisconnectErrResponse} = useContext(UserContext);

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('title');
    const [quotes, setQuotes] = useState([]);
    const [lastSearch, setLastSearch] = useState('');

    const filters = [
        {label: 'Title', value: 'title'},
        {label: 'Author', value: 'author'},
    ];


    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        setIsTyping(true);
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 1000); // reset isTyping state after 1 second of inactivity
    };

    useEffect(() => {
        if (search !== lastSearch && filter) {
            setLastSearch(search);
            axios.get(`/startalk-api/citations/search?filter=${filter}&value=${search}`,{
                withCredentials: true
            })
                .then(response => {
                    setQuotes(response.data);
                })
                .catch(error => {
                    handleDisconnectErrResponse(error);
                });
        } else if (quotes.length === 0) {
            //  If there are no quotes available, this part of the code makes the website feel more "natural" by fetching
            // random citations from an API when the user does not perform a search.
            // This API is free and open-source. You can find it here: https://github.com/lukePeavey/quotable
            const promises = Array.from({length: 3}, () => fetch('https://api.quotable.io/random'));
            Promise.all(promises)
                .then(responses => Promise.all(responses.map(response => response.clone().json())))
                .then(quotes => {
                    const formattedQuotes = quotes.map(quote => {
                        const randomIndex = Math.floor(Math.random() * quote.tags.length);
                        return {
                            title: quote.tags[randomIndex] || 'inspirational citation',
                            description: quote.content,
                            writerName: quote.author,
                            StartalkQuote:false,
                        };
                    });
                    setQuotes(formattedQuotes);
                });
        }
    }, [search, filter, quotes]);


    return (
        <div className="three-dimensions-rightside">
            {
                isAuthenticated ? (
                    <>
                        <div className="p-inputgroup flex-1">
                            <InputText placeholder="Search a Citation" value={search}
                                       onChange={handleSearchChange}/>
                            <Dropdown value={filter} options={filters} onChange={(e) => setFilter(e.value)}
                                      placeholder="Select a Filter"/>
                        </div>
                    </>
                ) : (
                    <></>
                )
            }
            <Divider align="center" className="DeviderSearchTitle" >
                <p>{
                    isAuthenticated ? (isTyping ? 'Research' : 'Inspiration') : 'Inspiration'
                }</p>
            </Divider>

            <ScrollPanel style={{height: '1100px'}}>
                {quotes.map((quote, key) => (
                    <MiniCitationCard citation={quote} key={key}/>
                ))}
            </ScrollPanel>

        </div>
    );
}