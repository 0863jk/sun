import "./NewCenter.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

function PlanRegister() {
    return (
        <>
            <div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">센터 새로 등록</label>
                        <div className="Taps">
                            <Nav className="justify-content-center" activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link href="/center/register/info">센터 기본 정보 등록</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/center/register/plan" className="current">이용권 정보 등록</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link href="/center/register/teacher">강사 등록</Nav.Link>
                                </Nav.Item>
                                {/* <Nav.Item>
                                <Nav.Link eventKey="disabled" disabled>
                                    Disabled
                                </Nav.Link>
                            </Nav.Item> */}
                            </Nav>
                        </div>
                        <div className="ContentContainer">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>플랜명</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>플랜방식</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>기간 설정</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>제약 조건</Form.Label>
                                    <Form.Control type="text" placeholder="Enter email" />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default PlanRegister;