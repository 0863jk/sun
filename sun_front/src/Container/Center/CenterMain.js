import CenterNav from '../../Component/Nav/CenterNav'

function CenterMain({ role }) {
    return (
        <>
            <div>
                <div className="header">
                    <CenterNav />
                </div>
                <div className="MainContainer">
                    <div className="LabelWrapper">
                        <label className="LabelTitle">센터명</label>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CenterMain;