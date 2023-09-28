import { useState } from "react";
import "./Card.css";
import { Card, ListGroup, Button } from 'react-bootstrap';
import { DatePicker, Modal, Divider } from "antd";

function PlanCard({ centerid, planinfo, from, setPlanData }) {

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

    const handleDelete = (pId) => {
        fetch(`http://localhost:8000/center/plan/${pId}/`, {
            method: 'DELETE',
            body: JSON.stringify({
                planid: pId,
            })
        })
    }

    const handlePlanRegister = () => {
        const planData = {
            planid: planinfo.planid,
            planname: planinfo.planname,
            centerid: planinfo.centerid,
            introduction: planinfo.introduction,
            plantype: planinfo.plantype,
            period: planinfo.period,
            periodtype: planinfo.periodtype,
            price: planinfo.price,
            times: planinfo.times,
            constraints: planinfo.constraints,
            selectedDate: selectedDate,
        };
        setPlanData(planData);
        handleCloseModal();
    };
    return (
        <>
            <div className="PlanCard">
                <Card className="Card" style={{ width: "210px" }}>
                    <Card.Body>
                        <Card.Title>{planinfo.planname}</Card.Title>
                        <Card.Text>
                            {planinfo.introduction}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>{planinfo.plantype === "fixed-term" ? "기간제" : planinfo.plantype === "number-of-times" ? "횟수제" : ""}</ListGroup.Item>
                        <ListGroup.Item>{planinfo.period} {planinfo.periodtype === "months" ? "개월" : planinfo.periodtype === "days" ? "일" : planinfo.periodtype === "years" ? "년" : ""}</ListGroup.Item>
                        {/* <ListGroup.Item>{planinfo.price}원</ListGroup.Item> */}
                        {planinfo.constraints ?
                            <ListGroup.Item>
                                {planinfo.constraints}
                            </ListGroup.Item>
                            : planinfo.times ?
                                <ListGroup.Item>
                                    {planinfo.times}회
                                </ListGroup.Item>
                                : <></>}
                    </ListGroup>
                    <Card.Body>
                        {
                            from === "list" ? (
                                <ListGroup.Item>{planinfo.price}원</ListGroup.Item>
                                // <Card.Link href={`/plan/${planinfo.centerid}/${planinfo.planid}`}>정보 보기</Card.Link>
                            ) : from === "modify" ? (
                                <Card.Link href={`/plan/modify/${planinfo.centerid}/${planinfo.planid}`}>수정하기</Card.Link>
                            ) : from === "register" ? (
                                <Button
                                    // onClick={setPopup}
                                    onClick={handleOpenModal}>등록</Button>
                            ) : from === "manage" ? (
                                <>
                                    <Button href={`/plan/modify/${planinfo.centerid}/${planinfo.planid}`}>수정</Button>
                                    <Button
                                        onClick={() => handleDelete(planinfo.planid)}>삭제</Button>
                                    {/* <Card.Link href={`/plan/modify/${planinfo.centerid}/${planinfo.planid}`}>수정하기</Card.Link>
                                    <Card.Link href={`/plan/modify/${planinfo.centerid}/${planinfo.planid}`}>삭제하기</Card.Link> */}
                                </>
                            ) :
                                <></>
                        }
                    </Card.Body>
                </Card>
            </div >
            <Modal open={modalVisible} onCancel={handleCloseModal} footer={null}>
                <div style={{ textAlign: 'center' }}>
                    <h2>{planinfo.planname}</h2>
                    <h4>{planinfo.introduction}</h4>
                    <Divider />
                    <p>이용 중인 플랜이 '{planinfo.planname}'이 맞으신가요?<br />센터 등록일을 선택해 주세요.</p>
                    <DatePicker onChange={handleDateChange} />
                    <p>Selected Date: {selectedDate && selectedDate.toString()}</p>
                    <Button onClick={handlePlanRegister}>등록</Button>
                </div>
            </Modal>
        </>
    );
}

export default PlanCard;
