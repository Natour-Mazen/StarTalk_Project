import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import React, {useContext, useState} from "react";
import {UserContext} from "../../utils/UserAuthContext";

export default function UpdateButton({ citation }) {
    const { id } = useContext(UserContext);
    const [showButton, setShowButton] = useState(citation.writerId === id);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/update-citation/${citation._id}`);
    };

    return (
        <>
            {showButton && (
                <Button
                    icon="pi pi-pencil"
                    rounded
                    text
                    className="StartalkButtonSpec"
                    title="Update details"
                    onClick={handleClick}
                />
            )}
        </>
    );
}
