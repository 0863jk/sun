import { useParams } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard"
import CardGroup from 'react-bootstrap/CardGroup';
import useFetch from "../../Hook/useFetch";
import { useEffect, useState } from "react";

// const planData = {
//     planid: "",
//     planname: "",
//     centerid: "",
//     introduction: "",
//     plantype: "",
//     period: "",
//     periodtype: "",
//     price: "",
//     constraints: "",
// }

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

    const RegisterMember = (plandata) => {
        const registerDate = new Date(plandata.selectedDate);
        const expireDate = new Date(plandata.selectedDate);
        expireDate.setMonth(expireDate.getMonth() + 3);

        const formattedRegiDate = registerDate.toISOString().split('T')[0];
        const formattedExpiDate = expireDate.toISOString().split('T')[0];

        setRegisterData({
            centerid: pCenterId,
            userid: username,
            role: "general",
            planid: plandata.planid,
            registerDate: formattedRegiDate,
            expireDate: formattedExpiDate,
        });
    };

    useEffect(() => {
        if (registerData.registerDate && registerData.expireDate) {
            console.log(registerData);
            const jsonData = JSON.stringify(registerData);
            fetch('http://localhost:8000/center/registerCenterMember/', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: jsonData
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                });
        }
    }, [registerData]);

    return (
        <>
            <div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">이용권 목록</label>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                {plan && plan.map(plan => (
                                    <PlanCard key={plan.planid} from="register" planname={plan.planname} introduction={plan.introduction} plantype={plan.plantype} period={plan.period} price={plan.price} constraints={plan.constraints} planid={plan.planid} setPlanData={RegisterMember} />
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
