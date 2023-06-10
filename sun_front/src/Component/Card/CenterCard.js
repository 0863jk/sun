import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from "react-router-dom";

function CenterCard({ center, from, openModal }) {
    const handleOnClick = () => {
        openModal(center);
    }
    return (
        <>
            <div className="CenterCard">
                <Card className="Card" style={{ width: "284px" }}>
                    <Card.Body>
                        <Card.Title>{center.centername}</Card.Title>
                        <Card.Text>
                            {center.introduction}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{center.manager}</ListGroup.Item>
                        <ListGroup.Item>{center.address1} {center.address2}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        {
                            from === "list" ? (
                                <Card.Link as={Link} to={`/main/${center.centerid}`}>조회하기</Card.Link>
                            ) : from === "search" ? (
                                // <Card.Link as={Link} to={`/register/${center.centerid}`}>등록하기</Card.Link>
                                <Card.Link as={Link} onClick={handleOnClick}>등록하기</Card.Link>
                            ) : <></>
                        }
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default CenterCard;