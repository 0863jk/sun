import { Link, useParams } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard"
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import { useEffect, useState } from "react";
import useFetch from "../../Hook/useFetch"

function CenterRegister() {
    const { pCenterId } = useParams();
    const [centerid, setCenterid] = useState('');
    const plan = useFetch(`http://localhost:8000/center/plan/getCenterPlans/${pCenterId}`);

    useEffect(() => {
        setCenterid(pCenterId);
    }, [])

    return (
        <>
            <div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">이용권 목록</label>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                {plan && plan.map(plan => (
                                    <Link to={`/plan/${plan.planid}`}>
                                        <PlanCard from="register" planname={plan.planname} introduction={plan.introduction} plantype={plan.plantype} period={plan.period} constraints={plan.constraints} planid={plan.id}/>
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

export default CenterRegister;
