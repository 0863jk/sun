import { useEffect, useState } from "react";
import "./NewCenter.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DaumPostcode from 'react-daum-postcode';

function CenterInfoRegister({ onSubmit, setPage, setCenterid }) {
    const [id, setId] = useState('');
    const [modalState, setModalState] = useState(false);
    const [inputAddressValue, setInputAddressValue] = useState();
    const [inputZipCodeValue, setInputZipCodeValue] = useState();

    const onCompletePost = (data) => {
        setModalState(false);
        setInputAddressValue(data.address);
        setInputZipCodeValue(data.zonecode);
        console.log(data.address);
        console.log(data.zonecode);
    }; // onCompletePost 함수
    const postCodeStyle = {
        width: '400px',
        height: '400px',
        display: 'block',
    }; // 스타일 정의 code

    useEffect(() => {
        setId(localStorage.getItem('id'));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const centerid = formData.get('centerid');
        const centername = formData.get('centername');
        const location = formData.get('location');
        const introduction = formData.get('introduction');
        const password = formData.get('password');

        const centerInfo = {
            centername: centername,
            centerid: centerid,
            manager: id,
            introduction: introduction,
            location: location,
            password: password,
        };
        const CenterInfoData = JSON.stringify(centerInfo);
        console.log(CenterInfoData);
        onSubmit(centerInfo);
        setCenterid(centerid);
        setPage('plan');
    };

    const showModal = (event) => {
        setModalState(true);
    }

    return (
        <>
            {
                modalState ? (
                    <div>

                        <DaumPostcode
                            className="postmodal"
                            onComplete={onCompletePost}
                        ></DaumPostcode>
                    </div>
                ) : <></>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>센터명</Form.Label>
                    <Form.Control type="text" placeholder="센터 이름을 입력해 주세요..." name="centername" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>센터ID</Form.Label>
                    <Form.Control type="text" name="centerid" placeholder="센터 아이디를 입력해 주세요..." />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>주소</Form.Label>
                    <Form.Control type="Button" name="btnpostmodal" value="주소 찾기" onClick={showModal} />
                    <Form.Control type="text" name="location" value={inputAddressValue|| ''} placeholder="주소를 입력해주세요... " onClick={showModal} contentEditable="false"/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>사업자 등록번호</Form.Label>
                    <Form.Control type="text" placeholder="사업자 등록번호를 입력해 주세요..." />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>센터소개</Form.Label>
                    <Form.Control type="text" name="introduction" placeholder="센터 소개를 입력해 주세요..." />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="센터를 관리할 때 사용할 비밀번호를 입력해 주세요..." />
                </Form.Group>
                <Button variant="primary" type="submit">
                    다음
                </Button>
            </Form>
        </>
    );
}

export default CenterInfoRegister;