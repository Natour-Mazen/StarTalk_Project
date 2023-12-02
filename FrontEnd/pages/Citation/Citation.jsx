import Base from "../../components/layout/Base";
import {useParams} from "react-router-dom";

export default function Citation( {match})
{
    const { id } = useParams();

    return (
        <Base>
            <div className="Citation">

                <h1>Citation : {id}</h1>

            </div>
        </Base>
    );
}