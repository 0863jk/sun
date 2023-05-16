import TrainerCard from "../../Component/Card/TrainerCard";
import CenterNav from "../../Component/Nav/CenterNav";
import CardGroup from 'react-bootstrap/CardGroup';
import Nav from 'react-bootstrap/Nav';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function TrainerManage() {
    const { pCenterId } = useParams();
    const [centerid, setCenterid] = useState('');

    useEffect(() => {
        setCenterid(pCenterId);
    }, []);

    return (
        <>
            <div>
                <div className="header">
                    <CenterNav centerid={centerid}/>
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">강사 관리</label>
                        <div className="Taps">
                            <Nav className="justify-content-center" activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="/admin/trainer/centerid" className="current">강사 관리</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/admin/member/centerid">회원 관리</Nav.Link>
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
                                <TrainerCard />
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default TrainerManage;