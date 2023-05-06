import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import CenterNav from "../../Component/Nav/CenterNav";

function WriteLessonReview() {
    return (
        <>
            <div>
                <div className="header">
                    <CenterNav />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">강의명</label>
                        <div className="ContentContainer">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>강의명</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>난이도는 어땠나요?</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>강사의 지도는 어땠나요?</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>이 강의를 추천하시나요?</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>강사에게 남길 말이 있나요?</Form.Label>
                                    <Form.Control type="text" placeholder="" />
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
export default WriteLessonReview;