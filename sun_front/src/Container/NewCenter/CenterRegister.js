import { useEffect, useState } from "react";
import "./NewCenter.css";
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import CenterInfoRegister from "./CenterInfoRegister";
import PlanRegister from "./PlanRegister";
import TrainerRegister from "./TrainerRegister";

function CenterRegister() {
    const [page, setPage] = useState('');
    const [centerInfoData, setCenterInfoData] = useState(null);
    const [planData, setPlanData] = useState(null);
    const [centerid, setCenterid] = useState('');
    const [trainerdata, setTrainerdata] = useState(null);

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
    };

    const handleTrainerData = (data) => {
        setTrainerdata(data);
    };

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

    const registerTrainer = (data) => {
        data.forEach((userid) => {
            const trainerdata = {
                userid: userid,
                centerid: centerid
            }
            const jsonData = JSON.stringify(trainerdata);

            console.log(jsonData);

            fetch('http://localhost:8000/center/registerCenterMember/', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: jsonData
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
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
                registerTrainer(trainerdata);
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
                                page === 'plan' ? <PlanRegister onSubmit={handlePlanSubmit} centerid={centerid} setPage={setPageHandler} /> :
                                    page === 'teacher' ? <TrainerRegister onSubmit={handleTrainerData} centerid={centerid} setPage={setPageHandler} /> :
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