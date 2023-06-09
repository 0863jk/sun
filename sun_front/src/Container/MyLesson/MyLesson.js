import { Link, useParams } from "react-router-dom";
import LessonCard from "../../Component/Card/LessonCard"
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import { useEffect, useState } from "react";
import useFetch from "../../Hook/useFetch";
import { Divider, Modal } from "antd";
import { Button, Form } from "react-bootstrap";

function MyLesson() {
    const { pCenterId } = useParams();
    const username = localStorage.getItem("username");
    const lessons = useFetch(`http://localhost:8000/lesson/timetableblock/history/trainer?centerid=${pCenterId}&userid=${username}`);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [reviews, setReviews] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if(selectedLesson) {
            fetch(`http://localhost:8000/lesson/lessonreview/get?blockid=${selectedLesson.blockid}`)
            .then(res => console.log(res))
            .then(data => setReviews(data));
        }
    },[selectedLesson]);

    const handleOpenModal = (data) => {
        setSelectedLesson(data);
        setModalVisible(true);
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">나의 레슨</label>
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
                                <p>총 {reviews.length}개의 리뷰가 존재합니다.</p>
                            </div>
                        </>
                    )
                }
            </Modal>
        </>
    );
}

export default MyLesson;
