import { Link, useParams } from "react-router-dom";
import CardGroup from 'react-bootstrap/CardGroup';
import { useEffect, useRef, useState } from "react";
import { getCenterPass } from "../../../apis/api/Pass";
import { useSelector } from "react-redux";
import CenterNav from "../../../Component/Nav/CenterNav";
import PlanCard from "../../../Component/Card/PlanCard";
import PassCard from "../../../Component/Card/PassCard";

function PassList() {
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
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="main-container">
                    <div className="label-wrapper">
                        <label className="label-title">수강권 목록</label>
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

export default PassList;
