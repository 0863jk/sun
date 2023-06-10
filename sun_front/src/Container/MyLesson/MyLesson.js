import { Link, useParams } from "react-router-dom";
import LessonCard from "../../Component/Card/LessonCard"
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import { useEffect, useState } from "react";
import useFetch from "../../Hook/useFetch";
import { Divider, Modal } from "antd";
import { Button, Form, Table } from "react-bootstrap";

function MyLesson() {
    const { pCenterId } = useParams();
    const username = localStorage.getItem("username");
    const lessons = useFetch(`http://localhost:8000/lesson/timetableblock/history/trainer?centerid=${pCenterId}&userid=${username}`);
    const [selectedLesson, setSelectedLesson] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (selectedLesson) {
            fetch(`http://localhost:8000/lesson/lessonreview/get?blockid=${selectedLesson.blockid}`)
                .then(res => {
                    return res.json();
                }).then(
                    data => {
                        console.log(data);
                        setReviews(data);
                    }
                )
        }
    }, [selectedLesson]);

    const handleOpenModal = (data) => {
        setSelectedLesson(data);
        setModalVisible(true);
    }

    const handleCloseModal = () => {
        setModalVisible(false);
    }

    return (
        <>
            <div className="header">
                <CenterNav centerid={pCenterId} />
            </div>
            <div className="main-container">
                <div className="label-wrapper">
                    <label className="label-title">나의 레슨</label>
                    <div className="content-container">
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
                <div style={{ textAlign: 'center' }}>
                    <h3>{selectedLesson.title}</h3>
                    {
                        reviews ? (
                            <>
                                <p>총 {reviews.length}개의 리뷰가 존재합니다.</p>
                                <Table striped bordered>
                                    <thead>
                                        <tr>
                                            <th colSpan={3}>난이도</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>쉬움</td>
                                            <td>보통</td>
                                            <td>어려움</td>
                                        </tr>
                                        <tr>
                                            <td>{reviews.filter(review => review.difficulty === 1).length}</td>
                                            <td>{reviews.filter(review => review.difficulty === 2).length}</td>
                                            <td>{reviews.filter(review => review.difficulty === 3).length}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Table striped bordered >
                                    <thead>
                                        <tr>
                                            <th colSpan={5}>강사의 지도가 적절했나요?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>매우 그렇다</td>
                                            <td>그렇다</td>
                                            <td>아니다</td>
                                            <td>매우 아니다</td>
                                        </tr>
                                        <tr>
                                            <td>{reviews.filter(review => review.teaching === 4).length}</td>
                                            <td>{reviews.filter(review => review.teaching === 3).length}</td>
                                            <td>{reviews.filter(review => review.teaching === 2).length}</td>
                                            <td>{reviews.filter(review => review.teaching === 1).length}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                                <Table striped bordered >
                                    <thead>
                                        <tr>
                                            <th colSpan={2}>추천 여부</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>추천함</td>
                                            <td>추천하지 않음</td>
                                        </tr>
                                        <tr>
                                            <td>{reviews.filter(review => review.recommend === 1).length}</td>
                                            <td>{reviews.filter(review => review.recommend === 0).length}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </>
                        ) : (
                            <p>아직 등록된 리뷰가 없어요.</p>
                        )
                    }
                </div>
            </Modal>
        </>
    );
}

export default MyLesson;
