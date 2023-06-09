import CenterNav from "../../Component/Nav/CenterNav";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from "../../Hook/useFetch";
import UserCard from "../../Component/Card/UserCard";
import moment from "moment";

function LessonInfo() {
    const { pCenterId, pLessonId } = useParams();
    const role = localStorage.getItem("role");
    const lesson = useFetch(`http://localhost:8000/center/timetable/getTimetableBlock/${pLessonId}`);
    const [applicant, setApplicant] = useState(null);

    useEffect(() => {
        if (role === "manager" || role === "trainer") {
            fetch(`http://localhost:8000/center/enrolment/getEnrolment/${pLessonId}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setApplicant(data);
            })
        }
    }, [pLessonId, role])

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">강의 정보</label>
                        <div className="CenterListContainer">
                            <div className="PlanCard">
                                <Card style={{ width: "284px" }}>
                                    <Card.Body>
                                        <Card.Title>{lesson.title}</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>{lesson.trainername}</ListGroup.Item>
                                        <ListGroup.Item>{moment(lesson.start).format("YYYY/MM/DD HH:mm")} ~ {moment(lesson.end).format("YYYY/MM/DD HH:mm")}</ListGroup.Item>
                                    </ListGroup>
                                    {
                                        role === "general" && (
                                            <Card.Body>
                                                <Card.Link href="#">신청하기</Card.Link>
                                            </Card.Body>
                                        )
                                    }
                                </Card>
                            </div>
                        </div>
                        <div className="CenterListContainer">
                            <div className="PlanCard">
                                {
                                    applicant && (applicant.length > 0) ? applicant.map(applicant => (
                                        <UserCard user={applicant} />
                                    )) : (
                                        <>
                                            <p>신청한 사용자가 없습니다.</p>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LessonInfo;