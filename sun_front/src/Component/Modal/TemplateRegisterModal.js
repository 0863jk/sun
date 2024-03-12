import { Button, DatePicker, Modal, TimePicker } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { deleteTemplate, updateTemplate, updateTemplateWithAllPrograms } from '../../apis/api/Template';
import { getCenterInstroctorList } from '../../apis/api/Instroctor';
import Checkbox from 'antd/es/checkbox/Checkbox';

const TemplateRegisterModal = (props) => {
    const centerId = useSelector((state) => state.CenterInfo.center_id);
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [selectedTime, setSelectedTime] = useState([null, null]);
    const [instroctors, setInstroctors] = useState([]);
    const [updateAllPrograms, setUpdateAllPrograms] = useState(false);

    const refData = useRef({
        center_id: centerId,
        program_name: "",
        program_description: "",
        program_type: "",
        program_location: "",
        instroctor_id: "",
        instroctor_name: "",
        program_day: "",
        start_time: "",
        end_time: "",
    });
    const [input, setInput] = useState({
        center_id: centerId,
        program_name: "",
        program_description: "",
        program_type: "",
        program_location: "",
        instroctor_id: "",
        instroctor_name: "",
        program_day: "",
        start_time: "",
        end_time: "",
    });
    const { program_name, program_description, program_type, program_location, instroctor_id, program_day } = input;

    useEffect(() => {
        getCenterInstroctorList(authToken.current, centerId)
            .then(data => {
                setInstroctors(data);
            })
    }, [])

    useEffect(() => {
        if (props.modifyTemplate) {
            setInput(props.modifyTemplate);
            setSelectedTime([dayjs(props.modifyTemplate.start_time), dayjs(props.modifyTemplate.end_time)]);
        } else {
            setInput({
                ...input,
                center_id: centerId,
                program_name: "",
                program_description: "",
                program_type: "",
                program_location: "",
                instroctor_id: "",
                instroctor_name: "",
                program_day: "",
                start_time: "",
                end_time: "",
            });
            setSelectedTime([null, null]);
        }
    }, [props.modifyTemplate])

    const { RangePicker } = TimePicker;

    const onChange = (e) => {
        const { value, name } = e.target;
        setInput({
            ...input,
            [name]: value,
        })
    };
    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const onSubmit = (data) => {
        if (props.modifyTemplate) {
            if (updateAllPrograms) {
                updateTemplateWithAllPrograms(authToken.current, data)
                    .then(response => {
                        console.log(response);
                        if (response === 200) {
                            alert("수정이 완료되었습니다.");
                            onReset();
                            props.handleCloseModal();
                        } else {
                            alert("수정 실패");
                        }
                    })
            } else if (!updateAllPrograms) {
                updateTemplate(authToken.current, props.modifyTemplate.template_id, data)
                    .then(response => {
                        console.log(response);
                        if (response === 200) {
                            alert("수정이 완료되었습니다.");
                            onReset();
                            props.handleCloseModal();
                        } else {
                            alert("수정 실패");
                        }
                    })
            }
        } else {
            props.insertData(data);
            onReset();
            props.handleCloseModal();
        }
    };

    const onReset = () => {
        setInput({
            ...input,
            center_id: centerId,
            program_name: "",
            program_description: "",
            program_type: "",
            program_location: "",
            instroctor_id: "",
            instroctor_name: "",
            program_day: "",
            start_time: "",
            end_time: "",
        })
        setSelectedTime([null, null]);
    }

    const onDelete = () => {
        deleteTemplate(authToken.current, props.modifyTemplate.template_id)
            .then(response => {
                console.log(response);
                if (response === 200 || response === 201 || response === 204) {
                    alert("정상적으로 삭제 되었습니다.")
                } else {
                    alert("삭제 오류")
                }
            })
        props.handleCloseModal();
    }

    const handleOK = () => {
        const start_time = selectedTime[0].format("YYYY-MM-DD HH:mm");
        const end_time = selectedTime[1].format("YYYY-MM-DD HH:mm");
        const instroctor = instroctors.find(instroctor => instroctor.username === input.instroctor_id);

        refData.current = input;
        refData.current = {
            ...refData.current,
            program_day: parseInt(input.program_day),
            start_time: start_time,
            end_time: end_time,
            instroctor_name: instroctor.name,
        };

        onSubmit(refData.current);
        // onReset();
        // props.handleCloseModal();
    }
    return (
        <Modal
            centered
            width={800}
            title="정규 강의 등록"
            open={props.modalVisible}
            onOk={handleOK}
            onCancel={props.handleCloseModal}
            footer={props.modifyTemplate ? [
                <Checkbox
                    checked={updateAllPrograms}
                    onChange={() => setUpdateAllPrograms(!updateAllPrograms)}>
                    모든 강의 한 번에 수정</Checkbox>,
                <Button key="back" onClick={props.handleCloseModal}>
                    Cancle
                </Button>,
                <Button
                    key="Reset"
                    onClick={onReset}
                >
                    Reset
                </Button>,
                <Button
                    key="Delete"
                    onClick={onDelete}
                >
                    Delete
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    // loading={loading}
                    onClick={handleOK}>
                    OK
                </Button>,
            ] : [
                <Button key="back" onClick={props.handleCloseModal}>
                    Cancle
                </Button>,
                <Button
                    key="Reset"
                    onClick={onReset}
                >
                    Reset
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    // loading={loading}
                    onClick={handleOK}>
                    OK
                </Button>,
            ]}>
            <div>
                <Form.Group as={Row} style={{ padding: "5px" }}>
                    <Form.Label column sm="3">수업명</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text" placeholder="수업명"
                            name="program_name"
                            onChange={onChange}
                            value={program_name}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} style={{ padding: "5px" }}>
                    <Form.Label column sm="3">수강권 운영 방식</Form.Label>
                    <Col sm="9">
                        <div style={{ display: "flex" }}>
                            <Form.Check
                                style={{ margin: "5px" }}
                                type="radio"
                                label="private lesson"
                                value="private_lesson"
                                name="program_type"
                                checked={program_type === "private_lesson"}
                                onChange={onChange}
                            />
                            <Form.Check
                                style={{ margin: "5px" }}
                                type="radio"
                                label="public class"
                                value="public_class"
                                name="program_type"
                                checked={program_type === "public_class"}
                                onChange={onChange}
                            />
                        </div></Col>
                </Form.Group>
                <Form.Group as={Row} style={{ padding: "5px" }}>
                    <Form.Label column sm="3">설명</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            placeholder="설명"
                            name="program_description"
                            onChange={onChange}
                            value={program_description}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} style={{ padding: "5px" }}>
                    <Form.Label column sm="3">강사 선택</Form.Label>
                    <Col sm="9">
                        <div style={{ display: "flex" }}>
                            <Form.Select
                                name="instroctor_id"
                                onChange={onChange}
                                value={instroctor_id}>
                                <option>
                                    강사 선택
                                </option>
                                {instroctors.length > 0 && instroctors.map(instroctor => (
                                    <option value={instroctor.username} key={instroctor.username}>
                                        {instroctor.name}
                                    </option>
                                ))}
                            </Form.Select>
                            <Form.Control
                                type="text" placeholder="강의실"
                                name="program_location"
                                onChange={onChange}
                                value={program_location}
                            />
                        </div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} style={{ padding: "5px" }}>
                    <Form.Label column sm="3">요일 및 시간</Form.Label><br />
                    <Col>
                        <div style={{ display: 'flex' }}>
                            <Form.Select
                                style={{ width: "40%" }}
                                name="program_day"
                                onChange={onChange}
                                value={program_day}>
                                <option>
                                    요일 선택
                                </option>
                                <option value={0}>
                                    일
                                </option>
                                <option value={1}>
                                    월
                                </option>
                                <option value={2}>
                                    화
                                </option>
                                <option value={3}>
                                    수
                                </option>
                                <option value={4}>
                                    목
                                </option>
                                <option value={5}>
                                    금
                                </option>
                                <option value={6}>
                                    토
                                </option>
                            </Form.Select>
                            <RangePicker style={{ marginLeft: "10px", width: "60%" }} onChange={handleTimeChange} format="HH:mm" value={selectedTime} />
                        </div>
                    </Col>
                </Form.Group>
            </div>
        </Modal >
    );
}

export default TemplateRegisterModal;
