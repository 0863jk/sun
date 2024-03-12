import { defaultInstance, authInstance } from "../utils/Instance";

export const getCenters = async () => {
    try {
        const { data } = await defaultInstance.get(`center/info`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getCenter = async (token, center_id) => {
    // 센터 정보 불러오기 
    try {
        const { data } = await authInstance(token).get(`center/get?center_id=${center_id}`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const searchCenter = async (token, option, keyword) => {
    // 센터 정보 불러오기 
    try {
        const { data } = await authInstance(token).get(`center/search?${option}=${keyword}`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getUserCenterList = async (token, user_id, role) => {
    // 유저의 센터 리스트 불러오기
    try {
        const { data } = await authInstance(token).get(`center/list?user_id=${user_id}&role=${role}`);
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const postCenter = async (token, data) => {
    try {
        return await authInstance(token).post('center/info', data)
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

export const updateCenter = async (token, center_id, data) => {
    try {
        return await authInstance(token).put(`center/info/${center_id}`, data)
            // return await defaultInstance.post('center/info', data)
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
export const deleteCenter = async (token, center_id) => {
    try {
        return await authInstance(token).delete(`center/info/${center_id}`)
            // return await defaultInstance.post('center/info', data)
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


