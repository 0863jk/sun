import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WeeklyTimetable from '../../Component/TimeTable/WeeklyTimeTable';
import ProgramInfoModal from '../../Component/Modal/ProgramInfoModal';
import { cancelBook, getProgramApplicants, postBookProgram } from '../../apis/api/Enrolment';
import { message } from 'antd';
import { getInstroctorPrograms, getUserPrograms } from '../../apis/api/Program';

const MyWeekly = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.Auth);
    const userInfo = useSelector((state) => state.UserInfo);
    const authToken = useRef(auth.access_token);
    const username = useRef(userInfo.username);
    const role = useRef(userInfo.role);
    const [timetableData, setTimetableData] = useState([]);
    const [program, setProgram] = useState("");
    const [modalState, setModalState] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (role.current === "general") {
            getUserPrograms(authToken.current, username.current)
                .then(data => {
                    setTimetableData(data);
                })
        } else if (role.current === "instroctor") {
            getInstroctorPrograms(authToken.current, username.current)
                .then(data => {
                    setTimetableData(data);
                })
        }
    }, [modalState])

    const alertMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    const handleModalState = async (data) => {
        if (data) {
            const applicants = await getProgramApplicants(authToken.current, data.program_id)
                .then(data => { return data });
            if (applicants.find(data => data.username === username.current)) {
                const dataWithBookState = {
                    ...data,
                    book_state: true,
                }
                setProgram(dataWithBookState);
            } else {
                const dataWithBookState = {
                    ...data,
                    book_state: false,
                }
                setProgram(dataWithBookState);
            }
        } else {
            setProgram("");
        }
        setModalState(!modalState);
    }
    const bookProgram = async () => {
        const data = {
            center_id: program.center_id,
            program_id: program.program_id,
            week_id: program.week_id,
            user_id: userInfo.username,
        }
        postBookProgram(authToken.current, data)
            .then(response => {
                if (response === 200 || response === 201 || response === 202 || response === 203 || response === 204) {
                    alertMessage("success", "정상적으로 예약이 완료되었습니다.")
                    handleModalState();
                } else {
                    alertMessage("error", "오류가 발생했습니다.");
                    handleModalState();
                }
            })
    }
    const handleCancelBook = () => {
        const data = {
            program_id: program.program_id,
            user_id: username.current,
        }
        cancelBook(authToken.current, data)
            .then(response => {
                if (response.statusText === "OK") {
                    alertMessage("success", "정상적으로 취소되었습니다.");
                    handleModalState();
                } else {
                    alertMessage("error", "취소 실패");
                }
            });
    }

    return (
        <div>
            {contextHolder}
            <div className="main-container">
                <div className="content-container">
                    <div className='timetable-wrapper' style={{ paddingTop: "20px" }}>
                        <WeeklyTimetable
                            timetableData={timetableData}
                            onClick={handleModalState} />
                    </div>
                </div>
            </div>
            <ProgramInfoModal
                program={program}
                bookProgram={bookProgram}
                cancelBook={handleCancelBook}
                modalVisible={modalState}
                handleModalVisible={handleModalState}
            />
        </div>
    );
}

export default MyWeekly;
