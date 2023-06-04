import LessonCard from "../../Component/Card/LessonCard";
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import Nav from 'react-bootstrap/Nav';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminTap from "./AdminTap";

function Stats() {
    const { pCenterId } = useParams();

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId}/>
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">통계</label>
                        <AdminTap centerid={pCenterId} current="stats" />
                        <div className="CenterListContainer">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Stats;