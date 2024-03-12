import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCenterTemplateWithStatus, getInstroctorTemplateWithStatus, postTemplate } from '../../../apis/api/Template';
import { getCenterInstroctorList } from '../../../apis/api/Instroctor';
import CenterNav from '../../../Component/Nav/CenterNav';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { List, Result } from 'antd';

const MyPageTemplate = () => {
    const { pCenterId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const userInfo = useSelector((state) => state.UserInfo);
    const username = useRef(userInfo.username);
    const [saveState, setSaveState] = useState(true);
    const [instroctors, setInstroctors] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState("");
    const [templateRegisterModalState, setTemplateRegisterModalState] = useState(false);

    useEffect(() => {
        getInstroctorTemplateWithStatus(authToken.current, pCenterId, username.current)
            .then(data => {
                setTemplates(data);
            })
        getCenterInstroctorList(authToken.current, pCenterId)
            .then(data => {
                setInstroctors(data);
            })
    }, [])

    const handleTemplateRegisterModalState = () => {
        setTemplateRegisterModalState(!templateRegisterModalState);
    }

    const onChange = (event) => {
        const { name, value } = event.target;

    }

    const selectTemplate = (template) => {
        setTemplate(template);
    }

    return (
        <div>
            <div>
                <div>
                    <div className="header">
                        <CenterNav centerid={pCenterId} />
                    </div>
                    <div className="main-container">
                        <div className="content-container">
                            <div className="title-wrap" style={{ display: "flex" }}>
                                <div style={{ width: "50%", textAlign: "left" }}>
                                    <label className="label-title">나의 정규 수업 관리</label>
                                </div>
                            </div>
                            <div className="content-wrap">
                                {
                                    templates.length > 0 ? (
                                        <div style={{ display: "flex", height: "500px" }}>
                                            <div style={{
                                                width: "30%",
                                                background: "rgba(140, 140, 140, 0.35)",
                                                overflow: 'auto',
                                                borderRadius: '6px',
                                                border: '1px solid rgba(140, 140, 140, 0.35)',
                                                margin: "10px"
                                            }}>
                                                <List
                                                    style={{ background: "white" }}
                                                    dataSource={templates}
                                                    renderItem={(item) => (
                                                        <List.Item
                                                            style={{ cursor: "pointer" }}>
                                                            <List.Item.Meta
                                                                title={<>{item.program_name}</>}
                                                                description={item.program_description}
                                                                onClick={() => selectTemplate(item)}
                                                            />
                                                        </List.Item>
                                                    )}
                                                >
                                                </List>
                                            </div>
                                            <div style={{
                                                width: "70%",
                                                borderRadius: '6px',
                                                margin: "10px",
                                                display: "block",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}>
                                                {
                                                    template ? (
                                                        <div style={{
                                                            width: "100%",
                                                            flexDirection: "column",
                                                        }}>
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
                                                                            강사
                                                                        </Form.Label>
                                                                        <Col>
                                                                            <Form.Select
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
                                                                        </Col>
                                                                    </Form.Group>
                                                                    <Form.Group as={Row} className="mb-3">
                                                                        <Form.Label column sm="2">
                                                                            장소
                                                                        </Form.Label>
                                                                        <Col sm="10">
                                                                            <Form.Control type="text" name="program_location" onChange={onChange} value={template.program_location} disabled={saveState} />
                                                                        </Col>
                                                                    </Form.Group>
                                                                </div>
                                                            </div>
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
                                                            </div>
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    margin: "20px"
                                                                }}>
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
                                                    ) :
                                                        (
                                                            <div
                                                                style={{
                                                                    width: "100%",
                                                                    height: "100%",
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "center"
                                                                }}>
                                                                <div>
                                                                    <label>리스트에서 강의를 선택하시면 해당 강의의 정보가 표시됩니다.</label>
                                                                </div>
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <Result
                                                title="등록된 강의가 없습니다."
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MyPageTemplate;
