import { useEffect, useState } from "react";
import "./Nav.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from "react-router-dom";

function CenterNav({ centerid }) {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [role, setRole] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token') !== null | localStorage.getItem('token') !== undefined | localStorage.getItem('token') !== 'undefined') {
            setId(localStorage.getItem('username'));
            setRole(localStorage.getItem('role'));
        } else {
            navigate('http://localhost:3000/login');
        }
    }, [navigate])

    return (
        <>
            <Navbar className="testNav" variant="light">
                <Container>
                    <Navbar.Brand href={`/main/${centerid}`}>센터명</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href={`/weekly/${centerid}`}>시간표</Nav.Link>
                        <NavDropdown title="이용권" id="basic-nav-dropdown">
                            <NavDropdown.Item href={`/plan/${centerid}`}>이용권 목록</NavDropdown.Item>
                            {role === "general" ? (<NavDropdown.Item href={`/plan/my/${centerid}`}>나의 이용권 정보</NavDropdown.Item>)
                                : role === "manager" ? (
                                    <>
                                        <NavDropdown.Item href={`/plan/register/${centerid}`}>이용권 추가</NavDropdown.Item>
                                        <NavDropdown.Item href={`/plan/modify/${centerid}`}>이용권 정보 수정</NavDropdown.Item>
                                    </>
                                ) : <></>}
                        </NavDropdown>
                        {role === "general" ?
                            <NavDropdown title="레슨" id="basic-nav-dropdown">
                                <NavDropdown.Item href={`/lesson/history/${centerid}/${id}`}>나의 레슨 기록</NavDropdown.Item>
                            </NavDropdown>
                            : role === "trainer" ?
                                <NavDropdown title="레슨" id="basic-nav-dropdown">
                                    <NavDropdown.Item href={`/lesson/${centerid}/${id}`}>나의 레슨</NavDropdown.Item>
                                </NavDropdown>
                                : <></>}

                        {role === "manager" ? <Nav.Link href={`/timetable/${centerid}`}>시간표 등록</Nav.Link> : <></>}
                        {role === "manager" ? <Nav.Link href={`/admin/${centerid}`}>관리</Nav.Link> : <></>}
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default CenterNav;