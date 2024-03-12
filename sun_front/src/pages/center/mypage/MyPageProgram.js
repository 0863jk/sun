import React, { useEffect, useRef, useState } from 'react';
import SearchUserModal from '../../../Component/Modal/SearchUserModal';
import { List, Result } from 'antd';
import { Button, Col, Form, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import CenterNav from '../../../Component/Nav/CenterNav';
import { cancelBook, getProgramAttendance, postEnrolment, updateEnrolment } from '../../../apis/api/Enrolment';
import { postTemplate } from '../../../apis/api/Template';
import { getCenterInstroctorList } from '../../../apis/api/Instroctor';
import { getCenterPrograms, getCenterProgramsByInstroctorId } from '../../../apis/api/Program';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MyPageProgram = () => {
    const { pCenterId } = useParams();
    const userInfo = useSelector((state) => state.UserInfo);
    const username = useRef(userInfo.username);
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [saveState, setSaveState] = useState(true);
    const [instroctors, setInstroctors] = useState([]);
    const [members, setMembers] = useState();

    const [programs, setPrograms] = useState([]);
    const [program, setProgram] = useState("");
    const [SearchUserModalState, setSearchUserModalState] = useState(false);

    useEffect(() => {
        getCenterProgramsByInstroctorId(authToken.current, pCenterId, username.current)
            .then(data => {
                setPrograms(data);
            })
        getCenterInstroctorList(authToken.current, pCenterId)
            .then(data => {
                setInstroctors(data);
            })
    }, [])

    const handleSearchUserModalState = () => {
        setSearchUserModalState(!SearchUserModalState);
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        setProgram({
            ...program,
            [name]: value,
        })
    }

    const selectProgram = (program) => {
        setProgram(program);
        getProgramAttendance(authToken.current, program.program_id)
            .then(data => {
                if (data) {
                    setMembers(data);
                } else {
                    setMembers([]);
                }
            })
    }

    const handleAttendance = (member) => {
        const data = {
            ...member,
            attendance: !member.attendance
        }
        updateEnrolment(authToken.current, member.id, data)
            .then(response => {
                if (response === 200) {
                    alert("출석 여부 변경")
                    selectProgram(program);
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
                    alert("삭제 완료")
                    selectProgram(program);
                }
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
            selectProgram(program);
            return successCount;
        } catch (err) {
            console.log(err);
            return 0;
        }
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
                                    <label className="label-title">나의 모든 수업 관리</label>
                                </div>
                                <div style={{ width: "50%", textAlign: "right" }}>

                                </div>
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
                                                <List style={{ background: "white" }}>
                                                    {
                                                        programs.map(program => (
                                                            <List.Item
                                                                style={dayjs(program.start_time).diff(dayjs(), 'day') === 0 && dayjs(program.start_time) > dayjs() && dayjs(program.end_time) > dayjs() ? { cursor: "pointer", background: "lightyellow" }
                                                                    : dayjs(program.start_time).diff(dayjs(), 'day') === 0 && dayjs(program.start_time) < dayjs() > 0 && dayjs(program.start_time) < dayjs() && dayjs(program.end_time) > dayjs() ? { cursor: "pointer", background: "rgba(247, 215, 221, 1)" }
                                                                        : dayjs(program.start_time).diff(dayjs(), 'day') === 0 && dayjs(program.start_time) < dayjs() ? { cursor: "pointer", background: "rgba(240, 240, 240, 1)" }
                                                                            : dayjs(program.start_time).diff(dayjs(), 'day') < 0 ? { cursor: "pointer", background: "lightgray" }
                                                                                : { cursor: "pointer" }}
                                                                key={program.email}
                                                                actions={
                                                                    dayjs(program.start_time).diff(dayjs(), 'day') > 0 ? (
                                                                        [<label>
                                                                            {dayjs(program.start_time).diff(dayjs(), 'day')}일 뒤
                                                                        </label>]
                                                                    ) : dayjs(program.start_time).diff(dayjs(), 'day') === 0 && dayjs(program.start_time).diff(dayjs(), 'time') > 0 ? (
                                                                        [<label>
                                                                            {dayjs(program.start_time).diff(dayjs(), 'hour')}시간 뒤
                                                                        </label>]
                                                                    ) : dayjs(program.start_time).diff(dayjs(), 'day') === 0 && dayjs(program.start_time).diff(dayjs(), 'time') < 0 ? (
                                                                        [<label>
                                                                            {dayjs().diff(dayjs(program.start_time), 'hour')}시간 전
                                                                        </label>]
                                                                    ) : dayjs(program.start_time).diff(dayjs(), 'day') < 0 ? (
                                                                        [<label>
                                                                            {dayjs().diff(dayjs(program.start_time), 'day')}일 전
                                                                        </label>]
                                                                    ) : <></>
                                                                }>
                                                                <List.Item.Meta
                                                                    style={{ textAlign: "left", marginLeft: "15px" }}
                                                                    title={<>{program.program_name}</>}
                                                                    description={program.program_description}
                                                                    onClick={() => selectProgram(program)}
                                                                />
                                                            </List.Item>
                                                        ))
                                                    }
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
                                                    program ? (
                                                        <div style={{
                                                            width: "100%",
                                                            flexDirection: "column",
                                                        }}>
                                                            <div>
                                                                <div style={{ display: "flex", marginLeft: "20px", marginBottom: "5px" }}>
                                                                    <div style={{ width: "50%", textAlign: "left", display: "flex", flexDirection: "column" }}>
                                                                        <label style={{ fontSize: "20px", fontWeight: "bold" }}>{program.program_name}</label>
                                                                        <label style={{ fontSize: "15px", color: "gray" }}>
                                                                            {dayjs(program.start_time).format("YYYY-MM-DD 강의 ")}
                                                                            {dayjs() < dayjs(program.start_time) ? (<>예정</>) : <></>}</label>
                                                                    </div>
                                                                    <div style={{ width: "50%", textAlign: "right" }}>
                                                                        <Button variant="outline-primary" onClick={handleSearchUserModalState}>
                                                                            회원 추가
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                                <div style={{ padding: "10px" }}>
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
                                                                            dataSource={members}
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
            </div >
            <SearchUserModal
                role="general"
                centerId={pCenterId}
                handleSubmit={handleSubmit}
                modalVisible={SearchUserModalState}
                handleCloseModal={handleSearchUserModalState}
            />
        </div >
    );
}

export default MyPageProgram;
