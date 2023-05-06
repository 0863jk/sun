import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function LessonReviewCard() {
    return (
        <>
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
                        <Card.Link href="/lesson/review/lessonid">강의평 보기</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default LessonReviewCard;
