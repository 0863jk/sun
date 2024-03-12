import React, { useEffect, useRef, useState } from 'react';
import CenterNav from '../../../Component/Nav/CenterNav';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { DatePicker, List } from 'antd';
import { cancelBook, getProgramApplicants, postBookProgram, postEnrolment } from '../../../apis/api/Enrolment';
import { useSelector } from 'react-redux';
import { getCenterPrograms, getProgram, updateProgram } from '../../../apis/api/Program';
import dayjs from 'dayjs';
import SearchUserModal from '../../../Component/Modal/SearchUserModal';
import { getCenterInstroctorList } from '../../../apis/api/Instroctor';

const ApplicantsList = () => {
    const { pCenterId, pProgramId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const userInfo = useSelector((state) => state.UserInfo);
    const username = useRef(userInfo.username);
    const role = useRef(userInfo.role);
    const [searchUserModalState, setSearchUserModalState] = useState(false);
    const [program, setProgram] = useState({});
    const [instroctors, setInstroctors] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [applicant, setApplicant] = useState("");
    const [saveState, setSaveState] = useState(true);

    useEffect(() => {
        getProgram(authToken.current, pProgramId)
            .then(data => {
                setProgram(data)
            });
        getProgramApplicants(authToken.current, pProgramId)
            .then(data => {
                setApplicants(data);
            });
        getCenterInstroctorList(authToken.current, pCenterId)
            .then(data => {
                setInstroctors(data);
            })
    }, [searchUserModalState, applicant])

    const selectApplicant = (applicant) => {
        setApplicant(applicant);
    }

    const handleUpdateData = () => {

    }

    const handleDeleteApplicant = (applicant) => {
        const data = {
            program_id: program.program_id,
            user_id: applicant.username
        }
        cancelBook(authToken.current, data)
            .then(response => {
                if (response.statusText === "OK") {
                    alert("삭제됐습니다.");
                    setApplicant("");
                } else {
                    alert("오류");
                }
            })
    }

    const handleSubmit = async (data) => {
        const promises = data.map(data => {
            const inputData = {
                program_id: program.program_id,
                user_id: data.username,
                week_id: program.week_id,
                center_id: pCenterId,
            };
            return postEnrolment(authToken.current, inputData)
                .then(response => (response === 201));  // 성공 시 true, 실패 시 false
        });

        try {
            const responses = await Promise.all(promises);
            const successCount = responses.filter(response => response).length;

            // 모든 요청이 성공했는지 여부와 성공한 갯수를 반환
            return successCount;
        } catch (err) {
            console.log(err);
            return 0;
        }
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        setProgram({
            ...program,
            [name]: value,
        })
    }

    const handleSaveState = () => {
        setSaveState(!saveState);
        if (!saveState) {
            updateProgram(authToken.current, program.program_id, program)
                .then(data => {
                    if (data === 200) {
                        alert("수정됐습니다.")
                    }
                })
        }
    }
    const handleSearchUserModalState = () => {
        setSearchUserModalState(!searchUserModalState);
    }

    return (
        <div>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="main-container">
                    <div className="content-container">
                        <div className="title-wrap" style={{ display: "flex" }}>
                            <div style={{ width: "50%", textAlign: "left" }}>
                                <label className="label-title">{program.program_name}</label>
                                {
                                    program.program_type === "private_lesson" ? (
                                        <>
                                            <label style={{ color: "white", background: "lightpink", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px", margin: "5px" }}>
                                                예약제 수업
                                            </label>
                                            {
                                                program.book_available === true || program.book_available === "true" ? (
                                                    <label style={{ color: "white", background: "green", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px", margin: "5px" }}>
                                                        예약 가능
                                                    </label>
                                                ) : program.book_available === false || program.book_available === "false" ? (
                                                    <label style={{ color: "white", background: "gray", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px", margin: "5px" }}>
                                                        예약 불가능
                                                    </label>
                                                ) : <></>
                                            }
                                        </>
                                    ) : program.program_type === "public_class" ? (
                                        <label style={{ color: "white", background: "lightblue", borderRadius: "15px", paddingRight: "10px", paddingLeft: "10px", margin: "5px" }}>
                                            공개 수업
                                        </label>
                                    ) : <></>
                                }
                            </div>
                            <div style={{ width: "50%", textAlign: "right" }}>
                                {
                                    dayjs(program.start_time) > dayjs() ? (
                                        <label style={{ marginRight: "20px", color: "gray" }}>
                                            강의 예정
                                        </label>
                                    ) : dayjs(program.start_time) < dayjs() && dayjs(program.end_time) > dayjs() ? (
                                        <label style={{ marginRight: "20px", color: "red" }}>
                                            강의 중
                                        </label>
                                    ) : (
                                        <label style={{ marginRight: "20px", color: "green" }}>
                                            강의 완료
                                        </label>
                                    )
                                }
                                <Button variant='outline-primary' onClick={handleSearchUserModalState} >
                                    회원 추가하기
                                </Button>
                                {
                                    (role.current === "manager" || username.current === program.instroctor_id) && saveState ? (
                                        <Button type="primary" onClick={handleSaveState} style={{ marginLeft: "10px" }}>
                                            수정하기
                                        </Button>
                                    ) : (role.current === "manager" || username.current === program.instroctor_id) && !saveState ? (
                                        <Button type="primary" onClick={handleSaveState} style={{ marginLeft: "10px" }}>
                                            저장하기
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
                                            <Form.Control type="text" name="program_name" onChange={onChange} value={program.program_name} disabled={saveState} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="2">
                                            프로그램 설명
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" name="program_description" onChange={onChange} value={program.program_description} disabled={saveState} />
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
                                                value={program.instroctor_id}
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
                                            <Form.Control type="text" name="program_location" onChange={onChange} value={program.program_location} disabled={saveState} />
                                        </Col>
                                    </Form.Group>
                                    {
                                        program.program_type === "private_lesson" ? (
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="2">
                                                    수강 인원
                                                </Form.Label>
                                                <Col sm="10">
                                                    <div style={{ display: "flex" }}>
                                                        <Form.Control type="text" name="number_of_applicants" onChange={onChange} value={applicants.length} disabled /> <label style={{ padding: "8px" }}> / </label>
                                                        <Form.Control type="text" name="max_capacity" onChange={onChange} value={program.max_capacity} disabled={saveState} />
                                                    </div>
                                                </Col>
                                            </Form.Group>
                                        ) : <></>
                                    }

                                </div>
                            </div>
                            {
                                applicants.length > 0 ? (
                                    <div style={{ display: "flex", maxHeight: "600px", }}>
                                        <div style={{
                                            width: "40%",
                                            background: "rgba(140, 140, 140, 0.35)",
                                            overflow: 'auto',
                                            borderRadius: '6px',
                                            border: '1px solid rgba(140, 140, 140, 0.35)',
                                            margin: "10px"
                                        }}>
                                            <List style={{ background: "white" }}>
                                                {
                                                    applicants.map(applicant => (
                                                        <List.Item key={applicant.email}>
                                                            <List.Item.Meta
                                                                title={<>{applicant.last_name}{applicant.first_name}</>}
                                                                description={applicant.email}
                                                                onClick={() => selectApplicant(applicant)}
                                                            />
                                                            <div style={{ padding: "10px" }}>
                                                                출석
                                                            </div>
                                                        </List.Item>
                                                    ))
                                                }
                                            </List>
                                        </div>
                                        <div style={{
                                            width: "80%",
                                            maxHeight: "600px",
                                            background: "rgba(140, 140, 140, 0.35)",
                                            overflow: 'auto',
                                            borderRadius: '6px',
                                            border: '1px solid rgba(140, 140, 140, 0.35)',
                                        }}>
                                            {
                                                applicant ? (
                                                    <div style={{
                                                        width: "100%",
                                                        height: "100%",
                                                        display: "flex",
                                                        flexWrap: "wrap",
                                                    }}>
                                                        <div style={{ width: "100%", display: "flex", }}>
                                                            <div style={{ width: "65%", height: "100%", padding: "10px" }}>
                                                                <Form.Group as={Row} className="mb-3">
                                                                    <Form.Label column sm="2">
                                                                        NAME
                                                                    </Form.Label>
                                                                    <Col sm="10">
                                                                        <Form.Control type="text" name="name" value={applicant.name} disabled={saveState} />
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="mb-3">
                                                                    <Form.Label column sm="2">
                                                                        PHONE
                                                                    </Form.Label>
                                                                    <Col sm="10">
                                                                        <Form.Control type="text" value={`${applicant.phone1}-${applicant.phone2}-${applicant.phone3}`} disabled={saveState} />
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="mb-3">
                                                                    <Form.Label column sm="2">
                                                                        EMAIL
                                                                    </Form.Label>
                                                                    <Col sm="10">
                                                                        <Form.Control type="text" value={applicant.email} disabled={saveState} />
                                                                    </Col>
                                                                </Form.Group>
                                                            </div>
                                                            <div style={{ width: "35%", height: "100%", display: "flex", justifyContent: "center" }}>

                                                            </div>
                                                        </div>
                                                        <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                                            <Button disabled={saveState} onClick={handleUpdateData}>저장</Button>
                                                            <Button onClick={() => handleDeleteApplicant(applicant)}>삭제</Button>
                                                        </div>
                                                    </div>
                                                ) : <></>
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div>

                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <SearchUserModal
                role="general"
                centerId={pCenterId}
                modalVisible={searchUserModalState}
                handleSubmit={handleSubmit}
                handleCloseModal={handleSearchUserModalState}
            />

        </div>
    );
}

export default ApplicantsList;
