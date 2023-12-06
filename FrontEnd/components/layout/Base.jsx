import Menu from "./Menu";
import Main from "./Main";
import RightSideBar from "./RightSideBar";

import { Divider } from 'primereact/divider';

import '../../assets/css/components/layout/Base.css';
import {useContext, useEffect} from "react";
import {UserContext} from "../../utils/UserAuthContext";

export default function Base({ children })
{
    const { fetchUserAfterLoginData} = useContext(UserContext);

    useEffect(() => {
            fetchUserAfterLoginData();
    }, []);

    return (
        <div className="Base">
            <Menu/>
            <Divider layout="vertical" className="separator"/>
            <Main>
                {children}
            </Main>
            <Divider layout="vertical" className="separator"/>
            <RightSideBar/>
        </div>
    );
}