class Utils {
    constructor(centerid) {
        this.centerid = centerid;
    }

    async registerLesson(data) {
        try {
            const res = await fetch('http://localhost:8000/center/lesson/registerLesson/', {
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
            const res = await fetch('http://localhost:8000/center/timetable/registerTimetableBlock/', {
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
    async registerCenter(data) {
        try {
            const res = await fetch('http://localhost:8000/center/registerCenter/', {
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
            const res = await fetch('http://localhost:8000/center/plan/registerPlan/', {
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
            const res = await fetch('http://localhost:8000/center/registerCenterMember/', {
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