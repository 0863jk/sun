import "./TimeTable.css";
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useFetch from "../../Hook/useFetch"
import { DatePicker, Modal } from "antd";
import { Button, Form } from "react-bootstrap";
import Utils from "../../Hook/Utils";

const localizer = momentLocalizer(moment);

function WeeklyTimetable({ centerid, onClick }) {
    const utils = new Utils(centerid);
    const username = localStorage.getItem('username');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [selectedLesson, setSelectedLesson] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const timetableData = useFetch(`http://localhost:8000/center/timetable/getCenterTimetable/${centerid}`);
    const trainers = useFetch(`http://localhost:8000/center/getCenterTrainers/${centerid}`);

    const findTrainerName = (trainerId) => {
        const trainer = trainers.find((trainer) => trainer.username === trainerId);
        return trainer ? trainer.name : '';
    };

    const events = timetableData.map((event) => {
        return {
            ...event,
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: `${event.title} (${findTrainerName(event.trainerid)})`,
            lessontitle: `${event.title}`,
            trainer: `${findTrainerName(event.trainerid)}` // 강사 이름 추가
        }
    })

    const minTime = new Date();
    minTime.setHours(9, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(18, 0, 0);

    return (
        <div style={{ position: 'relative' }}>
            <div className="calendaContainer" style={{ height: '650px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={['week']}
                    defaultView="week"
                    step={60} // 시간 단위 (60분)
                    defaultDate={new Date()}
                    min={minTime}
                    max={maxTime}
                    onSelectEvent={onClick}
                    showMultiDayTimes={false}
                />
            </div>
        </div>

    );
}

export default WeeklyTimetable;