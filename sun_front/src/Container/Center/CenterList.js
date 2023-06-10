import "./CenterList.css";
import CenterCard from "../../Component/Card/CenterCard"
import CardGroup from 'react-bootstrap/CardGroup';
import useFetch from "../../Hook/useFetch"
import { Link } from "react-router-dom";

function CenterList() {
    const id = localStorage.getItem('username');
    const center = useFetch(`http://localhost:8000/center/member/centerlist?userid=${id}`);

    return (
        <>
            <div className="main-container">
                <div className="label-wrapper">
                    <label className="label-title">나의 센터</label>
                    <div className="content-container">
                        <div className="cardlist-container">
                            <CardGroup className="CardGroup">
                                {(center.length > 0) ? center.map(center => (
                                    <Link key={center.centerid} to={`/main/${center.centerid}`} className="LinkWrapper">
                                        <CenterCard from="list" center={center} />
                                    </Link>
                                )) : <>
                                <p>등록된 센터가 없습니다.</p>
                                </>}
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CenterList;