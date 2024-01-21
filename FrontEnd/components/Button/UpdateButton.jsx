import { Button } from "primereact/button";
import React, {useContext, useState} from "react";
import {UserContext} from "../../utils/UserAuthContext";
import UpdateCitationModal from "../ForPages/UpdateCitations/UpdateCitationModal";

export default function UpdateButton({ citation }) {
    const { id } = useContext(UserContext);
    const [showButton, setShowButton] = useState(citation.writerId === id);
    const [visible, setVisible] = useState(false);

    const handleClick = () => {
        setVisible(true);
    };

    return (
        <>
            {showButton && (
                <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    className="StartalkButtonSpec"
                    title="Update"
                    onClick={handleClick}
                />
            )}
            <UpdateCitationModal visible={visible} setVisible={setVisible} citation={citation}/>
        </>
    );
}
