import "./NewCenter.css";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import { Button, Form, Col, Row } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';

const initialValue = {
    centername: "",
    centerid: "",
    bizid: "",
    address1: "",
    address2: "",
    introduction: "",
    password: "",
};

function CenterInfoRegister({ data, onSubmit, setPage, setCenterid }) {
    const [inputValues, setInputValues] = useState(initialValue);
    const { centername, centerid, bizid, address1, address2, introduction, password } = inputValues;

    useEffect(() => {
        if (data) {
            setInputValues(data);
        }
    }, [data])

    const username = localStorage.getItem('username');
    const [ctIdState, setCtIdState] = useState(false); // 센터 아이디 상태 관리
    const [bizIdState, setBizIdState] = useState(false); // 사업자 등록 번호 상태 관리
    const [isOpen, setIsOpen] = useState(false); // 주소 등록 모달 상태 관리
    const [inputAddressValue, setInputAddressValue] = useState();

    const onChangeInput = event => {
        const { value, name: inputName } = event.target;
        setInputValues({ ...inputValues, [inputName]: value });	//spread 연산자
    }

    // 데이터 등록
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const centerid = formData.get('centerid');
        const centername = formData.get('centername');
        const address1 = formData.get('address1');
        const address2 = formData.get('address2');
        const bizid = formData.get('bizid');
        const introduction = formData.get('introduction');
        const password = formData.get('password');

        if (centerid !== "" && centerid !== "" && centername !== "" && address1 !== "" && address2 !== "" && password !== "") {
            if (bizIdState === true && ctIdState === true) {
        const centerInfo = {
            centername: centername,
            centerid: centerid,
            password: password,
            introduction: introduction,
            manager: username,
            bizid: bizid,
            address1: address1,
            address2: address2,
        };
        onSubmit(centerInfo);
        // setCenterid(centerid);
        setPage('plan');
            } else if (bizIdState === false && ctIdState === true) {
                alert('사업자 등록 번호 유효성 검사를 진행해 주세요.');
            } else if (bizIdState === true && ctIdState === false) {
                alert('센터ID 중복 검사를 진행해 주세요.');
            } else {
                alert('오류 발생');
            }
        } else {
            alert('필수 데이터를 삽입해 주세요.');
        }
    };

    // 주소 등록 모달 관리
    const onToggleModal = () => {
        setIsOpen((prev) => !prev);
    };

    const onCompletePost = (data) => {
        onToggleModal();
        setInputAddressValue(data.address);
    };

    // 센터 아이디 중복 검사
    // 등록 가능 상태 관리
    const handleCtIdState = (event) => {
        chkCtId(inputValues.centerid);
    }

    // 중복 검사 메소드
    function chkCtId(ctid) {
        fetch(`http://localhost:8000/center/retrieve/${ctid}`)
            .then(res => {
                return res.json();
            })
            .then(data => {
                if (data !== undefined && data !== null && data !== "undefined" && data !== "" && data !== "null") {
                    setCtIdState(false);
                    alert("사용 불가능한 아이디입니다.");
                } else {
                    setCtIdState(true);
                    alert("사용 가능한 아이디입니다.")
                }
            }).catch(error => {
                setCtIdState(true);
                alert("사용 가능한 아이디입니다.")
            })
    }

    // 사업자 등록 번호 관리
    // 사업자 등록 번호 상태 체크
    const handleBizId = (event) => {
        const strBizid = bizid.replace(/-/g, '');
        setBizIdState(chkBizId(strBizid));

        if (bizIdState === true) {
            alert("사업자 등록 번호가 확인되었습니다.")
        }
    }
    // 사업자 등록 번호 유효성 검사
    function chkBizId(strBN) {  // 012-34-56789
        if (strBN.length !== 10) {
            alert("10자리를 입력해주세요.");
            return false;
        }

        let chkStep1 = 0;
        chkStep1 += parseInt(strBN.substring(0, 1), 10);
        chkStep1 += parseInt(strBN.substring(1, 2), 10) * 3 % 10;
        chkStep1 += parseInt(strBN.substring(2, 3), 10) * 7 % 10;
        chkStep1 += parseInt(strBN.substring(3, 4), 10) * 1 % 10;
        chkStep1 += parseInt(strBN.substring(4, 5), 10) * 3 % 10;
        chkStep1 += parseInt(strBN.substring(5, 6), 10) * 7 % 10;
        chkStep1 += parseInt(strBN.substring(6, 7), 10) * 1 % 10;
        chkStep1 += parseInt(strBN.substring(7, 8), 10) * 3 % 10;
        chkStep1 += parseInt(strBN.substring(8, 9), 10) * 5 % 10;
        chkStep1 += Math.floor(parseInt(strBN.substring(8, 9), 10) * 5 / 10);
        chkStep1 += parseInt(strBN.substring(9, 10), 10);

        if (chkStep1 % 10 !== 0) {
            alert("사업자 등록 번호가 유효하지 않습니다.");
            return false;
        } else {
            return true;
        }
    }

    return (
        <>
            {isOpen && (
                <Modal
                    open={true}
                    onOk={onToggleModal}
                    onCancel={onToggleModal} // isOpen이 false가 되고 화면이 리렌더되면서 모달이 뜨지 않는다.
                >
                    <DaumPostcode onComplete={onCompletePost} />
                </Modal>
            )}
            <Form onSubmit={handleSubmit}>
                <div className="form-wrapper">
                    <Form.Group className="mb-3">
                        <Form.Label>센터명</Form.Label>
                        <Form.Control type="text" placeholder="센터 이름을 입력해 주세요..." name="centername" onChange={onChangeInput} value={centername} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>센터ID</Form.Label>
                        <Form.Group className="mb-3 nomargin" as={Row} >
                            <Col xs={9} className="nomargin">
                                <Form.Control type="text" name="centerid" placeholder="센터 아이디를 입력해 주세요..." readOnly={ctIdState ? true : false} onChange={onChangeInput} value={centerid} />
                            </Col>
                            <Col className="nomargin">
                                <Form.Control type="Button" value="중복 검사" onClick={handleCtIdState} />
                            </Col>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>주소</Form.Label>
                        <Form.Group as={Row}>
                            <Row className="nomargin">
                                <Col className="my-1 nomargin" xs={7}>
                                    <Form.Control type="text" name="address1" onChange={onChangeInput} value={inputAddressValue || address1} placeholder="도로명 주소를 입력해 주세요..." onClick={onToggleModal} contentEditable="false" />
                                </Col>
                                <Col className="my-1 nomargin">
                                    <Form.Control type="Button" value="주소 찾기" onClick={onToggleModal} />
                                </Col>
                            </Row>
                            <Row className="nomargin">
                                <Col className="my-1 nomargin">
                                    <Form.Control type="text" name="address2" placeholder="상세 주소를 입력해 주세요... " onChange={onChangeInput} value={address2} />
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>사업자 등록번호</Form.Label>
                        <Form.Group className="mb-3 nomargin" as={Row} >
                            <Col xs={9} className="nomargin">
                                <Form.Control type="text" name="bizid" placeholder="사업자 등록번호를 입력해 주세요..." onChange={onChangeInput} readOnly={bizIdState ? true : false} value={bizid} />
                            </Col>
                            <Col className="nomargin">
                                <Form.Control type="Button" value="유효성 검사" onClick={handleBizId} />
                            </Col>
                        </Form.Group>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>센터소개</Form.Label>
                        <Form.Control type="text" name="introduction" placeholder="센터 소개를 입력해 주세요..." onChange={onChangeInput} value={introduction} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="센터를 관리할 때 사용할 비밀번호를 입력해 주세요..." onChange={onChangeInput} value={password} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button variant="primary" type="submit">
                            다음
                        </Button>
                    </Form.Group>
                </div>
            </Form>
        </>
    );
}

export default CenterInfoRegister;