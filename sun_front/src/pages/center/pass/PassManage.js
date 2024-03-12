import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getCenterPass } from "../../../apis/api/Pass";
import { CardGroup } from "react-bootstrap";
import PlanCard from "../../../Component/Card/PlanCard";
import CenterNav from "../../../Component/Nav/CenterNav";
import PassCard from "../../../Component/Card/PassCard";

function PassManage() {
    const { pCenterId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const userInfo = useSelector((state) => state.UserInfo);
    const centerInfo = useSelector((state) => state.CenterInfo);
    const authToken = useRef(auth.access_token);
    const [passList, setPassList] = useState({});

    useEffect(() => {
        getCenterPass(authToken.current, pCenterId)
            .then(data => {
                setPassList(data);
            })
    }, [])

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav />
                </div>
                <div className="main-container">
                    <div className="label-wrapper">
                        <label className="label-title">수강권 관리하기</label>
                        <div className="content-container">
                            <div className="cardlist-container">
                                <CardGroup className="CardGroup">
                                    {
                                        (passList.length > 0) ? passList.map(pass => (
                                            <PassCard key={pass.id} pass={pass} />
                                        )) : <>
                                            <p>등록된 수강권이 없습니다.</p>
                                        </>
                                    }
                                </CardGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PassManage;
