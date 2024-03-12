import { Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { deleteBookProgram, postEnrolment } from '../../apis/api/Enrolment';
import { useSelector } from 'react-redux';

const ProgramInfoModal = (props) => {
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const userInfo = useSelector((state) => state.UserInfo);
    const username = useRef(userInfo.username);
    const role = useRef(userInfo.role);

    const [program, setProgram] = useState({
        program_name: '',
        instroctor_name: '',
        program_location: '',
        program_description: '',
        number_of_applicants: '',
        max_capacity: '',
        book_state: ''
    });

    useEffect(() => {
        if (props.program) {
            setProgram(props.program);
            console.log(props.program);
        }
    }, [props.program])

    const bookProgram = () => {
        props.bookProgram(program);
    }

    const cancelBook = () => {
        props.cancelBook(program);
    }

    return (
        <Modal
            centered
            title={program.program_name ? (
                program.program_type === "private_lesson" ? (
                    <div style={{ textAlign: "center" }}>
                        <label style={{ fontSize: "20px" }}>{program.program_name}</label>
                        <div>
                            <label style={{ fontSize: "12px", color: "white", background: "lightpink", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px", margin: "5px" }}>
                                예약제 수업
                            </label>
                            {
                                program.book_available === true || program.book_available === "true" ? (
                                    <label style={{ fontSize: "12px", color: "white", background: "green", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px" }}>
                                        예약 가능
                                    </label>
                                ) : (
                                    <label style={{ fontSize: "12px", color: "white", background: "gray", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px" }}>
                                        예약 불가능
                                    </label>
                                )
                            }
                        </div>

                    </div>
                ) : (
                    <div style={{ textAlign: "center" }}>
                        <label style={{ fontSize: "20px" }}>{program.program_name}</label>
                        <div>
                            <label style={{ fontSize: "12px", color: "white", background: "lightblue", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px", margin: "5px" }}>
                                공개 수업
                            </label>
                        </div>
                    </div>
                )
            ) : ''}
            open={props.modalVisible}
            onCancel={props.handleModalVisible}
            footer={null}>
            <div style={{ textAlign: 'center' }}>
                {program.program_name ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{ width: "50%" }}>
                            <Row style={{ margin: "5px" }}>
                                <Col>
                                    <label>
                                        강사
                                    </label>
                                </Col>
                                <Col>
                                    {program.instroctor_name}
                                </Col>
                            </Row>
                            <Row style={{ margin: "5px" }}>
                                <Col>
                                    강의실
                                </Col>
                                <Col>
                                    {program.program_location}
                                </Col>
                            </Row>
                            <Row style={{ margin: "5px" }}>
                                <Col>
                                    수강 예약 인원
                                </Col>
                                <Col>
                                    {program.number_of_applicants} / {program.max_capacity}
                                </Col>
                            </Row>
                        </div>
                        <div style={{ margin: "20px" }}>
                            <label>
                                {program.program_description}
                            </label>
                        </div>
                        <div>
                            {
                                role.current === "general" && program.book_state === false ? (
                                    <Button
                                        onClick={bookProgram}
                                        disabled={!program.book_available}>수강 예약하기</Button>
                                ) : program.book_state === true ? (
                                    <Button
                                        onClick={cancelBook}>예약 취소</Button>
                                ) : <></>
                            }
                            {
                                role.current === "manager" || program.instroctor_id === username.current ? (
                                    <Button
                                        href={`/program/${program.center_id}/${program.program_id}`}>강의 정보 페이지로 이동</Button>
                                ) : <></>
                            }
                        </div>

                    </div>
                ) : <></>}
            </div>
        </Modal>
    );
}

export default ProgramInfoModal;
