import "./NewCenter.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

function CenterRegister() {
    return (
        <>
            <div className="wrap MainContainer">
                <div className="LabelWrapper">
                    <label className="LabelTitle">센터 새로 등록</label>
                    <div className="Taps">
                        <Nav className="justify-content-center" activeKey="/home">
                            <Nav.Item>
                                <Nav.Link href="/center/register/info" className="current">센터 기본 정보 등록</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/center/register/plan">이용권 정보 등록</Nav.Link>
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
                                <Form.Label>센터명</Form.Label>
                                <Form.Control type="text" placeholder="center name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>센터ID</Form.Label>
                                <Form.Control type="text" placeholder="center name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>사업자 등록번호</Form.Label>
                                <Form.Control type="text" placeholder="center name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>센터소개</Form.Label>
                                <Form.Control type="text" placeholder="center name" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CenterRegister;