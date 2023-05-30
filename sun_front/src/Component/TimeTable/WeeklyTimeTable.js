import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Link } from 'react-router-dom';
import useFetch from "../../Hook/useFetch"

const localizer = momentLocalizer(moment);

// const timetableData = [
//     {
//         title: 'Lesson A',
//         start: new Date(2023, 4, 22, 9, 0), // 예시 시간표 시작 시간
//         end: new Date(2023, 4, 22, 10, 0), // 예시 시간표 종료 시간
//         trainer: "trainer",
//         lessonId: 'lesson-id-1' // 예시 수업 아이디
//     }
// ];

function WeeklyTimetable({centerid}) {
    const timetableData = useFetch(`http://localhost:8000/center/timetable/getTimetable/${centerid}`);

    const events = timetableData.map((event) => {
        return {
            ...event,
            start: moment(event.start).toDate(),
            end: moment(event.end).toDate(),
            title: `${event.title} (${event.trainer})`, // 강사 이름 추가
        }
    })
    const handleEventClick = (event) => {
        const lessonId = event.lessonId;
        // 수업 상세 정보 페이지로 이동
        // 예시: /lesson/lesson-id-1
        window.location.href = `/lesson/${lessonId}`;
    };

    // const eventComponents = timetableData.map((event) => {
    //     return {
    //         ...event,
    //         component: (
    //             <Link to={`/lesson/${event.lessonId}`} className="calendar-event-link">
    //                 {event.title}
    //             </Link>
    //         )
    //     };
    // });

    const minTime = new Date();
    minTime.setHours(9, 0, 0); // 8시

    const maxTime = new Date();
    maxTime.setHours(18, 0, 0); // 11시

    return (
        <div style={{ height: '600px' }}>
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
                onSelectEvent={handleEventClick}
                showMultiDayTimes={false}
            />
        </div>
    );
}

export default WeeklyTimetable;