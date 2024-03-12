import "./NewCenter.css";
import { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { Button, Form, Col, Row } from 'react-bootstrap';
import DaumPostcode from 'react-daum-postcode';
import { getCenter } from "../../apis/api/Center";
import { useSelector } from "react-redux";


function CenterInfoRegisterForm(props) {
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [ctIdState, setCtIdState] = useState(false); // 센터 아이디 상태 관리
    const [bizIdState, setBizIdState] = useState(false); // 사업자 등록 번호 상태 관리
    const [modalVisible, setModalVisible] = useState(false); // 주소 등록 모달 상태 관리
    const [inputAddressValue, setInputAddressValue] = useState();
    const initialValue = {
        center_name: "",
        center_id: "",
        business_number: "",
        address1: "",
        address2: "",
        description: "",
    };
    const [inputValues, setInputValues] = useState(initialValue);
    const { center_name, center_id, business_number, address1, address2, description } = inputValues;

    useEffect(() => {
        if (props.data) {
            setInputValues(props.data);
        }
    }, [props.data])

    const onChangeInput = (event) => {
        const { value, name } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    }

    // 데이터 등록
    const handleSubmit = () => {
        if (center_id !== "" && center_id !== "" && center_name !== "" && address1 !== "" && address2 !== "") {
            if (ctIdState === true && bizIdState === true) {
                const centerInfo = {
                    center_name: center_name,
                    center_id: center_id,
                    description: description,
                    business_number: business_number,
                    address1: address1,
                    address2: address2,
                };
                props.onSubmit(centerInfo);
            } else {
                if (ctIdState === false) {
                    alert('센터 아이디 중복 검사를 진행해 주세요.');
                }
                if (bizIdState === false) {
                    alert('사업자 등록 번호 유효성 검사를 진행해 주세요.');
                }
            }
        } else {
            alert('필수 데이터를 삽입해 주세요.');
        };
    }

    // 주소 등록 모달 관리
    const onToggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const onCompletePost = (data) => {
        setInputValues(
            {
                ...inputValues,
                address1: data.address
            });
        setInputAddressValue(data.address);
        onToggleModal();
    };

    // 센터 아이디 중복 검사
    // 등록 가능 상태 관리
    const handleCtIdState = () => {
        getCenter(authToken.current, center_id)
            .then(data => {
                if (data.center_id) {
                    setCtIdState(false);
                    alert("사용 불가능한 아이디입니다.");
                } else {
                    setCtIdState(true);
                    alert("사용 가능한 아이디입니다.")
                }
            })
    }

    // 사업자 등록 번호 관리
    // 사업자 등록 번호 상태 체크
    const handleBizId = () => {
        const rs = chkBizId(business_number.replace(/-/g, ''))
        if (rs) {
            alert("사업자 등록 번호가 확인되었습니다.")
        }
        setBizIdState(rs);
    }
    // 사업자 등록 번호 유효성 검사
    function chkBizId(strBN) {  // 012-34-56789
        if (strBN.length !== 10) {
            alert("유효한 10자리를 입력해주세요.");
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
            <div>
                <Form.Group className="mb-3">
                    <Form.Label>센터명</Form.Label>
                    <Form.Control type="text" placeholder="센터 이름을 입력해 주세요..." name="center_name" onChange={onChangeInput} value={center_name} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>센터ID</Form.Label>
                    <Form.Group className="mb-3 nomargin" as={Row} >
                        <Col xs={9} className="nomargin">
                            <Form.Control
                                type="text"
                                name="center_id"
                                placeholder="센터 아이디를 입력해 주세요..."
                                disabled={ctIdState}
                                onChange={onChangeInput} value={center_id} />
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
                                <Form.Control
                                    type="text"
                                    name="address1"
                                    onChange={onChangeInput}
                                    value={address1}
                                    placeholder="도로명 주소를 입력해 주세요..."
                                    onClick={onToggleModal}
                                    contentEditable="false" />
                            </Col>
                            <Col className="my-1 nomargin">
                                <Form.Control
                                    type="Button"
                                    value="주소 찾기"
                                    onClick={onToggleModal} />
                            </Col>
                        </Row>
                        <Row className="nomargin">
                            <Col className="my-1 nomargin">
                                <Form.Control
                                    type="text"
                                    name="address2"
                                    placeholder="상세 주소를 입력해 주세요... "
                                    onChange={onChangeInput}
                                    value={address2} />
                            </Col>
                        </Row>
                    </Form.Group>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>사업자 등록번호</Form.Label>
                    <Form.Group className="mb-3 nomargin" as={Row} >
                        <Col xs={9} className="nomargin">
                            <Form.Control
                                type="text"
                                name="business_number"
                                placeholder="사업자 등록번호를 입력해 주세요..."
                                onChange={onChangeInput}
                                disabled={bizIdState}
                                value={business_number} />
                        </Col>
                        <Col className="nomargin">
                            <Form.Control type="Button" value="유효성 검사" onClick={handleBizId} />
                        </Col>
                    </Form.Group>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>센터소개</Form.Label>
                    <Form.Control
                        type="text"
                        name="description"
                        placeholder="센터 소개를 입력해 주세요..."
                        onChange={onChangeInput}
                        value={description} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Button variant="primary" onClick={handleSubmit}>
                        등록
                    </Button>
                </Form.Group>
            </div>
            <Modal
                centered
                open={modalVisible}
                onOk={onToggleModal}
                onCancel={onToggleModal}
                footer={null}
            >
                {/* <div style={{ height: "100%" }}> */}
                <DaumPostcode
                    onComplete={onCompletePost}
                    style={{ height: "500px" }}
                />
                {/* </div> */}
            </Modal>
        </>
    );
}

export default CenterInfoRegisterForm;