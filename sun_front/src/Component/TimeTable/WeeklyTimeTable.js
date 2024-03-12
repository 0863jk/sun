import "./TimeTable.css";
import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import ProgramInfoModal from "../Modal/ProgramInfoModal";


function WeeklyTimetable(props) {
    // props { titmetableData, centerid, onClick}
    const localizer = momentLocalizer(moment);
    const [event, setEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        if (props.timetableData.length > 0) {
            const data = props.timetableData.map((program) => {
                return {
                    ...program,
                    start: moment(program.start_time).toDate(),
                    end: moment(program.end_time).toDate(),
                    title: `${program.program_name}`,
                }
            })
            setEvents(data);
        } else {
            setEvents([]);
        }
    }, [props.timetableData]);

    const minTime = new Date();
    minTime.setHours(9, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(18, 0, 0);

    const handleModalVisible = () => {
        setModalVisible(!modalVisible);
    }
    return (
        <div>
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
                        onSelectEvent={props.onClick}
                        showMultiDayTimes={false}
                    />
                </div>
            </div>
            <ProgramInfoModal
                modalVisible={modalVisible}
                handleModalVisible={handleModalVisible}
                program={event}
            />
        </div>
    );
}

export default WeeklyTimetable;