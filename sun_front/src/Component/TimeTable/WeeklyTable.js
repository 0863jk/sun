import './TimeTable.css';
import Table from 'react-bootstrap/Table';
import LessonInfoCard from '../Card/LessonInfoCard';

function WeeklyTable() {
    return (
        <>
            <div className="weekly-table-container">
                <table className="weekly-table">
                    <thead>
                        <tr>
                            <th className="header-cell">#</th>
                            <th className="header-cell">SUN</th>
                            <th className="header-cell">MON</th>
                            <th className="header-cell">TUE</th>
                            <th className="header-cell">WED</th>
                            <th className="header-cell">THU</th>
                            <th className="header-cell">FRI</th>
                            <th className="header-cell">SAT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="time-cell">09:00~10:00</td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                        </tr>
                        <tr>
                            <td className="time-cell">10:00~11:00</td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                        </tr>
                        <tr>
                            <td className="time-cell">11:00~12:00</td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                        </tr>
                        <tr>
                            <td className="time-cell">12:00~13:00</td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                        </tr>
                        <tr>
                            <td className="time-cell">13:00~14:00</td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                        </tr>
                        <tr>
                            <td className="time-cell">14:00~15:00</td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                        </tr>
                        <tr>
                            <td className="time-cell">15:00~16:00</td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                        </tr>
                        <tr>
                            <td className="time-cell">16:00~17:00</td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                        </tr>
                        <tr>
                            <td className="time-cell">17:00~18:00</td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                            <td><LessonInfoCard /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default WeeklyTable;