import "./LoginForm.css";
import { Col, Form, Row } from 'react-bootstrap';
import { signUp } from '../../apis/api/User';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/reducers/AuthReducer';
import { setFirstName, setLastName, setRole, setUserName } from '../../redux/reducers/UserInfo';
import { setLoginState } from '../../redux/reducers/LoginStateReducer';
import { useCookies } from 'react-cookie';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function SignUp(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['refresh_token']);

    const setUserData = (access_token, refresh_token, data) => {
        const username = data.username;
        const first_name = data.first_name;
        const last_name = data.last_name;
        const role = data.role;
        const expires = moment().add('7', 'day').toDate()

        dispatch(setToken(access_token));
        dispatch(setUserName(username));
        dispatch(setFirstName(first_name));
        dispatch(setLastName(last_name));
        dispatch(setRole(role));
        setCookie("refresh_token", refresh_token, { expires });
        console.log(data);
    };

    const handleSumbit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const datas = {
            username: data.get("username"),
            email: data.get("email"),
            password1: data.get("password1"),
            password2: data.get("password2"),
            first_name: data.get("first_name"),
            last_name: data.get("last_name"),
            phone1: data.get("phone1"),
            phone2: data.get("phone2"),
            phone3: data.get("phone3"),
            role: data.get("role")
        };
        console.log(datas);
        signUp(datas).then(data => {
            console.log(data);
            if (data.access_token) {
                const { access_token, refresh_token, userDetail } = data;
                // alert('회원가입이 완료되었습니다.');
                setUserData(access_token, refresh_token, userDetail);
                navigate('/');
                props.LoginSuccess(userDetail.first_name);
                // window.location.replace('http://localhost:3000/');
            } else {
                alert("회원가입 실패: 다시 한 번 시도해 주세요.")
                console.log(data.message);
                window.location.reload();
            }
        }).catch(error => alert(error));
    }

    const Logo = <img src={process.env.PUBLIC_URL + '/img/Logo.png'} alt="logo" style={{
        height: '200px',
        width: '200px',
    }} />;

    return (
        <>
            <div className="main-container">
                <div className='label-wrapper'>
                    <div className='logo-container'>
                        <div>
                            {Logo}
                        </div>
                        <div>
                            <h1 className="sun-title">SUN</h1>
                            <h5 className="sun-subtitle">Shape Up Now!</h5>
                        </div>
                    </div>
                    <div className="login-container">
                        <Form onSubmit={handleSumbit}>
                            <div className='form-wrapper'>
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
                                        계정 유형
                                    </Form.Label>
                                    <Col>
                                        <Form.Select name="role">
                                            <option value="">
                                                계정 유형 선택
                                            </option>
                                            <option value="general" key="general">
                                                일반 유저
                                            </option>
                                            <option value="instroctor" key="instroctor">
                                                강사
                                            </option>
                                            <option value="manager" key="manager">
                                                운영자
                                            </option>
                                        </Form.Select>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Name
                                    </Form.Label>
                                    <Col>
                                        <Form.Control type="text" placeholder="성을 입력해 주세요..." name="last_name" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="이름을 입력해 주세요..." name="first_name" />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3">
                                    <Form.Label column sm="2">
                                        Phone
                                    </Form.Label>
                                    <Col>
                                        <Form.Control type="text" placeholder="010" name="phone1" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="0000" name="phone2" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="0000" name="phone3" />
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
    )
}

export default SignUp;