import "./NewCenter.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import TeacherCard from '../../Component/Card/TeacherCard';
import CardGroup from 'react-bootstrap/CardGroup';
import InputGroup from 'react-bootstrap/InputGroup';

function TeacherRegister() {
    return (
        <>
            <div className="wrap MainContainer">
                <div className="LabelWrapper">
                    <label className="LabelTitle">센터 새로 등록</label>
                    <div className="Taps">
                        <Nav className="justify-content-center" activeKey="/home">
                            <Nav.Item>
                                <Nav.Link href="/center/register/info">센터 기본 정보 등록</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/center/register/plan">이용권 정보 등록</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="/center/register/teacher" className="current">강사 등록</Nav.Link>
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
                            <div className="SearchBar">
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="ID로 강사 검색"
                                        aria-describedby="basic-addon2"
                                    />
                                    <Button variant="outline-secondary" id="button-addon2">
                                        Button
                                    </Button>
                                </InputGroup>
                            </div>
                                <div className="TeacherListContainer">
                                    <CardGroup className="CardGroup">
                                        <TeacherCard />
                                        <TeacherCard />
                                        <TeacherCard />
                                        <TeacherCard />
                                    </CardGroup>
                                </div>
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
export default TeacherRegister;