import { useEffect, useState } from "react";
import "./NewCenter.css";
import { Button, Nav } from 'react-bootstrap';
import CenterInfoRegister from "./CenterInfoRegister";
import PlanRegister from "./PlanRegister";
import TrainerRegister from "./TrainerRegister";
import Utils from "../../Hook/Utils";
import NewCenterTap from "./NewCenterTap";

function NewCenter() {
    const username = localStorage.getItem('username');
    const [page, setPage] = useState('');
    const [centerid, setCenterid] = useState('');
    const [centerInfoData, setCenterInfoData] = useState(null);
    const [planData, setPlanData] = useState(null);
    const [trainerData, setTrainerData] = useState(null);

    useEffect(() => {
        setPage("info");
    }, [])

    useEffect(() => {
        if (centerInfoData) {
            setCenterid(centerInfoData.centerid);
        }
    }, [centerInfoData, centerid]);

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
        setTrainerData(data);
    };


    const onSubmit = (e) => {
        const utils = new Utils(centerid);
        const managerData = {
            userid: username,
            centerid: centerid,
            role: "manager",
        }
        const trainerDataWithCenterId = trainerData.map(trainerId => ({
            userid: trainerId,
            centerid: centerid,
            role: "trainer",
        }));
        const allTrainerData = [managerData, ...trainerDataWithCenterId];
        setTrainerData(allTrainerData);

        utils.registerCenter(centerInfoData)
            .then(centerData => {
                console.log(centerData); // 센터 등록 결과 확인
                return utils.registerCenterMember(managerData); // 매니저 등록
            })
            .then(managerData => {
                console.log(managerData); // 매니저 등록 결과 확인
                return utils.registerPlan(planData); // 플랜 등록
            })
            .then(planData => {
                console.log(planData); // 플랜 등록 결과 확인
                const trainerPromises = allTrainerData.map(trainerData => {
                    return utils.registerCenterMember(trainerData);
                });
                return Promise.all(trainerPromises);
            })
            .then(trainerData => {
                console.log(trainerData); // 트레이너 등록 결과 확인
                alert("모든 데이터가 정상적으로 등록되었습니다.");
                // 추가로 수행할 작업이 있다면 여기에 작성
            })
            .catch(error => {
                console.error(error); // 오류 처리
                alert("데이터 등록에 실패하였습니다.");
            });
    };

    return (
        <>
            <div className="wrap main-container">
                <div className="label-wrapper">
                    <label className="label-title">센터 새로 등록</label>
                    <div className="Taps">
                        <NewCenterTap page={page} />
                    </div>
                    <div className="content-container">
                        {
                            page === 'info' ? <CenterInfoRegister data={centerInfoData} onSubmit={handleCenterInfoSubmit} setPage={setPageHandler} setCenterid={handleCenterId} /> :
                                page === 'plan' ? <PlanRegister data={planData} onSubmit={handlePlanSubmit} centerid={centerid} setPage={setPageHandler} /> :
                                    page === 'trainer' ? <TrainerRegister onSubmit={handleTrainerData} centerid={centerid} setPage={setPageHandler} /> :
                                        <CenterInfoRegister />
                        }
                        {
                            centerInfoData !== null && planData !== null ?
                                (<Button variant="primary" onClick={onSubmit}>
                                    등록하기
                                </Button>) : <></>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
export default NewCenter;