import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CenterNav from '../../../Component/Nav/CenterNav';
import CenterInfoRegisterForm from '../../../Container/NewCenter/CenterInfoRegisterForm';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { deleteCenter, getCenter, updateCenter } from '../../../apis/api/Center';
import { setCenterName } from '../../../redux/reducers/CenterInfo';
import { message } from 'antd';

const CenterInfoModify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pCenterId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [templateList, setTemplateList] = useState();
    const [trModalVisible, setTrModalVisible] = useState(false);
    const [ttbrModalVisible, setTtbrModalVisible] = useState(false);
    const [template, setTemplate] = useState('');
    const [program, setProgram] = useState('');
    const [centerInfo, setCenterInfo] = useState({
        center_name: "",
        center_id: "",
        description: "",
        business_number: "",
        address1: "",
        address2: "",
    });
    const { center_name, center_id, business_number, address1, address2, description } = centerInfo;
    const [messageApi, contextHolder] = message.useMessage();

    const alertMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    useEffect(() => {
        getCenter(authToken.current, pCenterId)
            .then(data => {
                setCenterInfo(data);
            })
    }, [])

    const onChangeInput = (event) => {
        const { name, value } = event.target;
        setCenterInfo({
            ...centerInfo,
            [name]: value,
        })
    }

    const handleOnSubmit = () => {
        updateCenter(authToken.current, pCenterId, centerInfo)
            .then(response => {
                if (response === 200) {
                    dispatch(setCenterName(centerInfo.center_name));
                    alertMessage("success", "수정 완료")
                } else {
                    alertMessage("error", "오류")
                }
            })
    }
    const handleOnDelete = () => {
        deleteCenter(authToken.current, pCenterId)
            .then(response => {
                if (response === 204) {
                    alert("삭제 되었습니다.")
                    navigate("/");
                }
            })
    }

    return (
        <div>
            {contextHolder}
            <div className="header">
                <CenterNav centerid={pCenterId} />
            </div>
            <div className="main-container">
                <div className="content-container">
                    <div className="title-container">
                        <label className="label-title">기본 정보 수정</label>
                    </div>
                    <div className="content-wrap">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>센터명</Form.Label>
                                <Form.Control type="text" placeholder="센터 이름을 입력해 주세요..." name="center_name" onChange={onChangeInput} value={center_name} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>센터ID</Form.Label>
                                <Form.Group className="mb-3 nomargin" as={Row} >
                                    <Form.Control
                                        type="text"
                                        name="center_id"
                                        placeholder="센터 아이디를 입력해 주세요..."
                                        disabled={true}
                                        onChange={onChangeInput} value={center_id} />
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
                                                disabled={true}
                                                contentEditable="false" />
                                        </Col>
                                        <Col className="my-1 nomargin">
                                            <Form.Control
                                                type="Button"
                                                value="주소 찾기"
                                                disabled={true} />
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
                                    <Form.Control
                                        type="text"
                                        name="business_number"
                                        placeholder="사업자 등록번호를 입력해 주세요..."
                                        onChange={onChangeInput}
                                        disabled={true}
                                        value={business_number} />
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
                                <Button variant="primary" onClick={handleOnSubmit}>
                                    저장
                                </Button>
                                <Button variant="danger" onClick={handleOnDelete} style={{ marginLeft: "10px" }}>
                                    삭제
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CenterInfoModify;
