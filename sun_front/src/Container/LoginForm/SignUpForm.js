import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import { useNavigate, useParams } from "react-router-dom";
import { signup } from "../../Hook/ApiService";
import { useEffect, useState } from 'react';
import axios from 'axios';

function SelectUserRole() {
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
    const { pUserRole } = useParams();
    const [role, setRole] = useState();

    const handleSumbit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const email = data.get("email");
        const  username = data.get("username");
        const password1 = data.get("password1");
        const password2 = data.get("password2");
        const phone = data.get("phone");
        const role = data.get("role");
        const datas = JSON.stringify({
            email: email,
            username: username,
            password1: password1,
            password2: password2,
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
                return res.json();
            })
            .then(data => {
                console.log(data);
                window.location.href = "/login";
            });
    }

    return (
        <>
            <div className="MainContainer wrap">
                <div className='LabelWrapper'>
                    <Form onSubmit={handleSumbit}>
                        <Form.Group className='mb-3'>
                            <SelectUserRole />
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Email
                            </Form.Label>
                            <Col sm="10">
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
                            <Col sm="10">
                                <Form.Control type="password" placeholder="비밀번호 확인" name="password2" />
                            </Col>
                        </Form.Group>
                

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Name
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="Name" name="name" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                Phone
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="010-0000-0000" name="phone" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Control type="hidden" name="role" value={pUserRole} />
                            <Form.Control type="submit" name="submit" value="Submit" />
                        </Form.Group>
                    </Form>
                </div>
            </div>
        </>
    )
}