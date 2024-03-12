import { authInstance } from "../utils/Instance";

export const getCenterPayments = async (token, center_id) => {
    // 센터 내 결제 내역 불러오기
    try {
        const { data } = await authInstance(token).get(`center/payments/list?center_id=${center_id}`);
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export const postPayments = async (token, data) => {
    try {
        return await authInstance(token).post('center/payments/info', data)
            .then(response => {
                return response.status;
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

export const updatePayments = async (token, id, data) => {
    try {
        return await authInstance(token).put(`center/payments/info/${id}`, data)
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
export const deletePayments = async (token, id) => {
    try {
        return await authInstance(token).delete(`center/payments/info/${id}`)
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