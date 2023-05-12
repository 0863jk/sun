import "./CenterList.css";
import CenterCard from "../../Component/Card/CenterCard"
import CardGroup from 'react-bootstrap/CardGroup';
import useFetch from "../../Hook/useFetch"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function CenterList() {
    // const [id, setId] = useState('');
    const id = localStorage.getItem('id');
    const center = useFetch(`http://localhost:8000/center/getMemberCenters/${id}`);
    
    // useEffect(() => {
    //     setId(localStorage.getItem('id'));
    // }, [])

return (
    <>
        <div className="wrap MainContainer">
            <div className="LabelWrapper">
                <label className="LabelTitle">나의 센터</label>
                <div className="ContentContainer FlexContainer">
                    <CardGroup className="CardGroup">
                        {center && center.map(center => (
                            <Link to={`/main/${center.centerid    }`}>
                                <CenterCard centername={center.centername} introduction={center.introduction} manager={center.manager} location={center.location} centerid={center.centerid} />
                            </Link>
                        ))}
                    </CardGroup>
                </div>
            </div>
        </div>
    </>
);
}

export default CenterList;
