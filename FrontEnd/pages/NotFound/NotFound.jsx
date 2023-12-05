import ButtonMenu from "../../components/Button/ButtonMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFaceSadTear} from "@fortawesome/free-solid-svg-icons";

// CSS
import '../../assets/css/pages/NotFound/NotFound.css';
import {useNavigate} from "react-router-dom";

export default function NotFound()
{
    const navigate = useNavigate();
    if(localStorage.getItem('actionParam')){
        //console.log(localStorage.getItem('actionParam'));
        navigate('/');
    }
    //console.log(localStorage.getItem('actionParam'))
    return (
        <div className='container'>
            <FontAwesomeIcon icon={faFaceSadTear} shake style={{ fontSize: '5em' }}/>
            <h1 className='title'>StarTalk</h1>
            <p className='text'>Error 404 - Page not found</p>
            <ButtonMenu label="Back About" icon="fa-solid fa-home" to="/" severity="secondary"/>
        </div>
    );
}