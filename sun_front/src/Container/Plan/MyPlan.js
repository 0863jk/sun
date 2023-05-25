import "./MyPlan.css";
import { useParams } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard";
import CenterNav from "../../Component/Nav/CenterNav";
import CardGroup from 'react-bootstrap/CardGroup';
import useFetch from "../../Hook/useFetch";

function MyPlan() {
    const { pCenterId } = useParams();
    const username = localStorage.getItem('username');
    const planinfo = useFetch(`http://localhost:8000/center/plan/getMemberPlan/${pCenterId}/${username}`);
    const plan = planinfo.plan;

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">나의 이용권 정보</label>
                        <div className="MyPlanContainer">
                            {
                                plan ? (
                                    <>
                                        <CardGroup className="CardGroup MyPlan">
                                            <PlanCard from="list" planname={plan.planname} introduction={plan.introduction} plantype={plan.plantype} period={plan.period} periodtype={plan.periodtype} price={plan.price} constraints={plan.constraints} planid={plan.id} />
                                        </CardGroup>
                                        <label className="DateInfo">등록일은 {planinfo.registerDate}이며 이용권 만료일은 {planinfo.expireDate}입니다.</label>
                                    </>
                                ) : (<></>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MyPlan;