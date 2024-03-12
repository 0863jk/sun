import { authInstance } from "../utils/Instance";

export const getCenterTimetable = async (token, center_id) => {
    try {
        const { data } = await authInstance(token).get(`program/timetable/list?center_id=${center_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const postTimetable = async (token, data) => {
    try {
        return await authInstance(token).post('program/timetable/info', data)
            .then(response => {
                return response.status;
            })
            .catch(error => {
                return error;
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const updateTimetable = async (token, id, data) => {
    try {
        return await authInstance(token).put(`program/timetable/info/${id}`, data)
            .then(response => {
                return response.status;
            })
            .catch(error => {
                return error.status;
                // throw error; // 에러 처리를 위해 예외 던지기
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}