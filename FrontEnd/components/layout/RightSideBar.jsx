import '../../assets/css/components/layout/RightSideBar.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";
import {useContext, useEffect, useState} from "react";
import {ScrollPanel} from "primereact/scrollpanel";
import axios from "axios";
import {UserContext} from "../../utils/UserAuthContext";

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
        } else if (quotes.length === 0) { // Ajoutez cette condition
            axios.get(`/startalk-api/citations/random`, {
                withCredentials: true
            })
                .then(response => {
                    setQuotes(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [search, filter, quotes]); // Ajoutez quotes comme dépendance

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
                    <>
                        Inspiration
                    </>
                )
            }

            <div className="mt-3"/>

            <ScrollPanel style={{height: '800px'}}>
                {quotes.map((quote, index) => (
                    <>
                        <Card key={index} title={quote.title} subTitle={quote.writerName}>
                            <p>{quote.text}</p>
                        </Card>
                        <div className="mb-2"></div>

                    </>
                ))}
            </ScrollPanel>


        </div>
    );
}