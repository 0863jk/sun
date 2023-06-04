import StudentCard from "../../Component/Card/StudentCard";
import CenterNav from "../../Component/Nav/CenterNav";
import CardGroup from 'react-bootstrap/CardGroup';
import Nav from 'react-bootstrap/Nav';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useFetch from "../../Hook/useFetch";
import UserCard from "../../Component/Card/UserCard";
import AdminTap from "./AdminTap";

function MemberManage() {
    const { pCenterId } = useParams();
    const members = useFetch(`http://localhost:8000/center/getCenterMembers/${pCenterId}`);

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">회원 관리</label>
                        <AdminTap centerid={pCenterId} current="member" />
                        {/* <div className="Taps">
                            <Nav className="justify-content-center" activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link href={`/admin/trainer/${pCenterId}`}>강사 관리</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href={`/admin/member/${pCenterId}`} className="current">회원 관리</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href={`/admin/stats/${pCenterId}`}>통계</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href={`/admin/lesson/${pCenterId}`}>강의평</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </div> */}
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                {members && members.map(members => (
                                    <UserCard name={members.name} email={members.email} phone={members.phone} />
                                ))}
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MemberManage;