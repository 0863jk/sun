import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function PlanModifyCard() {
    return (
        <>
            <div className="PlanCard">
                <Card style={{ width: "284px" }}>
                    <Card.Body>
                        <Card.Title>플랜명</Card.Title>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>플랜 유형</ListGroup.Item>
                        <ListGroup.Item>1개월</ListGroup.Item>
                        <ListGroup.Item>일주일에 n번</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="/plan/modify/centerid/planid">수정하기</Card.Link>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default PlanModifyCard;
