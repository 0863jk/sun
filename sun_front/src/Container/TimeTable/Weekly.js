import { useParams } from 'react-router-dom';
import CenterNav from '../../Component/Nav/CenterNav';
import { useEffect, useState } from 'react';
import WeeklyTimetable from '../../Component/TimeTable/WeeklyTimeTable';
import { Modal } from 'antd';
import Utils from '../../Hook/Utils';
import { Button } from 'react-bootstrap';
import useFetch from '../../Hook/useFetch';

function Weekly() {
    const { pCenterId } = useParams();
    const utils = new Utils(pCenterId);
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    const [lesson, setLesson] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const centerInfo = useFetch(``);
    // const timetableData = useFetch(`http://localhost:8000/lesson/timetableblock/center/${pCenterId}`);

    const handleOpenModal = (data) => {
        setLesson(data);
        setModalVisible(true);
    }
    const handleCloseModal = () => {
        setModalVisible(false);
    }

    const onClickHandler = (event) => {
        event.preventDefault();
        if (event.target.name === "btnViewApplicant") {
            window.location.href = `/lesson/info/${pCenterId}/${lesson.blockid}`;
        } else if (event.target.name === "btnBook") {
            const data = {
                centerid: pCenterId,
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
                    window.location.reload();
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
                    <div className='timetable-wrapper'>
                        <WeeklyTimetable
                            // timetableData={timetableData}
                            centerid={pCenterId}
                            role={role}
                            onClick={handleOpenModal} />
                    </div>
                </div>
            </div>
            <Modal
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={null}>
                <div style={{ textAlign: 'center' }}>
                    {lesson && (
                        <>
                            <h3>레슨 상세 정보</h3>
                            {lesson && (
                                <div>
                                    <p>레슨명: {lesson.lessontitle}</p>
                                    <p>레슨 설명: {lesson.summary}</p>
                                    <p>강사: {lesson.trainername}</p>
                                    <p>{lesson.number_of_applicants} / {lesson.max_capacity}</p>
                                    {
                                        role === "manager" || role === "trainer" ? (
                                            <Button name="btnViewApplicant" onClick={onClickHandler}>예약자 명단보기</Button>
                                        ) : role === "general" ? (
                                            <Button name="btnBook" onClick={onClickHandler}>예약하기</Button>
                                        ) : <></>
                                    }
                                </div>
                            )}
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
}
export default Weekly;