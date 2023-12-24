import ButtonMenu from "../../components/Button/ButtonMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceSadTear} from "@fortawesome/free-solid-svg-icons";

// CSS
import '../../assets/css/pages/NotFound/NotFound.css';
import {useContext} from "react";
import {UserContext} from "../../utils/UserAuthContext";

export default function NotFound() {

    const {isAuthenticated} = useContext(UserContext);

    return (
            isAuthenticated &&
            (
                <div className='container'>
                    <FontAwesomeIcon icon={faFaceSadTear} shake style={{fontSize: '5em'}}/>
                    <h1 className='title'>StarTalk</h1>
                    <p className='text'>Error 404 - Page not found</p>
                    <ButtonMenu label="Back Home" icon="fa-solid fa-home" to='/' severity="secondary"/>
                </div>
            )
        );
}