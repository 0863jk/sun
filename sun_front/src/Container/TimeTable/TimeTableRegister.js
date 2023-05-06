import "./TimeTableRegister.css";
import LessonInfoCard from "../../Component/Card/LessonInfoCard";
import CenterNav from "../../Component/Nav/CenterNav";
import WeeklyTable from "../../Component/TimeTable/WeeklyTable";
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';

function TimeTableRegister() {
    return (
        <>
            <div className="header">
                <CenterNav />
            </div>
            <div className="MainContainer">
                <div className="LabelWrapper">
                    <label className="LabelTitle">시간표 등록</label>
                    <div className="wrap">
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                <LessonInfoCard />
                                <LessonInfoCard />
                                <LessonInfoCard />
                                <Button variant="outline-primary" href="/lesson/register/centerid">추가하기</Button>{' '}
                            </CardGroup>
                        </div>
                    </div>
                    <div className="wrap">
                        <WeeklyTable />
                    </div>
                </div>
            </div>
        </>
    );
}

export default TimeTableRegister;