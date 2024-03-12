import { authInstance } from "../utils/Instance";

export const getCenterTimetableBlock = async (token, center_id) => {
    try {
        const { data } = await authInstance(token).get(`program/timetableblock/list?center_id=${center_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getMemberTimetableBlock = async (token, user_id) => {
    try {
        const { data } = await authInstance(token).get(`program/timetableblock/general?user_id=${user_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getInstroctorTimetableBlock = async (token, user_id) => {
    try {
        const { data } = await authInstance(token).get(`program/timetableblock/instroctor?user_id=${user_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const postTimetableBlock = async (token, data) => {
    try {
        return await authInstance(token).post('program/timetableblock/info', data)
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

export const updateTimetableBlock = async (token, id, data) => {
    try {
        return await authInstance(token).put(`program/timetableblock/info/${id}`, data)
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