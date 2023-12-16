import '../../assets/css/components/layout/RightSideBar.css';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import {Dropdown} from "primereact/dropdown";
import {useEffect, useState} from "react";
import {ScrollPanel} from "primereact/scrollpanel";
import axios from "axios";

export default function RightSideBar()
{
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState(null);
    const [quotes, setQuotes] = useState([]);

    const filters = [
        {label: 'Title', value: 'title'},
        {label: 'Author', value: 'author'},
    ];

    useEffect(() => {
        if (search.length > 0 && filter) {
            axios.get(`/startalk-api/citations/search?filter=${filter}&value=${search}`)
                .then(response => {
                    setQuotes(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [search, filter]);
    return (
        <div className="three-dimensions-rightside">

            <div className="p-inputgroup flex-1">
                <InputText placeholder="Search a Citation" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <Dropdown value={filter} options={filters} onChange={(e) => setFilter(e.value)}
                          placeholder="Select a Filter"/>
            </div>

            <div className="mt-3"/>

            <ScrollPanel style={{height: '800px' }}>
                {quotes.map((quote, index) => (
                    <>
                        <Card key={index} title={quote.title} subTitle={quote.writerName}>
                            <p>{quote.text}</p>
                        </Card>
                        <div className="mb-2"></div>

                    </>
                ))}
            </ScrollPanel>

            <div className="mb-3"></div>

            {
                /* si on enleve le card suivant ça casse tout aussi jsp pk */
            }
            <Card title="Title2" subTitle="Subtitle" >
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandaeLorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae
                    numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                </p>
            </Card>

            <div className="mb-2"></div>

        </div>
    );
}