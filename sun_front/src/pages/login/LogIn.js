import "./LoginForm.css";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from "react-router-dom";
import { setFirstName, setLastName, setRole, setUserName } from "../../redux/reducers/UserInfo";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/reducers/AuthReducer";
import { logIn } from "../../apis/api/User";
import { useCookies } from 'react-cookie';
import moment from 'moment/moment';
import { message } from 'antd';

function LogIn(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies, setCookie, removeCookie] = useCookies(['refresh_token']);
    const [messageApi, contextHolder] = message.useMessage();

    const Logo = <img src={process.env.PUBLIC_URL + '/img/Logo.png'} alt="logo" style={{
        height: '200px',
        width: '200px',
    }} />;

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
    };

    const SubmitHandler = (event) => {
        event.preventDefault();
        const datas = new FormData(event.target);
        const username = datas.get("username");
        const password = datas.get("password");

        const user = {
            username: username,
            password: password
        };
        logIn(user).then(data => {
            if (data.access_token) {
                const { access_token, refresh_token, userDetail } = data;
                setUserData(access_token, refresh_token, userDetail);
                navigate('/');
                props.LoginSuccess(userDetail.first_name);
            } else {
                alert("로그인 실패: 아이디 및 비밀번호를 확인하세요.")
                console.log(data.message);
                // window.location.reload();
            }
        }).catch(error => alert(error));
    }


    return (
        <>
            {contextHolder}
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
                            <Form.Group className="mb-3">
                                <Form.Control type="submit" name="submit" value="LOGIN" className="btn-login" />
                            </Form.Group>
                            <p className="text">회원이 아니신가요? <Link to="/signup">회원가입</Link></p>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogIn;