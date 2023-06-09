import "./CenterList.css";
import CenterCard from "../../Component/Card/CenterCard";
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useState } from "react";
import { Divider, Modal } from "antd";
import { Button } from "react-bootstrap";
import Utils from "../../Hook/Utils";


function CenterSearch() {
    const utils = new Utils();
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    const [input, setInput] = useState('');
    const [center, setCenter] = useState('');

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCenter, setSelectedCenter] = useState("");

    const handleOpenModal = (center) => {
        setSelectedCenter(center);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const onChangeHandler = (event) => {
        setInput(event.target.value);
        fetch(`http://localhost:8000/center/search?centerid=${input}`)
            .then(res => { return res.json() })
            .then(data => { setCenter(data) })
    }

    const btnRegisterHandler = (event) => {
        if (role === "general") {
            window.location.replace(`/register/${selectedCenter.centerid}`)
        } else if (role === "trainer") {
            const data = {
                centerid: selectedCenter.centerid,
                userid: username,
                // role: role,
                // register_date: new Date(Date.now())
            }
            utils.registerCenterMember(data).then(data => {
                if (data) {
                    if (data.status === 400) {
                        alert("오류 발생");
                    } else {
                        alert("센터에 정상적으로 등록되었습니다.");
                        window.location.replace(`/main/${selectedCenter.centerid}`)
                    }
                } else {
                    console.log(data);
                    alert("오류 발생");

                }
            })
        }
    }

    return (
        <>
            <div className="MainContainer">
                <div className="LabelWrapper">
                    <label className="LabelTitle">센터 검색</label>
                    <div className="ContentContainer">
                        <div className="SearchBar">
                            <Form.Control
                                placeholder="센터 ID로 검색"
                                aria-describedby="basic-addon2"
                                onChange={onChangeHandler}
                            />
                        </div>
                        <div className="CenterListContainer">
                            <div className="CardListContainer">
                                <CardGroup className="CardGroup">
                                    {center && center.map(center => (
                                        <Link className="LinkWrapper">
                                            <CenterCard from="search" center={center} openModal={handleOpenModal} />
                                        </Link>
                                    ))}
                                </CardGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal open={modalVisible} onCancel={handleCloseModal} footer={null}>
                <div style={{ textAlign: 'center' }}>
                    <h3>센터 정보</h3>
                    <Divider></Divider>
                    <p>센터명: {selectedCenter.centername}</p>
                    <p>센터 주소: {selectedCenter.address1} {selectedCenter.address2}</p>
                    <p>사업자등록번호: {selectedCenter.bizid}</p>
                    <p>{selectedCenter.introduction}</p>
                    <p>{selectedCenter.introduction}</p>
                    <Divider></Divider>
                    <p>현재 다니고 있는 센터가 "{selectedCenter.centername}" 맞나요?</p>
                    <Button onClick={btnRegisterHandler}>등록</Button>
                    {/* <Button>등록</Button> */}
                </div>
            </Modal>
        </>
    );
}

export default CenterSearch;