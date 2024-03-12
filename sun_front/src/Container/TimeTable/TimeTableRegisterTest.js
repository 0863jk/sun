import "./TimeTableRegister.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CenterNav from "../../Component/Nav/CenterNav";
import Button from 'react-bootstrap/Button';
import { useParams } from "react-router-dom";
import WeeklyTimetable from "../../Component/TimeTable/WeeklyTimeTable";
import LessonCard from "../../Component/Card/LessonCard";
import Slider from "react-slick";
import useFetch from "../../Hook/useFetch";
import { DatePicker, Modal, TimePicker } from "antd";
import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import Utils from "../../Hook/Utils";
import TimeTableBlockRegisterModal from "../../Component/Modal/TimeTableBlockRegisterModal";
import WeeklyTable from "../../Component/TimeTable/WeeklyTable";

function TimeTableRegisterTest() {
    const { pCenterId } = useParams();
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const testData = {
        program_name: "",
        instroctor: "",
        summary: "",
        date: "",
        start_time: "",
        end_time: ""
    };

    const updateData = (newData) => {
        setData([...data, newData]);
    }
    useEffect(() => {
        console.log(data);
    }, [data]);

    const handleModalState = () => {
        if (!modalVisible) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    }

    return (
        <>
            <div className="header">
                <CenterNav centerid={pCenterId} />
            </div>
            <div className="main-container">
                <div className="label-wrapper">
                    <label className="label-title">시간표 등록</label>
                    <div className="wrap">
                        <div style={{ position: 'relative' }}>
                            <div className="addLessonBtnContainer">
                                <button className="btnAddLesson" onClick={handleModalState}>
                                    그 외의 강의 추가하기
                                </button>
                            </div>
                            <div className="timetable-wrapper">
                                <WeeklyTable data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Modal
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={null}
            > */}
            <TimeTableBlockRegisterModal
                updateData={updateData}
                modalVisible={modalVisible}
                handleCloseModal={handleModalState}
            />
            {/* </Modal> */}
        </>
    );
}

export default TimeTableRegisterTest;