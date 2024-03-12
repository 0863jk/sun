import React, { useEffect, useRef, useState } from 'react';
import CenterNav from '../../../Component/Nav/CenterNav';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { postPass } from '../../../apis/api/Pass';
import PassRegisterForm from '../../../Container/pass/PassRegisterForm';
import { Alert, message } from 'antd';

function NewPass() {
    const { pCenterId } = useParams();
    const [messageApi, contextHolder] = message.useMessage();
    const authToken = useSelector((state) => state.Auth);
    const userInfo = useSelector((state) => state.UserInfo);
    const centerInfo = useSelector((state) => state.CenterInfo);
    const token = useRef(authToken.access_token);

    const handleSubmit = (data) => {
        const passData = {
            ...data,
            center_id: pCenterId,
        }
        postPass(token.current, passData)
            .then(
                (res) => {
                    console.log(res);
                    success();
                }
            );
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '성공적으로 등록되었습니다.',
        });
    };

    return (
        <div>
            {contextHolder}
            <div className="header">
                <CenterNav centerid={pCenterId} />
            </div>
            <div className="main-container">
                <div className="label-wrapper">
                    <label className="label-title">수강권 등록</label>
                    <div className="content-container">
                        <PassRegisterForm handleSubmit={handleSubmit} />
                    </div>
                </div>
            </div >
        </div >
    );
}

export default NewPass;
