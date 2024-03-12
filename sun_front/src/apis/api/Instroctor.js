import { authInstance } from "../utils/Instance";

export const getCenterInstroctorList = async (token, center_id) => {
    // 유저의 센터 리스트 불러오기
    try {
        const { data } = await authInstance(token).get(`center/instroctor/list?center_id=${center_id}`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postInstroctor = async (token, data) => {
    try {
        return await authInstance(token).post('center/instroctor/info', data)
            .then(response => {
                return response.status
            })
            .catch(error => {
                return error;
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const getInstroctorPermissions = async (token, center_id, user_id) => {
    // 유저의 센터 리스트 불러오기
    try {
        const { data } = await authInstance(token).get(`center/instroctor/permissions?center_id=${center_id}&user_id=${user_id}`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}


export const updateInstroctor = async (token, instroctor_id, data) => {
    try {
        return await authInstance(token).put(`center/instroctor/info/${instroctor_id}`, data)
            .then(response => {
                return response.status;
            })
            .catch(error => {
                return error.status;
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const deleteInstroctor = async (token, instroctor_id) => {
    try {
        return await authInstance(token).delete(`center/member/info/${instroctor_id}`)
            .then(response => {
                return response.status;
            })
            .catch(error => {
                return error.status;
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}