import { useState } from "react";
import "./Card.css";
import { Card, ListGroup, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";

function TrainerCard({ name, username, email, phone, onChecked }) {
    const [isChecked, setIsChecked] = useState(false);

    // 체크박스 선택 시 항목의 이름을 반환하는 이벤트 핸들러
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        if(checked) {
            console.log(name);
            onChecked(true, name);
        } else {
            onChecked(false, name);
        }
    };

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
                    {onChecked ? (
                        <Card.Body>
                            <Form.Check // prettier-ignore
                                type='checkbox'
                                id={username}
                                name={username}
                                onChange={handleCheckboxChange}
                            />
                            {/* <Button>등록</Button> */}
                            {/* <Card.Link href="">등록</Card.Link> */}
                        </Card.Body>
                    ) : <></>}
                </Card>
            </div>
        </>
    );
}

export default TrainerCard;
