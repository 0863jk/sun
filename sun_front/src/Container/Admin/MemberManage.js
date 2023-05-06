import StudentCard from "../../Component/Card/StudentCard";
import CenterNav from "../../Component/Nav/CenterNav";
import CardGroup from 'react-bootstrap/CardGroup';
import Nav from 'react-bootstrap/Nav';

function MemberManage() {
    return (
        <>
            <div>
                <div className="header">
                    <CenterNav />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">회원 관리</label>
                        <div className="Taps">
                        <Nav className="justify-content-center" activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="/admin/teacher/centerid">강사 관리</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/admin/member/centerid"  className="current">회원 관리</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/admin/stats/centerid">통계</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/admin/lesson/centerid">강의평</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item>
                                <Nav.Link eventKey="disabled" disabled>
                                    Disabled
                                </Nav.Link>
                            </Nav.Item> */}
                            </Nav>
                        </div>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                <StudentCard />
                                <StudentCard />
                                <StudentCard />
                                <StudentCard />
                                <StudentCard />
                                <StudentCard />
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default MemberManage;