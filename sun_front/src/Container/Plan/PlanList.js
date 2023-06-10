import { Link, useParams } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard"
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import { useEffect, useState } from "react";
import useFetch from "../../Hook/useFetch"

function PlanList() {
    const { pCenterId } = useParams();
    const plan = useFetch(`http://localhost:8000/center/plan/get/${pCenterId}`);

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="main-container">
                    <div className="label-wrapper">
                        <label className="label-title">이용권 목록</label>
                        <div className="content-container">
                        <div className="cardlist-container">
                            <CardGroup className="CardGroup">
                                {plan && plan.map(plan => (
                                    <PlanCard key={plan.id} from="list" planinfo={plan} />
                                ))}
                            </CardGroup>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlanList;
