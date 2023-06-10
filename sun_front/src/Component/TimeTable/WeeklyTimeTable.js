import "./TimeTable.css";
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useFetch from "../../Hook/useFetch"

const localizer = momentLocalizer(moment);

function WeeklyTimetable({ timetableData, centerid, onClick }) {

    const events = timetableData.map((event) => {
        return {
            ...event,
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: `${event.title} (${event.trainername})`,
            lessontitle: `${event.title}`,
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