import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CenterNav from '../../Component/Nav/CenterNav';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DatePicker } from 'antd';
import useFetch from '../../Hook/useFetch';

function LessonRegister() {
    const { pCenterId } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
    const trainers = useFetch(`http://localhost:8000/center/getCenterTrainers/${pCenterId}`);

    const { RangePicker } = DatePicker;
    const dateFormat = 'YYYY/MM/DD HH:mm';

    const onChange = (e) => {
        console.log("onChange ", e.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = (event) => {
        const formData = new FormData(event.target);
        const title = formData.get("title");
        const trainer = formData.get("trainer");
        const maxCapacity = formData.get("maxCapacity");

        const data = {
            centerid: pCenterId,
            title: title,
            trainer: trainer,
            maxCapacity: maxCapacity,
            start: selectedDate[0],
            end: selectedDate[1]
        }

        fetch('http://localhost:8000/center/timetable/registerTimetable/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">수업 등록</label>
                        <div className="CenterListContainer">
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>수업명</Form.Label>
                                    <Form.Control type="text" placeholder="수업명" name="title" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>강사 선택</Form.Label>
                                    <Form.Select name="trainer" onChange={onChange}>
                                        <option value="default">
                                            강사 선택
                                        </option>
                                        {trainers && trainers.map(trainers => (
                                            <option value={trainers.username} key={trainers.id}>
                                                {trainers.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>최대 인원</Form.Label>
                                    <Form.Control type="number" placeholder="최대 인원 입력" name="maxCapacity" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>요일 및 시간</Form.Label><br />
                                    <RangePicker showTime format={dateFormat} onChange={handleDateChange} />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LessonRegister;