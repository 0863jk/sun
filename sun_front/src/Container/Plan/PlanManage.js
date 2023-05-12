import { Link, useParams } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard"
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import PlanModifyCard from "../../Component/Card/PlanModifyCard";
import { useEffect, useState } from "react";

function PlanManage() {
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
                        <label className="LabelTitle">이용권 목록</label>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                <PlanModifyCard />
                                <PlanModifyCard />
                                <PlanModifyCard />
                                <PlanModifyCard />
                                <PlanModifyCard />
                                <PlanModifyCard />
                                <PlanModifyCard />
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlanManage;
