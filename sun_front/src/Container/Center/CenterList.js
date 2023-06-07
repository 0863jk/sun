import "./CenterList.css";
import CenterCard from "../../Component/Card/CenterCard"
import CardGroup from 'react-bootstrap/CardGroup';
import useFetch from "../../Hook/useFetch"
import { Link } from "react-router-dom";

function CenterList() {
    const id = localStorage.getItem('username');
    const center = useFetch(`http://localhost:8000/center/getMemberCenters/${id}`);

    return (
        <>
            <div className="wrap MainContainer">
                <div className="LabelWrapper">
                    <label className="LabelTitle">나의 센터</label>
                    <div className="ContentContainer FlexContainer ">
                        <div className="CardListContainer">
                            <CardGroup className="CardGroup">
                                {center && center.map(center => (
                                    <Link to={`/main/${center.centerid}`} className="LinkWrapper">
                                        <CenterCard key={center.centerid} from="list" center={center} />
                                    </Link>
                                ))}
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CenterList;