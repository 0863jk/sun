import { useNavigate, useParams } from "react-router-dom";
import PlanCard from "../../Component/Card/PlanCard"
import CardGroup from 'react-bootstrap/CardGroup';
import useFetch from "../../Hook/useFetch";
import { useEffect, useRef, useState } from "react";
import Utils from "../../Hook/Utils";
import { getCenterPass } from "../../apis/api/Pass";
import { useSelector } from "react-redux";
import PassCard from "../../Component/Card/PassCard";
import CenterRegisterModal from "../../Component/Modal/CenterRegisterModal";
import { insertMember, postMember } from "../../apis/api/Member";
import { Modal, Result, message } from "antd";
import { Button } from "react-bootstrap";

function CenterRegister() {
    const { pCenterId } = useParams();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const userInfo = useSelector((state) => state.UserInfo);
    const username = useRef(userInfo.username);
    const role = useRef(userInfo.role);
    const [modalVisible, setModalVisible] = useState(false);
    const [pass, setPass] = useState();
    const [passList, setPassList] = useState([]);

    useEffect(() => {
        getCenterPass(authToken.current, pCenterId)
            .then(data => {
                setPassList(data);
            })
    }, [])

    const handleModalState = (pass) => {
        if (pass) {
            setPass(pass);
        } else {
            setPass("");
        }
        setModalVisible(!modalVisible);
    }

    const handleSubmit = (data) => {
        console.log(data);
        if (data) {
            const updateData = {
                ...data,
                center_id: pCenterId,
                user_id: username.current,
                role: role.current,
                pass_id: pass.pass_id,
                renewal_count: 0
            }
            insertMember(authToken.current, updateData)
                .then(response => {
                    console.log(response);
                    if (response === 201) {
                        alert("정상적으로 등록되었습니다.");
                        navigate(`/main/${pCenterId}`);
                    } else {
                        messageApi.open({
                            type: 'error',
                            content: '오류가 발생했습니다.',
                        });
                    }
                });
        } else {
            const updateData = {
                center_id: pCenterId,
                user_id: username.current,
                role: role.current,
                renewal_count: 0
            }
            insertMember(authToken.current, updateData)
                .then(response => {
                    console.log(response);
                    if (response === "Created") {
                        alert("정상적으로 등록되었습니다.");
                        navigate(`/main/${pCenterId}`);
                    } else {
                        messageApi.open({
                            type: 'error',
                            content: '오류가 발생했습니다.',
                        });
                    }
                });
        }
    }
    return (
        <>
            <div>
                {contextHolder}
                <div className="main-container">
                    <div className="content-container">
                        <div className="title-container">
                            <label className="label-title">수강권 목록</label>
                            <p>사용 중인 수강권을 선택해 주세요.</p>
                        </div>
                        <div className="content-wrap">
                            <div className="cardlist-container">
                                {passList.length > 0 ? passList.map(pass => (
                                    <div onClick={() => handleModalState(pass)}>
                                        <PassCard key={pass.pass_id} pass={pass} />
                                    </div>
                                )) : (
                                    <div>
                                        <Result
                                            title={"등록된 수강권이 없습니다."}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div style={{ padding: "20px " }}>
                            <Button onClick={() => handleModalState()}>수강권 정보 없이 센터 등록하기</Button>
                        </div>
                    </div>
                </div>
            </div>
            <CenterRegisterModal
                pass={pass}
                modalVisible={modalVisible}
                handleCloseModal={handleModalState}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

export default CenterRegister;
