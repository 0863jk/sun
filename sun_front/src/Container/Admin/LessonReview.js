import LessonCard from "../../Component/Card/LessonCard";
import CardGroup from 'react-bootstrap/CardGroup';
import CenterNav from "../../Component/Nav/CenterNav";
import Nav from 'react-bootstrap/Nav';

function LessonReview() {
    return (
        <>
            <div>
                <div className="header">
                    <CenterNav />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">강의평</label>
                        <div className="Taps">
                            <Nav className="justify-content-center" activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="/admin/teacher/centerid">강사 관리</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/admin/member/centerid">회원 관리</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/admin/stats/centerid">통계</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/admin/lesson/centerid" className="current">강의평</Nav.Link>
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
                                <LessonCard />
                                <LessonCard />
                                <LessonCard />
                                <LessonCard />
                                <LessonCard />
                                <LessonCard />
                                <LessonCard />
                                <LessonCard />
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LessonReview;