import "./TimeTableRegister.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CenterNav from "../../Component/Nav/CenterNav";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import WeeklyTimetable from "../../Component/TimeTable/WeeklyTimeTable";
import LessonCard from "../../Component/Card/LessonCard";
import Slider from "react-slick";
import useFetch from "../../Hook/useFetch";
import { DatePicker, Modal, TimePicker } from "antd";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import Utils from "../../Hook/Utils";

function TimeTableRegister() {
    const { pCenterId } = useParams();
    const utils = new Utils(pCenterId);
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const lessons = useFetch(`http://localhost:8000/lesson/get/${pCenterId}`)
    const trainers = useFetch(`http://localhost:8000/center/member/get?centerid=${pCenterId}&role=trainer`);
    const timetableData = useFetch(`http://localhost:8000/lesson/timetableblock/center/${pCenterId}`);
    const [modalType, setModalType] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [lesson, setLesson] = useState(null);
    const { RangePicker } = TimePicker;
    const dateFormat = 'YYYY/MM/DD';
    const newDate = new Date();

    const findTrainerName = (trainerId) => {
        const trainer = trainers.find((trainer) => trainer.username === trainerId);
        return trainer ? trainer.name : '';
    };

    const handleOpenModal = (modalType) => {
        setModalType(modalType);
        setModalVisible(true);
    };

    const handleTimeTableModal = (lesson) => {
        setLesson(lesson);
        handleOpenModal("TimetableBlock");
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleLessonSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const summary = formData.get("summary");
        const day = formData.get("day");
        const trainerid = formData.get("trainerid");
        const maxCapacity = formData.get("maxCapacity");
        const starttime = selectedTime[0].format("HH:mm");
        const endtime = selectedTime[1].format("HH:mm");

        const data = {
            centerid: pCenterId,
            title: title,
            summary: summary,
            info_day: parseInt(day),
            info_start: starttime,
            info_end: endtime,
            info_trainername: `${findTrainerName(trainerid)}`,
            info_trainerid: trainerid,
            info_max_capacity: maxCapacity,
        };
        console.log(data);
        utils.registerLesson(data).then(data => {
            console.log('Lesson registered:', data);

            alert("정상적으로 등록이 완료되었습니다.");
            window.location.reload();
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

    const handleTimetableBlockSubmit = (event) => {
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const summary = formData.get("summary");
        const trainerid = formData.get("trainerid");
        const maxCapacity = formData.get("maxCapacity");
        const date = selectedDate.format("YYYY-MM-DD");
        const starttime = selectedTime[0].format("HH:mm");
        const endtime = selectedTime[1].format("HH:mm");

        const data = {
            centerid: pCenterId,
            title: title,
            summary: summary,
            trainerid: trainerid,
            trainername: `${findTrainerName(trainerid)}`,
            max_capacity: parseInt(maxCapacity),
            start: date + " " + starttime,
            end: date + " " + endtime
        }

        utils.registerTimetableBlock(data)
            .then(data => {
                console.log(data);
                alert("시간표에 등록이 완료되었습니다.");
                window.location.reload();
            })
    }
    const onClickHandler = (event) => {
        event.preventDefault();
        if (event.target.name === "btnViewApplicant") {
            window.location.href = `/lesson/info/${pCenterId}/${lesson.blockid}`;
        } else if (event.target.name === "btnBook") {
            const data = {
                blockid: lesson.blockid,
                lessonid: lesson.lessonid,
                userid: username
            }
            utils.registerEnrolment(data).then(data => {
                console.log(data);
                const updateData = {
                    number_of_applicants: lesson.number_of_applicants + 1
                }
                utils.updateTimetableBlock(updateData, lesson.blockid).then(data => {
                    console.log(data);
                    alert("정상적으로 신청되었습니다.")
                })
            })
        }
        console.log(event.target.name);
    }

    return (
        <>
            <div className="header">
                <CenterNav centerid={pCenterId} />
            </div>
            <div className="main-container">
                <div className="label-wrapper">
                    <label className="label-title">시간표 등록</label>
                    <div className="carouselContainer">
                        <Slider {...settings}>
                            {
                                lessons && lessons.map(lessons => (
                                    <div>
                                        <LessonCard key={lessons.lessonid} from="register" lessoninfo={lessons} centerid={pCenterId} newDate={newDate}/>
                                    </div>
                                ))
                            }
                            <div>
                                <div className="PlanCard">
                                    <Card className="Card" style={{ width: "284px" }}>
                                        <Card.Body>
                                            <Card.Title>새 강의 프리셋</Card.Title>
                                            <Button onClick={() => handleOpenModal("addLesson")}>만들기</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                        </Slider>
                    </div>
                    <div className="wrap">
                        <div style={{ position: 'relative' }}>
                            <div className="addLessonBtnContainer">
                                <button className="btnAddLesson" onClick={() => handleOpenModal('addTimetableBlock')}>
                                    그 외의 강의 추가하기
                                </button>
                            </div>
                            <div className="timetable-wrapper">
                                <WeeklyTimetable timetableData={timetableData} centerid={pCenterId} role={role} from="register" onClick={handleTimeTableModal} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={modalVisible} onCancel={handleCloseModal} footer={null}>
                <div style={{ textAlign: 'center' }}>
                    {modalType === "addLesson" && (
                        <>
                            <h3>새 강의 프리셋 추가하기</h3>
                            <iframe title="non-disply-title" id="iframe1" name="iframe1" style={{ display: "none" }}></iframe>
                            <Form onSubmit={handleLessonSubmit} method="post" target="iframe1">
                                <Form type="hidden" name="type"></Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>수업명</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="수업명"
                                        name="title"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>설명</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="설명"
                                        name="summary"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>강사 선택</Form.Label>
                                    <Form.Select
                                        name="trainerid"
                                    >
                                        <option value="default">강사 선택</option>
                                        {trainers &&
                                            trainers.map((trainer) => (
                                                <option value={trainer.username} key={trainer.id} name="trainerid">
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
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>요일</Form.Label>
                                    <br />
                                    <Form.Select
                                        name="day"
                                    >
                                        <option>요일 선택</option>
                                        <option value="1">월</option>
                                        <option value="2">화</option>
                                        <option value="3">수</option>
                                        <option value="4">목</option>
                                        <option value="5">금</option>
                                        <option value="6">토</option>
                                        <option value="0">일</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>시간</Form.Label><br />
                                    <RangePicker onChange={handleTimeChange} format="HH:mm" value={selectedTime} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </>
                    )}
                    {
                        modalType === "addTimetableBlock" && (
                            <>
                                <h3>수업 등록하기</h3>
                                <iframe title="non-disply-title" id="iframe2" name="iframe2" style={{ display: "none" }}></iframe>
                                <Form onSubmit={handleTimetableBlockSubmit} method="post" target="iframe2">
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>수업명</Form.Label>
                                        <Form.Control type="text" placeholder="수업명" name="title" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>설명</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="설명"
                                            name="summary"
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>강사 선택</Form.Label>
                                        <Form.Select name="trainerid" >
                                            <option value="default">
                                                강사 선택
                                            </option>
                                            {trainers && trainers.map(trainers => (
                                                <option value={trainers.username} key={trainers.id} name="trainerid">
                                                    {trainers.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>최대 인원</Form.Label>
                                        <Form.Control type="number" placeholder="최대 인원 입력" name="maxCapacity" />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>날짜</Form.Label><br />
                                        <DatePicker onChange={handleDateChange} format={dateFormat} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>시간</Form.Label><br />
                                        <RangePicker onChange={handleTimeChange} format="HH:mm" />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </>
                        )
                    }
                    {
                        modalType === "TimetableBlock" && (
                            <>
                                <h3>레슨 상세 정보</h3>
                                {lesson && (
                                    <div>
                                        <p>{lesson.lessontitle}</p>
                                        <p>{lesson.summary}</p>
                                        <p>{lesson.trainer}</p>
                                        <p>{lesson.number_of_applicants} / {lesson.max_capacity}</p>
                                        {
                                            role === "manager" || role === "trainer" ? (
                                                // <Button name="btnBook" onClick={() => viewApplicantListBtnHandler(lesson.blockid)}>예약자 명단보기</Button>
                                                <Button name="btnViewApplicant" onClick={onClickHandler}>예약자 명단보기</Button>
                                            ) : role === "general" ? (
                                                <Button name="btnBook" onClick={onClickHandler}>예약하기</Button>
                                            ) : <></>
                                        }
                                    </div>
                                )}
                            </>
                        )
                    }
                </div>
            </Modal>
        </>
    );
}

export default TimeTableRegister;