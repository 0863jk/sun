import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function UserCard({name, email, phone}) {
    return (
        <>
            <div className="StudentCard">
                <Card style={{ width: "284px" }}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{email}</ListGroup.Item>
                        <ListGroup.Item>{phone}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </>
    );
}

export default UserCard;
