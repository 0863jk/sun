import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function PlanCard({ planname, introduction, plantype, period, constraints, planid, from } ) {
    return (
        <>
            <div className="PlanCard">
                <Card style={{ width: "284px" }}>
                    <Card.Body>
                        <Card.Title>{planname}</Card.Title>
                        <Card.Text>
                            {introduction}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{plantype}</ListGroup.Item>
                        <ListGroup.Item>{period}</ListGroup.Item>
                        <ListGroup.Item>{constraints}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        {
                            from === "list" ? (
                                <Card.Link href={`/plan/${planid}`}>정보 보기</Card.Link>
                            ) : from === "modify" ? (
                                <Card.Link href={`/plan/modify/${planid}`}>수정하기</Card.Link>
                            ) : <></>
                        }
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default PlanCard;
