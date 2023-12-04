import Menu from "./Menu";
import Main from "./Main";
import RightSideBar from "./RightSideBar";

import { Divider } from 'primereact/divider';

import '../../assets/css/components/layout/Base.css';
import {useContext, useEffect} from "react";
import {UserContext} from "../../utils/UserAuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";



export default function Base({ children })
{
    const { setIsAuthenticated, setRole, setName} = useContext(UserContext);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get( 'startalk-api/users/@me', {
                    withCredentials: true
                });

                // If the request is successful and user data is returned
                if (response.data !== null) {
                    setIsAuthenticated(true);
                    setRole(response.data.roles);
                    setName(response.data.name);
                }
            } catch (error) {
            }
        };


        fetchData();

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