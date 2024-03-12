import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useRef, useState } from 'react';
import CenterNav from '../../../Component/Nav/CenterNav';
import { Alert, DatePicker, List, Result, Space, message } from 'antd';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deleteMember, getCenterMemberList, getMemberRegisterInfo, insertMember, updateMember } from '../../../apis/api/Member';
import SearchUserModal from '../../../Component/Modal/SearchUserModal';
import { getCenterPass } from '../../../apis/api/Pass';
import PassCard from '../../../Component/Card/PassCard';
import Slider from 'react-slick';
import dayjs from "dayjs";

const Member = () => {
    const { pCenterId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [members, setMembers] = useState([]);
    const [searchUserModalState, setSearchUserModalState] = useState(false);
    const [passList, setPassList] = useState([]);
    const [member, setMember] = useState();
    const [saveState, setSaveState] = useState(true);
    const [passSaveState, setPassSaveState] = useState(true);
    const [storedRegisterInfo, setStoredRegisterInfo] = useState({
        center_id: "",
        user_id: "",
        role: "",
        pass_id: "",
        register_date: "",
        expire_date: "",
        renewal_count: "",
        pass_info: "",
    });
    const [registerInfo, setRegisterInfo] = useState({
        center_id: "",
        user_id: "",
        role: "",
        pass_id: "",
        register_date: "",
        expire_date: "",
        renewal_count: "",
        pass_info: "",
    });
    const { register_date, expire_date, renewal_count, pass_info } = registerInfo
    const [messageApi, contextHolder] = message.useMessage();
    const alertMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    useEffect(() => {
        getCenterMemberList(authToken.current, pCenterId, "general")
            .then(data => {
                setMembers(data);
            })
        getCenterPass(authToken.current, pCenterId)
            .then(data => {
                setPassList(data);
            });
    }, [searchUserModalState, member])

    useEffect(() => {
        if (saveState) {
            if (member) {
                getMemberRegisterInfo(authToken.current, pCenterId, member.username)
                    .then(data => {
                        setStoredRegisterInfo(data);
                    })
            }
        }
    }, [member, saveState])

    useEffect(() => {
        if (storedRegisterInfo) {
            setRegisterInfo(storedRegisterInfo);
        }
    }, [storedRegisterInfo]);

    useEffect(() => {
        if (register_date && pass_info) {
            const expireDate = dayjs(register_date).add(pass_info.duration_months, 'month');
            const updatedRegisterInfo = {
                ...registerInfo,
                expire_date: expireDate.format('YYYY-MM-DD'),
            };
            setRegisterInfo(updatedRegisterInfo);
        }
    }, [register_date, pass_info]);

    useEffect(() => {
        if (storedRegisterInfo.register_date === registerInfo.register_date &&
            storedRegisterInfo.expire_date === registerInfo.expire_date &&
            storedRegisterInfo.pass_id === registerInfo.pass_id) {
            setSaveState(true);
        } else {
            setSaveState(false);
        }
    }, [registerInfo])


    const selectMember = (member) => {
        // [ ] 선택된 멤버의 수강권 정보, enrolments들 불러오기
        setMember(member);
        getMemberRegisterInfo(authToken.current, pCenterId, member.username)
            .then(data => {
                setStoredRegisterInfo(data);
            })
        setSaveState(true);
        setPassSaveState(true);
    }

    const handleSearchUserModalState = () => {
        setSearchUserModalState(!searchUserModalState);
    }

    const handleSubmit = async (data) => {
        const promises = data.map(data => {
            const inputData = {
                user_id: data.username,
                center_id: pCenterId,
            };
            return insertMember(authToken.current, inputData)
                .then(response => (response === 201));  // 성공 시 true, 실패 시 false
        });

        try {
            const responses = await Promise.all(promises);
            const successCount = responses.filter(response => response).length;

            // 모든 요청이 성공했는지 여부와 성공한 갯수를 반환
            return successCount;
        } catch (err) {
            console.log(err);
            return 0;
        }
    };
    const carouselOnChange = (currentSlide) => {
        if (register_date) {
            const expireDate = dayjs(register_date).add(passList[currentSlide].duration_months, 'month').format("YYYY-MM-DD");
            const updateDate = {
                ...registerInfo,
                expire_date: expireDate,
                pass_id: passList[currentSlide].pass_id,
                pass_info: passList[currentSlide]
            }
            setRegisterInfo(updateDate);
        } else {
            setRegisterInfo({
                ...registerInfo,
                pass_id: passList[currentSlide].pass_id,
                pass_info: passList[currentSlide]
            });
        }
    }

    const registerDateOnChange = (date, dateString) => {
        if (date) {
            const updateDate = {
                ...registerInfo,
                register_date: dateString,
            }
            setRegisterInfo(updateDate);
        } else if (date && pass_info) {
            const expireDate = date.add(pass_info.duration_months, 'month');
            const updateDate = {
                ...registerInfo,
                register_date: dateString,
                expire_date: expireDate.format("YYYY-MM-DD"),
            }
            setRegisterInfo(updateDate);
        } else {
            const updateDate = {
                ...registerInfo,
                register_date: storedRegisterInfo.register_date,
                expire_date: storedRegisterInfo.expire_date,
            }
            setRegisterInfo(updateDate);
        }
    }

    const handleInputChange = (e) => {
        setSaveState(false);
        const updatedInput = {
            ...registerInfo,
            renewal_count: parseInt(e.target.value),
        }
        setRegisterInfo(updatedInput);
    }
    const handleUpdateData = () => {
        if (registerInfo.pass_id) {
            updateMember(authToken.current, registerInfo.id, registerInfo)
                .then(response => {
                    if (response === 200) {
                        alertMessage("success", "수정되었습니다.")
                        setPassSaveState(true);
                        setSaveState(true);
                    } else {
                        alertMessage("error", "수정에 실패했습니다.")
                        setSaveState(false);
                    }
                });
        } else {
            const autoSelectedPass = passList[0];
            const expireDate = dayjs(registerInfo.register_date).add(autoSelectedPass.duration_months, 'month');
            const data = {
                ...registerInfo,
                pass_id: autoSelectedPass.pass_id,
                expire_date: expireDate.format("YYYY-MM-DD"),

            }
            updateMember(authToken.current, registerInfo.id, data)
                .then(response => {
                    if (response === 200) {
                        alertMessage("success", "수정되었습니다.")
                        setPassSaveState(true);
                        setSaveState(true);
                    } else {
                        alertMessage("error", "수정에 실패했습니다.")
                        setSaveState(false);
                    }
                })
        }
    }
    const handleDeleteMember = () => {
        if (member !== null) {
            deleteMember(authToken.current, registerInfo.id)
                .then(response => {
                    console.log(response);
                    if (response === 200 || response === 201 || response === 202 || response === 203 || response === 204) {
                        alertMessage("success", "삭제되었습니다.")
                        const initialState = {
                            center_id: "",
                            user_id: "",
                            role: "",
                            pass_id: "",
                            register_date: "",
                            expire_date: "",
                            renewal_count: "",
                            pass_info: "",
                        };
                        setMember("");
                        setStoredRegisterInfo(initialState);
                        setRegisterInfo(initialState);
                    }
                })
        }
    }

    const handleCancel = () => {
        setRegisterInfo(storedRegisterInfo);
        setPassSaveState(true);
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div>
            {contextHolder}
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="main-container">
                    <div className="content-container">
                        <div className="title-wrap" style={{ display: "flex" }}>
                            <div style={{ width: "50%", textAlign: "left" }}>
                                <label className="label-title">회원 관리</label>
                                <label style={{ color: "gray" }}>총 {members.length}명</label>
                            </div>
                            <div style={{ width: "50%", textAlign: "right" }}>
                                <Button variant="outline-primary" onClick={handleSearchUserModalState}>
                                    회원 추가하기
                                </Button>
                            </div>
                        </div>
                        <div className="content-wrap">
                            {
                                members.length > 0 ? (
                                    <div style={{ display: "flex", height: "600px", }}>
                                        <div style={{
                                            width: "20%",
                                            background: "rgba(140, 140, 140, 0.35)",
                                            overflow: 'auto',
                                            borderRadius: '6px',
                                            border: '1px solid rgba(140, 140, 140, 0.35)',
                                            margin: "10px"
                                        }}>
                                            <List style={{ background: "white" }}>
                                                {
                                                    members.map(member => (
                                                        <List.Item key={member.email}>
                                                            <List.Item.Meta
                                                                title={<>{member.last_name}{member.first_name}</>}
                                                                description={member.email}
                                                                onClick={() => selectMember(member)}
                                                            />
                                                        </List.Item>
                                                    ))
                                                }
                                            </List>
                                        </div>
                                        <div style={{
                                            width: "80%",
                                            maxHeight: "600px",
                                            borderRadius: '6px',
                                            margin: "10px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            {
                                                member ?
                                                    <div style={{ width: "100%", display: "flow", margin: "10px" }}>
                                                        <div style={{ margin: "20px" }}>
                                                            <Form.Group as={Row} className="mb-3">
                                                                <Form.Label column sm="2">
                                                                    NAME
                                                                </Form.Label>
                                                                <Col sm="10">
                                                                    <Form.Control type="text" name="name" value={member.name} disabled />
                                                                </Col>
                                                            </Form.Group>
                                                            <Form.Group as={Row} className="mb-3">
                                                                <Form.Label column sm="2">
                                                                    PHONE
                                                                </Form.Label>
                                                                <Col sm="10">
                                                                    <Form.Control type="text" value={`${member.phone1}-${member.phone2}-${member.phone3}`} disabled />
                                                                </Col>
                                                            </Form.Group>
                                                            <Form.Group as={Row} className="mb-3">
                                                                <Form.Label column sm="2">
                                                                    ID
                                                                </Form.Label>
                                                                <Col sm="10">
                                                                    <Form.Control type="text" value={member.email} disabled />
                                                                </Col>
                                                            </Form.Group>
                                                        </div>
                                                        <div style={{ display: "block", margin: "20px" }}>
                                                            <div style={{ display: "flex", height: "100%" }}>
                                                                <div style={{ width: "40%", margin: "10px" }}>
                                                                    {
                                                                        storedRegisterInfo.pass_info !== null && passSaveState ? (
                                                                            <div style={{ height: "100%" }}>
                                                                                <div style={{ width: "350px", height: "300px", display: "flow" }}>
                                                                                    <PassCard pass={pass_info ? pass_info : <></>} />
                                                                                    <Button
                                                                                        variant="light"
                                                                                        onClick={() => setPassSaveState(false)}
                                                                                    >수강권 변경하기</Button>
                                                                                </div>
                                                                            </div>
                                                                        ) : storedRegisterInfo.pass_info === null && passSaveState ? (
                                                                            <div style={{ height: "100%" }}>
                                                                                <div style={{ width: "350px", height: "300px", display: "flow" }}>
                                                                                    <PassCard />
                                                                                    <Button
                                                                                        variant="light"
                                                                                        onClick={() => setPassSaveState(false)}
                                                                                    >수강권 등록하기</Button>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <div style={{ height: "100%" }}>
                                                                                <div style={{ width: "350px", height: "300px", display: "flow" }}>
                                                                                    <Slider
                                                                                        {...settings}
                                                                                        afterChange={carouselOnChange}
                                                                                        style={{ marginLeft: "50px", marginRight: "50px" }}
                                                                                    >
                                                                                        {
                                                                                            passList.length > 0 ? (
                                                                                                passList.map(pass => (
                                                                                                    <div key={pass.pass_id} style={{ display: "block" }}>
                                                                                                        <PassCard pass={pass} />
                                                                                                    </div>
                                                                                                ))
                                                                                            ) : <label>등록된 수강권이 없습니다.</label>
                                                                                        }
                                                                                    </Slider>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div style={{ width: "60%", padding: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                                    <div style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
                                                                        <Form.Group as={Row} className="mb-3">
                                                                            <Form.Label column sm="3">등록일</Form.Label>
                                                                            <Col sm="9">
                                                                                <DatePicker style={{ width: "100%" }} onChange={(date, dateString) => registerDateOnChange(date, dateString)} value={register_date ? dayjs(register_date) : null} />
                                                                            </Col>
                                                                        </Form.Group>
                                                                        <Form.Group as={Row} className="mb-3">
                                                                            <Form.Label column sm="3">만료일</Form.Label>
                                                                            <Col sm="9">
                                                                                <DatePicker style={{ width: "100%" }} value={expire_date ? dayjs(expire_date) : null} />
                                                                            </Col>
                                                                        </Form.Group>
                                                                        <Form.Group as={Row} className="mb-3">
                                                                            <Form.Label column sm="3" >재등록횟수</Form.Label>
                                                                            <Col sm="9">
                                                                                <Form.Control type="number" value={renewal_count} onChange={handleInputChange} />
                                                                            </Col>
                                                                        </Form.Group>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{ display: "relative" }}>
                                                                <Button disabled={saveState} onClick={handleUpdateData} >저장</Button>
                                                                <Button variant="outline-secondary" disabled={saveState} onClick={handleCancel} style={{ margin: "5px" }} >취소</Button>
                                                                <Button variant="outline-danger" onClick={handleDeleteMember}>삭제</Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
                                                        <div>
                                                            <label>리스트에서 회원을 선택하시면 회원의 정보가 표시됩니다.</label>
                                                        </div>
                                                    </div>
                                            }
                                        </div>
                                    </div>) :
                                    <div>
                                        <Result
                                            title="등록된 회원이 없습니다."
                                        />
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <SearchUserModal
                role="general"
                modalVisible={searchUserModalState}
                handleSubmit={handleSubmit}
                handleCloseModal={handleSearchUserModalState}
            />
        </div >
    );
}

export default Member;
