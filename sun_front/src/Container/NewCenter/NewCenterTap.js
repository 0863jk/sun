import "./NewCenter.css"
import React from 'react';

const NewCenterTap = (current) => {
    return (
        <div>
            <div className="new-center-tap justify-content-center">
                <div className="step">
                    <p className="step-label">step 1</p>
                    <label className={current.page === 'info' ? "current" : null}>센터 기본 정보 등록</label>
                </div>
                <div className="step">
                    <p className="step-label">step 2</p>
                    <label className={current.page === 'plan' ? "current" : null}>이용권 정보 등록</label>
                </div>
                <div className="step">
                    <p className="step-label">step 3</p>
                    <label className={current.page === 'trainer' ? "current" : null}>강사 등록</label>
                </div>
            </div>
        </div>
    );
}

export default NewCenterTap;
