import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import CenterCard from '../../Component/Card/CenterCard';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { searchCenter } from '../../apis/api/Center';
import { Divider, Modal, Select, Button, Input } from 'antd';
import { getCenterPass } from '../../apis/api/Pass';
import { postInstroctor } from '../../apis/api/Instroctor';

const SearchCenter = () => {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const userInfo = useSelector((state) => state.UserInfo);
    const username = useRef(userInfo.username);
    const role = useRef(userInfo.role);
    const [input, setInput] = useState('');
    const [option, setOption] = useState('center_id');
    const [center, setCenter] = useState({
        center_name: "",
        description: "",
        manager_name: "",
        address1: "",
        address2: "",
    });
    const [centerList, setCenterList] = useState([]);
    const [passList, setPassList] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCenter, setSelectedCenter] = useState(null);

    useEffect(() => {
        if (input.length > 2) {
            searchCenter(authToken.current, option, input)
                .then(data => {
                    setCenterList(data);
                })
        }
    }, [input, option])

    useEffect(() => {
        if (center) {
            getCenterPass(authToken.current, center.center_id)
                .then(data => {
                    setPassList(data);
                })
        }
    }, [center])

    const handleModalVisible = (center) => {
        setCenter(center);
        setModalVisible(!modalVisible);
    };

    const cardOnClick = (center) => {
        if (role.current === "general") {
            navigate(`/register/${center.center_id}`);
        } else if (role.current === "instroctor") {
            handleModalVisible(center);
        }
    }

    const handleSelect = (value) => {
        setOption(value);
    }

    const handleInputOnChange = (event) => {
        setInput(event.target.value);
    }

    const handleOK = () => {
        const data = {
            user_id: username.current,
            center_id: center.center_id,
        }
        postInstroctor(authToken.current, data)
            .then(response => {
                console.log(response);
                if (response === "Created") {
                    alert("정상적으로 등록됐습니다.")
                } else {
                    alert("등록 실패")
                }
            })
    }

    return (
        <div>
            <div className="main-container">
                <div className="content-container">
                    <div className='title-wrap'>
                        <label className="label-title">센터 검색</label>
                    </div>
                    <div className="content-wrap">
                        <div className="search-bar" style={{ display: "flex", margin: "20px" }}>
                            <Select
                                onChange={handleSelect}
                                style={{ width: "120px" }}
                                defaultValue={option}
                                options={[
                                    {
                                        value: 'center_id',
                                        label: '센터 ID',
                                    },
                                    {
                                        value: 'center_name',
                                        label: '센터명',
                                    },
                                    {
                                        value: 'manager_id',
                                        label: '매니저 ID',
                                    }
                                ]}
                            />
                            <Input
                                placeholder="두 자 이상 입력"
                                onChange={handleInputOnChange}
                            />
                        </div>
                        <div className="cardlist-container">
                            {centerList.length > 0 && centerList.map(center => (
                                <div
                                    className="link-wrapper"
                                    onClick={() => cardOnClick(center)}
                                >
                                    <CenterCard
                                        center={center} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={modalVisible}
                onCancel={handleModalVisible}
                title="센터 정보"
                footer={[
                    <Button key="back" onClick={handleModalVisible}>Cancle</Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleOK}>
                        등록
                    </Button>,]}>
                <div style={{ textAlign: 'center' }}>
                    <h3>{center.center_name}</h3>
                    <Divider></Divider>
                    <p>센터명: {center.center_name}</p>
                    <p>운영자: {center.manager_name}</p>
                    <p>주소: {center.address1} {center.address2}</p>
                    <p>{center.description}</p>
                    <Divider></Divider>
                    <p>현재 다니고 있는 센터가 "{center.center_name}" 맞나요?</p>
                </div>
            </Modal>
        </div >
    );
}

export default SearchCenter;
