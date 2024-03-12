import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Carousel, DatePicker, Divider, Modal } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCenterPass } from '../../apis/api/Pass';
import PassCard from '../Card/PassCard';
import Slider from 'react-slick';

const RegisterInfoModal = (props) => {
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const centerId = useSelector((state) => state.CenterInfo.center_id);
    const [passList, setPassList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        getCenterPass(authToken.current, centerId)
            .then(data => {
                console.log(data);
                setPassList(data);
            })
    }, [])

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleOK = () => {
        props.handleOK();
    }

    const onReset = () => {

    }

    const onDelete = () => {

    }


    return (
        <Modal
            centered
            title="등록 정보 입력"
            open={props.modalVisible}
            onOk={handleOK}
            onCancel={props.handleCloseModal}
            footer={props.modifyTemplate ? [
                <Button key="back" onClick={props.handleCloseModal}>
                    Cancle
                </Button>,
                <Button
                    key="Reset"
                    onClick={onReset}
                >
                    Reset
                </Button>,
                <Button
                    key="Delete"
                    onClick={onDelete}
                >
                    Delete
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    // loading={loading}
                    onClick={handleOK}>
                    OK
                </Button>,
            ] : [
                <Button key="back" onClick={props.handleCloseModal}>
                    Cancle
                </Button>,
                <Button
                    key="Reset"
                    onClick={onReset}
                >
                    Reset
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    // loading={loading}
                    onClick={handleOK}>
                    OK
                </Button>,
            ]}>
            <div style={{ textAlign: 'center' }}>
                <div className='slider-container'>
                    {
                        passList.length > 0 ? (
                            <Slider {...settings}>
                                {passList.map(pass => (
                                    <div style={{fontSize: "10px"}}>
                                        <PassCard key={pass.pass_id} pass={pass} />
                                    </div>
                                ))}
                            </Slider>
                        ) : <>등록된 수강권이 없습니다.</>
                    }
                </div>
                <Divider />
                {/* <p>선택한 패스: '{planinfo.planname}' 맞으신가요?</p> */}
                <p>센터 등록일을 선택해 주세요.</p>
                <DatePicker onChange={handleDateChange} />
                <p>Selected Date: {selectedDate ? selectedDate.toString() : <></>}</p>
            </div>
        </Modal >
    );
}

export default RegisterInfoModal;
