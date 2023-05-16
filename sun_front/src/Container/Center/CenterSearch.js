import CenterCard from "../../Component/Card/CenterCard";
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import useFetch from "../../Hook/useFetch";
import { Link } from "react-router-dom";
import { useState } from "react";


function CenterSearch() {
    const [input, setInput] = useState('');
    const [center, setCenter] = useState('');

    
    const onChangeHandler = (event) => {
        setInput(event.target.value);
        fetch(`http://localhost:8000/center/searchCenter/${input}`)
        .then(res => {return res.json()})
        .then(data => {setCenter(data)})
    }

    return (
        <>
            <div className="MainContainer">
                <div className="LabelWrapper">
                    <label className="LabelTitle">센터 검색</label>
                    <div className="ContentContainer">
                        <div className="SearchBar">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="센터 ID로 검색"
                                    aria-describedby="basic-addon2"
                                    onChange={onChangeHandler}
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    Button
                                </Button>
                            </InputGroup>
                        </div>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                            {center && center.map(center => (
                                <Link to={`/register/${center.centerid}`}>
                                    <CenterCard from="search" centername={center.centername} introduction={center.introduction} manager={center.manager} address={center.address} centerid={center.centerid} />
                                </Link>
                            ))}
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CenterSearch;