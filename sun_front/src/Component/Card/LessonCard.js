import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { DatePicker, TimePicker, Modal, Divider } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useFetch from "../../Hook/useFetch";
import dayjs from 'dayjs';

function LessonCard({ from, lessoninfo, centerid }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const trainers = useFetch(`http://localhost:8000/center/getCenterTrainers/${centerid}`);

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const { RangePicker } = TimePicker;

    const dateFormat = 'YYYY/MM/DD';

    const onChange = (e) => {
        console.log("onChange ", e.target.value);
    };

    const findTrainerName = (trainerId) => {
        const trainer = trainers.find((trainer) => trainer.username === trainerId);
        return trainer ? trainer.name : '';
    };

    const handleSubmit = (event) => {
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const trainerid = formData.get("trainerid");
        const maxCapacity = formData.get("maxCapacity");

        const startTime = selectedDate.format("YYYY-MM-DD") + " " + selectedTime[0].format("HH:mm:ss");
        const endTime = selectedDate.format("YYYY-MM-DD") + " " + selectedTime[1].format("HH:mm:ss");

        const data = {
            lessonid: lessoninfo.id,
            centerid: centerid,
            title: title,
            trainerid: trainerid,
            trainername: `${findTrainerName(trainerid)}`,
            max_capacity: maxCapacity,
            start: startTime,
            end: endTime
        }
        console.log(data);

        fetch('http://localhost:8000/center/timetable/registerTimetableBlock/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <div className="LessonCard">
                <Card style={{ width: "284px" }}>
                    {
                        lessoninfo && (
                            <>
                                <Card.Body>
                                    <Card.Title>{lessoninfo.title}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroup.Item>{lessoninfo.info_trainername}</ListGroup.Item>
                                    {
                                        from === "register" ? (
                                            <>
                                                <ListGroup.Item>{lessoninfo.info_day === 1 ? "월요일" : lessoninfo.info_day === 2 ? "화요일" : lessoninfo.info_day === 3 ? "수요일" : lessoninfo.info_day === 4 ? "목요일" : lessoninfo.info_day === 5 ? "금요일" : lessoninfo.info_day === 6 ? "토요일" : lessoninfo.info_day === 7 ? "일요일" : "설정된 요일 없음"}</ListGroup.Item>
                                                <ListGroup.Item>{lessoninfo.info_start && lessoninfo.info_start.toString().slice(0, 5)} ~ {lessoninfo.info_end && lessoninfo.info_end.toString().slice(0, 5)}</ListGroup.Item>
                                            </>
                                        ) :
                                            from === "info" ?
                                                (<>
                                                    <ListGroup.Item>수업시간</ListGroup.Item>
                                                    <ListGroup.Item>간단한 설명</ListGroup.Item>
                                                </>) :
                                                <></>
                                    }
                                </ListGroup>
                                <Card.Body>
                                    {
                                        from === "register" ? (
                                            <Button onClick={handleOpenModal}>시간표에 등록하기</Button>
                                        ) : from === "mylesson" ? (
                                            <Card.Link href="/lesson/rate/lessonid">강의평 작성하기</Card.Link>
                                        ) :
                                            <></>
                                    }
                                </Card.Body>
                            </>
                        )
                    }
                </Card>
                <Modal open={modalVisible} onCancel={handleCloseModal} footer={null}>
                    {lessoninfo && (
                        <>
                            <div style={{ textAlign: 'center' }}>
                                <label className="LabelTitle">수업 등록</label>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>수업명</Form.Label>
                                        <Form.Control type="text" placeholder="수업명" name="title" defaultValue={lessoninfo.title}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>강사 선택</Form.Label>
                                        <Form.Select name="trainerid" onChange={onChange}>
                                            <option value="default">
                                                강사 선택
                                            </option>
                                            {trainers && trainers.map(trainers => (
                                                <option value={trainers.username} key={trainers.id} selected={lessoninfo.trainerid === trainers.username ? (true) : (false)}>
                                                    {trainers.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>최대 인원</Form.Label>
                                        <Form.Control type="number" placeholder="최대 인원 입력" name="maxCapacity" defaultValue={lessoninfo.info_maxCapacity}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>날짜</Form.Label><br />
                                        <DatePicker onChange={handleDateChange} format={dateFormat}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>시간</Form.Label><br />
                                        <RangePicker onChange={handleTimeChange} defaultValue={lessoninfo.info_start && lessoninfo.info_end && [dayjs(lessoninfo.info_starttime, 'HH:mm'), dayjs(lessoninfo.info_endtime, 'HH:mm')]} format="HH:mm" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </>
                    )}
                </Modal>
            </div>

        </>
    );
}

export default LessonCard;
