import { authInstance } from "../utils/Instance";

export const getProgramReview = async (token, program_id) => {
    try {
        const { data } = await authInstance(token).get(`program/review/list?program_id=${program_id}`);
        return data;
    } catch (error) {
        return error;
    }
}
export const getUserProgramReview = async (token, program_id, user_id) => {
    try {
        const { data } = await authInstance(token).get(`program/review/list?user_id=${user_id}&program_id=${program_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getCenterReview = async (token, center_id) => {
    try {
        const { data } = await authInstance(token).get(`program/review/list?center_id=${center_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const postReview = async (token, data) => {
    try {
        return await authInstance(token).post('program/review/info', data)
            .then(response => {
                console.log(response);
                return response.status;
            })
            .catch(error => {
                console.log(error);
                return error;
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const updateReview = async (token, id, data) => {
    try {
        return await authInstance(token).put(`program/review/info/${id}`, data)
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