class Utils {
    constructor(centerid) {
        this.centerid = centerid;
    }
    async registerCenter(data) {
        try {
            const res = await fetch('http://localhost:8000/center/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            return resData;
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async registerPlan(data) {
        try {
            const res = await fetch('http://localhost:8000/center/plan/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            return resData;
        } catch (error) {
            console.error('Error:', error);
        }
    }
    async registerCenterMember(data) {
        try {
            const res = await fetch('http://localhost:8000/center/member/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            });
            if(res.ok) {
                const resData = await res.json();
                return resData;
            } else {
                return(res);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async registerLesson(data) {
        try {
            const res = await fetch('http://localhost:8000/lesson/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            return resData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async registerTimetableBlock(data) {
        try {
            const res = await fetch('http://localhost:8000/lesson/timetableblock/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            return resData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async registerEnrolment(data) {
        try {
            const res = await fetch('http://localhost:8000/lesson/enrolment/register', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            return resData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async updateTimetableBlock(data, blockid) {
        try {
            const res = await fetch(`http://localhost:8000/lesson/timetableblock/update/${blockid}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            return resData;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async registerLessonReview(data, blockid) {
        try {
            const res = await fetch(`http://localhost:8000/lesson/lessonreview/register`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            return resData;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
export default Utils;