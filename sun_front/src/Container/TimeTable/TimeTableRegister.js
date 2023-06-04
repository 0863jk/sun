import "./TimeTableRegister.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CenterNav from "../../Component/Nav/CenterNav";
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import WeeklyTimetable from "../../Component/TimeTable/WeeklyTimeTable";
import LessonCard from "../../Component/Card/LessonCard";
import Slider from "react-slick";
import useFetch from "../../Hook/useFetch";
import { Modal, TimePicker } from "antd";
import { useState } from "react";
import moment from "moment";
import { Card, Form } from "react-bootstrap";

function TimeTableRegister() {
    const { pCenterId } = useParams();
    const role = localStorage.getItem("role");
    const lessons = useFetch(`http://localhost:8000/center/lesson/getCenterLesson/${pCenterId}`)
    const trainers = useFetch(`http://localhost:8000/center/getCenterTrainers/${pCenterId}`);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        trainerid: "",
        day: "",
        maxCapacity: "",
    });

    const { RangePicker } = TimePicker;

    // input 값 변경 시 데이터 업데이트
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOpenModal = () => {
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        const starttime = selectedTime[0].format("HH:mm");
        const endtime = selectedTime[1].format("HH:mm");

        const data = {
            centerid: pCenterId,
            title: formData.title,
            day: parseInt(formData.day),
            starttime: starttime,
            endtime: endtime,
            trainerid: formData.trainerid,
            maxCapacity: formData.maxCapacity,
        };
        console.log(data);

        fetch('http://localhost:8000/center/lesson/registerLesson/', {
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


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
    };

    return (
        <>
            <div className="header">
                <CenterNav centerid={pCenterId} />
            </div>
            <div className="MainContainer">
                <div className="LabelWrapper">
                    <label className="LabelTitle">시간표 등록</label>
                    <div className="carouselContainer">
                        <Slider {...settings}>
                            {
                                lessons && lessons.map(lessons => (
                                    <div>
                                        <LessonCard from="register" lessoninfo={lessons} centerid={pCenterId}/>
                                    </div>
                                ))
                            }
                            <div>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>새 강의 프리셋</Card.Title>
                                        <Button onClick={handleOpenModal}>만들기</Button>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Slider>
                    </div>
                    <div className="wrap">
                        <WeeklyTimetable centerid={pCenterId} role={role} from="register" />
                    </div>
                </div>
            </div>
            <Modal open={modalVisible} onCancel={handleCloseModal} footer={null}>
                <div style={{ textAlign: 'center' }}>
                    <h3>새 강의 프리셋 추가하기</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>수업명</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="수업명"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>강사 선택</Form.Label>
                            <Form.Select
                                name="trainerid"
                                value={formData.trainerid}
                                onChange={handleInputChange}
                            >
                                <option value="default">강사 선택</option>
                                {trainers &&
                                    trainers.map((trainer) => (
                                        <option value={trainer.username} key={trainer.id}>
                                            {trainer.name}
                                        </option>
                                    ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>최대 인원</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="최대 인원"
                                name="maxCapacity"
                                value={formData.maxCapacity}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>요일</Form.Label>
                            <br />
                            <Form.Select
                                name="day"
                                value={formData.day}
                                onChange={handleInputChange}
                            >
                                <option value="0">요일 선택</option>
                                <option value="1">월</option>
                                <option value="2">화</option>
                                <option value="3">수</option>
                                <option value="4">목</option>
                                <option value="5">금</option>
                                <option value="6">토</option>
                                <option value="7">일</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>시간</Form.Label><br />
                            <RangePicker onChange={handleTimeChange} format="HH:mm" value={selectedTime} />
                        </Form.Group>
                        {/* <Button variant="primary" onClick={handleSubmit}> */}
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </Modal>
        </>
    );
}

export default TimeTableRegister;