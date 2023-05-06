import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import CenterNav from "../../Component/Nav/CenterNav";

function PlanModify() {
    return (
        <>
            <div>
                <div className="header">
                    <CenterNav />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">플랜명</label>
                        <div className="ContentContainer">
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>플랜명</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>플랜방식</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>기간 설정</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>제약 조건</Form.Label>
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
export default PlanModify;