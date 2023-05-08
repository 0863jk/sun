import { useState } from "react";
import "./NewCenter.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from "react-router-dom";

function PlanRegister() {
    const [planType, setPlanType] = useState('');

    const handlePlanTypeChange = (e) => {
        setPlanType(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const planname = formData.get('planname');
        const period = formData.get('period');
        const constraints = formData.get('constraints');

        const planData = {
            planname: planname,
            plantype: planType,
            period: period,
            constraints: constraints,
        };
        const jsonData = JSON.stringify(planData);
        console.log(jsonData);
    };

    return (
        <>
            <div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">센터 새로 등록</label>
                        <div className="Taps">
                            <Nav className="justify-content-center" activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="/center/register/info">센터 기본 정보 등록</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/center/register/plan" className="current">이용권 정보 등록</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/center/register/teacher">강사 등록</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item>
                                <Nav.Link eventKey="disabled" disabled>
                                    Disabled
                                </Nav.Link>
                            </Nav.Item> */}
                            </Nav>
                        </div>
                        <div className="ContentContainer">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>플랜명</Form.Label>
                                    <Form.Control type="text" placeholder="플랜명을 입력해 주세요..." name="planname" />
                                </Form.Group>
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
                                    <Form.Label>기간 설정</Form.Label>
                                    <Form.Control type="text" placeholder="플랜의 유효기간을 선택해 주세요..." name="period" />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>제약 조건</Form.Label>
                                    <Form.Control type="text" placeholder="플랜의 제약 조건을 입력해 주세요..." name="constraints" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    다음
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PlanRegister;