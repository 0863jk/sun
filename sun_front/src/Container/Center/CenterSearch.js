import CenterCard from "../../Component/Card/CenterCard";
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function CenterSearch() {
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
                                />
                                <Button variant="outline-secondary" id="button-addon2">
                                    Button
                                </Button>
                            </InputGroup>
                        </div>
                        <div className="CenterListContainer">
                            <CardGroup className="CardGroup">
                                <CenterCard />
                                <CenterCard />
                                <CenterCard />
                                <CenterCard />
                            </CardGroup>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CenterSearch;