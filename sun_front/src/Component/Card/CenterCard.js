import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function CenterCard({ centername, introduction, manager, location, centerid  }) {
    return (
        <>
            <div className="CenterCard">
                <Card style={{ width: "284px" }}>
                    <Card.Body>
                        <Card.Title>{centername}</Card.Title>
                        <Card.Text>
                            {introduction}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{manager}</ListGroup.Item>
                        <ListGroup.Item>{location}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href={`/main/${centerid}`}>Card Link</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default CenterCard;
