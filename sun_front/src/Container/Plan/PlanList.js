import { Link, useParams } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard"
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import { useEffect, useState } from "react";
import useFetch from "../../Hook/useFetch"

function PlanList() {
    const { pCenterId } = useParams();
    const [centerid, setCenterid] = useState('');
    const plan = useFetch(`http://localhost:8000/center/getMemberCenters/${centerid}`);

    useEffect(() => {
        setCenterid(pCenterId);
    }, [])

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={centerid} />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">이용권 목록</label>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                {plan && plan.map(plan => (
                                    <Link to={`/plan/${plan.planid}`}>
                                        <PlanCard planname={plan.planname} introduction={plan.introduction} plantype={plan.p} period={plan.plantype} constraints={plan.constraints} planid={plan.id}/>
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

export default PlanList;
