import { useParams } from "react-router-dom";
import { List, message } from "antd";
import { Button } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { deleteProgram, getCenterPrograms, postPrograms, updateProgram } from "../../../apis/api/Program";
import { getCenterTemplate, postTemplate } from "../../../apis/api/Template";
import CenterNav from "../../../Component/Nav/CenterNav";
import WeeklyTimetable from "../../../Component/TimeTable/WeeklyTimeTable";
import ProgramRegisterModal from "../../../Component/Modal/ProgramRegisterModal";
import TemplateRegisterModal from "../../../Component/Modal/TemplateRegisterModal";


function TimeTableRegister() {
    const { pCenterId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [templateList, setTemplateList] = useState();
    const [trModalVisible, setTrModalVisible] = useState(false);
    const [ttbrModalVisible, setTtbrModalVisible] = useState(false);
    const [template, setTemplate] = useState('');
    const [program, setProgram] = useState('');

    const [timetableData, setTimetableData] = useState([]);
    const [storedData, setStoredData] = useState([]); // 처음에 보여지는 데이터
    const [insertData, setInsertData] = useState([]);
    const [updateData, setUpdateData] = useState([]);
    const [deleteData, setDeleteData] = useState([]);

    const [messageApi, contextHolder] = message.useMessage();

    const alertMessage = (type, message) => {
        messageApi.open({
            type: type,
            content: message,
        });
    }

    useEffect(() => {
        getCenterPrograms(authToken.current, pCenterId)
            .then(data => {
                setStoredData(data);
            })
        console.log(templateList)
    }, [pCenterId, templateList])

    useEffect(() => {
        if (storedData) {
            setTimetableData(storedData);
        }
    }, [storedData]);

    useEffect(() => {
        getCenterTemplate(authToken.current, pCenterId)
            .then(data => {
                setTemplateList(data);
            })
    }, [trModalVisible])

    const onInsertData = (program) => {
        if (insertData.find(data => data.temporary_program_id === program.temporary_program_id)) {
            const indexOfInsertData = insertData.findIndex(data => data.temporary_program_id === program.temporary_program_id);
            const updatedInsertData = [...insertData];
            updatedInsertData[indexOfInsertData] = program;
            setInsertData(updatedInsertData);

            const indexOfTimetableData = timetableData.findIndex(data => data.temporary_program_id === program.temporary_program_id);
            const updatedTimetableData = [...timetableData];
            updatedTimetableData[indexOfTimetableData] = program;
            setTimetableData(updatedTimetableData);
        } else {
            setTimetableData([...timetableData, program]);
            setInsertData([...insertData, program]);
        }
    }
    const onUpdateData = (program) => {
        const newFormattedData = timetableData.filter(data => data.program_id !== program.program_id);
        setTimetableData([...newFormattedData, program]);
        setUpdateData([...updateData, program]);
    }
    const onDeleteData = (program) => {
        if (timetableData.find(data => data.program_id === program.program_id)) {
            const updatedData = timetableData.filter(data => data.program_id !== program.program_id);
            setTimetableData(updatedData);
            setDeleteData([...deleteData, program])
        } else {
            const updatedData = timetableData.filter(data => data.temporary_program_id !== program.temporary_program_id);
            setTimetableData(updatedData);
            setInsertData(insertData.filter(data => data.temporary_program_id !== program.temporary_program_id));
        }
    }
    const handleOnSubmit = async () => {
        let successState = true;

        if (insertData.length > 0) {
            console.log(insertData);
            const result = await postPrograms(authToken.current, insertData);
            successState = result;
        }
        if (updateData.length > 0) {
            const result = await Promise.all(updateData.map(async (data) => await updateProgram(authToken.current, data.program_id, data)
                .then(response => {
                    if (response === 200 || response === 204 || response === 201 || response === 203) {
                        return true;
                    } else {
                        return false;
                    }
                })
            ))
            if (result.indexOf(false) > 0) {
                successState = false;
            } else {
                successState = true;
            }
        }
        if (deleteData.length > 0) {
            const result = await Promise.all(deleteData.map(async data => await deleteProgram(authToken.current, data.program_id)
                .then(response => {
                    if (response === 200 || response === 204 || response === 201 || response === 203) {
                        return true;
                    } else {
                        return false;
                    }
                })));
            if (result.indexOf(false) > 0) {
                successState = false;
            } else {
                successState = true;
            }
        }
        if (successState === true) {
            alertMessage("success", "저장 성공 😎")
        } else {
            alertMessage("error", "데이터 저장에 실패했습니다.")
        }
    }

    const insertTemmplate = (data) => {
        postTemplate(authToken.current, data)
            .then(response => {
                if (response === 202 || response === 200 || response === 201 || response === 204) {
                    alertMessage("success", "정상적으로 등록되었습니다.")
                } else {
                    alertMessage("error", "데이터 등록 실패")
                }
            })
    }

    const handleTrModalState = () => {
        setTrModalVisible(!trModalVisible);
    }

    const handleTtbrModalState = () => {
        setTtbrModalVisible(!ttbrModalVisible);
    }

    const insertProgramByTemplate = (template) => {
        setTemplate(template);
        setProgram('');
        handleTtbrModalState();
    }

    const modifyProgram = (program) => {
        setTemplate('');
        setProgram(program);
        handleTtbrModalState();
    }

    const modifyTemplate = (template) => {
        setTemplate(template);
        handleTrModalState();
    }

    const addProgram = () => {
        setTemplate('');
        setProgram('');
        handleTtbrModalState();
    }

    const addTemplate = () => {
        setTemplate('');
        setProgram('');
        handleTrModalState();
    }

    return (
        <>
            {contextHolder}
            <div className="header">
                <CenterNav centerid={pCenterId} />
            </div>
            <div className="main-container">
                <div className="label-wrapper">
                    <label className="label-title">시간표 등록</label>
                    <div className="wrap">
                        <div style={{
                            margin: '10px',
                            height: '200px',
                            textAlign: 'center',
                            borderRadius: '6px',
                            borderStyle: 'solid',
                            borderWidth: '0.8px',
                            borderColor: 'rgba(217, 217, 217)',
                            overflow: 'auto',
                        }}>
                            <List
                                itemLayout="horizontal"
                                style={{
                                    textAlign: 'left',
                                }}
                                dataSource={templateList}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <label
                                                style={{ cursor: "pointer" }}
                                                onClick={() => insertProgramByTemplate(item)}>
                                                시간표에 등록
                                            </label>,
                                            <label
                                                style={{ cursor: "pointer" }}
                                                onClick={() => modifyTemplate(item)}>
                                                수정
                                            </label>]}>
                                        <List.Item.Meta
                                            style={{ marginLeft: "20px" }}
                                            title={item.program_name}
                                            description={item.program_description}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div className="addLessonBtnContainer">
                                <Button variant="outline-primary" onClick={addProgram}>
                                    그 외의 강의 추가하기
                                </Button>
                                <Button variant="outline-primary" onClick={addTemplate} style={{ margin: "5px" }}>
                                    정규 강의 추가하기
                                </Button>
                                <Button onClick={handleOnSubmit}>
                                    저장
                                </Button>
                            </div>
                            <div className="timetable-wrapper">
                                {
                                    timetableData ?
                                        <WeeklyTimetable
                                            timetableData={timetableData}
                                            onClick={modifyProgram}
                                        />
                                        : <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ProgramRegisterModal
                template={template}
                modifyProgram={program}
                insertData={onInsertData}
                updateData={onUpdateData}
                deleteData={onDeleteData}
                modalVisible={ttbrModalVisible}
                handleCloseModal={handleTtbrModalState}
            />
            <TemplateRegisterModal
                modifyTemplate={template}
                insertData={insertTemmplate}
                modalVisible={trModalVisible}
                handleCloseModal={handleTrModalState}
            />
        </>
    );
}

export default TimeTableRegister;