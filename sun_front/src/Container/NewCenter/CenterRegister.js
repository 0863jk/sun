import { useEffect, useState } from "react";
import "./NewCenter.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import TeacherCard from "../../Component/Card/TeacherCard";
import CardGroup from 'react-bootstrap/CardGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate, useParams } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
import CenterInfoRegister from "./CenterInfoRegister";

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
        const period = formData.get('period');
        const constraints = formData.get('constraints');

        const plan = {
            centerid: centerid,
            planname: planname,
            plantype: planType,
            period: period,
            constraints: constraints,
        };
        const planData = JSON.stringify(plan);
        console.log(planData);
        onSubmit(plan);
        setPage('teacher')
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
                    <Form.Label>기간 설정</Form.Label>
                    <Form.Control type="text" placeholder="플랜의 유효기간을 선택해 주세요..." name="period" />
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
function TeacherRegister({ setPage }) {
    const [input, setInput] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };
    const preBtnHandler = (e) => {
        setPage('plan');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <Form>
                <div className="SearchBar">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="ID로 강사 검색"
                            aria-describedby="basic-addon2"
                        />
                        {/* <Button variant="outline-secondary" id="button-addon2">
                            Button
                        </Button> */}
                    </InputGroup>
                </div>
                <div className="TeacherListContainer">
                    <CardGroup className="CardGroup">
                        <TeacherCard />
                        <TeacherCard />
                        <TeacherCard />
                        <TeacherCard />
                    </CardGroup>
                </div>
                <Form.Group className="mb-3">

                    <Button variant="primary" onClick={preBtnHandler} className="preBtn">
                        이전
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
}


function CenterRegister() {
    const [page, setPage] = useState('');
    const [centerInfoData, setCenterInfoData] = useState(null);
    const [planData, setPlanData] = useState(null);
    const [centerid, setCenterid] = useState('');

    useEffect(() => {
        setPage('info');
    }, []);

    const handleCenterInfoSubmit = (data) => {
        setCenterInfoData(data);
    };

    const handlePlanSubmit = (data) => {
        setPlanData(data);
    };

    const handleCenterId = (data) => {
        setCenterid(data);
    };

    const setPageHandler = (data) => {
        setPage(data);
    }

    const registerPlan = (data) => {
        const planJson = JSON.stringify(data);
        console.log(planJson);

        fetch('http://localhost:8000/center/plan/registerPlan/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: planJson
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const onSubmit = (e) => {
        const centerJson = JSON.stringify(centerInfoData);

        fetch('http://localhost:8000/center/registerCenter/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: centerJson
        })
            .then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                registerPlan(planData);
            })
    };

    return (
        <>
            <div className="wrap MainContainer">
                <div className="LabelWrapper">
                    <label className="LabelTitle">센터 새로 등록</label>
                    <div className="Taps">
                        <Nav className="justify-content-center" activeKey="/home">
                            <Nav.Item>
                                <Nav.Link disabled href="" className={page === 'info' ? "current" : null}>센터 기본 정보 등록</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link disabled href="" className={page === 'plan' ? "current" : null}>이용권 정보 등록</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link disabled href="" className={page === 'teacher' ? "current" : null}>강사 등록</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                    <div className="ContentContainer">
                        {
                            page === 'info' ? <CenterInfoRegister onSubmit={handleCenterInfoSubmit} setPage={setPageHandler} setCenterid={handleCenterId} /> :
                                page === 'plan' ? <PlanRegister onSubmit={handlePlanSubmit} setPage={setPageHandler} centerid={centerid} /> :
                                    page === 'teacher' ? <TeacherRegister setPage={setPageHandler} /> :
                                        <CenterInfoRegister />
                        }
                        {
                            centerInfoData !== null && planData !== null ?
                                (<Button variant="primary" onClick={onSubmit}>
                                    Submit
                                </Button>) : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default CenterRegister;