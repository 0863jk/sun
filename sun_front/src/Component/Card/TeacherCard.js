import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function TeacherCard() {
    return (
        <>
            <div className="TeacherCard">
                <Card style={{ width: "284px" }}>
                    <Card.Body>
                        <Card.Title>강사명 </Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>ID</ListGroup.Item>
                        <ListGroup.Item>Phone</ListGroup.Item>
                    </ListGroup>
                    {/* <Card.Body>
                        <Card.Link href="/center/centerid">Card Link</Card.Link>
                    </Card.Body> */}
                </Card>
            </div>
        </>
    );
}

export default TeacherCard;
