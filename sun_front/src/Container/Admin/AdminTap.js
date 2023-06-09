import React from 'react';
import { Nav } from 'react-bootstrap';

function AdminTap({centerid, current}) {
    return (
        <div className="Taps">
            <Nav className="justify-content-center" activeKey="/home">
                <Nav.Item>
                    <Nav.Link href={`/admin/trainer/${centerid}`} className={current === "trainer" ? "current" : ""}>강사 관리</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={`/admin/member/${centerid}`} className={current === "member" ? "current" : ""}>회원 관리</Nav.Link>
                </Nav.Item>
                {/* <Nav.Item>
                    <Nav.Link href={`/admin/stats/${centerid}`} className={current === "stats" ? "current" : ""}>통계</Nav.Link>
                </Nav.Item> */}
                <Nav.Item>
                    <Nav.Link href={`/admin/lesson/${centerid}`} className={current === "lesson" ? "current" : ""}>강의평</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default AdminTap;
