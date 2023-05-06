import { useParams } from 'react-router-dom';
import CenterNav from '../../Component/Nav/CenterNav';
import WeeklyTable from '../../Component/TimeTable/WeeklyTable';
import { useEffect, useState } from 'react';

function Weekly() {
    // const pRole = useParams("pRole");
    // const [role, setRole] = useState(null);

    // useEffect(() => {
    //     setRole(pRole);
    // }, []);

    return (
        <>
            <div className="header">
                <CenterNav/>
            </div>
            <div className="LabelWrapper">
                <div className="wrap MainContainer">
                    <WeeklyTable />
                </div>
            </div>
        </>
    );
}
export default Weekly;