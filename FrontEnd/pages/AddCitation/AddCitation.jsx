import Base from "../../components/layout/Base";
import {useContext, useRef} from "react";

import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from "axios";
import { UserContext } from '../../utils/UserAuthContext';
import { redirect } from "react-router-dom";

export default function AddCitation()
{
    const inputTitre = useRef(null);
    const inputDescription = useRef(null);
    const { name } = useContext(UserContext);

    async function handleSubmit(event) {
        event.preventDefault();
        const titre = inputTitre.current.value;
        const description = inputDescription.current.value;

        if(titre !== '' && description !== '')
        {
            try {
                const response = await axios.post('startalk-api/citations', {
                    title: titre,
                    description: description,
                });

                if (response.status === 200) {
                    redirect("/");
                }
            } catch (error) {
                // Handle error
                console.log("error handleSubmit citations");
            }
        }
        console.log("handleSubmit");
    }

    return (
        <Base>
            <div className="AddCitation">

                <h1>Citation add panel</h1>

                <form className='form' onSubmit={handleSubmit}>

                    <InputText name="titre" placeholder='Titre' size="25" ref={inputTitre}/>

                    <InputTextarea name="description" placeholder='Description' rows="5" cols="25" ref={inputDescription}/>

                    <input type='submit' value='Créer'/>
                </form>

            </div>
        </Base>
    );
}
