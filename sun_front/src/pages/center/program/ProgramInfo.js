import React, { useEffect, useRef, useState } from 'react';
import CenterNav from '../../../Component/Nav/CenterNav';
import dayjs from 'dayjs';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { List, message } from 'antd';
import SearchUserModal from '../../../Component/Modal/SearchUserModal';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getProgram, updateProgram } from '../../../apis/api/Program';
import { cancelBook, getProgramApplicants, getProgramAttendance, postEnrolment, updateEnrolment } from '../../../apis/api/Enrolment';
import { getCenterInstroctorList } from '../../../apis/api/Instroctor';

const ProgramInfo = () => {
    const { pCenterId, pProgramId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const userInfo = useSelector((state) => state.UserInfo);
    const username = useRef(userInfo.username);
    const role = useRef(userInfo.role);
    const [searchUserModalState, setSearchUserModalState] = useState(false);
    const [program, setProgram] = useState({});
    const [instroctors, setInstroctors] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const [saveState, setSaveState] = useState(true);

    useEffect(() => {
        getProgram(authToken.current, pProgramId)
            .then(data => {
                setProgram(data)
            });
        getProgramAttendance(authToken.current, pProgramId)
            .then(data => {
                setApplicants(data);
            });
        getCenterInstroctorList(authToken.current, pCenterId)
            .then(data => {
                setInstroctors(data);
            })
    }, [searchUserModalState])

    const reloadData = () => {
        getProgram(authToken.current, pProgramId)
            .then(data => {
                setProgram(data)
            });
        getProgramAttendance(authToken.current, pProgramId)
            .then(data => {
                setApplicants(data);
            });
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
                        alertMessage("success", "수정됐습니다.")
                    }
                })
        }
    }
    const handleSearchUserModalState = () => {
        setSearchUserModalState(!searchUserModalState);
    }

    const handleAttendance = (member) => {
        const data = {
            ...member,
            attendance: !member.attendance
        }
        updateEnrolment(authToken.current, member.id, data)
            .then(response => {
                if (response === 200) {
                    messageApi.open({
                        type: 'success',
                        content: `${member.name}님 출석 여부 변경`,
                    });
                    reloadData();
                } else {
                    messageApi.open({
                        type: 'error',
                        content: `오류가 발생했습니다.`,
                    });
                    reloadData();
                }
            });
    }
    const handleOnDelete = (member) => {
        const data = {
            program_id: program.program_id,
            user_id: member.username,
        }
        cancelBook(authToken.current, data)
            .then(response => {
                if (response.status === 200) {
                    messageApi.open({
                        type: 'success',
                        content: `삭제 완료`,
                    });
                    reloadData();
                } else {
                    messageApi.open({
                        type: 'error',
                        content: `오류가 발생했습니다.`,
                    });
                    reloadData();
                }
            });
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
                                    <label className="label-title">{program.program_name}</label>
                                    <label style={{ fontSize: "15px", color: "gray" }}>
                                        {dayjs(program.start_time).format("YYYY-MM-DD 강의 ")}
                                        {dayjs() < dayjs(program.start_time) ? (<>예정</>) : <></>}</label>
                                </div>
                                {
                                    program.program_type === "private_lesson" ? (
                                        <>
                                            <div>
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
                                            </div>

                                        </>
                                    ) : program.program_type === "public_class" ? (
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
                                            강사 및 장소
                                        </Form.Label>
                                        <Col>
                                            <div style={{ display: "flex" }}>
                                                <Form.Select
                                                    style={{ width: "60%" }}
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
                                                <Form.Control style={{ width: "40%", marginLeft: "10px" }} type="text" name="program_location" onChange={onChange} value={program.program_location} disabled={saveState} />
                                            </div>
                                        </Col>
                                    </Form.Group>
                                    {
                                        program.program_type === "private_lesson" ? (
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm="2">
                                                    수강 인원 및 예약
                                                </Form.Label>
                                                <Col sm="10">
                                                    <div style={{ display: "flex" }}>
                                                        <Form.Control type="text" name="number_of_applicants" onChange={onChange} value={applicants.length} disabled /> <label style={{ padding: "8px" }}> / </label>
                                                        <Form.Control type="text" name="max_capacity" onChange={onChange} value={program.max_capacity} disabled={saveState} />
                                                        <Form.Select
                                                            style={{ marginLeft: "10px" }}
                                                            name="book_available"
                                                            onChange={onChange}
                                                            value={program.book_available}
                                                            disabled={saveState}>
                                                            <option value={"true"}>
                                                                예약 가능
                                                            </option>
                                                            <option value={"false"}>
                                                                예약 불가능
                                                            </option>
                                                        </Form.Select>
                                                    </div>
                                                </Col>
                                            </Form.Group>
                                        ) : saveState === false ? (<Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm="2">
                                                수강 인원 및 예약
                                            </Form.Label>
                                            <Col sm="10">
                                                <div style={{ display: "flex" }}>
                                                    <Form.Control type="text" name="number_of_applicants" onChange={onChange} value={applicants.length} disabled /> <label style={{ padding: "8px" }}> / </label>
                                                    <Form.Control type="text" name="max_capacity" onChange={onChange} value={program.max_capacity} disabled={saveState} />
                                                    <Form.Select
                                                        style={{ marginLeft: "10px" }}
                                                        name="book_available"
                                                        onChange={onChange}
                                                        value={program.book_available}
                                                        disabled={saveState}>
                                                        <option value={"true"}>
                                                            예약 가능
                                                        </option>
                                                        <option value={"false"}>
                                                            예약 불가능
                                                        </option>
                                                    </Form.Select>
                                                </div>
                                            </Col>
                                        </Form.Group>
                                        ) : <></>
                                    }
                                </div>
                            </div>
                            <div>
                                <div style={{
                                    width: "100%",
                                    height: "300px",
                                    overflow: 'auto',
                                    borderRadius: '6px',
                                    border: '1px solid rgba(140, 140, 140, 0.35)',
                                    margin: "10px"
                                }}>
                                    <List
                                        itemLayout="horizontal"
                                        style={{
                                            textAlign: 'left',
                                            margin: '10px'
                                        }}
                                        dataSource={applicants}
                                        renderItem={(item) => (
                                            <List.Item
                                                style={{ marginLeft: "20px" }}
                                                actions={
                                                    item.attendance === true ? (
                                                        [
                                                            <label
                                                                style={{ cursor: "pointer", color: "green" }}
                                                                onClick={() => handleAttendance(item)}
                                                            >
                                                                출석
                                                            </label>,
                                                            <label
                                                                style={{ cursor: "pointer", }}
                                                                onClick={() => handleOnDelete(item)}
                                                            >
                                                                삭제
                                                            </label>]
                                                    ) : item.attendance === false ? (
                                                        [
                                                            <label
                                                                style={{ cursor: "pointer", color: "red" }}
                                                                onClick={() => handleAttendance(item)}
                                                            >
                                                                결석
                                                            </label>,
                                                            <label
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleOnDelete(item)}
                                                            >
                                                                삭제
                                                            </label>]
                                                    ) : []
                                                }>
                                                <List.Item.Meta
                                                    title={item.name}
                                                    description={item.username}
                                                />
                                            </List.Item>
                                        )}
                                    />
                                </div>
                            </div>
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

export default ProgramInfo;
