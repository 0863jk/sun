import { useNavigate, useParams } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard"
import CardGroup from 'react-bootstrap/CardGroup';
import useFetch from "../../Hook/useFetch";
import { useEffect, useState } from "react";
import Utils from "../../Hook/Utils";

function CenterRegister() {
    const { pCenterId } = useParams();
    const utils = new Utils(pCenterId);
    const center = useFetch(`http://localhost:8000/center/getCenter/${pCenterId}`)
    const plan = useFetch(`http://localhost:8000/center/plan/getCenterPlans/${pCenterId}`);
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const inputValue = {
        centerid: "",
        userid: "",
        role: "",
        planid: "",
        register_date: "",
        expire_date: "",
    }
    const [registerData, setRegisterData] = useState(inputValue);

    const RegisterMember = (plandata) => {
        const registerDate = new Date(plandata.selectedDate);
        const expireDate = new Date(plandata.selectedDate);

        if (plandata.periodtype === "days") {
            expireDate.setDate(expireDate.getDate() + plandata.period);
        } else if (plandata.periodtype === "months") {
            expireDate.setMonth(expireDate.getMonth() + plandata.period);
        } else if (plandata.periodtype === "years") {
            expireDate.setYear(expireDate.getYear() + plandata.period);
        }

        setRegisterData({
            centerid: pCenterId,
            userid: username,
            role: role,
            planid: plandata.planid,
            register_date: registerDate.toISOString().split('T')[0],
            expire_date: expireDate.toISOString().split('T')[0],
        });
    };

    useEffect(() => {
        if (registerData.register_date && registerData.expire_date) {
            console.log(registerData);
            utils.registerCenterMember(registerData).then(data => {
                console.log(data);
                alert("센터에 정상적으로 등록되었습니다.");
            })
        }
    }, [registerData, utils]);

    return (
        <>
            <div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        {
                            role === "general" && (
                                <>
                                    <label className="LabelTitle">이용권 목록</label>
                                    <p>사용 중인 플랜을 선택해 주세요.</p>
                                    <div className="CenterListContainer">
                                        <CardGroup className="CardGroup">
                                            {plan && plan.map(plan => (
                                                <PlanCard key={plan.planid} from="register" planinfo={plan} setPlanData={RegisterMember} />
                                            ))}
                                        </CardGroup>
                                    </div>
                                </>
                            )
                        }
                        {
                            role === "trainer" && (
                                <>
                                    <label className="LabelTitle">센터 등록</label>
                                    <p>현재 재직 중인 센터가 </p>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default CenterRegister;
