import CenterNav from "../../Component/Nav/CenterNav";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function LessonInfo() {
    return (
        <>
            <div>
                <div className="header">
                    <CenterNav />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">강의명</label>
                        <div className="CenterListContainer">
                            <div className="PlanCard">
                                <Card style={{ width: "284px" }}>
                                    <Card.Body>
                                        <Card.Title>수업명</Card.Title>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>강사명</ListGroup.Item>
                                        <ListGroup.Item>수업시간</ListGroup.Item>
                                        <ListGroup.Item>간단한 설명</ListGroup.Item>
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