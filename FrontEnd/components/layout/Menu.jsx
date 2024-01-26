// CSS
import '../../assets/css/components/layout/Menu.css';

// Imports
import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuP } from 'primereact/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { UserContext } from '../../utils/UserAuthContext';
import logoLM from '../../assets/images/logoUpScaleLightMode.png'
import ButtonMenu from "../Button/ButtonMenu";
import ThemeToggleButton  from "../Button/ToggleThemeButton"
import {Toolbar} from "primereact/toolbar";
import {Button} from "primereact/button";
import AddCitationModal from "../ForPages/AddCitations/AddCitationModal"

export default function Menu(initialValue, key) {
    const navigate = useNavigate();
    const { isAuthenticated, role, login, logout } = useContext(UserContext);
    const [isDiscordButtonClicked, setDiscordButtonClicked] = useState(false);

    function changePage(to) {
        navigate(to);
    }

    function createMenuItem(label, icon, command, subItems) {
        return {
            label: <span className="labaelsIconMenu" style={{ marginLeft : '5px'}}>{label}</span>,
            icon: <i className={`${icon} labaelsIconMenu`} />,
            command: () => changePage(command),
            items: subItems || [],
        };
    }


    function createRoleBasedMenuItems(role) {
        let userMenu = [
            createMenuItem('Profile', 'fa-regular fa-id-badge', '/profile')
        ];

        let adminMenu = [
            createMenuItem('Admin', null, null, [
                createMenuItem('Users Panel', 'fa-solid fa-users-gear', '/admin/userspanel'),
            ]),
        ];

        let items = [
            createMenuItem('Menu', null, null, [
                createMenuItem('Citations feed', 'fa-solid fa-home', '/'),
            ]),
        ];

        if(role === 'ROLE_USER' || role === 'ROLE_ADMIN'){
            items[0].items.push(...userMenu);
        }

        if(role === 'ROLE_ADMIN'){
            items.push(...adminMenu);
        }

        return items;
    }

    const items = createRoleBasedMenuItems(role);


    const handleLogin = async () => {
        setDiscordButtonClicked(true);
        login();
    };

    const handleLogout = async () => {
       logout();
    };

    const discordIcon = isDiscordButtonClicked ? (
        <>
            <FontAwesomeIcon icon={faDiscord} size="xl" spin />
            <span className="tex-sm p-1">Waiting discord...</span>
        </>
    ) : (
        <>
            <FontAwesomeIcon icon={faDiscord} size="xl" />
            <span className="tex-sm p-1">Login with Discord</span>
        </>
    );

    const startContent = (
        <React.Fragment>
            {isAuthenticated ? (
                <Button
                    className="buttonStyle StartalkButton"
                    onClick={handleLogout}
                    title="Click here to logout"
                >
                    <FontAwesomeIcon icon={faArrowRightToBracket} size="xl" />
                    <span className="tex-sm p-1">Logout</span>
                </Button>
            ) : (
                <Button
                    className="buttonStyle StartalkButton"
                    onClick={handleLogin}
                    title="Click here to login with Discord for a better experience"
                >
                    {discordIcon}
                </Button>
            )}
        </React.Fragment>
    );

    const endContent = (
        <React.Fragment>
            <ThemeToggleButton />
            <i className="mr-2" />
            <ButtonMenu
                className='StartalkButton'
                icon="fa-solid fa-circle-question"
                to="/about"
                title="About"
            />
        </React.Fragment>
    );

    const [visible, setVisible] = useState(false);

    const handleOpenModalAddCitaion = () => {
        setVisible(true);
    };


    return (
        <div className="dimensions-menu">
            <div className="titre">
                <img
                    className="logo"
                    src={logoLM}
                    alt="StarTalk logo"/>
                <h1>
                    StarTalk
                </h1>
            </div>

            <nav className="MenuItemlLabel">
                <MenuP model={items} className="w-full pl-5 pr-5 MenuP"/>
            </nav>

            {isAuthenticated ? (
                <>
                    <Button
                        icon="fa-solid fa-feather"
                        title="Write your most Beautiful Citation"
                        label="Post"
                        className="StartalkButton PostButtonCss"
                        onClick={handleOpenModalAddCitaion}

                    />
                    <AddCitationModal visible={visible} setVisible={setVisible}/>
                </>
            ) : (
                <></>
            )}

            <div className="flex flex-grow"></div>

            <Toolbar
                start={startContent}
                end={endContent}
                className="toolbarcss"
            />

        </div>
    );
}
