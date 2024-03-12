import { Button, DatePicker, Divider, Modal } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

const CenterRegisterModal = (props) => {
    const [pass, setPass] = useState();
    const [registerDate, setRegisterDate] = useState(null);
    const [expireDate, setExpireDate] = useState(null);

    useEffect(() => {
        if (props.pass) {
            setPass(props.pass);
        } else {
            setPass("");

        }
    }, [props.pass]);

    const handleDateChange = (date, dateString) => {
        if (date) {
            setRegisterDate(date);
            setExpireDate(date.add(pass.duration_months, "month"));
        }
    }

    const handleOK = () => {
        if (registerDate && expireDate) {
            const data = {
                register_date: registerDate.format("YYYY-MM-DD"),
                expire_date: expireDate.format("YYYY-MM-DD")
            }
            props.handleSubmit(data);
        } else {
            props.handleSubmit();
        }
    }

    const handleCancel = () => {
        setPass(null);
        setRegisterDate(null);
        setExpireDate(null);
        props.handleCloseModal();
    }
    return (
        <Modal
            open={props.modalVisible}
            onCancel={props.handleCloseModal}
            title="등록하기"
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancle
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleOK}>
                    OK
                </Button>,
            ]}>
            <div style={{ textAlign: 'center' }}>
                {
                    pass ? (
                        <>
                            <h2>{pass.pass_name}</h2>
                            <h4>{pass.description}</h4>
                            <Divider />
                            <p>이용 중인 수강권이 '{pass.pass_name}'이 맞으신가요?<br />센터 등록일을 선택해 주세요.</p>
                            <div>
                                <label>
                                    등록일 <DatePicker onChange={handleDateChange} value={registerDate ? registerDate : null} />
                                </label>
                            </div>
                            <div>
                                <label>
                                    만료일 <DatePicker value={expireDate ? expireDate : null} />
                                </label>
                            </div>
                        </>
                    ) :
                        <>
                            <p>수강권 없이 센터에 등록됩니다.</p>
                        </>
                }
            </div>
        </Modal>
    );
}

export default CenterRegisterModal;
