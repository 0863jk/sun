import React from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

const PassRegisterForm = (props) => {

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
                            // checked={planType === 'fixed-term'}
                            // onChange={handlePlanTypeChange}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="only private lesson"
                                value="only_private_lesson"
                                name="pass_type"
                            // checked={planType === 'number-of-times'}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                label="only public class"
                                value="only_public_class"
                                name="pass_type"
                            // checked={planType === 'number-of-times'}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>수강권 이름</Form.Label>
                        <Form.Control type="text" placeholder="수강권 이름을 입력해 주세요..." name="pass_name" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>설명</Form.Label>
                        <Form.Control type="text" placeholder="간단한 설명을 입력해 주세요..." name="description" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>가격</Form.Label>
                        <Form.Control type="number" placeholder="플랜의 가격을 입력해 주세요..." name="price" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>수강권 유효기간</Form.Label>
                        <Form.Control type="number" placeholder="수강권의 유효기간을 입력해 주세요..." name="duration_months" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>횟수</Form.Label>
                        <Row className="nomargin">
                            <Col className="nomargin">
                                <Form.Select name="unit_of_times">
                                    <option value="">
                                        횟수 단위
                                    </option>
                                    <option value="total" key="total">
                                        총
                                    </option>
                                    <option value="week" key="week">
                                        주
                                    </option>
                                </Form.Select>
                            </Col>
                            <Col className="nomargin">
                                <Form.Control type="number" placeholder="횟수를 입력해 주세요..." name="times" />
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
