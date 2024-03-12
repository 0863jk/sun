import React, { useEffect, useRef, useState } from 'react';
import CenterNav from '../../../Component/Nav/CenterNav';
import { useParams } from 'react-router-dom';
import { getMemberRegisterInfo } from '../../../apis/api/Member';
import { useSelector } from 'react-redux';
import PassCard from '../../../Component/Card/PassCard';
import { CardGroup } from 'react-bootstrap';
import dayjs from 'dayjs';

const Registration = () => {
    const { pCenterId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const userInfo = useSelector((state) => state.UserInfo);
    const username = useRef(userInfo.username);
    const [registerData, setRegisterData] = useState();
    
    useEffect(() => {
        getMemberRegisterInfo(authToken.current, pCenterId, username.current)
        .then(data => {
            setRegisterData(data);
        })
    }, [])

    return (
        <div>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="main-container">
                    <div className="label-wrapper">
                        <label className="label-title">나의 등록 정보</label>
                        <div className="MyPlanContainer">
                            {
                                registerData ? (
                                    <>
                                        <CardGroup className="CardGroup">
                                            <PassCard pass={registerData.pass_info} />
                                        </CardGroup>
                                        <label className="DateInfo">등록일은 {dayjs(registerData.register_date).format("YYYY년 MM월 DD일")}이며 수강권 만료일은 {dayjs(registerData.expire_date).format("YYYY년 MM월 DD일")}입니다.</label>
                                    </>
                                ) : (<></>)
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;
