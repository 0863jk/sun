import "./NewCenter.css";
import { Form, CardGroup, InputGroup } from 'react-bootstrap';
import TrainerCard from '../../Component/Card/TrainerCard';
import { useEffect, useState } from "react";

function TrainerRegister({ onSubmit, setPage }) {
    const username = localStorage.getItem('username');
    const [input, setInput] = useState('');
    const [trainer, setTrainer] = useState([]);
    const [trainerList, setTrainerList] = useState(null);

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
            <Form>
                <Form.Group className="mb-3">
                    <div className="SearchBar">
                        <InputGroup className="mb-3">
                            <Form.Control type="text" placeholder="ID로 강사 검색" aria-describedby="basic-addon2" onChange={handleInputChange} />
                        </InputGroup>
                    </div>
                </Form.Group>
                <Form.Group className="mb-3">
                    <div className="TrainerListContainer">
                        <CardGroup className="CardGroup">
                            {trainer && trainer.map(trainer => (
                                <TrainerCard key={trainer.id} name={trainer.name} username={trainer.username} email={trainer.email} phone={trainer.phone} onChecked={getChkMember} />
                            ))}
                        </CardGroup>
                    </div>
                </Form.Group>
                {/* <Form.Group className="mb-3">
                    <Button variant="primary" onClick={preBtnHandler} className="preBtn">
                        이전
                    </Button>
                </Form.Group> */}
            </Form>
        </>
    );
}
export default TrainerRegister;