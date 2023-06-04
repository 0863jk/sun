import { useParams } from 'react-router-dom';
import CenterNav from '../../Component/Nav/CenterNav';
import WeeklyTable from '../../Component/TimeTable/WeeklyTable';
import { useEffect, useState } from 'react';
import WeeklyTimetable from '../../Component/TimeTable/WeeklyTimeTable';

function Weekly() {
    const { pCenterId } = useParams();
    const role = localStorage.getItem('role');

    return (
        <>
            <div className="header">
                <CenterNav centerid={pCenterId}/>
            </div>
            <div className="LabelWrapper">
                <div className="wrap MainContainer">
                    <WeeklyTimetable centerid={pCenterId} role={role}/>
                    {/* <WeeklyTable /> */}
                </div>
            </div>
        </>
    );
}
export default Weekly;