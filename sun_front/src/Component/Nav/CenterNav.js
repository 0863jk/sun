import "./Nav.css";
import { useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useSelector } from "react-redux";
import { getInstroctorPermissions } from "../../apis/api/Instroctor";

function CenterNav() {
    const userInfo = useSelector((state) => state.UserInfo);
    const centerInfo = useSelector((state) => state.CenterInfo);
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const centerId = useRef(centerInfo.center_id);
    const username = useRef(userInfo.username);
    const role = useRef(userInfo.role);
    const [permissions, setPermissions] = useState({
        program_management_permissions: "",
        member_management_permissions: "",
        pass_management_permissions: "",
    });
    const { program_management_permissions, member_management_permissions, pass_management_permissions } = permissions;

    useEffect(() => {
        if (role.current === "instroctor") {
            getInstroctorPermissions(authToken.current, centerId.current, username.current)
                .then(data => {
                    setPermissions(data);
                })
        }
    }, [])

    return (
        <>
            <Navbar className="testNav" variant="light">
                <Container>
                    <Navbar.Brand href={`/main/${centerId.current}`}>{centerInfo.center_name}</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href={`/timetable/${centerId.current}`}>시간표</Nav.Link>
                        <Nav.Link href={`/pass/list/${centerId.current}`}>수강권</Nav.Link>
                        {
                            role.current === "general" ?
                                <Nav.Link href={`/mypage/general/${centerId.current}`}>나의 이용내역</Nav.Link>
                                : <></>
                        }
                        {
                            role.current === "manager" ?
                                <>
                                    <NavDropdown title="수업 관리" id="basic-nav-dropdown">
                                        <NavDropdown.Item href={`/admin/timetable/${centerId.current}`}>시간표 관리</NavDropdown.Item>
                                        <NavDropdown.Item href={`/admin/template/${centerId.current}`}>정규 수업 관리</NavDropdown.Item>
                                        <NavDropdown.Item href={`/admin/program/${centerId.current}`}>모든 수업 관리</NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="센터 관리" id="basic-nav-dropdown">
                                        <NavDropdown.Item href={`/admin/info/${centerId.current}`}>기본 정보 수정</NavDropdown.Item>
                                        <NavDropdown.Item href={`/admin/revenue/${centerId.current}`}>수익 관리</NavDropdown.Item>
                                        <NavDropdown.Item href={`/admin/pass/${centerId.current}`}>수강권 관리</NavDropdown.Item>
                                        <NavDropdown.Item href={`/admin/instroctor/${centerId.current}`}>강사 관리</NavDropdown.Item>
                                        <NavDropdown.Item href={`/admin/member/${centerId.current}`}>회원 관리</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                : <></>
                        }
                        {
                            role.current === "instroctor" ?
                                <>
                                    <NavDropdown title="나의 수업 관리" id="basic-nav-dropdown">
                                        <NavDropdown.Item href={`/mypage/instroctor/template/${centerId.current}`}>정규 수업 관리</NavDropdown.Item>
                                        <NavDropdown.Item href={`/mypage/instroctor/program/${centerId.current}`}>모든 수업 관리</NavDropdown.Item>
                                    </NavDropdown>
                                    {
                                        program_management_permissions ? (<>
                                            <NavDropdown title="수업 관리" id="basic-nav-dropdown">
                                                <NavDropdown.Item href={`/admin/timetable/${centerId.current}`}>시간표 관리</NavDropdown.Item>
                                                <NavDropdown.Item href={`/admin/template/${centerId.current}`}>정규 수업 관리</NavDropdown.Item>
                                                <NavDropdown.Item href={`/admin/program/${centerId.current}`}>모든 수업 관리</NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        ) : <></>
                                    }
                                    {
                                        pass_management_permissions || member_management_permissions ? (
                                            <NavDropdown title="센터 관리" id="basic-nav-dropdown">
                                                {
                                                    pass_management_permissions ? (
                                                        <NavDropdown.Item href={`/admin/pass/${centerId.current}`}>수강권 관리</NavDropdown.Item>
                                                    ) : <></>
                                                }
                                                {
                                                    member_management_permissions ? (
                                                        <NavDropdown.Item href={`/admin/member/${centerId.current}`}>회원 관리</NavDropdown.Item>
                                                    ) : <></>
                                                }
                                            </NavDropdown>
                                        ) : <></>
                                    }
                                </>
                                : <></>
                        }
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default CenterNav;