import "./CenterList.css";
import CenterCard from "../../Component/Card/CenterCard"
import CardGroup from 'react-bootstrap/CardGroup';

function CenterList() {
    
    return (
        <>
            <div className="wrap MainContainer">
                <div className="LabelWrapper">
                    <label className="LabelTitle">나의 센터</label>
                    <div className="ContentContainer FlexContainer">
                        <CardGroup className="CardGroup">
                                <CenterCard />
                                <CenterCard />
                                <CenterCard />
                                <CenterCard />
                        </CardGroup>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CenterList;
