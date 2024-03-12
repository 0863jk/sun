import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, CardGroup, Col, Form, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import { List, Result, message } from 'antd';
import { getMemberRegisterInfo } from '../../../apis/api/Member';
import { getCenterProgramsByUserId, getProgram } from '../../../apis/api/Program';
import { getUserProgramReview, postReview, updateReview } from '../../../apis/api/Review';
import { cancelBook } from '../../../apis/api/Enrolment';
import CenterNav from '../../../Component/Nav/CenterNav';
import PassCard from '../../../Component/Card/PassCard';

const MyPageGeneral = () => {
    const { pCenterId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const userInfo = useSelector((state) => state.UserInfo);
    const username = useRef(userInfo.username);
    const [registerData, setRegisterData] = useState({
        pass_info: "",
    });
    const [programs, setPrograms] = useState([]);
    const [program, setProgram] = useState("");
    const [review, setReview] = useState({
        satisfaction: "",
        difficulty: "",
        teaching: "",
        recommend: "",
        comment: "",
    });
    const { satisfaction, difficulty, teaching, recommend, comment } = review;
    const [messageApi, contextHolder] = message.useMessage();

    const alertMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    useEffect(() => {
        getMemberRegisterInfo(authToken.current, pCenterId, username.current)
            .then(data => {
                setRegisterData(data);
            })
        getCenterProgramsByUserId(authToken.current, pCenterId, username.current)
            .then(data => {
                setPrograms(data);
            })
    }, [])

    const selectProgram = (program) => {
        setProgram(program);
        getProgram(authToken.current, program.program_id)
            .then(data => {
                setProgram(data);
            })
        getUserProgramReview(authToken.current, program.program_id, username.current)
            .then(data => {
                if (data.length > 0) {
                    setReview(data[0]);
                } else {
                    setReview({
                        satisfaction: "",
                        difficulty: "",
                        teaching: "",
                        recommend: "",
                        comment: "",
                    })
                }
            })
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        setReview({
            ...review,
            [name]: value,
        })
    }
    const onSubmit = () => {
        if (review.id) {
            const data = {
                ...review,
                satisfaction: parseInt(satisfaction),
                difficulty: parseInt(difficulty),
                teaching: parseInt(teaching),
                recommend: parseInt(recommend),
                comment: "",
            }
            updateReview(authToken.current, review.id, data)
                .then(response => {
                    if (response === 200) {
                        alertMessage("success", "수정되었습니다.")
                    }
                })
        } else {
            const data = {
                center_id: pCenterId,
                user_id: username.current,
                program_id: program.program_id,
                template_id: program.template_id,
                satisfaction: parseInt(satisfaction),
                difficulty: parseInt(difficulty),
                teaching: parseInt(teaching),
                recommend: parseInt(recommend),
                comment: "",
            }
            postReview(authToken.current, data)
                .then(response => {
                    if (response === 201) {
                        alertMessage("success", "등록되었습니다.")
                    }
                })
        }
    }

    const onCancelBook = (program) => {
        const data = {
            program_id: program.program_id,
            user_id: username.current,
        }
        cancelBook(authToken.current, data)
            .then(response => {
                if (response.status === 200) {
                    alertMessage("success", "취소되었습니다.")
                } else {
                    alertMessage("error", "오류")
                }
            })
    }

    return (
        <div>
            {contextHolder}
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="main-container">
                    <div className="label-wrapper">
                        <label className="label-title">나의 이용내역</label>
                        <div className="content-wrap" style={{ marginBottom: "20px" }}>
                            {
                                registerData.pass_info ? (
                                    <>
                                        <div className="cardlist-container">
                                            <CardGroup className="CardGroup">
                                                <PassCard pass={registerData.pass_info} />
                                            </CardGroup>
                                        </div>
                                        <label className="DateInfo">등록일은 {dayjs(registerData.register_date).format("YYYY년 MM월 DD일")}이며 수강권 만료일은 {dayjs(registerData.expire_date).format("YYYY년 MM월 DD일")}입니다.</label>
                                    </>
                                ) : (
                                    <div>
                                        <Result
                                            title="등록된 수강권 정보가 없습니다."
                                        />
                                    </div>
                                )
                            }
                        </div>
                        <div className="content-wrap">
                            {
                                programs.length > 0 ? (
                                    <div style={{ display: "flex", height: "600px" }}>
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
                                                dataSource={programs}
                                                renderItem={(item) => (
                                                    <List.Item
                                                        style={{ cursor: "pointer", textAlign: "left" }}
                                                        actions={
                                                            dayjs() < dayjs(item.start_time) ? (
                                                                [<label style={{ cursor: "pointer" }} onClick={() => onCancelBook(item)}>취소</label>,
                                                                <label>
                                                                    예정
                                                                </label>]
                                                            ) : dayjs() > dayjs(item.start_time) ? (
                                                                [
                                                                    <label>
                                                                        강의 완료
                                                                    </label>
                                                                ]
                                                            ) : [
                                                                <label>
                                                                    강의 중
                                                                </label>
                                                            ]
                                                        }
                                                    >
                                                        <List.Item.Meta
                                                            style={{ marginLeft: "15px" }}
                                                            title={<>{item.program_name}</>}
                                                            description={item.program_description}
                                                            onClick={() => selectProgram(item)}
                                                        />
                                                    </List.Item>
                                                )}
                                            />
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
                                                program ? (
                                                    <div style={{
                                                        width: "100%",
                                                        flexDirection: "column",
                                                    }}>
                                                        <div style={{ display: "block", flexDirection: "row" }}>
                                                            <div style={{ display: "flex", flexDirection: "column" }}>
                                                                <label style={{ fontSize: "20px", fontWeight: "bold" }}>{program.program_name}</label>
                                                                <label style={{ color: "gray" }}>{program.program_date} 강의</label>
                                                            </div>
                                                            <div style={{ width: "100%", padding: "10px", display: "block" }}>
                                                                <Form.Group as={Row} className="mb-3">
                                                                    <Form.Label column sm="2">
                                                                        프로그램 이름
                                                                    </Form.Label>
                                                                    <Col sm="10">
                                                                        <Form.Control type="text" name="program_name"
                                                                            value={program.program_name}
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="mb-3">
                                                                    <Form.Label column sm="2">
                                                                        프로그램 설명
                                                                    </Form.Label>
                                                                    <Col sm="10">
                                                                        <Form.Control type="text" name="program_description"
                                                                            value={program.program_description}
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="mb-3">
                                                                    <Form.Label column sm="2">
                                                                        강사
                                                                    </Form.Label>
                                                                    <Col style={{ display: "flex", flexDirection: "row" }}>
                                                                        <Form.Select
                                                                            name="instroctor_id"
                                                                            value={program.instroctor_id}
                                                                            disabled
                                                                        >
                                                                            <option>
                                                                                {program.instroctor_name}
                                                                            </option>
                                                                        </Form.Select>
                                                                        <Form.Control
                                                                            style={{ marginLeft: "20px" }}
                                                                            type="text"
                                                                            name="program_location"
                                                                            value={program.program_location}
                                                                            disabled
                                                                        />
                                                                    </Col>
                                                                </Form.Group>
                                                            </div>
                                                            <div style={{ width: "100%", display: "block" }}>
                                                                {
                                                                    dayjs() > dayjs(program.end_time) ? (
                                                                        <Form>
                                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                                <Form.Label>강의는 만족스러우셨나요?</Form.Label>
                                                                                <div >
                                                                                    <Form.Check inline type="radio" label="매우 만족 못함" value="0" name="satisfaction" checked={(satisfaction === "0" || satisfaction === 0) ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="만족 못함" value="2" name="satisfaction" checked={(satisfaction === "2" || satisfaction === 2) ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="조금 만족 못함" value="4" name="satisfaction" checked={(satisfaction === "4" || satisfaction === 4) ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="조금 만족함" value="6" name="satisfaction" checked={(satisfaction === "6" || satisfaction === 6) ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="만족함" value="8" name="satisfaction" checked={(satisfaction === "8" || satisfaction === 8) ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="매우 만족함" value="10" name="satisfaction" checked={(satisfaction === "10" || satisfaction === 10) ? true : false} onChange={onChange} />
                                                                                </div>
                                                                            </Form.Group>
                                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                                <Form.Label>난이도는 어땠나요?</Form.Label>
                                                                                <div >
                                                                                    <Form.Check inline type="radio" label="매우 어려움" value="10" name="difficulty" checked={difficulty === "10" || difficulty === 10 ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="어려움" value="8" name="difficulty" checked={difficulty === "8" || difficulty === 8 ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="조금 어려움" value="6" name="difficulty" checked={difficulty === "6" || difficulty === 6 ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="조금 쉬움" value="4" name="difficulty" checked={difficulty === "4" || difficulty === 4 ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="쉬움" value="2" name="difficulty" checked={difficulty === "2" || difficulty === 2 ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="매우 쉬움" value="0" name="difficulty" checked={difficulty === "0" || difficulty === 0 ? true : false} onChange={onChange} />
                                                                                </div>
                                                                            </Form.Group>
                                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                                <Form.Label>강사의 지도는 만족스러웠나요?</Form.Label>
                                                                                <div >
                                                                                    <Form.Check inline type="radio" label="매우 만족하지 못함" value="0" name="teaching" checked={teaching === "0" || teaching === 0 ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="만족하지 못함" value="3" name="teaching" checked={teaching === "3" || teaching === 3 ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="만족함" value="6" name="teaching" checked={teaching === "6" || teaching === 6 ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="매우 만족함" value="10" name="teaching" checked={teaching === "10" || teaching === 10 ? true : false} onChange={onChange} />
                                                                                </div>
                                                                            </Form.Group>
                                                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                                                <Form.Label>이 강의를 추천하시나요?</Form.Label>
                                                                                <div>
                                                                                    <Form.Check inline type="radio" label="추천하지 않음" value="0" name="recommend" checked={(recommend === "0" || recommend === 0) ? true : false} onChange={onChange} />
                                                                                    <Form.Check inline type="radio" label="추천함" value="10" name="recommend" checked={(recommend === "10" || recommend === 10) ? true : false} onChange={onChange} />
                                                                                </div>
                                                                            </Form.Group>
                                                                            <Button variant="primary" onClick={onSubmit}>
                                                                                등록
                                                                            </Button>
                                                                        </Form>
                                                                    ) : (
                                                                        <></>
                                                                    )
                                                                }
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
                                            title="수강 이력이 존재하지 않습니다"
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default MyPageGeneral;
