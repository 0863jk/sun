import { useParams } from 'react-router-dom';
import CenterNav from '../../Component/Nav/CenterNav';
import WeeklyTable from '../../Component/TimeTable/WeeklyTable';
import { useEffect, useState } from 'react';
import WeeklyTimetable from '../../Component/TimeTable/WeeklyTimeTable';

function Weekly() {
    const { pCenterId } = useParams();
    const [centerid, setCenterid] = useState('');

    useEffect(() => {
        setCenterid(pCenterId);
    }, []);

    return (
        <>
            <div className="header">
                <CenterNav centerid={centerid}/>
            </div>
            <div className="LabelWrapper">
                <div className="wrap MainContainer">
                    <WeeklyTimetable/>
                    {/* <WeeklyTable /> */}
                </div>
            </div>
        </>
    );
}
export default Weekly;