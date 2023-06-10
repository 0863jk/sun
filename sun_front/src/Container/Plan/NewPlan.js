import React, { useEffect, useState } from 'react';
import CenterNav from '../../Component/Nav/CenterNav';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Utils from '../../Hook/Utils';

function NewPlan() {
    const { pCenterId } = useParams();
    const utils = new Utils(pCenterId);
    const [centerid, setCenterid] = useState('');
    const [planType, setPlanType] = useState('');

    useEffect(() => {
        setCenterid(pCenterId);
    }, [pCenterId])

    const handlePlanTypeChange = (e) => {
        setPlanType(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const planname = formData.get('planname');
        const introduction = formData.get('introduction');
        const period = parseInt(formData.get('period'));
        const periodtype = formData.get('periodtype');
        const price = parseInt(formData.get('price'));
        const times = parseInt(formData.get('times'));
        const constraints = formData.get('constraints');

        const plan = {
            centerid: centerid,
            planname: planname,
            plantype: planType,
            introduction: introduction,
            period: period,
            periodtype: periodtype,
            price: price,
            times: times,
            constraints: constraints,
        };

        utils.registerPlan(plan).then(data => {
            console.log('plan registered:', data);

            alert("정상적으로 등록이 완료되었습니다.");
            window.location.reload();
        });
    };

    return (
        <div>
            <div className="header">
                <CenterNav centerid={centerid} />
            </div>
            <div className="main-container">
                <div className="label-wrapper">
                    <label className="label-title">이용권 목록</label>
                    <div className="content-container">
                        <Form onSubmit={handleSubmit}>
                            <div className='form-wrapper'>
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
                                    <Form.Label>가격</Form.Label>
                                    <Form.Control type="number" placeholder="플랜의 가격을 입력해 주세요..." name="price" />
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
                                {
                                    planType === "number-of-times" ? (
                                        <>
                                            <Form.Group className="mb-3">
                                                <Form.Label>횟수</Form.Label>
                                                <Form.Control type="number" placeholder="횟수를 입력해 주세요..." name="times" />
                                            </Form.Group>
                                        </>
                                    ) : planType === "fixed-term" ? (
                                        <>
                                            <Form.Group className="mb-3">
                                                <Form.Label>제약조건</Form.Label>
                                                <Form.Control type="text" placeholder="ex. 일주일/3회" name="constraints" />
                                            </Form.Group>
                                        </>
                                    ) : <></>
                                }
                            </div>
                            <Form.Group className="mb-3">
                                <Button variant="primary" type="submit">
                                    생성
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div >
        </div >
    );
}

export default NewPlan;
