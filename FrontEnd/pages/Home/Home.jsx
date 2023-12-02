import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import Base from "../../components/layout/Base";
import {UserContext} from "../../utils/UserAuthContext";

export default function Home() {


    return (
        <Base>
            <div className="Home">
                <h1>Home</h1>
            </div>
        </Base>
    );
}
