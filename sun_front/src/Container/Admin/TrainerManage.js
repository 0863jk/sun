import TrainerCard from "../../Component/Card/TrainerCard";
import CenterNav from "../../Component/Nav/CenterNav";
import CardGroup from 'react-bootstrap/CardGroup';
import Nav from 'react-bootstrap/Nav';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from "../../Hook/useFetch";
import AdminTap from "./AdminTap";

function TrainerManage() {
    const { pCenterId } = useParams();
    const trainers = useFetch(`http://localhost:8000/center/getCenterTrainers/${pCenterId}`);

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">강사 관리</label>
                        <AdminTap centerid={pCenterId} current="trainer" />
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                {trainers && trainers.map(trainers => (
                                    <TrainerCard name={trainers.name} username={trainers.username} email={trainers.email} phone={trainers.phone} />
                                ))}
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TrainerManage;