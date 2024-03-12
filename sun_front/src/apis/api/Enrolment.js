import { authInstance } from "../utils/Instance";

export const getCenterEnrolment = async (token, center_id) => {
    try {
        const { data } = await authInstance(token).get(`program/enrolment/list?center_id=${center_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getUserEnrolment = async (token, center_id, user_id) => {
    try {
        const { data } = await authInstance(token).get(`program/enrolment/list?center_id=${center_id}&user_id=${user_id}`);
        return data;
    } catch (error) {
        return error;
    }
}
export const getProgramEnrolments = async (token, center_id, program_id) => {
    try {
        const { data } = await authInstance(token).get(`program/enrolment/list?center_id=${center_id}&program_id=${program_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getProgramAttendance = async (token, program_id) => {
    try {
        const { data } = await authInstance(token).get(`program/enrolment/attendance?program_id=${program_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getProgramApplicants = async (token, program_id) => {
    try {
        const { data } = await authInstance(token).get(`program/enrolment/applicants?program_id=${program_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const postEnrolment = async (token, data) => {
    try {
        return await authInstance(token).post('program/enrolment/info', data)
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

export const postBookProgram = async (token, data) => {
    try {
        return await authInstance(token).post('program/enrolment/book', data)
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

export const cancelBook = async (token, data) => {
    try {
        return await authInstance(token).post('program/enrolment/cancel', data)
            .then(response => {
                return response;
            })
            .catch(error => {
                return error;
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const updateEnrolment = async (token, id, data) => {
    try {
        return await authInstance(token).put(`program/enrolment/info/${id}`, data)
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