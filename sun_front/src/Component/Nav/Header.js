import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getData, getUserData, isAccessTokenExpired, logOut, refreshAccessToken } from '../../apis/api/User';
import { setToken } from '../../redux/reducers/AuthReducer';
import { Cookies, useCookies } from 'react-cookie';
import { message } from 'antd';
import { setLoginState } from '../../redux/reducers/LoginStateReducer';

const Logo = <img src={process.env.PUBLIC_URL + '/img/Logo.png'} alt="logo" style={{
    height: '35px',
    width: '35px',
    marginLeft: '10px'
}} />;

function Header(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [auth, setAuth] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState(''); 
    const loginState = props.loginState
    // const loginState = useSelector((state) => state.LoginState.login_state);
    const userInfo = useSelector((state) => state.UserInfo);


    useEffect(() => {
        if (!loginState) {
            setAuth(false);
            dispatch(setLoginState(false));
            navigate('/login');
        } else {
            setAuth(true);
            setName(userInfo.last_name + userInfo.first_name);
            setRole(userInfo.role);
        }
    }, [loginState])


    const handleLogout = () => {
        logOut().then(response => {
            if (response === 200) {
                localStorage.clear();
                setAuth(false);
                setName("");
                setRole("");
                dispatch(setLoginState(false));
                navigate('/login');
                // window.location.replace('http://localhost:3000/login');
            }
        })
    };

    return (
        <>
            <div>
                <Navbar bg="light" variant="light">
                    <Container>
                        <Navbar.Brand href="/">
                            {Logo}
                        </Navbar.Brand>
                        {
                            auth && (
                                <>
                                    <Nav className="me-auto">
                                        <NavDropdown title="센터 등록" id="basic-nav-dropdown">
                                            {role === "manager" ?
                                                <NavDropdown.Item href="/center/register">센터 새로 등록</NavDropdown.Item>
                                                : <NavDropdown.Item href="/center/search">센터 검색</NavDropdown.Item>}
                                        </NavDropdown>
                                        {role !== "manager" && (
                                            <Nav.Link href="/timetable">시간표</Nav.Link>
                                        )}
                                    </Nav>
                                </>
                            )
                        }
                        <Navbar.Collapse className="justify-content-end">
                            {auth ? (<>
                                <NavDropdown title={name} id="basic-nav-dropdown">
                                    <NavDropdown.Item disabled="true">{role === "manager" ? (<>운영자</>) : role === "instroctor" ? (<>강사</>) : role === "general" ? (<>일반사용자</>) : <></>}</NavDropdown.Item>
                                    <NavDropdown.Item href="/account/profile">프로필 수정</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
                                </NavDropdown>
                            </>) : (<Nav.Link href="/login">로그인</Nav.Link>)}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}

export default Header;