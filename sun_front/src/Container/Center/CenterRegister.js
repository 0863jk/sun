import { useParams } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard"
import CardGroup from 'react-bootstrap/CardGroup';
import { Modal, DatePicker } from "antd";
import useFetch from "../../Hook/useFetch";
import { useState } from "react";

const planData = {
    planid: "",
    planname: "",
    centerid: "",
    introduction: "",
    plantype: "",
    period: "",
    periodtype: "",
    price: "",
    constraints: "",
}

const inputValue = {
    centerid: "",
    userid: "",
    role: "",
    planid: "",
    registerDate: "",
    expireDate: "",
}

function CenterRegister() {
    const { pCenterId } = useParams();
    const username = localStorage.getItem("username");
    const plan = useFetch(`http://localhost:8000/center/plan/getCenterPlans/${pCenterId}`);
    const [registerData, setRegisterData] = useState(inputValue);
    const [selectedPlan, setSelectedPlan] = useState(planData);

    const RegisterMember = (plandata) => {
        setSelectedPlan(plandata);
        const registerDate = new Date(plandata.selectedDate);
        const expireDate = new DataTransfer(registerDate.getMonth() + 3);
        setRegisterData({
            centerid: pCenterId,
            userid: username,
            role: "general",
            planid: plandata.planid,
            registerDate: registerDate,
            expireDate: expireDate,
        })
        console.log(registerData);
    };

    return (
        <>
            <div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">이용권 목록</label>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                {plan && plan.map(plan => (
                                    <PlanCard key={plan.planid} from="register" planname={plan.planname} introduction={plan.introduction} plantype={plan.plantype} period={plan.period} price={plan.price} constraints={plan.constraints} planid={plan.planid} onSubmit={RegisterMember} />
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
