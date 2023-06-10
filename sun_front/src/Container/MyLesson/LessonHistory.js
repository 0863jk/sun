import { Link, useParams } from "react-router-dom";
import LessonCard from "../../Component/Card/LessonCard"
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import { useEffect, useState } from "react";
import useFetch from "../../Hook/useFetch";
import { Divider, Modal } from "antd";
import { Button, Form } from "react-bootstrap";
import Utils from "../../Hook/Utils";

function LessonHistory() {
    const { pCenterId } = useParams();
    const utils = new Utils(pCenterId);
    const username = localStorage.getItem("username");
    const lessons = useFetch(`http://localhost:8000/lesson/timetableblock/history/general?centerid=${pCenterId}&userid=${username}`);
    const [selectedLesson, setSelectedLesson] = useState(null);

    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = (data) => {
        setSelectedLesson(data);
        setModalVisible(true);
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const difficulty = formData.get('difficulty');
        const teaching = formData.get('teaching');
        const recommend = formData.get('recommend');
        const comment = formData.get('comment');

        const data = {
            centerid: pCenterId,
            userid: username,
            blockid: selectedLesson.blockid,
            lessonid: selectedLesson.lessonid,
            difficulty: difficulty,
            teaching: teaching,
            recommend: recommend,
            comment: comment,
        }
        
        utils.registerLessonReview(data).then(data => {
            console.log(data);
            alert("등록되었습니다.");
            window.location.reload();
        })
    }

    return (
        <>
            <div className="header">
                <CenterNav centerid={pCenterId} />
            </div>
            <div className="main-container">
                <div className="label-wrapper">
                    <label className="label-title">나의 레슨 기록</label>
                    <div className="content-container">
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                {
                                    lessons && lessons.map(lessons => (
                                        <>
                                            <LessonCard from="lessonhistory" lessoninfo={lessons} onClick={handleOpenModal} />
                                        </>
                                    ))
                                }
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={modalVisible} onCancel={handleCloseModal} footer={null}>
                {
                    selectedLesson && (
                        <>
                            <div style={{ textAlign: 'center' }}>
                                <h3>{selectedLesson.title}</h3>
                                <p>{selectedLesson.trainername} 강사</p>
                                <Form onSubmit={onSubmitHandler}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>난이도는 어땠나요?</Form.Label>
                                        <div >
                                            <Form.Check inline type="radio" label="쉬움" value="1" name="difficulty" />
                                            <Form.Check inline type="radio" label="보통" value="2" name="difficulty" />
                                            <Form.Check inline type="radio" label="어려움" value="3" name="difficulty" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>강사의 지도는 적절했나요?</Form.Label>
                                        <div >
                                            <Form.Check inline type="radio" label="매우 그렇디" value="4" name="teaching" />
                                            <Form.Check inline type="radio" label="그렇다" value="3" name="teaching" />
                                            <Form.Check inline type="radio" label="아니다" value="2" name="teaching" />
                                            <Form.Check inline type="radio" label="매우 아니다" value="1" name="teaching" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>이 강의를 추천하시나요?</Form.Label>
                                        <div>
                                            <Form.Check inline type="radio" label="추천함" value="1" name="recommend" />
                                            <Form.Check inline type="radio" label="추천하지 않음" value="0" name="recommend" />
                                        </div>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </>
                    )
                }
            </Modal>
        </>
    );
}

export default LessonHistory;
