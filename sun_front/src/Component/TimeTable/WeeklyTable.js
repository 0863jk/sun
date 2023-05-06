import Table from 'react-bootstrap/Table';
import LessonInfoCard from '../Card/LessonInfoCard';

function WeeklyTable() {
    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th style={{ width: "9%" }}>#</th>
                        <th style={{ width: "13%" }}>SUN</th>
                        <th style={{ width: "13%" }}>MON</th>
                        <th style={{ width: "13%" }}>TUE</th>
                        <th style={{ width: "13%" }}>WED</th>
                        <th style={{ width: "13%" }}>THU</th>
                        <th style={{ width: "13%" }}>FRI</th>
                        <th style={{ width: "13%" }}>SAT</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>09:00~10:00</td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                    </tr>
                    <tr>
                        <td>10:00~11:00</td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                    </tr>
                    <tr>
                        <td>11:00~12:00</td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                    </tr>
                    <tr>
                        <td>12:00~13:00</td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                    </tr>
                    <tr>
                        <td>13:00~14:00</td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                    </tr>
                    <tr>
                        <td>14:00~15:00</td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                    </tr>
                    <tr>
                        <td>15:00~16:00</td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                    </tr>
                    <tr>
                        <td>16:00~17:00</td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                    </tr>
                    <tr>
                        <td>17:00~18:00</td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>
                        <td><LessonInfoCard /></td>     
                    </tr>
                </tbody>
            </Table>
        </>
    );
}
export default WeeklyTable;