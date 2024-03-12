import React, { useEffect, useState } from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const PassCard = (props) => {
    const [pass, setPass] = useState({
        pass_name: "",
        pass_type: "",
        pass_description: "",
        duration_months: "",
        unit_of_times: "",
        times: "",
        price: "",
    });

    useEffect(() => {
        if (props.pass) {
            setPass(props.pass);
        } else {
            setPass({
                pass_name: "",
                pass_type: "",
                pass_description: "",
                duration_months: "",
                unit_of_times: "",
                times: "",
                price: "",
            });
        }
    }, [props.pass])

    return (
        <div className="PlanCard" style={{ minHeight: "240px", }}>
            <Card className="Card">
                {
                    pass.pass_name ? (
                        <>
                            <Card.Body>
                                <Card.Title>{pass.pass_name}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>
                                    {pass.pass_type === "all_programs" ? <>ALL PROGRAMS</> : pass.pass_type === "only_private_lesson" ? <>ONLY PRIVATE LESSON</> : pass.pass_type === "only_public_class" ? <>ONLY PUBLIC CLASS</> : <>{pass.pass_type}</>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {pass.description}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {pass.duration_months} 개월 / {pass.unit_of_times === "total" ? <>총</> : pass.unit_of_times === "month" ? <>월</> : pass.unit_of_times === "week" ? <>주</> : <></>} {pass.times}회
                                </ListGroup.Item>
                            </ListGroup>
                            <Card.Body>
                                <Card.Text>
                                    {new Intl.NumberFormat().format(pass.price)} 원
                                </Card.Text>
                            </Card.Body>
                        </>
                    ) :
                        (
                            <>
                                <Card.Body>
                                    <Card.Title></Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>
                                        등록되어 있는
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        수강권이 없습니다.
                                    </ListGroup.Item>
                                    <ListGroup.Item>

                                    </ListGroup.Item>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Text>
                                    </Card.Text>
                                    <Card.Text>
                                    </Card.Text>
                                </Card.Body>
                            </>
                        )
                }
            </Card>
        </div>
    );
}

export default PassCard;
