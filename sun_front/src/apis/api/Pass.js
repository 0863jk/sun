import { authInstance } from "../utils/Instance";

export const getCenterPass = async (token, center_id) => {
    // 센터의 수강권 목록 불러오기
    try {
        const { data } = await authInstance(token).get(`center/pass/get/${center_id}`);
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const getMemberPass = async (token, center_id, user_id) => {
    // 유저가 사용하는 수강권 불러오기
    try {
        const { data } = await authInstance(token).get(`center/member/registerinfo?center_id=${center_id}&user_id=${user_id}`);
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postPass = async (token, data) => {
    try {
        return await authInstance(token).post('center/pass/info', data)
            // return await defaultInstance.post('center/info', data)
            .then(response => {
                const { id } = response.data;
                return { id };
            })
            .catch(error => {
                return error;
                // throw error; // 에러 처리를 위해 예외 던지기
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const updatePass = async (token, pass_id, data) => {
    try {
        return await authInstance(token).put(`center/pass/info/${pass_id}`, data)
            .then(response => {
                return response.status;
            })
            .catch(error => {
                console.log(error);
                return error.status;
                // throw error; // 에러 처리를 위해 예외 던지기
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const deletePass = async (token, pass_id) => {
    try {
        return await authInstance(token).delete(`center/pass/info/${pass_id}`)
            .then(response => {
                console.log(response);
                return response.status;
            })
            .catch(error => {
                console.log(error);
                return error.status;
                // throw error; // 에러 처리를 위해 예외 던지기
            });
    } catch (error) {
        console.error(error);
        return error;
    }
}