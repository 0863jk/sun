import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function CenterCard({ role }) {
    return (
        <>
            <div className="CenterCard">
                <Card style={{ width: "284px" }}>
                    <Card.Body>
                        <Card.Title>Center Name</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>대표명</ListGroup.Item>
                        <ListGroup.Item>회원수 100</ListGroup.Item>
                        <ListGroup.Item>인천 서구 원적로</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="/main/centerid">Card Link</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default CenterCard;
