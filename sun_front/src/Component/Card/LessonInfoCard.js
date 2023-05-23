import "./LessonCard.css";
import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

function LessonInfoCard() {
    return (
        <div className="lesson-info-card">
            <div className="card">
                <div className="card-body">
                    <div className="card-title">
                        <Link to="/lesson/lessonid">수업명</Link>
                    </div>
                </div>
                <div className="list-group">
                    <div className="list-group-item">강사명</div>
                </div>
            </div>
        </div>
    );
}

export default LessonInfoCard;