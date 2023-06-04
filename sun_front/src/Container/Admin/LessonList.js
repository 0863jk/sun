import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import Nav from 'react-bootstrap/Nav';
import LessonReviewCard from '../../Component/Card/LessonReviewCard';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminTap from './AdminTap';

function LessonList() {
    const { pCenterId } = useParams();
    
    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">강의 목록</label>
                        <AdminTap centerid={pCenterId} current="lesson" />
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                <LessonReviewCard />
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LessonList;