import "./NewCenter.css";
import { Button, Form, CardGroup, InputGroup } from 'react-bootstrap';
import TrainerCard from '../../Component/Card/TrainerCard';
import { useEffect, useState } from "react";

function TrainerRegister({ setPage }) {
    const [input, setInput] = useState('');
    const [Trainer, setTrainer] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/account/searchUser/${input}`)
            .then(res => { return res.json() })
            .then(data => { setTrainer(data) })
    }, [input]);

    const handleInputChange = (e) => {
        const data = e.target.value;
        if (data.length > 2) {
            setInput(e.target.value);
        }
    };

    const preBtnHandler = (e) => {
        setPage('plan');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };


    return (
        <>
            <Form>
                <div className="SearchBar">
                    <InputGroup className="mb-3">
                        <Form.Control type="text" placeholder="email로 강사 검색" aria-describedby="basic-addon2" onChange={handleInputChange} />
                        {/* <Button variant="outline-secondary" id="button-addon2">
                            Button
                        </Button> */}
                    </InputGroup>
                </div>
                <div className="TrainerListContainer">
                    <CardGroup className="CardGroup">
                        {Trainer && Trainer.map(Trainer => (
                            <TrainerCard name={Trainer.name} username={Trainer.username} email={Trainer.email} phone={Trainer.phone} register="register" />
                        ))}
                    </CardGroup>
                </div>
                <Form.Group className="mb-3">

                    <Button variant="primary" onClick={preBtnHandler} className="preBtn">
                        이전
                    </Button>
                </Form.Group>
            </Form>
        </>
    );
}
export default TrainerRegister;