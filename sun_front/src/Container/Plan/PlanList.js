import { Link } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard"
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";

function PlanList() {
    return (
        <>
            <div>
                <div className="header">
                    <CenterNav />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">이용권 목록</label>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                <PlanCard />
                                <PlanCard />
                                <PlanCard />
                                <PlanCard />
                                <PlanCard />
                                <PlanCard />
                                <PlanCard />
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PlanList;
