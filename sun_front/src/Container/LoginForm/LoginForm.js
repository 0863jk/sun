import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            window.location.replace('http://localhost:3000/login');
        } else {
            setLoading(false);
        }
    }, [])

    const SubmitHandler = (event) => {
        event.preventDefault();
        const datas = new FormData(event.target);
        const email = datas.get("email");
        const password = datas.get("password");

        const user = JSON.stringify({
            email: email,
            password: password
        });

        fetch('http://localhost:8000/auth/login/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: user
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                const token = data.key;
                if (data) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    window.location.replace('http://localhost:3000/');
                } else {
                    setEmail('');
                    setPassword('');
                    localStorage.clear();
                    setErrors(true);
                }
            });

        // navigate("/");
    }


    return (
        <>
            <div className="MainContainer wrap">
                <div className='LabelWrapper'>

                    <Form onSubmit={SubmitHandler}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                EMAIL
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="email" placeholder="이메일을 입력해주세요." name="email" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                PASSWORD
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="password" placeholder="비밀번호를 입력해주세요." name="password" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Control type="submit" name="submit" value="Submit" />
                        </Form.Group>
                        <p className="text">회원이 아니신가요? <Link to="/signup">회원가입</Link></p>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default LoginForm;