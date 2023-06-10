import "./Card.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { DatePicker, TimePicker, Modal, Divider } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useFetch from "../../Hook/useFetch";
import dayjs from 'dayjs';
import Utils from "../../Hook/Utils";

function LessonCard({ from, lessoninfo, centerid, onClick }) {
    const utils = new Utils(centerid);
    const [defaultDate, setDefaultDate] = useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const newDate = new Date();
    const [selectedDate, setSelectedDate] = useState(defaultDate);
    const [selectedTime, setSelectedTime] = useState([dayjs(lessoninfo.info_start, 'HH:mm'), dayjs(lessoninfo.info_end, 'HH:mm')]);
    const trainers = useFetch(`http://localhost:8000/center/member/get?centerid=${centerid}&role=trainer`);

    useEffect(() => {
        if (from === "register") {
            newDate.setDate(newDate.getDate() - newDate.getDay() + 7 + lessoninfo.info_day);
            setDefaultDate(newDate.toISOString().substring(0, 10));
            setSelectedDate(newDate.toISOString().substring(0, 10));
        }
    }, [defaultDate, lessoninfo.info_day, newDate])

    const handleOpenModal = () => {
        // console.log(defaultDate.toISOString().substring(0, 10));
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
        const summary = formData.get("summary");
        const maxCapacity = formData.get("maxCapacity");

        const startTime = selectedDate + " " + selectedTime[0].format("HH:mm:ss");
        const endTime = selectedDate + " " + selectedTime[1].format("HH:mm:ss");
        console.log(startTime, endTime);

        const data = {
            lessonid: lessoninfo.lessonid,
            centerid: centerid,
            title: title,
            summary: summary,
            trainerid: trainerid,
            trainername: `${findTrainerName(trainerid)}`,
            max_capacity: maxCapacity,
            start: startTime,
            end: endTime
        }
        console.log(data);
        utils.registerTimetableBlock(data)
            .then(data => {
                console.log(data);
                alert("시간표에 등록이 완료되었습니다.");
                window.location.reload();
            })
    }

    return (
        <>
            <div className="PlanCard">
                <Card className="Card" style={{ width: "284px" }}>
                    {
                        lessoninfo && (
                            <>
                                <Card.Body>
                                    <Card.Title>{lessoninfo.title}</Card.Title>
                                    {lessoninfo.trainername && (
                                        <ListGroup.Item>{lessoninfo.trainername} 강사</ListGroup.Item>
                                    )}
                                    {lessoninfo.info_trainername && (
                                        <ListGroup.Item>{lessoninfo.info_trainername}</ListGroup.Item>
                                    )}
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    {lessoninfo.summary ? (
                                        <ListGroup.Item>{lessoninfo.summary}</ListGroup.Item>
                                    ) : (
                                        <ListGroup.Item>설명이 없습니다.</ListGroup.Item>
                                    )}
                                    {
                                        from === "register" ? (
                                            <>
                                                {lessoninfo.info_day && (
                                                    <ListGroup.Item>{lessoninfo.info_day === 1 ? "월요일" : lessoninfo.info_day === 2 ? "화요일" : lessoninfo.info_day === 3 ? "수요일" : lessoninfo.info_day === 4 ? "목요일" : lessoninfo.info_day === 5 ? "금요일" : lessoninfo.info_day === 6 ? "토요일" : lessoninfo.info_day === 0 ? "일요일" : "설정된 요일 없음"}</ListGroup.Item>
                                                )}
                                                {
                                                    lessoninfo.info_start && (
                                                        <ListGroup.Item>{lessoninfo.info_start && lessoninfo.info_start.toString().slice(0, 5)} ~ {lessoninfo.info_end && lessoninfo.info_end.toString().slice(0, 5)}</ListGroup.Item>
                                                    )
                                                }
                                            </>
                                        ) :
                                            from === "info" ?
                                                (<>
                                                    <ListGroup.Item>수업시간</ListGroup.Item>
                                                    <ListGroup.Item>간단한 설명</ListGroup.Item>
                                                </>) :
                                                from === "mylesson" ? (
                                                    <>
                                                        {
                                                            lessoninfo.start && (
                                                                <>
                                                                    <ListGroup.Item>{lessoninfo.end && lessoninfo.start.toString().slice(0, 10)}</ListGroup.Item>
                                                                    <ListGroup.Item>{lessoninfo.start && lessoninfo.start.toString().slice(11, 16)} ~ {lessoninfo.end && lessoninfo.end.toString().slice(11, 16)}</ListGroup.Item>
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                ) : <></>
                                    }
                                </ListGroup>
                                <Card.Body>
                                    {
                                        from === "register" ? (
                                            <Card.Link onClick={handleOpenModal}>시간표에 등록하기</Card.Link>
                                        ) : from === "mylesson" ? (
                                            <Card.Link onClick={() => onClick(lessoninfo)}>정보 보기</Card.Link>
                                        ) : from === "lessonhistory" ? (
                                            <Card.Link onClick={() => onClick(lessoninfo)}>강의평 작성하기</Card.Link>
                                        ) :
                                            <></>
                                    }
                                </Card.Body>
                            </>
                        )
                    }
                </Card>
            </div>
            <Modal open={modalVisible} onCancel={handleCloseModal} footer={null}>
                {lessoninfo && (
                    <>
                        <div style={{ textAlign: 'center' }}>
                            <h3>수업 등록</h3>
                            <iframe title="none-display-frame" id="iframe1" name="iframe1" style={{ display: "none" }}>test</iframe>
                            <Form onSubmit={handleSubmit} method="post" target="iframe1">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>수업명</Form.Label>
                                    <Form.Control type="text" placeholder="수업명" name="title" defaultValue={lessoninfo.title} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>설명</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="설명"
                                        name="summary"
                                        defaultValue={lessoninfo.summary}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>강사 선택</Form.Label>
                                    <Form.Select name="trainerid" onChange={onChange}>
                                        <option value="default">
                                            강사 선택
                                        </option>
                                        {trainers && trainers.map(trainers => (
                                            <option value={trainers.username} key={trainers.id} selected={lessoninfo.info_trainerid === trainers.username ? (true) : (false)}>
                                                {trainers.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>최대 인원</Form.Label>
                                    <Form.Control type="number" placeholder="최대 인원 입력" name="maxCapacity" defaultValue={lessoninfo.info_max_capacity} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>날짜</Form.Label><br />
                                    <DatePicker onChange={handleDateChange} format={dateFormat} defaultValue={dayjs(defaultDate, "YYYY-MM-DD")} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>시간</Form.Label><br />
                                    <RangePicker onChange={handleTimeChange} defaultValue={lessoninfo.info_start && lessoninfo.info_end && [dayjs(lessoninfo.info_start, 'HH:mm'), dayjs(lessoninfo.info_end, 'HH:mm')]} format="HH:mm" />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </>
                )}
            </Modal>
        </>
    );
}

export default LessonCard;
