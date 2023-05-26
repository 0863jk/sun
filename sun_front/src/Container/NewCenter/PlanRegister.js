import { useState } from "react";
import "./NewCenter.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col, Row } from "react-bootstrap";

function PlanRegister({ onSubmit, setPage, centerid }) {
    const [planType, setPlanType] = useState('');

    const handlePlanTypeChange = (e) => {
        setPlanType(e.target.value);
    };

    const preBtnHandler = (e) => {
        setPage('info')
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const planname = formData.get('planname');
        const introduction = formData.get('introduction');
        const period = formData.get('period');
        const iPeriod = parseInt(period);
        const periodtype = formData.get('periodtype');
        const price = formData.get('price');
        const iPrice = parseInt(price);
        const constraints = formData.get('constraints');

        const plan = {
            centerid: centerid,
            planname: planname,
            plantype: planType,
            introduction: introduction,
            period: iPeriod,
            periodtype: periodtype,
            price: iPrice,
            constraints: constraints,
        };
        onSubmit(plan);
        console.log(plan);
        setPage('trainer')
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>플랜방식</Form.Label>
                    <div >
                        <Form.Check
                            inline
                            type="radio"
                            label="기간제"
                            value="fixed-term"
                            name="plantype"
                            checked={planType === 'fixed-term'}
                            onChange={handlePlanTypeChange}
                        />
                        <Form.Check
                            inline
                            type="radio"
                            label="횟수제"
                            value="number-of-times"
                            name="plantype"
                            checked={planType === 'number-of-times'}
                            onChange={handlePlanTypeChange}
                        />
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>플랜명</Form.Label>
                    <Form.Control type="text" placeholder="플랜명을 입력해 주세요..." name="planname" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>소개</Form.Label>
                    <Form.Control type="text" placeholder="간단한 설명을 입력해 주세요..." name="introduction" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>기간 설정</Form.Label>
                    <Row className="nomargin">
                        <Col className="nomargin">
                            <Form.Control type="number" placeholder="플랜의 유효기간을 입력해 주세요..." name="period" />
                        </Col>
                        <Col className="nomargin">
                            <Form.Select name="periodtype">
                                <option value="">
                                    일/월/년 선택
                                </option>
                                <option value="days" key="days">
                                    일
                                </option>
                                <option value="months" key="months">
                                    개월
                                </option>
                                <option value="years" key="years">
                                    년
                                </option>
                            </Form.Select>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>가격</Form.Label>
                    <Form.Control type="number" placeholder="플랜의 가격을 입력해 주세요..." name="price" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>제약 조건</Form.Label>
                    <Form.Control type="text" placeholder="플랜의 제약 조건을 입력해 주세요..." name="constraints" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" onClick={preBtnHandler} className="preBtn">
                        이전
                    </Button>
                    <Button variant="primary" type="submit">
                        다음
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
}
export default PlanRegister;