// CSS
import '../../assets/css/components/layout/Menu.css';

// Imports
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu as MenuP } from 'primereact/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';
import { UserContext } from '../../utils/UserAuthContext';
import logo from '../../assets/images/logoUpScale.png'

export default function Menu() {
    const navigate = useNavigate();
    const { isAuthenticated, role, login, logout } = useContext(UserContext);
    const [isDiscordButtonClicked, setDiscordButtonClicked] = useState(false);

    function changePage(to) {
        navigate(to);
    }

    function createMenuItem(label, icon, command, subItems) {
        return {
            label,
            icon,
            command: () => changePage(command),
            items: subItems || [],
        };
    }

    function createRoleBasedMenuItems(role) {
        let userMenu = [
            createMenuItem('Profile', 'fa-regular fa-id-badge', '/profile'),
            createMenuItem('Bookmark', 'fa-solid fa-bookmark', '/bookmark'),
            createMenuItem('Add Citation', 'fa-solid fa-plus', '/add'),
        ];

        let adminMenu = [
            createMenuItem('Admin', null, null, [
                createMenuItem('Add Citation', 'fa-solid fa-square-plus', '/admin/add'),
                createMenuItem('Remove Citation', 'fa-solid fa-square-minus', '/admin/delete'),
                createMenuItem('Disconnect User', 'fa-solid fa-plug-circle-xmark', '/admin/disconnection'),
            ]),
        ];

        let items = [
            createMenuItem('Menu', null, null, [
                createMenuItem('Home', 'fa-solid fa-home', '/'),
                createMenuItem('Citations', 'fa-solid fa-book', '/citations'),
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

    return (
        <div className="three-dimensions-menu">
            <div className="titre">
                <img
                    className="logo"
                    src={logo}
                    alt="StarTalk logo" />
                <h1>StarTalk</h1>
            </div>

            <nav>
                <MenuP model={items} className="w-full pl-5 pr-5" />
            </nav>
            <div className="flex flex-grow"></div>
            {isAuthenticated ? (

                <button
                    className="buttonLO buttonStyle "
                    onClick={handleLogout}
                    title="Click here to logout"
                >
                    <FontAwesomeIcon icon={faArrowRightToBracket} size="xl" />
                    <span className="tex-sm p-1">Logout</span>
                </button>
            ) : (
                <a
                    className="buttonStyle"
                    onClick={handleLogin}
                    title="Click here to login with Discord for a better experience"
                >
                    {discordIcon}
                </a>
            )}
        </div>
    );
}
