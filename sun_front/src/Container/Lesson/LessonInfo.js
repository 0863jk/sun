import CenterNav from "../../Component/Nav/CenterNav";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from "../../Hook/useFetch";
import moment from "moment";

function LessonInfo() {
    const { pCenterId, pLessonId } = useParams();
    const lessonInfo = useFetch(`http://localhost:8000/center/timetable/getTimetableBlock/${pLessonId}`);
    const trainerInfo = useFetch(`http://localhost:8000/account/getUsername/${lessonInfo.trainerid}`);

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId}/>
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">강의 정보</label>
                        <div className="CenterListContainer">
                            <div className="PlanCard">
                                <Card style={{ width: "284px" }}>
                                    <Card.Body>
                                        <Card.Title>{lessonInfo.title}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>{trainerInfo.name}</ListGroup.Item>
                                        <ListGroup.Item>{moment(lessonInfo.start).format("YYYY/MM/DD HH:mm")} ~ {moment(lessonInfo.end).format("YYYY/MM/DD HH:mm")}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                        <Card.Link href="#">신청하기</Card.Link>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LessonInfo;