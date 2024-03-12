import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import CenterNav from '../../../Component/Nav/CenterNav';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { List, Result, message } from 'antd';
import SearchUserModal from '../../../Component/Modal/SearchUserModal';
import { deleteInstroctor, getCenterInstroctorList, getInstroctorPermissions, postInstroctor, updateInstroctor } from '../../../apis/api/Instroctor';
import { getCenterProgramsByInstroctorId, getCenterProgramsByTemplateId } from '../../../apis/api/Program';
import { getInstroctorTemplateWithStatus } from '../../../apis/api/Template';

const Instroctor = () => {
    const navigate = useNavigate();
    const { pCenterId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [instroctors, setInstroctors] = useState([]);
    const [programList, setProgramList] = useState([]);
    const [templateList, setTemplateList] = useState([]);
    const [modalState, setModalState] = useState(false);
    const [saveState, setSaveState] = useState(true);
    const [instroctor, setInstroctor] = useState('');
    const [storedPermissions, setStoredPermissions] = useState({
        program_management_permissions: "",
        member_management_permissions: "",
        pass_management_permissions: "",
    });
    const [permissions, setPermissions] = useState({
        program_management_permissions: "",
        member_management_permissions: "",
        pass_management_permissions: "",
    });
    const { program_management_permissions, member_management_permissions, pass_management_permissions } = permissions;
    const [messageApi, contextHolder] = message.useMessage();
    const alertMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    useEffect(() => {
        getCenterInstroctorList(authToken.current, pCenterId)
            .then(data => {
                setInstroctors(data);
            })
    }, [modalState])

    useEffect(() => {
        if (storedPermissions) {
            setPermissions(storedPermissions);
        }
    }, [storedPermissions])

    useEffect(() => {
        if (storedPermissions.member_management_permissions !== permissions.member_management_permissions ||
            storedPermissions.pass_management_permissions !== permissions.pass_management_permissions ||
            storedPermissions.program_management_permissions !== permissions.program_management_permissions) {
            setSaveState(false);
        } else if (storedPermissions.member_management_permissions === permissions.member_management_permissions ||
            storedPermissions.pass_management_permissions === permissions.pass_management_permissions ||
            storedPermissions.program_management_permissions === permissions.program_management_permissions) {
            setSaveState(true);
        }
    }, [permissions]);

    const handleModalState = () => {
        if (!modalState) {
            setModalState(true);
        } else {
            setModalState(false);
        }
    }

    const handleSubmit = async (data) => {
        const promises = data.map(data => {
            const inputData = {
                user_id: data.username,
                center_id: pCenterId,
            };
            return postInstroctor(authToken.current, inputData)
                .then(response => (response === 201));
        });

        try {
            const responses = await Promise.all(promises);
            const successCount = responses.filter(response => response).length;

            // 모든 요청이 성공했는지 여부와 성공한 갯수를 반환
            return successCount;
        } catch (err) {
            console.log(err);
            return 0;
        }
    }

    const selectInstroctor = (instroctor) => {
        setInstroctor(instroctor);
        getInstroctorPermissions(authToken.current, pCenterId, instroctor.username)
            .then(data => {
                setStoredPermissions(data);
            })
        getCenterProgramsByInstroctorId(authToken.current, pCenterId, instroctor.username)
            .then(data => {
                setProgramList(data);
            })
        getInstroctorTemplateWithStatus(authToken.current, pCenterId, instroctor.username)
            .then(data => {
                setTemplateList(data);
            })
    }

    const permissionsOnChange = (event) => {
        const { name, checked } = event.target;
        setPermissions({
            ...permissions,
            [name]: checked,
        });
    }

    const handleUpdateData = () => {
        updateInstroctor(authToken.current, storedPermissions.id, permissions)
            .then(response => {
                if (response === 200 || response === 201 || response === 202 || response === 203 || response === 204) {
                    alertMessage("success", "수정되었습니다.");
                    setSaveState(true);
                } else {
                    alertMessage("error", "오류가 발생했습니다.");
                    setSaveState(false);
                }
            });
    }
    const handleDeleteInstroctor = () => {
        if (instroctor !== null) {
            deleteInstroctor(authToken.current, storedPermissions.id)
                .then(response => {
                    console.log(response);
                    if (response === 200 || response === 201 || response === 202 || response === 203 || response === 204) {
                        alertMessage("success", "삭제되었습니다.");
                        const initialState = {
                            program_management_permissions: "",
                            member_management_permissions: "",
                            pass_management_permissions: "",
                        };
                        setInstroctor("");
                        setStoredPermissions(initialState);
                        setPermissions(initialState);
                    }
                })
        }
    }

    const getTemplatePrograms = (template_id) => {
        if (template_id) {
            getCenterProgramsByTemplateId(authToken.current, pCenterId, template_id)
                .then(data => {
                    setProgramList(data)
                })
        } else {
            getCenterProgramsByInstroctorId(authToken.current, pCenterId, instroctor.username)
                .then(data => {
                    setProgramList(data);
                })
        }
    }

    return (
        <div>
            {contextHolder}
            <div>
                <div className="header">
                    <CenterNav centerid={pCenterId} />
                </div>
                <div className="main-container">
                    <div className="content-container">
                        <div className="title-wrap" style={{ display: "flex" }}>
                            <div style={{ width: "50%", textAlign: "left" }}>
                                <label className="label-title">강사 관리</label>
                                <label style={{ color: "gray" }}>총 {instroctors.length}명</label>
                            </div>
                            <div style={{ width: "50%", textAlign: "right" }}>
                                <Button variant="outline-primary" onClick={handleModalState}>
                                    강사 추가하기
                                </Button>
                            </div>
                        </div>

                        <div className="content-wrap">
                            {
                                instroctors.length > 0 ? (
                                    <div style={{ display: "flex", height: "600px" }}>
                                        <div style={{
                                            width: "20%",
                                            background: "rgba(140, 140, 140, 0.35)",
                                            overflow: 'auto',
                                            borderRadius: '6px',
                                            border: '1px solid rgba(140, 140, 140, 0.35)',
                                            margin: "10px"
                                        }}>
                                            <List
                                                style={{ background: "white" }}
                                                dataSource={instroctors}
                                                renderItem={(item) => (
                                                    <List.Item
                                                        style={{ cursor: "pointer" }}
                                                        onClick={() => selectInstroctor(item)}
                                                    >
                                                        <List.Item.Meta
                                                            title={<>{item.last_name}{item.first_name}</>}
                                                            description={item.email}
                                                        />
                                                    </List.Item>
                                                )}
                                            >
                                            </List>
                                        </div>
                                        <div style={{
                                            width: "80%",
                                            borderRadius: '6px',
                                            margin: "10px",
                                            display: "block",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}>
                                            {
                                                instroctor ? (
                                                    <div style={{
                                                        width: "100%",
                                                        flexDirection: "column",
                                                    }}>
                                                        <div style={{ display: "flex", flexDirection: "row", position: "block" }}>
                                                            <div style={{ width: "65%", margin: "20px", display: "block", }}>
                                                                <Form.Group as={Row} className="mb-3">
                                                                    <Form.Label column sm="2">
                                                                        NAME
                                                                    </Form.Label>
                                                                    <Col sm="10">
                                                                        <Form.Control type="text" name="name" value={instroctor.name} disabled />
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="mb-3">
                                                                    <Form.Label column sm="2">
                                                                        PHONE
                                                                    </Form.Label>
                                                                    <Col sm="10">
                                                                        <Form.Control type="text" value={`${instroctor.phone1}-${instroctor.phone2}-${instroctor.phone3}`} disabled />
                                                                    </Col>
                                                                </Form.Group>
                                                                <Form.Group as={Row} className="mb-3">
                                                                    <Form.Label column sm="2">
                                                                        EMAIL
                                                                    </Form.Label>
                                                                    <Col sm="10">
                                                                        <Form.Control type="text" value={instroctor.email} disabled />
                                                                    </Col>
                                                                </Form.Group>
                                                            </div>
                                                            <div style={{ width: "35%", display: "block", justifyContent: "center", margin: "20px" }}>
                                                                <div style={{ width: "100%" }}>
                                                                    <Form.Label>
                                                                        권한 관리
                                                                    </Form.Label>
                                                                    <Col>
                                                                        <Form.Check
                                                                            label="프로그램 관리 권한"
                                                                            name="program_management_permissions"
                                                                            checked={program_management_permissions}
                                                                            onChange={permissionsOnChange}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Check
                                                                            label="회원 관리 권한"
                                                                            name="member_management_permissions"
                                                                            checked={member_management_permissions}
                                                                            onChange={permissionsOnChange}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Form.Check
                                                                            label="수강권 관리 권한"
                                                                            name="pass_management_permissions"
                                                                            onChange={permissionsOnChange}
                                                                            checked={pass_management_permissions}
                                                                        />
                                                                    </Col>
                                                                    <div style={{ justifyContent: "center", marginTop: "10px" }}>
                                                                        <Button disabled={saveState} onClick={handleUpdateData} style={{ marginRight: "10px" }}>저장</Button>
                                                                        <Button onClick={handleDeleteInstroctor}>삭제</Button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: "flex " }}>
                                                            <div style={{ width: "50%" }}>
                                                                <label>정규수업 목록</label>
                                                                <div style={{
                                                                    height: "350px",
                                                                    margin: "10px",
                                                                    overflow: "auto",
                                                                    background: "rgba(140, 140, 140, 0.35)",
                                                                    borderRadius: '6px',
                                                                    border: '1px solid rgba(140, 140, 140, 0.35)',
                                                                }}>
                                                                    <List
                                                                        style={{ background: "white" }}
                                                                        dataSource={templateList}
                                                                        renderItem={(item) => (
                                                                            <List.Item
                                                                                style={{ cursor: "pointer" }}
                                                                                // onClick={() => navigate(`/template/${pCenterId}/${item.template_id}`)}
                                                                                key={item.program_id}
                                                                                actions={
                                                                                    [<label
                                                                                        onClick={() => navigate(`/template/${pCenterId}/${item.template_id}`)}
                                                                                    >상세 정보 보기
                                                                                    </label>,
                                                                                    <label
                                                                                        onClick={() => getTemplatePrograms(item.template_id)}
                                                                                    >
                                                                                        수업 목록 보기
                                                                                    </label>]
                                                                                }>
                                                                                <List.Item.Meta
                                                                                    style={{ textAlign: "left", marginLeft: "20px" }}
                                                                                    title={<>{item.program_name}</>}
                                                                                    description={item.program_description}
                                                                                    onClick={() => selectInstroctor(instroctor)}
                                                                                />
                                                                            </List.Item>
                                                                        )}
                                                                    >
                                                                    </List>
                                                                </div>
                                                            </div>
                                                            <div style={{ width: "50%" }}>
                                                                <div style={{ display: "flex" }}>
                                                                    <div style={{ width: "54%", textAlign: "right" }}>
                                                                        <label>수업 목록</label>
                                                                    </div>
                                                                    <div style={{ width: "46%", textAlign: "right" }}>
                                                                        <label style={{ color: "gray", marginRight: "10px" }}
                                                                            onClick={() => getTemplatePrograms()}>초기화</label>
                                                                    </div>
                                                                </div>
                                                                <div style={{
                                                                    height: "350px",
                                                                    margin: "10px",
                                                                    overflow: "auto",
                                                                    background: "rgba(140, 140, 140, 0.35)",
                                                                    borderRadius: '6px',
                                                                    border: '1px solid rgba(140, 140, 140, 0.35)',
                                                                }}>
                                                                    <List
                                                                        style={{ background: "white" }}
                                                                        dataSource={programList}
                                                                        renderItem={(item) => (
                                                                            <List.Item
                                                                                style={{ cursor: "pointer" }}
                                                                                onClick={() => navigate(`/program/${pCenterId}/${item.program_id}`)}
                                                                                key={item.program_id}
                                                                                actions={item.template_id ? (
                                                                                    [<label>{item.program_location}</label>,
                                                                                    <label>{item.program_date}</label>]
                                                                                ) : (
                                                                                    [<label>{item.program_location}</label>,
                                                                                    <label>{item.program_date}</label>]
                                                                                )}>
                                                                                <List.Item.Meta
                                                                                    style={{ textAlign: "left", marginLeft: "20px" }}
                                                                                    title={<>{item.program_name}</>}
                                                                                    description={item.program_description}
                                                                                    onClick={() => selectInstroctor(instroctor)}
                                                                                />
                                                                            </List.Item>
                                                                        )}
                                                                    >
                                                                    </List>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) :
                                                    (
                                                        <div
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center"
                                                            }}>
                                                            <div>
                                                                <label>리스트에서 회원을 선택하시면 회원의 정보가 표시됩니다.</label>
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <Result
                                            title="등록된 강사가 없습니다."
                                        />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div >
            <SearchUserModal
                role="instroctor"
                modalVisible={modalState}
                handleSubmit={handleSubmit}
                handleCloseModal={handleModalState}
            />
        </div >
    );
}

export default Instroctor;
