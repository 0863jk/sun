import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function StudentCard() {
    return (
        <>
            <div className="StudentCard">
                <Card style={{ width: "284px" }}>
                    <Card.Body>
                        <Card.Title>학생명</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>ID</ListGroup.Item>
                        <ListGroup.Item>Phone</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </>
    );
}

export default StudentCard;
