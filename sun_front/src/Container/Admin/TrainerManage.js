import TrainerCard from "../../Component/Card/TrainerCard";
import CenterNav from "../../Component/Nav/CenterNav";
import CardGroup from 'react-bootstrap/CardGroup';
import Nav from 'react-bootstrap/Nav';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from "../../Hook/useFetch";
import AdminTap from "./AdminTap";
import UserCard from "../../Component/Card/UserCard";

function TrainerManage() {
    const { pCenterId } = useParams();
    const trainers = useFetch(`http://localhost:8000/center/member/get?centerid=${pCenterId}&role=trainer`);

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="main-container">
                    <div className="label-wrapper">
                        <label className="label-title">강사 관리</label>
                        <AdminTap centerid={pCenterId} current="trainer" />
                        <div className="content-container">
                            <div className="CenterListContainer">
                                <CardGroup className="CardGroup">
                                    {trainers && trainers.map(trainers => (
                                        <UserCard user={trainers} />
                                    ))}
                                </CardGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TrainerManage;