import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData, updateUserData, updateUserDatas } from '../../apis/api/User';
import { setFirstName, setLastName, setUserName } from '../../redux/reducers/UserInfo';

const ModifyProfile = () => {
    const dispatch = useDispatch();
    const authToken = useSelector((state) => state.Auth);
    const userInfo = useSelector((state) => state.UserInfo);
    const token = useRef(authToken.access_token);
    const [userData, setUserData] = useState({
        name: '',
        first_name: '',
        last_name: '',
        phone1: '',
        phone2: '',
        phone3: '',
        role: '',
    });

    useEffect(() => {
        getUserData(token.current)
            .then(
                (data) => {
                    setUserData(data);
                }
            )
    }, [])

    const handleSumbit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const datas = {
            first_name: data.get("first_name"),
            last_name: data.get("last_name"),
            name: data.get("last_name") + data.get("first_name"),
            phone1: data.get("phone1"),
            phone2: data.get("phone2"),
            phone3: data.get("phone3"),
        };
        console.log(datas);
        updateUserData(token.current, datas)
            .then((response) => {
                if (response === 200) {
                    alert("프로필 수정이 완료 됐습니다!");
                    dispatch(setFirstName(datas.first_name));
                    dispatch(setLastName(datas.last_name));
                    window.location.reload();
                }
            });
    }

    return (
        <>
            <div className="main-container">
                <div className='label-wrapper'>
                    <div className="login-container">
                        <Form onSubmit={handleSumbit}>
                            <div className='form-wrapper'>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        ID
                                    </Form.Label>
                                    <Col sm="10">
                                        <Form.Control type="text" placeholder="ID를 입력해 주세요..." name="username" defaultValue={userData.username} disabled />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Email
                                    </Form.Label>
                                    <Col>
                                        <Form.Control type="email" placeholder="email@example.com" name="email" defaultValue={userData.email} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        비밀번호
                                    </Form.Label>
                                    <Col sm="10">
                                        <Button value="비밀번호 변경" href="/account/password">비밀번호 변경</Button>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Name
                                    </Form.Label>
                                    <Col>
                                        <Form.Control type="text" placeholder="성을 입력해 주세요..." name="last_name" defaultValue={userData.last_name} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="이름을 입력해 주세요..." name="first_name" defaultValue={userData.first_name} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Phone
                                    </Form.Label>
                                    <Col>
                                        <Form.Control type="text" placeholder="010" name="phone1" defaultValue={userData.phone1} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="0000" name="phone2" defaultValue={userData.phone2} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="0000" name="phone3" defaultValue={userData.phone3} />
                                    </Col>
                                </Form.Group>
                            </div>
                            <Form.Group as={Row} className="mb-3">
                                <Form.Control type="submit" name="submit" value="SUBMIT" className="btn-login" />
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModifyProfile;
