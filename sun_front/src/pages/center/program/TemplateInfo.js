import React, { useEffect, useRef, useState } from 'react';
import CenterNav from '../../../Component/Nav/CenterNav';
import { useParams } from 'react-router-dom';
import { List, message } from 'antd';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { cancelBook, gettemplateAttendance, postEnrolment, updateEnrolment } from '../../../apis/api/Enrolment';
import { getProgram, updateProgram } from '../../../apis/api/Program';
import { getCenterInstroctorList } from '../../../apis/api/Instroctor';
import SearchUserModal from '../../../Component/Modal/SearchUserModal';
import { getCenterTemplate, getTemplate, updateTemplate } from '../../../apis/api/Template';
import TemplateRegisterModal from '../../../Component/Modal/TemplateRegisterModal';

const TemplateInfo = () => {
    const { pCenterId, pTemplateId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const userInfo = useSelector((state) => state.UserInfo);
    const username = useRef(userInfo.username);
    const role = useRef(userInfo.role);
    const [modalVisible, setModalVisible] = useState(false);
    const [template, setTemplate] = useState({});
    const [instroctors, setInstroctors] = useState([]);
    const [saveState, setSaveState] = useState(true);

    useEffect(() => {
        getTemplate(authToken.current, pTemplateId)
            .then(data => {
                setTemplate(data)
            });
        getCenterInstroctorList(authToken.current, pCenterId)
            .then(data => {
                setInstroctors(data)
            });
    }, [modalVisible])

    const onChange = (event) => {
        const { name, value } = event.target;
        setTemplate({
            ...template,
            [name]: value,
        })
    }

    const handleModalVisible = () => {
        setModalVisible(!modalVisible);
    }

    const alertMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    return (
        <div>
            {contextHolder}
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="main-container">
                    <div className="content-container">
                        <div className="title-wrap" style={{ display: "flex" }}>
                            <div style={{ width: "50%", textAlign: "left", display: "flex" }}>
                                <div style={{ display: "block" }}>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <label className="label-title">{template.program_name}</label>
                                </div>
                                {
                                    template.program_type === "private_lesson" ? (
                                        <>
                                            <div>
                                                <label style={{ color: "white", background: "lightpink", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px", margin: "5px" }}>
                                                    예약제 수업
                                                </label>
                                                {
                                                    template.book_available === true || template.book_available === "true" ? (
                                                        <label style={{ color: "white", background: "green", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px", margin: "5px" }}>
                                                            예약 가능
                                                        </label>
                                                    ) : template.book_available === false || template.book_available === "false" ? (
                                                        <label style={{ color: "white", background: "gray", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px", margin: "5px" }}>
                                                            예약 불가능
                                                        </label>
                                                    ) : <></>
                                                }
                                            </div>

                                        </>
                                    ) : template.program_type === "public_class" ? (
                                        <div>
                                            <label style={{ color: "white", background: "lightblue", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px", margin: "5px" }}>
                                                공개 수업
                                            </label>
                                        </div>

                                    ) : <></>
                                }
                            </div>
                            <div style={{ width: "50%", textAlign: "right" }}>
                                {
                                    (role.current === "manager" || username.current === template.instroctor_id) ? (
                                        <Button type="primary" onClick={handleModalVisible} style={{ marginLeft: "10px" }}>
                                            수정하기
                                        </Button>
                                    ) : <></>
                                }
                            </div>
                        </div>

                        <div className="content-wrap">
                            <div>
                                <div style={{ padding: "10px" }}>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="2">
                                            프로그램 이름
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" name="program_name" onChange={onChange} value={template.program_name} disabled={saveState} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="2">
                                            프로그램 설명
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" name="program_description" onChange={onChange} value={template.program_description} disabled={saveState} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="2">
                                            강사 및 장소
                                        </Form.Label>
                                        <Col>
                                            <div style={{ display: "flex" }}>
                                                <Form.Select
                                                    style={{ width: "60%" }}
                                                    name="instroctor_id"
                                                    onChange={onChange}
                                                    value={template.instroctor_id}
                                                    disabled={saveState}>
                                                    <option>
                                                        강사 선택
                                                    </option>
                                                    {instroctors.length > 0 && instroctors.map(instroctor => (
                                                        <option value={instroctor.username} key={instroctor.id}>
                                                            {instroctor.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Form.Control style={{ width: "40%", marginLeft: "10px" }} type="text" name="program_location" onChange={onChange} value={template.program_location} disabled={saveState} />
                                            </div>
                                        </Col>
                                    </Form.Group>
                                    <div style={{
                                        margin: "30px",
                                    }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                marginLeft: "20px",
                                            }}>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "20%"
                                                }}>
                                                <label style={{ fontSize: "20px" }}>
                                                    강의 횟수
                                                </label>
                                                <div>
                                                    <label style={{ fontSize: "40px", fontWeight: "bold" }}>
                                                        {template.number_of_programs}
                                                    </label>
                                                    <label style={{ color: "gray" }}>
                                                        회
                                                    </label>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "20%"
                                                }}>
                                                <label style={{ fontSize: "20px" }}>
                                                    수강률
                                                </label>
                                                <div>
                                                    <label style={{ fontSize: "40px", fontWeight: "bold" }}>
                                                        {template.enrolment_rate}
                                                    </label>
                                                    <label style={{ color: "gray" }}>
                                                        %
                                                    </label>
                                                </div>
                                                <label style={{ color: "gray", fontSize: "12px" }}>
                                                    {/* {
                                                                            template.number_of_reviews < 10 && template.number_of_reviews > 0 ?
                                                                                <>리뷰 수가 적어요.<br />통계에 주의하세요.</>
                                                                                : template.number_of_reviews === 0 ?
                                                                                    <>리뷰가 존재하지 않습니다.</>
                                                                                    : <>리뷰가 10개 이상 있어요.</>
                                                                        } */}
                                                </label>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "20%"
                                                }}>
                                                <label style={{ fontSize: "20px" }}>
                                                    재수강률
                                                </label>
                                                <div>
                                                    <label style={{ fontSize: "40px", fontWeight: "bold" }}>
                                                        {template.reenrolment_rate}
                                                    </label>
                                                    <label style={{ color: "gray" }}>
                                                        %
                                                    </label>
                                                </div>
                                                <label style={{ color: "gray", fontSize: "12px" }}>
                                                    {/* {
                                                                            template.number_of_reviews < 10 && template.number_of_reviews > 0 ?
                                                                                <>리뷰 수가 적어요.<br />통계에 주의하세요.</>
                                                                                : template.number_of_reviews === 0 ?
                                                                                    <>리뷰가 존재하지 않습니다.</>
                                                                                    : <>리뷰가 10개 이상 있어요.</>
                                                                        } */}
                                                </label>
                                            </div>
                                            {/* </div> */}
                                            {/* <div
                                            style={{
                                                display: "flex",
                                                margin: "20px"
                                            }}> */}
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "20%"
                                                }}>
                                                <label style={{ fontSize: "20px" }}>
                                                    총 리뷰수
                                                </label>
                                                <label style={{ fontSize: "40px", fontWeight: "bold" }}>
                                                    {template.number_of_reviews}
                                                </label>
                                                <label style={{ color: "gray", fontSize: "12px" }}>
                                                    {
                                                        template.number_of_reviews < 10 && template.number_of_reviews > 0 ?
                                                            <>리뷰 수가 적어요.<br />통계에 주의하세요.</>
                                                            : template.number_of_reviews === 0 ?
                                                                <>리뷰가 존재하지 않습니다.</>
                                                                : <>리뷰가 10개 이상 있어요.</>
                                                    }
                                                </label>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "20%"
                                                }}>
                                                <label style={{ fontSize: "20px" }}>
                                                    평균 만족도
                                                </label>
                                                <label style={{ fontSize: "40px", fontWeight: "bold" }}>
                                                    {template.aver_satisfaction}
                                                </label>
                                                <label style={{ color: "gray", fontSize: "12px" }}>
                                                    {
                                                        template.aver_satisfaction >= 7.5 ?
                                                            <>만족도가 높은 강의예요!</>
                                                            : template.aver_satisfaction < 7.4 && template.aver_satisfaction >= 5.0 ?
                                                                <>적당한 만족도를 가졌어요.</>
                                                                : template.aver_satisfaction < 5.0 && template.aver_satisfaction > 0 ?
                                                                    <>만족도가 낮은 강의예요.</>
                                                                    :
                                                                    <></>
                                                    }
                                                </label>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "20%"
                                                }}>
                                                <label style={{ fontSize: "20px" }}>
                                                    난이도
                                                </label>
                                                <label style={{ fontSize: "40px", fontWeight: "bold" }}>
                                                    {template.aver_difficulty}
                                                </label>
                                                <label style={{ color: "gray", fontSize: "12px" }}>
                                                    {
                                                        template.aver_difficulty >= 7.5 ?
                                                            <>난이도가 어려운 강의예요.</>
                                                            : template.aver_difficulty < 7.4 && template.aver_difficulty >= 5.0 ?
                                                                <>적당한 난이도를 가졌어요.</>
                                                                : template.aver_difficulty < 5.0 && template.aver_difficulty > 0 ?
                                                                    <>난이도가 너무 쉬운 강의예요.</>
                                                                    :
                                                                    <></>
                                                    }
                                                </label>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "20%"
                                                }}>
                                                <label style={{ fontSize: "20px" }}>
                                                    강사의 큐잉
                                                </label>
                                                <label style={{ fontSize: "40px", fontWeight: "bold" }}>
                                                    {template.aver_teaching}
                                                </label>
                                                <label style={{ color: "gray", fontSize: "12px" }}>
                                                    {
                                                        template.aver_teaching >= 7.5 ?
                                                            <>큐잉 만족도가 높은 강의예요.</>
                                                            : template.aver_teaching < 7.4 && template.aver_teaching >= 5.0 ?
                                                                <>큐잉 만족도가 적당해요.</>
                                                                : template.aver_teaching < 5.0 && template.aver_teaching > 0 ?
                                                                    <>큐잉 만족도가 낮은 강의예요.</>
                                                                    :
                                                                    <></>
                                                    }
                                                </label>
                                            </div>
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "20%"
                                                }}>
                                                <label style={{ fontSize: "20px" }}>
                                                    추천 여부
                                                </label>
                                                <label style={{ fontSize: "40px", fontWeight: "bold" }}>
                                                    {template.aver_recommend}
                                                </label>
                                                <label style={{ color: "gray", fontSize: "12px" }}>
                                                    {
                                                        template.aver_recommend >= 5 ?
                                                            <>많은 사람들이 추천하는 강의예요.</>
                                                            : template.aver_recommend < 5.0 && template.aver_recommend > 0 ?
                                                                <>많은 사람들이 추천하지 않는 강의예요.</>
                                                                :
                                                                <></>
                                                    }
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TemplateRegisterModal
                modifyTemplate={template}
                modalVisible={modalVisible}
                handleCloseModal={handleModalVisible}
            />
        </div >
    );
}

export default TemplateInfo;
