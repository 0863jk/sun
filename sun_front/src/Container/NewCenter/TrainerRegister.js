import "./NewCenter.css";
import { Form, CardGroup, InputGroup, Button } from 'react-bootstrap';
import TrainerCard from '../../Component/Card/TrainerCard';
import { useEffect, useState } from "react";

function TrainerRegister({ onSubmit, setPage }) {
    const [input, setInput] = useState('');
    const [trainer, setTrainer] = useState([]);
    const [trainerList, setTrainerList] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/account/searchTrainerUser/${input}`)
            .then(res => { return res.json() })
            .then(data => { setTrainer(data) })
    }, [input]);

    useEffect(() => {
        onSubmit(trainerList);
    }, [onSubmit, trainerList]);

    const handleInputChange = (e) => {
        const data = e.target.value;
        if (data.length > 2) {
            setInput(e.target.value);
        }
    };
    const preBtnHandler = () => {
        setPage('plan');
    }

    const getChkMember = (checkedState, selectedTrainer) => {
        if (checkedState) {
            setTrainerList([...trainerList, selectedTrainer]);
            console.log(trainerList);
        } else {
            setTrainerList(trainerList.filter((trainerList) => trainerList !== selectedTrainer));
            console.log(trainerList);
        }
    }

    return (
        <>
            <div className="SearchBar">
                <Form.Control
                    placeholder="ID로 강사 검색"
                    aria-describedby="basic-addon2"
                    onChange={handleInputChange}
                />
            </div>
            <div className="CenterListContainer">
                <div className="CardListContainer">
                    <CardGroup className="CardGroup">
                        {trainer && trainer.map(trainer => (
                            <TrainerCard key={trainer.id} name={trainer.name} username={trainer.username} email={trainer.email} phone={trainer.phone} onChecked={getChkMember} />
                        ))}
                    </CardGroup>
                </div>
            </div>
            <div className="newcenter-btn">
                <Button variant="primary" onClick={preBtnHandler}>
                    이전
                </Button>
            </div>
        </>
    );
}
export default TrainerRegister;