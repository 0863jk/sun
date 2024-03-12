import { useDispatch, useSelector } from "react-redux";
import CenterList from "../../Container/Center/CenterList";
import { useEffect, useState } from "react";
import { getUserCenterList } from "../../apis/api/Center";
import { getCenterList } from "../../apis/services/Center";
import { setCenterId, setCenterManager, setCenterName } from "../../redux/reducers/CenterInfo";
import { CardGroup } from "react-bootstrap";
import CenterCard from "../../Component/Card/CenterCard";
import { Link } from "react-router-dom";

function Main() {
    const dispatch = useDispatch();
    const authToken = useSelector((state) => state.Auth);
    const userInfo = useSelector((state) => state.UserInfo);
    const [centerList, setCenterList] = useState({});

    useEffect(() => {
        getUserCenterList(authToken.access_token, userInfo.username, userInfo.role)
            .then(getCenterList)
            .then(res => setCenterList(res));
    }, [])

    const setCenterInfo = (center_id, center_name, center_manager) => {
        dispatch(setCenterId(center_id));
        dispatch(setCenterName(center_name));
        dispatch(setCenterManager(center_manager));
    }
    return (
        <div className="main-container">
            <div className="content-container">
                <div className="cardlist-container">
                    {(centerList.length > 0) ? centerList.map(center => (
                        <Link key={center.center_id} to={`/main/${center.center_id}`}
                            onClick={() => setCenterInfo(center.center_id, center.center_name, center.manager_id)}
                            className="LinkWrapper">
                            <CenterCard from="list" center={center} />
                        </Link>
                    )) : <>
                        <p>등록된 센터가 없습니다.</p>
                    </>}
                </div>
            </div>
        </div>
    );
}

export default Main;