import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function LookButton({ citation }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/citation/${citation._id}`);
    };

    return (
        <Button
            icon="fa-regular fa-eye"
            rounded
            text
            className="StartalkButtonSpec"
            title="See details"
            onClick={handleClick}
        />
    );
}
