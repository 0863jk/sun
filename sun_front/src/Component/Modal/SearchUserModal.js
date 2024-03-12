import { Checkbox, Input, List, Modal, Select, Tag } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { searchUser, searchUserInCenter } from '../../apis/api/User';
import { useSelector } from 'react-redux';

const SearchUserModal = (props) => {
    const auth = useSelector((state) => state.Auth);
    const authToken = useRef(auth.access_token);
    const [option, setOption] = useState('username');
    const [inputValue, setInputValue] = useState('');
    const [memberList, setMemberList] = useState([]);
    const [selectedMember, setSelectedMember] = useState([]);

    useEffect(() => {
        if (inputValue.length > 2) {
            if (props.centerId) {
                if (props.role === "general") {
                    searchUserInCenter(authToken.current, "member", props.centerId, option, inputValue)
                        .then(data => {
                            const newData = data.map(data => {
                                const userData = {
                                    ...data,
                                    checked: false
                                }
                                return userData;
                            })
                            setMemberList(newData);
                        })
                } else {
                    searchUserInCenter(authToken.current, "instroctor", props.centerId, option, inputValue)
                        .then(data => {
                            const newData = data.map(data => {
                                const userData = {
                                    ...data,
                                    checked: false
                                }
                                return userData;
                            })
                            setMemberList(newData);
                        })

                }
            } else {
                searchUser(authToken.current, props.role, option, inputValue)
                    .then(data => {
                        const newData = data.map(data => {
                            const userData = {
                                ...data,
                                checked: false
                            }
                            return userData;
                        })
                        setMemberList(newData);
                    })
            }
        }
    }, [inputValue, option, props.role]);

    const handleOK = async () => {
        const rs = await props.handleSubmit(selectedMember);
        alert(rs + "개의 데이터를 등록했습니다.")
        props.handleCloseModal();
    }

    const handleInput = (event) => {
        setInputValue(event.target.value);
    }
    const handleSelect = (value) => {
        setOption(value);
    };
    const onChangeSelectedMember = (clickedMember) => {
        if (selectedMember.find(member => member.id === clickedMember.id)) {
            const updatedList = memberList.map(member => {
                if (member.username === clickedMember.username) {
                    return {
                        ...member,
                        checked: false
                    };
                }
                return member;
            });
            setMemberList(updatedList);
            console.log(selectedMember.filter(member => member.id !== clickedMember.id));
            const updatedSelectedMembers = selectedMember.filter(member => member.id !== clickedMember.id);
            setSelectedMember(updatedSelectedMembers);
        } else {
            const updatedList = memberList.map(member => {
                if (member.username === clickedMember.username) {
                    return {
                        ...member,
                        checked: true
                    };
                }
                return member;
            });
            setMemberList(updatedList);
            setSelectedMember([...selectedMember, clickedMember]);
        }
    };
    return (
        <Modal
            centered
            open={props.modalVisible}
            title="유저 검색하기"
            onOk={handleOK}
            onCancel={props.handleCloseModal}
        >
            <div style={{ display: 'flex' }}>
                <Select
                    onChange={handleSelect}
                    style={{ width: 100 }}
                    defaultValue={option}
                    options={[
                        {
                            value: 'username',
                            label: 'ID',
                        },
                        {
                            value: 'name',
                            label: 'Name',
                        },
                        {
                            value: 'email',
                            label: 'Email',
                        }
                    ]}
                />
                <Input
                    placeholder="ID 또는 이름으로 검색..."
                    value={inputValue}
                    onChange={handleInput}
                />
            </div>
            <div style={{
                padding: '10px'
            }}>
                <div
                    style={{
                        padding: '10px 16px',
                        height: '50px',
                        textAlign: 'center',
                        borderRadius: '6px',
                        borderStyle: 'solid',
                        borderWidth: '0.8px',
                        borderColor: 'rgba(217, 217, 217)',
                        overflow: 'auto',
                    }}>
                    {
                        selectedMember.map((selectedMember) => (
                            <Tag
                                key={selectedMember.id}
                                closable={true}
                                style={{
                                    userSelect: 'none',
                                }}
                                onClose={() => onChangeSelectedMember(selectedMember)}>
                                {selectedMember.name}
                            </Tag>
                        ))
                    }
                </div>
            </div>
            <div
                style={{
                    height: 400,
                    overflow: 'auto',
                    padding: '0 16px',
                    borderRadius: '6px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <List>
                    {
                        memberList.length > 0 ? (
                            memberList.map(member => (
                                <List.Item key={member.email}>
                                    <List.Item.Meta
                                        title={<>{member.name}</>}
                                        description={<>{member.username}</>}
                                    />
                                    <Checkbox
                                        checked={member.checked}
                                        onChange={() => onChangeSelectedMember(member)} />
                                </List.Item>
                            ))
                        ) : <></>
                    }
                </List>
            </div>
        </Modal>
    );
}

export default SearchUserModal;
