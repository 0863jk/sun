import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function UserCard({user}) {
    return (
        <>
            <div className="UserCard">
                <Card style={{ width: "200px" }}>
                    <Card.Body>
                        <Card.Title>{user.name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{user.email}</ListGroup.Item>
                        <ListGroup.Item>{user.phone}</ListGroup.Item>
                    </ListGroup>
                </Card>
            </div>
        </>
    );
}

export default UserCard;
