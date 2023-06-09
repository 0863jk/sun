import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function LoginForm() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            navigate('/login');
        }
    }, [])

    const fetchUserData = (username) => {
        fetch(`http://localhost:8000/account/getUsername/${username}`)
            .then(res => res.json())
            .then(data => {
                // 가져온 유저 데이터 처리
                const username = data.username;
                const name = data.name;
                const role = data.role;

                // localStorage에 저장
                localStorage.setItem('username', username);
                localStorage.setItem('name', name);
                localStorage.setItem('role', role);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const SubmitHandler = (event) => {
        event.preventDefault();
        const datas = new FormData(event.target);
        const username = datas.get("username");
        const password = datas.get("password");

        const user = JSON.stringify({
            username: username,
            password: password
        });

        fetch('http://localhost:8000/auth/login/', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: user
        })
            .then(res => {
                if (!res.ok) {
                    alert("로그인 실패: 아이디 및 비밀번호를 확인하세요.")
                    throw new Error('오류 발생: ' + res.status); // 오류 발생시 에러를 throw
                }
                return res.json();
            })
            .then(data => {
                if (data) {
                    localStorage.clear();
                    localStorage.setItem('token', data.key);
                    // 유저 데이터 가져오기
                    fetchUserData(username);
                    window.location.replace('http://localhost:3000/');
                } else {
                    localStorage.clear();
                }
            });
    }


    return (
        <>
            <div className="MainContainer wrap">
                <div className='LabelWrapper'>

                    <Form onSubmit={SubmitHandler}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="2">
                                ID
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control type="text" placeholder="아이디를 입력해주세요." name="username" />
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