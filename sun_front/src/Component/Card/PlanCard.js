import { useState } from "react";
import "./Card.css";
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { DatePicker, Modal, Divider } from "antd";

function PlanCard({ centerid, planname, introduction, plantype, period, periodtype, price, constraints, planid, from, setPlanData }) {

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handlePlanRegister = () => {
        const planData = {
            planid: planid,
            planname: planname,
            centerid: centerid,
            introduction: introduction,
            plantype: plantype,
            period: period,
            periodtype: periodtype,
            price: price,
            constraints: constraints,
            selectedDate: selectedDate,
        };
        setPlanData(planData);
        handleCloseModal();
    };
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
                        <ListGroup.Item>{plantype === "fixed-term" ? "기간제" : plantype === "number-of-times" ? "횟수제" : ""}</ListGroup.Item>
                        <ListGroup.Item>{period} {periodtype}</ListGroup.Item>
                        <ListGroup.Item>{price}원</ListGroup.Item>
                        <ListGroup.Item>{constraints}</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        {
                            from === "list" ? (
                                <Card.Link href={`/plan/${centerid}/${planid}`}>정보 보기</Card.Link>
                            ) : from === "modify" ? (
                                <Card.Link href={`/plan/modify/${centerid}/${planid}`}>수정하기</Card.Link>
                            ) : from === "register" ? (
                                        <Button name={planid}
                                            // onClick={setPopup}
                                            onClick={handleOpenModal}>등록</Button>

                            ) :
                                <></>
                        }
                    </Card.Body>
                </Card>
            </div >
            <Modal open={modalVisible} onCancel={handleCloseModal} footer={null}>
                <div style={{ textAlign: 'center' }}>
                    <h2>{planname}</h2>
                    <h4>{introduction}</h4>
                    <Divider />
                    <p>이용 중인 플랜이 '{planname}'이 맞으신가요?<br />센터 등록일을 선택해 주세요.</p>
                    <DatePicker onChange={handleDateChange} />
                    <p>Selected Date: {selectedDate && selectedDate.toString()}</p>
                    <Button onClick={handlePlanRegister}>등록</Button>
                </div>
            </Modal>
        </>
    );
}

export default PlanCard;
