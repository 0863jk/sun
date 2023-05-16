import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function CenterCard({ centername, introduction, manager, address, centerid, from }) {
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
                        <ListGroup.Item>{address}</ListGroup.Item>
                    </ListGroup>
                    
                    <Card.Body>
                        {
                            from === "list" ? (
                                <Card.Link href={`/main/${centerid}`}>조회하기</Card.Link>
                                ) : from === "search" ? (
                                    <Card.Link href={`/register/${centerid}`}>등록하기</Card.Link>
                            ) : <></>
                        }
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default CenterCard;
