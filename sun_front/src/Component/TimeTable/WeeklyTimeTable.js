import "./TimeTable.css";
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useFetch from "../../Hook/useFetch"
import { DatePicker, Modal } from "antd";
import { Button, Form } from "react-bootstrap";
import Utils from "../../Hook/Utils";

const localizer = momentLocalizer(moment);

function WeeklyTimetable({ centerid, role, from }) {
    const utils = new Utils(centerid);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const timetableData = useFetch(`http://localhost:8000/center/timetable/getCenterTimetable/${centerid}`);
    const trainers = useFetch(`http://localhost:8000/center/getCenterTrainers/${centerid}`);

    const findTrainerName = (trainerId) => {
        const trainer = trainers.find((trainer) => trainer.username === trainerId);
        return trainer ? trainer.name : '';
    };

    const events = timetableData.map((event) => {
        return {
            ...event,
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: `${event.title} (${findTrainerName(event.trainerid)})`,
            lessontitle: `${event.title}`,
            trainer: `${findTrainerName(event.trainerid)}` // 강사 이름 추가
        }
    })

    const handleEventClick = (event) => {
        setSelectedLesson(event);
        handleOpenModal('lesson');
    };

    const minTime = new Date();
    minTime.setHours(9, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(18, 0, 0);

    const handleOpenModal = (type) => {
        setModalType(type);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD HH:mm';

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleBtnBook = (blockid) => {
        window.location.href = `/lesson/info/${centerid}/${blockid}`;
    }

    const handleSubmit = (event) => {
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const trainerid = formData.get("trainer");
        const maxCapacity = formData.get("maxCapacity");

        const lessonData = {
            centerid: centerid,
            title: title,
        }

        const timetableBlockData = {
            centerid: centerid,
            title: title,
            trainername: `${findTrainerName(trainerid)}`,
            trainerid: trainerid,
            max_capacity: parseInt(maxCapacity),
            start: selectedDate[0].format("YYYY-MM-DD HH:mm"),
            end: selectedDate[1].format("YYYY-MM-DD HH:mm")
        }
        utils.registerLesson(lessonData).then(data => {
            console.log('Lesson registered:', data);
            const newData = {
                ...timetableBlockData,
                lesson_ptr: data.id
            };

            utils.registerTimetableBlock(newData).then(data => {
                alert("정상적으로 등록이 완료되었습니다.");
                window.location.reload();
            })
        });
    }

    return (
        <div style={{ position: 'relative' }}>
            {role === "manager" && from === "register" && (
                <div className="addLessonBtnContainer">
                    <button className="btnAddLesson" onClick={() => handleOpenModal('addLesson')}>
                        그 외의 강의 추가하기
                    </button>
                </div>
            )}
            <div className="calendaContainer" style={{ height: '650px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={['week']}
                    defaultView="week"
                    step={60} // 시간 단위 (60분)
                    defaultDate={new Date()}
                    min={minTime}
                    max={maxTime}
                    onSelectEvent={handleEventClick}
                    showMultiDayTimes={false}
                />
            </div>
            <Modal open={modalVisible} onCancel={handleCloseModal} footer={null}>
                <div style={{ textAlign: 'center' }}>
                    {modalType === 'addLesson' && (
                        <>
                            <h3>수업 등록하기</h3>
                            <iframe id="iframe1" name="iframe1" style={{ display: "none" }}>test</iframe>
                            <Form onSubmit={handleSubmit} method="post" target="iframe1">
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>수업명</Form.Label>
                                    <Form.Control type="text" placeholder="수업명" name="title" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>강사 선택</Form.Label>
                                    <Form.Select name="trainer" >
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
                                    <Form.Label>요일 및 시간</Form.Label><br />
                                    <RangePicker showTime format={dateFormat} onChange={handleDateChange} />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </>
                    )}
                    {modalType === "lesson" && (
                        <>
                            <h3>레슨 상세 정보</h3>
                            {selectedLesson && (
                                <div>
                                    <p>Lesson ID: {selectedLesson.id}</p>
                                    <p>{selectedLesson.lessontitle}</p>
                                    <p>{selectedLesson.trainer}</p>
                                    <p>{selectedLesson.maxCapacity}</p>
                                    {
                                        role === "manager" || role === "trainer" ? (
                                            <Button name="btnBook" onClick={() => handleBtnBook(selectedLesson.blockid)}>예약자 명단보기</Button>
                                        ) : role === "general" ? (
                                            <Button name="btnBook">예약하기</Button>
                                        ) : <></>
                                    }
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Modal>
        </div>

    );
}

export default WeeklyTimetable;