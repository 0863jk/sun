import { Button, DatePicker, Modal, Select, TimePicker } from 'antd';
import React, { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { getCenterMemberListByRole } from '../../apis/api/Member';
import { useSelector } from 'react-redux';
import { deleteProgram, updateProgram } from '../../apis/api/Program';
import { v4 as uuidv4 } from 'uuid';
import { getCenterInstroctorList } from '../../apis/api/Instroctor';

const ProgramRegisterModal = (props) => {
    const centerId = useSelector((state) => state.CenterInfo.center_id);
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [selectedTime, setSelectedTime] = useState([null, null]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [instroctors, setInstroctors] = useState([]);
    const [temporaryProgramId, setTemporaryProgramId] = useState('');
    const [weekId, setWeekId] = useState();

    const refData = useRef({
        temporary_program_id: "",
        center_id: centerId,
        week_id: "",
        program_name: "",
        program_description: "",
        program_type: "",
        program_location: "",
        instroctor_id: "",
        instroctor_name: "",
        program_date: "",
        start_time: "",
        end_time: "",
        book_available: "",
        max_capacity: 0,
        number_of_applicants: 0,
    });
    const [input, setInput] = useState({
        temporary_program_id: "",
        center_id: centerId,
        week_id: "",
        program_name: "",
        program_description: "",
        program_type: "",
        program_location: "",
        instroctor_id: "",
        instroctor_name: "",
        program_date: "",
        start_time: "",
        end_time: "",
        book_available: "",
        max_capacity: 0,
        number_of_applicants: 0,
    });
    const { program_name, program_description, program_type, program_location, instroctor_id, max_capacity, book_available } = input;

    useEffect(() => {
        getCenterInstroctorList(authToken.current, centerId)
            .then(data => {
                setInstroctors(data);
            })
    }, [])

    useEffect(() => {
        if (props.template) {
            setTemporaryProgramId(uuidv4());
            setInput(props.template);
            const newDate = new Date();
            newDate.setDate(newDate.getDate() - newDate.getDay() + 7 + props.template.program_day);
            setWeekId(centerId + dayjs(newDate).week());
            setSelectedDate(dayjs(newDate));
            setSelectedTime([dayjs(props.template.start_time), dayjs(props.template.end_time)]);
        } else if (props.modifyProgram.program_id) {
            setTemporaryProgramId(uuidv4());
            setInput(props.modifyProgram);
            setSelectedDate(dayjs(props.modifyProgram.program_date))
            setSelectedTime([dayjs(props.modifyProgram.start_time), dayjs(props.modifyProgram.end_time)])
            setWeekId(props.modifyProgram.week_id);
        } else if (props.modifyProgram.temporary_program_id) {
            setTemporaryProgramId(props.modifyProgram.temporary_program_id)
            setInput(props.modifyProgram);
            setSelectedDate(dayjs(props.modifyProgram.program_date))
            setSelectedTime([dayjs(props.modifyProgram.start_time), dayjs(props.modifyProgram.end_time)])
            setWeekId(props.modifyProgram.week_id);
        } else {
            setTemporaryProgramId(uuidv4());
            setInput({
                ...input,
                program_name: "",
                program_description: "",
                program_type: "",
                week_id: "",
                program_location: "",
                instroctor_id: "",
                instroctor_name: "",
                program_date: "",
                start_time: "",
                end_time: "",
                book_available: "",
                max_capacity: 0,
                number_of_applicants: 0,
            })
            setSelectedDate(null);
            setSelectedTime([null, null]);
            setWeekId("");
        }
    }, [props.modalVisible, props.data, props.modifyProgram, props.template])

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

    const handleDateChange = (date) => {
        setWeekId(centerId + dayjs(date).week());
        setSelectedDate(date);
    };

    const onSubmit = (data) => {
        if (input.program_id) {
            props.updateData(data);
            onReset();
        } else {
            props.insertData(data);
            onReset();
        }
    };

    const onDelete = () => {
        props.deleteData(props.modifyProgram);
        props.handleCloseModal();
    }

    const onReset = () => {
        if (props.modifyProgram) {
            setInput(props.modifyProgram);
            setSelectedDate(dayjs(props.modifyProgram.program_date))
            setSelectedTime([dayjs(props.modifyProgram.start_time), dayjs(props.modifyProgram.end_time)])
            setWeekId(props.modifyProgram.week_id);
        } else {
            setInput({
                ...input,
                temporary_program_id: "",
                program_id: "",
                program_name: "",
                program_description: "",
                program_type: "",
                program_location: "",
                instroctor_id: "",
                instroctor_name: "",
                program_date: "",
                start_time: "",
                end_time: "",
                book_available: "",
                max_capacity: 0,
                number_of_applicants: 0,
                week_id: "",
            })
            setWeekId("");
            setSelectedDate(null);
            setSelectedTime([null, null]);
        }
    }
    const handleOK = () => {
        const start_time = selectedTime[0].format("HH:mm");
        const end_time = selectedTime[1].format("HH:mm");
        const date = selectedDate.format("YYYY-MM-DD");
        const instroctor = instroctors.find(instroctor => instroctor.username === input.instroctor_id);
        refData.current = input;
        refData.current = {
            ...refData.current,
            temporary_program_id: temporaryProgramId,
            week_id: weekId,
            program_date: date,
            start_time: date + " " + start_time,
            end_time: date + " " + end_time,
            instroctor_name: instroctor.name,
        };
        onSubmit(refData.current);
        onReset();
        props.handleCloseModal();
    }

    return (
        <Modal
            centered
            width={800}
            title="프로그램 등록"
            open={props.modalVisible}
            onOk={handleOK}
            onCancel={props.handleCloseModal}
            footer={props.modifyProgram ? [
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
                    onClick={handleOK}>
                    OK
                </Button>,
            ]}>
            <div>
                <div>
                    <Form.Group as={Row} style={{ padding: "5px" }}>
                        <Form.Label column sm="3">프로그램 명</Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text" placeholder="프로그램 명"
                                name="program_name"
                                onChange={onChange}
                                value={program_name}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} style={{ padding: "5px" }}>
                        <Form.Label column sm="3">프로그램 타입</Form.Label>
                        <Col sm="9">
                            <div style={{ display: "flex" }}>
                                <Form.Check
                                    style={{ margin: "5px" }}
                                    type="radio"
                                    label="개인 레슨"
                                    value="private_lesson"
                                    name="program_type"
                                    checked={program_type === "private_lesson"}
                                    onChange={onChange}
                                />
                                <Form.Check
                                    style={{ margin: "5px" }}
                                    type="radio"
                                    label="공개 수업"
                                    value="public_class"
                                    name="program_type"
                                    checked={program_type === "public_class"}
                                    onChange={onChange}
                                />
                            </div>
                        </Col>
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
                        <Form.Label column sm="3">강사 및 강의실</Form.Label>
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
                                        <option value={instroctor.username} key={instroctor.id}>
                                            {instroctor.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control
                                    style={{ marginLeft: "10px" }}
                                    type="text" placeholder="강의실"
                                    name="program_location"
                                    onChange={onChange}
                                    value={program_location}
                                />
                            </div>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} style={{ padding: "5px" }}>
                        <Form.Label column sm="3">예약 가능 여부</Form.Label>
                        <Col sm="9">
                            <div style={{ display: "flex" }}>
                                <Form.Check
                                    style={{ margin: "5px" }}
                                    type="radio"
                                    label="예약 가능"
                                    value="true"
                                    name="book_available"
                                    checked={book_available === "true" || book_available === true}
                                    onChange={onChange}
                                />
                                <Form.Check
                                    style={{ margin: "5px" }}
                                    type="radio"
                                    label="불가능"
                                    value="false"
                                    name="book_available"
                                    checked={book_available === "false" || book_available === false}
                                    onChange={onChange}
                                />
                            </div>
                        </Col>
                    </Form.Group>
                    {
                        book_available === "true" || book_available === true ?
                            <>
                                <Form.Group as={Row} style={{ padding: "5px" }}>
                                    <Form.Label column sm="3">최대 인원</Form.Label>
                                    <Col sm="9">
                                        <Form.Control type="number" placeholder="최대 인원 입력" name="max_capacity" value={max_capacity} onChange={onChange} />
                                    </Col>
                                </Form.Group>
                            </>
                            : <></>
                    }
                    <Form.Group as={Row} style={{ padding: "5px" }}>
                        <Form.Label column sm="3">날짜 및 시간</Form.Label><br />
                        <Col>
                            <div style={{ display: "flex" }}>
                                <DatePicker onChange={handleDateChange} format="YYYY-MM-DD" value={selectedDate} />
                                <RangePicker style={{ marginLeft: "10px" }} onChange={handleTimeChange} format="HH:mm" value={selectedTime} />
                            </div>
                        </Col>
                    </Form.Group>
                </div>
            </div>
        </Modal>
    );
}

export default ProgramRegisterModal;
