import { Link } from "react-router-dom";
import LessonCard from "../../Component/Card/LessonCard"
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";

function LessonHistory() {
    return (
        <>
            <div>
                <div className="header">
                    <CenterNav />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">나의 레슨 기록</label>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                <LessonCard />
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LessonHistory;
