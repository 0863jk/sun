import React, { useEffect, useRef, useState } from 'react';
import CenterNav from '../../../Component/Nav/CenterNav';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { deletePayments, getCenterPayments, postPayments } from '../../../apis/api/Payments';
import { List, Space, Table, message } from 'antd';
import { getCenter } from '../../../apis/api/Center';
import { Button } from 'react-bootstrap';
import PaymentsRegisterModal from '../../../Component/Modal/PaymentsRegisterModal';

const Revenue = () => {
    const { pCenterId } = useParams();
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [modalState, setModalState] = useState(false);
    const [centerStatus, setCenterStatus] = useState([]);
    const [paymentsList, setPaymentsList] = useState([]);
    const [payment, setPayment] = useState("");
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
                setCenterStatus(data);
                console.log(data);
            })
        getCenterPayments(authToken.current, pCenterId)
            .then(data => {
                setPaymentsList(data);
            })
    }, [modalState])

    const handleModalState = (data) => {
        if (data) {
            setPayment(data);
        } else {
            setPayment("");
        }
        setModalState(!modalState)
    }

    const handleOnSubmit = (data) => {
        postPayments(authToken.current, data)
            .then(response => {
                if (response === 201) {
                    alertMessage('success', '등록되었습니다.')
                    handleModalState();
                } else {
                    alertMessage('error', '오류가 발생했습니다.')
                }
            })
    }

    const handleOnDelete = (data) => {
        deletePayments(authToken.current, data.payment_id)
            .then(response => {
                if (response === 204) {
                    alertMessage('success', '삭제되었습니다.')
                } else {
                    alertMessage('error', '오류가 발생했습니다.')
                }
            })
        getCenterPayments(authToken.current, pCenterId)
            .then(data => {
                setPaymentsList(data);
            })
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
                                <label className="label-title">수익 및 등록 관리</label>
                            </div>
                            <div style={{ width: "50%", textAlign: "right" }}>
                                <Button variant='outline-primary' onClick={() => handleModalState()}>결제 내역 추가 등록</Button>
                            </div>
                        </div>

                        <div className="content-wrap">
                            <div style={{
                                display: "flex",
                            }}>
                                <div style={{ width: "30%", }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            borderRadius: "20px",
                                            background: "rgba(240, 240, 240, 1)",
                                            marginTop: "10px",
                                            marginBottom: "10px",
                                            marginLeft: "30px",
                                            marginRight: "30px",
                                        }}>
                                        {/* 이번 달 수익 및 총 수익 */}
                                        <label>이번 달 추정 수익</label>
                                        <label style={{ fontSize: "40px", fontWeight: "bold" }}>{new Intl.NumberFormat().format(centerStatus.monthly_revenue_estimate)}</label>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                        }}>
                                        <label>총 수익</label>
                                        <label>{new Intl.NumberFormat().format(centerStatus.total_revenue)}</label>
                                    </div>
                                </div>
                                <div style={{ width: "70%" }}>
                                    <Table
                                        columns={[
                                            {
                                                title: 'ID',
                                                dataIndex: 'payment_id',
                                                key: 'payment_id',
                                            },
                                            {
                                                title: '결제자',
                                                dataIndex: 'user_name',
                                                key: 'user_name',
                                            },
                                            {
                                                title: '결제 금액',
                                                dataIndex: 'amount',
                                                key: 'amount',
                                                render: (_, { amount }) => (
                                                    <>
                                                        {new Intl.NumberFormat().format(amount)}
                                                    </>
                                                ),
                                            },
                                            {
                                                title: '분류',
                                                dataIndex: 'category',
                                                key: 'category',
                                                render: (_, { category }) => (
                                                    category === 'register' ? (
                                                        <>
                                                            센터 등록
                                                        </>
                                                    ) : category === 'etc' ? (
                                                        <>
                                                            외
                                                        </>
                                                    ) : <></>
                                                ),
                                            },
                                            {
                                                title: '기입',
                                                dataIndex: 'payment_method',
                                                key: 'payment_method',
                                                render: (_, { payment_method }) => (
                                                    payment_method === 'auto_created' ? (
                                                        <>
                                                            자동
                                                        </>
                                                    ) : payment_method === 'user_created' ? (
                                                        <>
                                                            사용자 기입
                                                        </>
                                                    ) : <></>
                                                ),
                                            },
                                            {
                                                title: '상태',
                                                dataIndex: 'payment_status',
                                                key: 'payment_status',
                                                render: (_, { payment_status }) => (
                                                    payment_status === 'completed' ? (
                                                        <>
                                                            완료
                                                        </>
                                                    ) : payment_status === 'canceled' ? (
                                                        <>
                                                            취소됨
                                                        </>
                                                    ) : <></>
                                                ),
                                            },
                                            {
                                                title: '결제일',
                                                dataIndex: 'payment_date',
                                                key: 'payment_date',
                                            },
                                            {
                                                key: 'action',
                                                render: (_, record) => (
                                                    <Space>
                                                        <label onClick={() => handleModalState(record)}>수정</label>
                                                        <label onClick={() => handleOnDelete(record)}>삭제</label>
                                                    </Space>
                                                ),
                                            },
                                        ]}
                                        dataSource={paymentsList} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PaymentsRegisterModal
                modifyPayment={payment}
                alertMessage={alertMessage}
                onSubmit={handleOnSubmit}
                modalVisible={modalState}
                handleCloseModal={handleModalState} />
        </div>
    );
}

export default Revenue;
