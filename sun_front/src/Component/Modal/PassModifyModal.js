import { Button, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const PassModifyModal = (props) => {
    const [passInfo, setPassInfo] = useState({
        center_id: "",
        pass_id: "",
        pass_name: "",
        description: "",
        duration_months: "",
        pass_type: "",
        price: "",
        times: "",
        unit_of_times: "",
        monthly_revenue: "",
    });
    const { pass_name, description, duration_months, pass_type, price, times, unit_of_times } = passInfo;
    const modalTitle = useRef();

    useEffect(() => {
        if (props.passInfo) {
            modalTitle.current = props.passInfo.pass_name;
            setPassInfo(props.passInfo);
        }
    }, [props.passInfo])

    const onChange = (e) => {
        const { value, name } = e.target;
        setPassInfo({
            ...passInfo,
            [name]: value,
        })
    };
    
    const setMonthlyRevenue = () => {
        const price = parseInt(passInfo.price);
        const duration_months = parseInt(passInfo.duration_months);
        const monthly_revenue = price / duration_months;
        setPassInfo({
            ...passInfo,
            monthly_revenue: monthly_revenue,
        })
    }

    const handleOK = () => {
        setMonthlyRevenue();
        handleSubmit();
    }

    const handleDelete = () => {
        props.handleDelete(passInfo.pass_id);
    }

    const handleSubmit = () => {
        // console.log(passInfo);
        props.handleSubmit(passInfo);
        // props.handleCloseModal();
    };

    return (
        <Modal
            centered
            open={props.modalVisible}
            title={modalTitle.current}
            onOk={handleOK}
            onCancel={props.handleCloseModal}
            footer={[
                <Button key="back" onClick={props.handleCloseModal}>
                    Cancle
                </Button>,
                <Button key="delete" onClick={handleDelete}>
                    Delete
                </Button>,
                <Button key="submit"
                    type="primary"
                    // loading={loading}
                    onClick={handleOK}>
                    OK
                </Button>,
            ]}>
            <div>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label>수강권 이름</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="수강권 이름을 입력해 주세요..."
                                name="pass_name"
                                value={pass_name}
                                onChange={onChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>설명</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="간단한 설명을 입력해 주세요..."
                                name="description"
                                value={description}
                                onChange={onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>수강권 운영 방식</Form.Label>
                            <div >
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="all programs"
                                    value="all_programs"
                                    name="pass_type"
                                    checked={pass_type === "all_programs"}
                                    onChange={onChange}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="only private lesson"
                                    value="only_private_lesson"
                                    name="pass_type"
                                    checked={pass_type === "only_private_lesson"}
                                    onChange={onChange}
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    label="only public class"
                                    value="only_public_class"
                                    name="pass_type"
                                    checked={pass_type === "only_public_class"}
                                    onChange={onChange}
                                />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>가격</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="플랜의 가격을 입력해 주세요..."
                                name="price"
                                value={price}
                                onChange={onChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>수강권 유효기간</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="수강권의 유효기간을 입력해 주세요..."
                                name="duration_months"
                                value={duration_months}
                                onChange={onChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>횟수</Form.Label>
                            <Row className="nomargin">
                                <Col className="nomargin">
                                    <Form.Select
                                        name="unit_of_times"
                                        value={unit_of_times}
                                        onChange={onChange}
                                    >
                                        <option value="">
                                            횟수 단위
                                        </option>
                                        <option
                                            value="total"
                                            selected={passInfo.unit_of_times === "total"}
                                        >
                                            총
                                        </option>
                                        <option
                                            value="week"
                                            selected={passInfo.unit_of_times === "week"}>
                                            주
                                        </option>
                                    </Form.Select>
                                </Col>
                                <Col className="nomargin">
                                    <Form.Control
                                    type="number"
                                    placeholder="횟수를 입력해 주세요..."
                                    name="times"
                                    value={times}
                                    onChange={onChange}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>
                    </div>
                </Form>
            </div>
        </Modal>
    );
}

export default PassModifyModal;
