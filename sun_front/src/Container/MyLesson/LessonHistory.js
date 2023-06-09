import { Link, useParams } from "react-router-dom";
import LessonCard from "../../Component/Card/LessonCard"
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import { useEffect, useState } from "react";
import useFetch from "../../Hook/useFetch";
import { Divider, Modal } from "antd";
import { Button, Form } from "react-bootstrap";

function LessonHistory() {
    const { pCenterId } = useParams();
    const username = localStorage.getItem("username");
    const lessons = useFetch(`http://localhost:8000/center/timetable/getMemberLessonHistory/${pCenterId}/${username}`);
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
            userid: username,
            blockid: selectedLesson.blockid,
            lessonid: selectedLesson.lessonid,
            difficulty: difficulty,
            teaching: teaching,
            recommend: recommend,
            comment: comment,
        }
    }

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">나의 레슨 기록</label>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                {
                                    lessons && lessons.map(lessons => (
                                        <>
                                            <LessonCard from="mylesson" lessoninfo={lessons} onClick={handleOpenModal} />
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
                                        <Form.Label>강사의 지도는 어땠나요?</Form.Label>
                                        <div >
                                            <Form.Check inline type="radio" label="매우 좋음" value="5" name="teaching" />
                                            <Form.Check inline type="radio" label="좋음" value="4" name="teaching" />
                                            <Form.Check inline type="radio" label="보통" value="3" name="teaching" />
                                            <Form.Check inline type="radio" label="별로임" value="2" name="teaching" />
                                            <Form.Check inline type="radio" label="매우 별로임" value="1" name="teaching" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>이 강의를 추천하시나요?</Form.Label>
                                        <div>
                                            <Form.Check inline type="radio" label="추천함" value="1" name="recommend" />
                                            <Form.Check inline type="radio" label="추천하지 않음" value="2" name="recommend" />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>강사에게 남길 말이 있나요?</Form.Label>
                                        <Form.Control type="text" name="comment" placeholder="자유롭게 남겨주세요..." />
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
