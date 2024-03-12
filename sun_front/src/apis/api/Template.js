import { authInstance } from "../utils/Instance";

export const getTemplate = async (token, template_id) => {
    try {
        const { data } = await authInstance(token).get(`program/template/get?template_id=${template_id}`);
        return data;
    } catch (error) {
        return error;
    }
}
export const getCenterTemplate = async (token, center_id) => {
    try {
        const { data } = await authInstance(token).get(`program/template/list?center_id=${center_id}`);
        return data;
    } catch (error) {
        return error;
    }
}

export const getCenterTemplateWithStatus = async (token, center_id) => {
    try {
        const { data } = await authInstance(token).get(`program/template/status?center_id=${center_id}`);
        return data;
    } catch (error) {
        return error;
    }
}
export const getInstroctorTemplateWithStatus = async (token, center_id, instroctor_id) => {
    try {
        const { data } = await authInstance(token).get(`program/template/status?center_id=${center_id}&instroctor_id=${instroctor_id}`);
        return data;
    } catch (error) {
        return error;
    }
}


export const postTemplate = async (token, data) => {
    try {
        return await authInstance(token).post('program/template/info', data)
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

export const updateTemplate = async (token, id, data) => {
    try {
        return await authInstance(token).put(`program/template/info/${id}`, data)
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

export const updateTemplateWithAllPrograms = async (token, data) => {
    try {
        return await authInstance(token).post(`program/template/update`, data)
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

export const deleteTemplate = async (token, id) => {
    try {
        return await authInstance(token).delete(`program/template/info/${id}`)
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