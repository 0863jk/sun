import { useEffect, useState } from "react";
import "./NewCenter.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import TeacherCard from "../../Component/Card/TeacherCard";
import CardGroup from 'react-bootstrap/CardGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate, useParams } from "react-router-dom";

function CenterInfoRegister({ onSubmit, setPage, centerCreate }) {
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const centerid = formData.get('centerid');
        const centername = formData.get('centername');
        const introduction = formData.get('introduction');
        const password = formData.get('password');

        const centerInfo = {
            centername: centername,
            centerid: centerid,
            introduction: introduction,
            password: password,
        };
        const CenterInfoData = JSON.stringify(centerInfo);
        console.log(CenterInfoData);
        onSubmit(centerInfo);
        centerCreate(centerInfo);
        setPage('plan');
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>센터명</Form.Label>
                    <Form.Control type="text" placeholder="센터 이름을 입력해 주세요..." name="centername" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>센터ID</Form.Label>
                    <Form.Control type="text" name="centerid" placeholder="센터 아이디를 입력해 주세요..." />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>사업자 등록번호</Form.Label>
                    <Form.Control type="text" placeholder="사업자 등록번호를 입력해 주세요..." />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>센터소개</Form.Label>
                    <Form.Control type="text" name="introduction" placeholder="센터 소개를 입력해 주세요..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="센터를 관리할 때 사용할 비밀번호를 입력해 주세요..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    다음
                </Button>
            </Form>
        </>
    );
}

function PlanRegister({ onSubmit, setPage }) {
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
            planname: planname,
            plantype: planType,
            period: period,
            constraints: constraints,
        };
        const planData = JSON.stringify(plan);
        console.log(planData);
        onSubmit(planData);
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
                    <Button variant="primary" type="submit">
                        제출
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
    
    const setPageHandler = (data) => {
        setPage(data);
    }

    const registerPlan = (centerid, data) => {
        const centeriddata = {
            centerid : centerid
        }
        const planData = JSON.stringify(data);
        planData.append(centeriddata);
        console.log(planData);

        // fetch('http://localhost:8000/center/plan/registerPlan/', {
        //     method: 'POST',
        //     headers: { 'Content-type': 'application/json' },
        //     // body: JSON.stringify(planData)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // 가져온 유저 데이터 처리
        //         const username = data[0].username;
        //         const id = data[0].id;
        //         const role = data[0].role;

        //         // localStorage에 저장
        //         localStorage.setItem('username', username);
        //         localStorage.setItem('id', id);
        //         localStorage.setItem('role', role);
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
    };

    const centerCreate = (e) => {
        const centerJson = JSON.stringify(centerInfoData);

        fetch('http://localhost:8000/center/registerCenter/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: centerJson
        })
        .then(res => {
            return res.json();
        }).then(data => {
            setCenterid(data.id);
        })
    };

    const onSubmit = (e) => {
        const centerJson = JSON.stringify(centerInfoData);
        // const planJson = JSON.stringify(planData);

        fetch('http://localhost:8000/center/registerCenter/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: centerJson
        })
        .then(res => {
            return res.json();
        }).then(data => {
            registerPlan(data.id, planData);
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
                            page === 'info' ? <CenterInfoRegister onSubmit={handleCenterInfoSubmit} setPage={setPageHandler} centerCreate={centerCreate} /> :
                                page === 'plan' ? <PlanRegister onSubmit={handlePlanSubmit} setPage={setPageHandler} /> :
                                    page === 'teacher' ? <TeacherRegister setPage={setPageHandler} /> :
                                        <CenterInfoRegister />
                        }
                        {
                            centerInfoData !== null && planData !== null ?
                                (<Button variant="primary" onClick={onSubmit}>
                                    Submit
                                </Button>) : centerInfoData !== null || planData !== null ?
                                (<Button variant="primary" onClick={onSubmit}>
                                    하나만 비어잇내
                                </Button>) : (<Button variant="primary" onClick={onSubmit}>
                                    다 비어잇내
                                </Button>)
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default CenterRegister;