import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function LessonInfoCard() {
    return (
        <>
            <div className="PlanCard">
                <Card style={{ width: "" }}>
                    <Card.Body>
                        <Card.Title><Link to="/lesson/lessonid">수업명</Link></Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>강사명</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </>
    );
}

export default LessonInfoCard;
