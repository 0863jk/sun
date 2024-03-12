import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const PassRegisterForm = (props) => {
    const authToken = useSelector((state) => state.Auth);
    const userInfo = useSelector((state) => state.UserInfo);
    const centerInfo = useSelector((state) => state.CenterInfo);
    const [passInfo, setPassInfo] = useState({
        pass_name: "",
        description: "",
        duration_months: "",
        pass_type: "",
        price: "",
        times: "",
        unit_of_times: "",
        monthly_revenue: "",
    });
    const [selectedOption, setSelectedOption] = useState();

    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
    };

    useEffect(() => {
        if (props.passInfo) {
            setPassInfo(props.passInfo);
            setSelectedOption(props.passInfo.pass_type);
        }
        console.log(passInfo);
    }, [props.passInfo])

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const pass_name = formData.get('pass_name');
        const description = formData.get('description');
        const duration_months = parseInt(formData.get('duration_months'));
        const pass_type = formData.get('pass_type');
        const price = parseInt(formData.get('price'));
        const times = parseInt(formData.get('times'));
        const unit_of_times = formData.get('unit_of_times');
        const monthly_revenue = price / duration_months;

        const pass = {
            ...passInfo,
            pass_name: pass_name,
            description: description,
            duration_months: duration_months,
            pass_type: pass_type,
            price: price,
            times: times,
            unit_of_times: unit_of_times,
            monthly_revenue: monthly_revenue,
        };

        props.handleSubmit(pass);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <div className='form-wrapper'>
                    <Form.Group className="mb-3">
                        <Form.Label>수강권 운영 방식</Form.Label>
                        <div >
                            <Form.Check
                                inline
                                type="radio"
                                label="all programs"
                                value="all_programs"
                                name="pass_type"
                                checked={selectedOption === "all_programs"}
                                onChange={handleRadioChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="only private lesson"
                                value="only_private_lesson"
                                name="pass_type"
                                checked={selectedOption === "only_private_lesson"}
                                onChange={handleRadioChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="only public class"
                                value="only_public_class"
                                name="pass_type"
                                checked={selectedOption === "only_public_class"}
                                onChange={handleRadioChange}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>수강권 이름</Form.Label>
                        <Form.Control type="text" placeholder="수강권 이름을 입력해 주세요..." name="pass_name" defaultValue={passInfo.pass_name} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>설명</Form.Label>
                        <Form.Control type="text" placeholder="간단한 설명을 입력해 주세요..." name="description" defaultValue={passInfo.description} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>가격</Form.Label>
                        <Form.Control type="number" placeholder="플랜의 가격을 입력해 주세요..." name="price" defaultValue={passInfo.price} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>수강권 유효기간</Form.Label>
                        <Form.Control type="number" placeholder="수강권의 유효기간을 입력해 주세요..." name="duration_months" defaultValue={passInfo.duration_months} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>횟수</Form.Label>
                        <Row className="nomargin">
                            <Col className="nomargin">
                                <Form.Select name="unit_of_times" defaultValue={passInfo.unit_of_times}>
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
                                    <option
                                        value="month"
                                        selected={passInfo.unit_of_times === "month"}>
                                        월
                                    </option>
                                </Form.Select>
                            </Col>
                            <Col className="nomargin">
                                <Form.Control type="number" placeholder="횟수를 입력해 주세요..." name="times" defaultValue={passInfo.times} />
                            </Col>
                        </Row>
                    </Form.Group>
                </div>
                <Form.Group className="mb-3">
                    <Button variant="primary" type="submit">
                        완료
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default PassRegisterForm;
