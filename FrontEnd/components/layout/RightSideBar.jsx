import '../../assets/css/components/layout/RightSideBar.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";
import React, {useContext, useEffect, useState} from "react";
import {ScrollPanel} from "primereact/scrollpanel";
import axios from "axios";
import {UserContext} from "../../utils/UserAuthContext";
import MiniCitationCard from "../ForPages/Citations/MiniCitationCard";
import {Steps} from "primereact/steps";
import {Fieldset} from "primereact/fieldset";
import {Divider} from "primereact/divider";

export default function RightSideBar()
{
    const { isAuthenticated} = useContext(UserContext);

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [quotes, setQuotes] = useState([]);

    const filters = [
        {label: 'Title', value: 'title'},
        {label: 'Author', value: 'author'},
    ];

    useEffect(() => {
        if (search.length > 0 && filter) {
            axios.get(`/startalk-api/citations/search?filter=${filter}&value=${search}`,{
                withCredentials: true
            })
                .then(response => {
                    setQuotes(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        } else if (quotes.length === 0) {
            const promises = Array.from({length: 3}, () => fetch('https://api.quotable.io/random'));
            Promise.all(promises)
                .then(responses => Promise.all(responses.map(response => response.clone().json())))
                .then(quotes => {
                    const formattedQuotes = quotes.map(quote => {
                        const randomIndex = Math.floor(Math.random() * quote.tags.length);
                        return {
                            title: quote.tags[randomIndex] || 'Unknown 🙄',
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
                                       onChange={(e) => setSearch(e.target.value)}/>
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
                    isAuthenticated ? 'Research' : 'Inspiration'
                }</p>
            </Divider>

            <ScrollPanel style={{height: '700px'}}>
                {quotes.map((quote, index) => (
                    <>
                        <MiniCitationCard key={index} citation={quote}/>
                    </>
                ))}
            </ScrollPanel>

        </div>
    );
}