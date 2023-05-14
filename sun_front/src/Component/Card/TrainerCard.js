import "./Card.css";
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

function TrainerCard({ name, username, email, phone, usage }) {
    return (
        <>
            <div className="TrainerCard">
                <Card style={{ width: "284px" }}>
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{username}</ListGroup.Item>
                        <ListGroup.Item>{email}</ListGroup.Item>
                        <ListGroup.Item>{phone}</ListGroup.Item>
                    </ListGroup>
                    {usage === "register" ? (
                        <Card.Body>
                            <Button>등록</Button>
                            {/* <Card.Link href="">등록</Card.Link> */}
                        </Card.Body>
                    ) : <></>}
                </Card>
            </div>
        </>
    );
}

export default TrainerCard;
