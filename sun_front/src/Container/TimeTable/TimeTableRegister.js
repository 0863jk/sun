import "./TimeTableRegister.css";
import LessonInfoCard from "../../Component/Card/LessonInfoCard";
import CenterNav from "../../Component/Nav/CenterNav";
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import { useState } from "react";
import WeeklyTimetable from "../../Component/TimeTable/WeeklyTimeTable";

function TimeTableRegister() {
    const { pCenterId } = useParams();

    return (
        <>
            <div className="header">
                <CenterNav centerid={pCenterId} />
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
                                <Button variant="outline-primary" href={`/lesson/register/${pCenterId}`}>추가하기</Button> 
                            </CardGroup>
                        </div>
                    </div>
                    <div className="wrap">
                        <WeeklyTimetable centerid={pCenterId} />
                        {/* <WeeklyTable /> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TimeTableRegister;