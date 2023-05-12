import { useParams } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard";
import CenterNav from "../../Component/Nav/CenterNav";
import CardGroup from 'react-bootstrap/CardGroup';
import { useEffect, useState } from "react";

function MyPlan() {
    const { pCenterId } = useParams();
    const [centerid, setCenterid] = useState('');

    useEffect(() => {
        setCenterid(pCenterId);
    }, []);

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={centerid}/>
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">나의 이용권 정보</label>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                <PlanCard />
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyPlan;