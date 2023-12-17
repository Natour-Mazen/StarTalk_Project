import Menu from "./Menu";
import Main from "./Main";
import RightSideBar from "./RightSideBar";

import { Divider } from 'primereact/divider';

import '../../assets/css/components/layout/Base.css';
import React, {useContext, useEffect} from "react";
import {UserContext} from "../../utils/UserAuthContext";
import ScrollToTopButton from "../Button/ScrollToTopButton";
import {useLocation} from "react-router-dom";

export default function Base({ children })
{
    const location = useLocation();
    //We don't show the right part when we are in the admin users panel
    const isAdminRoute = location.pathname === '/admin/userspanel';

    return (
        <div className="Base">
            <Menu/>
            <Divider layout="vertical" className="separator"/>
            <Main>
                {children}
            </Main>
            <ScrollToTopButton />
            {!isAdminRoute ?  (
                <>
                    <Divider layout="vertical" className="separator"/>
                    <RightSideBar/>
                </>
            ) : (
                <></>
                )
            }
        </div>
    );
}