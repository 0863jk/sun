import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import CenterNav from '../../Component/Nav/CenterNav';

function LessonRegister() {
    return (
        <>
            <div>
                <div className="header">
                    <CenterNav />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">수업 등록</label>
                        <div className="CenterListContainer">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>수업명</Form.Label>
                                    <Form.Control type="text" placeholder=" " />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>강사 선택</Form.Label>
                                    <Form.Control type="text" placeholder=" " />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>최대 인원</Form.Label>
                                    <Form.Control type="text" placeholder=" " />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>요일 및 시간</Form.Label>
                                    <Form.Control type="text" placeholder=" " />
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
export default LessonRegister;