import {Button} from "primereact/button";
import { useNavigate } from 'react-router-dom';
export default function ButtonMenu({label, icon, severity, to, title, className})
{
    const navigate = useNavigate();

    const handleClick = () =>
    {
        // Go to the "to" url.
        navigate(to);
    };

    return (
        <Button label={label} icon={icon} title={title} severity={severity} className={className} onClick={handleClick}/>
    );
}