import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import WeeklyTimetable from '../../../Component/TimeTable/WeeklyTimeTable';
import CenterNav from '../../../Component/Nav/CenterNav';
import { getCenterPrograms, getCenterProgramsByInstroctorId, getCenterProgramsByProgramType, getCenterProgramsByTemplateId, getCenterProgramsByUserId, getCenterProgramsOnlyBookAvailable } from '../../../apis/api/Program';
import { Segmented, Select } from 'antd';
import { getCenterTemplate } from '../../../apis/api/Template';
import ProgramInfoModal from '../../../Component/Modal/ProgramInfoModal';
import { cancelBook, getProgramApplicants, postBookProgram, } from '../../../apis/api/Enrolment';
import { getCenterInstroctorList } from '../../../apis/api/Instroctor';

const Timetable = () => {
    const { pCenterId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const userInfo = useSelector((state) => state.UserInfo);
    const authToken = useRef(auth.access_token);
    const username = useRef(userInfo.username);
    const role = useRef(userInfo.role);
    const [timetableData, setTimetableData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [program, setProgram] = useState('');
    const [category, setCategory] = useState('');
    const [list, setList] = useState([]);
    const [option, setOption] = useState('');

    useEffect(() => {
        if (category === 'Default') {
            getCenterPrograms(authToken.current, pCenterId)
                .then(data => {
                    console.log(data);
                    setTimetableData(data);
                })
        } else if (category === 'Instroctor') {
            getCenterInstroctorList(authToken.current, pCenterId)
                .then(data => {
                    const list = data.map(data => {
                        return {
                            value: data.username,
                            label: data.name
                        }
                    })
                    setList(list);
                })
        } else if (category === 'Program') {
            getCenterTemplate(authToken.current, pCenterId)
                .then(data => {
                    console.log(data);
                    const list = data.map(data => {
                        return {
                            value: data.template_id,
                            label: data.program_name
                        }
                    })
                    setList(list);
                })
        } else if (category === 'Public Class') {
            // 퍼블릭 클래스인 강의만 불러오기
            getCenterProgramsByProgramType(authToken.current, pCenterId, "public_class")
                .then(data => {
                    console.log(data);
                    setTimetableData(data);
                })
        } else if (category === 'Private Lesson') {
            // 퍼블릭 클래스인 강의만 불러오기
            getCenterProgramsByProgramType(authToken.current, pCenterId, "private_lesson")
                .then(data => {
                    console.log(data);
                    setTimetableData(data);
                })
        } else if (category === 'Book Available') {
            // 예약 가능한 강의만 불러오기
            getCenterProgramsOnlyBookAvailable(authToken.current, pCenterId)
                .then(data => {
                    console.log(data);
                    setTimetableData(data);
                })
        } else if (category === "My Timetable") {
            if (role.current === "general") {
                getCenterProgramsByUserId(authToken.current, pCenterId, username.current)
                    .then(data => setTimetableData(data));
            } else if (role.current === "instroctor") {
                getCenterProgramsByInstroctorId(authToken.current, pCenterId, username.current)
                    .then(data => {
                        setTimetableData(data);
                    })
            }
        } if (category === 'Default') {
            getCenterPrograms(authToken.current, pCenterId)
                .then(data => {
                    console.log(data);
                    setTimetableData(data);
                })
        } else if (category === 'Instroctor') {
            getCenterInstroctorList(authToken.current, pCenterId)
                .then(data => {
                    const list = data.map(data => {
                        return {
                            value: data.username,
                            label: data.name
                        }
                    })
                    setList(list);
                })
        } else if (category === 'Program') {
            getCenterTemplate(authToken.current, pCenterId)
                .then(data => {
                    console.log(data);
                    const list = data.map(data => {
                        return {
                            value: data.template_id,
                            label: data.program_name
                        }
                    })
                    setList(list);
                })
        } else if (category === 'Public Class') {
            // 퍼블릭 클래스인 강의만 불러오기
            getCenterProgramsByProgramType(authToken.current, pCenterId, "public_class")
                .then(data => {
                    console.log(data);
                    setTimetableData(data);
                })
        } else if (category === 'Private Lesson') {
            // 퍼블릭 클래스인 강의만 불러오기
            getCenterProgramsByProgramType(authToken.current, pCenterId, "private_lesson")
                .then(data => {
                    console.log(data);
                    setTimetableData(data);
                })
        } else if (category === 'Book Available') {
            // 예약 가능한 강의만 불러오기
            getCenterProgramsOnlyBookAvailable(authToken.current, pCenterId)
                .then(data => {
                    console.log(data);
                    setTimetableData(data);
                })
        } else if (category === "My Timetable") {
            if (role.current === "general") {
                getCenterProgramsByUserId(authToken.current, pCenterId, username.current)
                    .then(data => setTimetableData(data));
            } else if (role.current === "instroctor") {
                getCenterProgramsByInstroctorId(authToken.current, pCenterId, username.current)
                    .then(data => {
                        setTimetableData(data);
                    })
            }
        } else {
            getCenterPrograms(authToken.current, pCenterId)
                .then(data => {
                    console.log(data);
                    setTimetableData(data);
                })
        }
    }, [modalVisible, category])

    useEffect(() => {
        if (category === "Instroctor") {
            getCenterProgramsByInstroctorId(authToken.current, pCenterId, option)
                .then(data => {
                    setTimetableData(data);
                })
        } else if (category === "Program") {
            getCenterProgramsByTemplateId(authToken.current, pCenterId, option)
                .then(data => {
                    setTimetableData(data);
                })
        }
    }, [modalVisible, option])

    const onChange = (value) => {
        setOption(value);
    }

    const handleModalVisible = async (data) => {
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
        setModalVisible(!modalVisible);
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
                    alert("정상적으로 예약이 완료되었습니다.")
                    handleModalVisible();
                } else {
                    alert(response.response.data.error);
                    handleModalVisible();
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
                    alert("정상적으로 취소되었습니다.");
                    handleModalVisible();
                } else {
                    alert("취소 실패");
                }
            });
    }

    return (
        <div>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="main-container">
                    <div className="content-container">
                        <div className="title-container">
                            {
                                role.current === "manager" ? (
                                    <Segmented
                                        defaultValue={1}
                                        options={['Default', 'Instroctor', 'Program', 'Public Class', 'Private Lesson', 'Book Available']}
                                        value={category}
                                        onChange={setCategory}
                                    />
                                ) : (
                                    <Segmented
                                        defaultValue={1}
                                        options={['Default', 'Instroctor', 'Program', 'Public Class', 'Private Lesson', 'Book Available', 'My Timetable']}
                                        value={category}
                                        onChange={setCategory} />
                                )
                            }
                            {
                                category === 'Instroctor' ? (
                                    <Select
                                        onChange={onChange}
                                        defaultValue={"강사 선택"}
                                        options={list}
                                        style={{ marginLeft: "10px", width: "150px" }}
                                    />
                                ) : <></>
                            }
                            {
                                category === 'Program' ? (
                                    <Select
                                        onChange={onChange}
                                        defaultValue={"강의 선택"}
                                        options={list}
                                        style={{ marginLeft: "10px", width: "150px" }}
                                    />
                                ) : <></>
                            }
                        </div>
                        <div className='timetable-wrapper' style={{ paddingTop: "20px" }}>
                            <WeeklyTimetable
                                timetableData={timetableData}
                                onClick={handleModalVisible} />
                        </div>
                    </div>
                </div>
            </div>
            <ProgramInfoModal
                program={program}
                bookProgram={bookProgram}
                cancelBook={handleCancelBook}
                modalVisible={modalVisible}
                handleModalVisible={handleModalVisible}
            />
        </div>
    );
}

export default Timetable;
