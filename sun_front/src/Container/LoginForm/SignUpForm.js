import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from "react-router-dom";

function SelectUserRole() {
    const [role, setRole] = useState("general");
    const navigate = useNavigate();

    const onChange = (e) => {
        console.log("onChange ", e.target.value);
        navigate(`/signup/${e.target.value}`);
    };

    return (
        <Form.Select onChange={onChange}>
            <option value="">
                계정 유형 선택
            </option>
            <option value="general" key="general">
                일반 유저
            </option>
            <option value="trainer" key="trainer">
                트레이너
            </option>
            <option value="manager" key="manager">
                센터매니저
            </option>
        </Form.Select>
    );
}

export default function SignUpForm(props) {
    const handleSumbit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const role = data.get("role");
        const email = data.get("email");
        const password1 = data.get("password1");
        const password2 = data.get("password2");
        const name = data.get("name");
        const phone = data.get("phone");
        const datas = JSON.stringify({
            username: username,
            email: email,
            password1: password1,
            password2: password2,
            name: name,
            phone: phone,
            role: role
        });
        console.log(datas);
        fetch('http://localhost:8000/auth/registration/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: datas
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('오류 발생: ' + res.status); // 오류 발생시 에러를 throw
                }
                console.log(res);
                // return res.json();
            })
            .then(data => {
                console.log(data);
                alert("회원가입 처리가 완료되었습니다.");
                window.location.href = "/login";
            }).catch(error => {
                alert("오류: " + error.message);
            });
    }

    return (
        <>
            <div className="MainContainer wrap">
                <div className='LabelWrapper'>
                    <Form onSubmit={handleSumbit}>
                        <Form.Group className='mb-3'>
                            <Form.Select name="role">
                                <option value="">
                                    계정 유형 선택
                                </option>
                                <option value="general" key="general">
                                    일반 유저
                                </option>
                                <option value="trainer" key="trainer">
                                    트레이너
                                </option>
                                <option value="manager" key="manager">
                                    센터매니저
                                </option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                ID
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="ID를 입력해 주세요..." name="username" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col>
                                <Form.Control type="email" placeholder="email@example.com" name="email" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                비밀번호
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="비밀번호" name="password1" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                비밀번호 확인
                            </Form.Label>
                            <Col>
                                <Form.Control type="password" placeholder="비밀번호 확인" name="password2" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="이름을 입력해 주세요..." name="name" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Phone
                            </Form.Label>
                            <Col>
                                <Form.Control type="text" placeholder="010-0000-0000" name="phone" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Control type="submit" name="submit" value="Submit" />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    )
}