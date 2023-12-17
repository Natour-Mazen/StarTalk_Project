import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAt, faClock} from "@fortawesome/free-solid-svg-icons";
import React, {useContext, useState} from "react";
import {UserContext} from "../../../utils/UserAuthContext";
import '../../../assets/css/components/ForPages/Citaitons/MiniCitationsCard.css'
import LookButton from "../../Button/LookButton";

export default function MiniCitationCard({citation})
{
    const { isAuthenticated } = useContext(UserContext);
    return (
        <Card title={citation.title} className="MyMiniCitationCardCss">
            <Divider/>
            <p >{citation.description}</p>
            <Divider/>
            <div className="MiniInfoCard">
                <p><FontAwesomeIcon icon={faAt} title="writerName" /> {citation.writerName} </p>
                {isAuthenticated && citation.StartalkQuote === undefined ? (
                    <LookButton citation={citation}/>
                ) : (
                    <></>
                )}
            </div>
        </Card>
    );
}
