import { Button, DatePicker, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getCenterMemberList } from '../../apis/api/Member';
import { getCenterPass } from '../../apis/api/Pass';
import dayjs from 'dayjs';
import { updatePayments } from '../../apis/api/Payments';

const PaymentsRegisterModal = (props) => {
    const centerId = useSelector((state) => state.CenterInfo.center_id);
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [members, setMembers] = useState([]);
    const [passList, setPassList] = useState([]);
    const [input, setInput] = useState({
        center_id: centerId,
        pass_id: "",
        user_id: "",
        payment_date: null,
        amount: "",
        category: "",
        payment_method: "user_created",
        payment_status: "",
    });
    const { center_id, pass_id, user_id, payment_date, amount, payment_method, category, payment_status } = input;

    useEffect(() => {
        getCenterMemberList(authToken.current, centerId)
            .then(data => {
                setMembers(data);
            })
        getCenterPass(authToken.current, centerId)
            .then(data => {
                setPassList(data);
            })
    }, [])


    useEffect(() => {
        if (props.modifyPayment) {
            const data = {
                ...props.modifyPayment,
                payment_date: dayjs(props.modifyPayment.payment_date)
            }
            setInput(data);
        } else {
            setInput({
                ...input,
                center_id: centerId,
                pass_id: "",
                user_id: "",
                payment_date: null,
                amount: "",
                category: "",
                payment_method: "user_created",
                payment_status: "",
            }
            )
        }
    }, [props])

    const onChange = (e) => {
        const { value, name } = e.target;
        setInput({
            ...input,
            [name]: value,
        })
    };
    const onChangePass = (e) => {
        const { value, name } = e.target;
        const pass_info = passList.find(pass => pass.pass_id === parseInt(value));
        console.log()
        setInput({
            ...input,
            [name]: value,
            amount: parseInt(pass_info.price)
        })
    };
    const onChangePaymentDate = (date, dateString) => {
        setInput({
            ...input,
            payment_date: date
        })
    }

    const handleOK = () => {
        if (props.modifyPayment) {
            if (category === "etc") {
                const data = {
                    ...input,
                    payment_method: "user_created",
                    pass_id: null,
                    amount: parseInt(amount),
                    payment_date: payment_date.format("YYYY-MM-DD")
                }
                updatePayments(authToken.current, data.payment_id, data)
                    .then(response => {
                        if (response === 200) {
                            props.alertMessage("success", "수정되었습니다.")
                            props.handleCloseModal();
                        } else {
                            props.alertMessage("error", "오류가 발생했습니다.")
                        }
                    })
            } else {
                const data = {
                    ...input,
                    payment_method: "user_created",
                    pass_id: parseInt(pass_id),
                    amount: parseInt(amount),
                    payment_date: payment_date.format("YYYY-MM-DD")
                }
                updatePayments(authToken.current, data.payment_id, data)
                    .then(response => {
                        if (response === 200) {
                            props.alertMessage("success", "수정되었습니다.")
                            props.handleCloseModal();
                        } else {
                            props.alertMessage("error", "오류가 발생했습니다.")
                        }
                    })
            }
        } else {
            if (category === "etc") {
                const data = {
                    ...input,
                    pass_id: "",
                    amount: parseInt(amount),
                    payment_date: payment_date.format("YYYY-MM-DD")
                }
                props.onSubmit(data);
            } else {
                const data = {
                    ...input,
                    pass_id: parseInt(pass_id),
                    amount: parseInt(amount),
                    payment_date: payment_date.format("YYYY-MM-DD")
                }
                console.log(data);
                props.onSubmit(data);
            }
        }
    }
    const onReset = () => {

    }
    const onDelete = () => {

    }

    return (
        <Modal
            centered
            width={800}
            title="정규 강의 등록"
            open={props.modalVisible}
            onOk={handleOK}
            onCancel={props.handleCloseModal}
            footer={props.modifyPayment ? [
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
                    // loading={loading}
                    onClick={handleOK}>
                    OK
                </Button>,
            ]}>
            <div>
                <Form.Group as={Row} style={{ padding: "5px" }}>
                    <Form.Label column sm="3">결제자</Form.Label>
                    <Col sm="9">
                        <Form.Select
                            name="user_id"
                            onChange={onChange}
                            value={user_id}>
                            <option>
                                결제자 선택
                            </option>
                            {members.length > 0 && members.map(member => (
                                <option value={member.username} key={member.username}>
                                    {member.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} style={{ padding: "5px" }}>
                    <Form.Label column sm="3">분류</Form.Label>
                    <Col sm="9">
                        <Form.Select
                            name="category"
                            onChange={onChange}
                            value={category}>
                            <option>
                                분류 선택
                            </option>
                            <option value="register">
                                센터 등록
                            </option>
                            <option value="etc">
                                외
                            </option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                {
                    category === "register" ? (
                        <Form.Group as={Row} style={{ padding: "5px" }}>
                            <Form.Label column sm="3">수강권</Form.Label>
                            <Col sm="9">
                                <Form.Select
                                    name="pass_id"
                                    onChange={onChangePass}
                                    value={pass_id}>
                                    <option>
                                        수강권 선택
                                    </option>
                                    {passList.length > 0 && passList.map(pass => (
                                        <option value={pass.pass_id} key={pass.pass_id}>
                                            {pass.pass_name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    ) : <></>
                }
                <Form.Group as={Row} style={{ padding: "5px" }}>
                    <Form.Label column sm="3">금액</Form.Label>
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            placeholder="금액"
                            name="amount"
                            onChange={onChange}
                            value={amount}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} style={{ padding: "5px" }}>
                    <Form.Label column sm="3">상태</Form.Label>
                    <Col sm="9">
                        <Form.Select
                            name="payment_status"
                            onChange={onChange}
                            value={payment_status}>
                            <option value="completed">
                                완료
                            </option>
                            <option value="canceled">
                                취소됨
                            </option>
                        </Form.Select>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} style={{ padding: "5px" }}>
                    <Form.Label column sm="3">요일 및 시간</Form.Label><br />
                    <Col>
                        {/* <div style={{ display: 'flex' }}> */}
                        <DatePicker onChange={onChangePaymentDate} format="YYYY-MM-DD" value={payment_date} />
                        {/* </div> */}
                    </Col>
                </Form.Group>
            </div>
        </Modal >
    );
}

export default PaymentsRegisterModal;
