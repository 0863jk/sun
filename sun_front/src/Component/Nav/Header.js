import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Logo = <img src={process.env.PUBLIC_URL + '/img/Logo.png'} style={{
    height: '35px',
    width: '35px',
    marginLeft: '10px'
}} />;

function Header() {
    const [auth, setAuth] = useState('');
    const [name, setName] = useState('');
    const [id, setId] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token') !== null | localStorage.getItem('token') !== undefined | localStorage.getItem('token') !== 'undefined') {
            setAuth(true);
            setName(localStorage.getItem('username'));
            setId(localStorage.getItem('Id'));
            setRole(localStorage.getItem('role'));
        // } else if(localStorage.getItem('token') === null | localStorage.getItem('token') === undefined) {
        } else {
            setAuth(false);
            window.location.replace('http://localhost:3000/login');
        }
    }, [])

    const handleLogout = () => {
        fetch('http://127.0.0.1:8000/auth/logout/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                localStorage.clear();
                setAuth(false);
                setName("");
                setRole("");
                window.location.replace('http://localhost:3000/login');
            });
    };

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/">
                        {Logo}
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/center/list">나의 센터</Nav.Link>
                        <NavDropdown title="센터 등록" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/center/search">센터 ID로 검색</NavDropdown.Item>
                            {role === "manager" ? <NavDropdown.Item href="/center/register">센터 새로 등록</NavDropdown.Item> : <></>}
                        </NavDropdown>
                        <Nav.Link href="/">시간표</Nav.Link>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        {auth ? (<>
                            <NavDropdown title={name} id="basic-nav-dropdown">
                            <NavDropdown.Item disabled="true">{role}</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">프로필 수정</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
                        </NavDropdown>
                        </>) : (<Nav.Link href="/login">로그인</Nav.Link>)}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;