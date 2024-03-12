import { useEffect, useRef, useState } from "react";
import { Button, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { postCenter } from "../../apis/api/Center";
import { useNavigate } from "react-router-dom";
import { setCenterId, setCenterManager, setCenterName } from "../../redux/reducers/CenterInfo";
import CenterInfoRegisterForm from "../../Container/NewCenter/CenterInfoRegisterForm";

function NewCenter() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.UserInfo);
    const authToken = useSelector((state) => state.Auth);
    const username = useRef(userInfo.username);
    const role = useRef(userInfo.role);
    const token = useRef(authToken.access_token);
    const name = useRef(userInfo.last_name + userInfo.first_name);

    const handleCenterInfoSubmit = (data) => {
        const centerData = {
            ...data,
            manager_id: username.current,
            manager_name: name.current,
        };
        postCenter(token.current, centerData)
            .then(response => {
                console.log(response);
                if (response.status === 201) {
                    alert("정상적으로 등록되었습니다.");
                    navigateCenter(response.data);
                } else {
                    alert("오류가 발생했습니다.");
                }
            });
    };

    const navigateCenter = (data) => {
        const { center_id, center_name, manager_id } = data;
        dispatch(setCenterId(center_id));
        dispatch(setCenterName(center_name));
        dispatch(setCenterManager(manager_id));
        navigate(`/main/${center_id}`);
    }
    return (
        <>
            <div className="main-container">
                <div className="content-container">
                    <div className="title-container">
                        <label className="label-title">새로운 센터 등록하기</label>
                    </div>
                    <div className="form-container">
                        <CenterInfoRegisterForm
                            onSubmit={handleCenterInfoSubmit} />
                    </div>
                </div>
            </div>
        </>
    );
}
export default NewCenter;