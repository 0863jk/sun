import React, { useEffect, useState } from 'react';
import CenterNav from '../../Component/Nav/CenterNav';
import { useParams } from 'react-router-dom';
import PlanRegister from '../NewCenter/PlanRegister';

function NewPlan() {
    const { pCenterId } = useParams();
    const [centerid, setCenterid] = useState('');

    useEffect(() => {
        setCenterid(pCenterId);
    }, [])

    return (
        <div>
            <div className="header">
                <CenterNav centerid={centerid} />
            </div>
            <div className="MainContainer">
                <div className="LabelWrapper">
                    <label className="LabelTitle">이용권 목록</label>
                    <div className="CenterListContainer">
                        <PlanRegister />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewPlan;
