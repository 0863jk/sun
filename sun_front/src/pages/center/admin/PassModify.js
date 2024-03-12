import Button from 'react-bootstrap/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { CardGroup } from 'react-bootstrap';
import { deletePass, getCenterPass, updatePass } from '../../../apis/api/Pass';
import { useSelector } from 'react-redux';
import CenterNav from '../../../Component/Nav/CenterNav';
import PassModifyModal from '../../../Component/Modal/PassModifyModal';
import PassCard from '../../../Component/Card/PassCard';
import { message } from 'antd';

function PassModify() {
    const [messageApi, contextHolder] = message.useMessage();
    const { pCenterId } = useParams();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.Auth);
    const userInfo = useSelector((state) => state.UserInfo);
    const centerInfo = useSelector((state) => state.CenterInfo);
    const authToken = useRef(auth.access_token);
    const [passList, setPassList] = useState({});
    const [selectedPass, setSelectedPass] = useState({
        pass_id: "",
        pass_name: "",
        description: "",
        duration_months: "",
        pass_type: "",
        price: "",
        times: "",
        unit_of_times: "",
    })
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getCenterPass(authToken.current, pCenterId)
            .then(data => {
                setPassList(data);
            })
    }, [modalVisible])

    const addPassBtn = () => {
        navigate(`/pass/register/${pCenterId}`);
    }

    const handleClicked = (pass) => {
        selectPass(pass);
    }

    const handleModalState = (pass) => {
        if (pass) {
            handleClicked(pass);
        } else {
            setSelectedPass("");
        }
        if (!modalVisible) {
            setModalVisible(true);
        } else {
            setModalVisible(false);
        }
    }

    const selectPass = (data) => {
        setSelectedPass(data);
    }

    const handleSubmit = (data) => {
        updatePass(authToken.current, data.pass_id, data)
            .then((response) => {
                if (response === 200) {
                    alertMessage("success", "성공적으로 수정되었습니다. 😎")
                    handleModalState();
                } else {
                    alertMessage("error", "오류가 발생했습니다.")
                }
            })
    }

    const handleDelete = (pass_id) => {
        deletePass(authToken.current, pass_id)
            .then((response) => {
                console.log(response);
            })
    }

    const alertMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    return (
        <>
            <div>
                {contextHolder}
                <div className="header">
                    <CenterNav />
                </div>
                <div className="main-container">
                    <div className="label-wrapper">
                        <div className="title-wrap" style={{ display: "flex" }}>
                            <div style={{ width: "50%", textAlign: "left" }}>
                                <label className="label-title">수강권 관리하기</label>
                            </div>
                            <div style={{ width: "50%", textAlign: "right" }}>
                                <Button onClick={addPassBtn}>
                                    수강권 추가하기
                                </Button>
                            </div>
                        </div>
                        <div className="content-container">
                            <div className="cardlist-container">
                                <CardGroup className="CardGroup">
                                    {
                                        (passList.length > 0) ? passList.map(pass => (
                                            <div className="card-container" onClick={() => handleModalState(pass)} key={pass.pass_id}>
                                                <PassCard pass={pass} />
                                                <div className="card-overlay">
                                                    <p>클릭하여 수정</p>
                                                </div>
                                            </div>
                                        )) :
                                            <>
                                                <p>등록된 수강권이 없습니다.</p>
                                            </>
                                    }
                                </CardGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PassModifyModal
                passInfo={selectedPass}
                handleSubmit={handleSubmit}
                handleDelete={handleDelete}
                modalVisible={modalVisible}
                handleCloseModal={handleModalState}
            />
        </>
    );
}
export default PassModify;