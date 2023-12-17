import Menu from "./Menu";
import Main from "./Main";
import RightSideBar from "./RightSideBar";

import { Divider } from 'primereact/divider';

import '../../assets/css/components/layout/Base.css';
import React, {useContext, useEffect} from "react";
import {UserContext} from "../../utils/UserAuthContext";
import ScrollToTopButton from "../Button/ScrollToTopButton";

export default function Base({ children })
{
    const { isAuthenticated, role, fetchUserAfterLoginData} = useContext(UserContext);
    return (
        <div className="Base">
            <Menu/>
            <Divider layout="vertical" className="separator"/>
            <Main>
                {children}
            </Main>
            <ScrollToTopButton />
            <Divider layout="vertical" className="separator"/>
            <RightSideBar/>
        </div>
    );
}