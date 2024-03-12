import { authInstance } from "../utils/Instance";

export const getProgram = async (token, program_id) => {
    try {
        const { data } = await authInstance(token).get(`program/info/${program_id}`);
        return data;
    } catch (error) {
        return error;
    }
}
export const getCenterPrograms = async (token, center_id) => {
    try {
        const { data } = await authInstance(token).get(`program/list?center_id=${center_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getUserPrograms = async (token, user_id) => {
    try {
        const { data } = await authInstance(token).get(`program/list?user_id=${user_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getInstroctorPrograms = async (token, user_id) => {
    try {
        const { data } = await authInstance(token).get(`program/list?instroctor_id=${user_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getCenterProgramsByUserId = async (token, center_id, user_id) => {
    try {
        const { data } = await authInstance(token).get(`program/list?center_id=${center_id}&user_id=${user_id}`);
        return data;
    } catch (error) {
        return error;
    }
}
export const getCenterProgramsByProgramType = async (token, center_id, program_type) => {
    try {
        const { data } = await authInstance(token).get(`program/list?center_id=${center_id}&program_type=${program_type}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getCenterProgramsByInstroctorId = async (token, center_id, instroctor_id) => {
    try {
        const { data } = await authInstance(token).get(`program/list?center_id=${center_id}&instroctor_id=${instroctor_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getCenterProgramsByTemplateId = async (token, center_id, template_id) => {
    try {
        const { data } = await authInstance(token).get(`program/list?center_id=${center_id}&template_id=${template_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getCenterProgramsOnlyBookAvailable = async (token, center_id) => {
    try {
        const { data } = await authInstance(token).get(`program/list?center_id=${center_id}&book_available=True`);
        return data;
    } catch (error) {
        return error;
    }
}

export const postProgram = async (token, data) => {
    try {
        return await authInstance(token).post('program/info', data)
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

export async function postPrograms(token, datas) {
    try {
        await Promise.all(datas.map(async (data) => {
            await authInstance(token).post('program/info', data);
        }))
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const updateProgram = async (token, id, data) => {
    try {
        return await authInstance(token).put(`program/info/${id}`, data)
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

export const deleteProgram = async (token, id) => {
    try {
        return await authInstance(token).delete(`program/info/${id}`)
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